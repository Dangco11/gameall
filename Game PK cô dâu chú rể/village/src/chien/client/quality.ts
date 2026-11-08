import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Ba mức đồ họa. Chỉ đổi cách vẽ (độ nét, bóng, hậu kỳ, mật độ cây cỏ), không đổi số quân hay kết quả trận.
//   medium: độ phân giải 1x, bóng 2048, không che sáng môi trường, không bloom
//   high:   độ phân giải tới 1,5x, bóng mềm 4096, che sáng môi trường (GTAO 10 mẫu), bloom nhẹ, chỉnh màu, MSAA 4x
//   ultra:  độ phân giải tới 2x, GTAO 16 mẫu, mọi thứ ở mức cao nhất
export type Quality = 'medium' | 'high' | 'ultra';
export const QUALITY: Record<Quality, { label: string; pixel: number; shadow: number; ao: 0 | 1; bloom: number; msaa: number; detail: number; skins: number }> = {
  medium: { label: 'Medium', pixel: 1, shadow: 2048, ao: 0, bloom: 0, msaa: 0, detail: 0.45, skins: 80 },
  high: { label: 'High', pixel: 1.5, shadow: 4096, ao: 1, bloom: 0.12, msaa: 4, detail: 0.8, skins: 160 },
  ultra: { label: 'Ultra', pixel: 2, shadow: 4096, ao: 1, bloom: 0.14, msaa: 4, detail: 1, skins: 340 },
};
export const nextLower = (q: Quality): Quality | null => q === 'ultra' ? 'high' : q === 'high' ? 'medium' : null;

// Chỉnh màu điện ảnh sau tone mapping: tương phản nhẹ, bão hòa vừa, ánh vàng ở vùng sáng, bóng hơi lạnh, viền tối mờ
const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uContrast: { value: 1.07 }, uSat: { value: 1.06 }, uWarm: { value: 0.045 }, uVig: { value: 0.32 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uContrast, uSat, uWarm, uVig; varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec3 col = (c.rgb - 0.5) * uContrast + 0.5;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSat);
      col += vec3(1.0, 0.55, 0.15) * uWarm * smoothstep(0.45, 1.0, l) - vec3(0.15, 0.05, -0.12) * uWarm * (1.0 - smoothstep(0.0, 0.35, l));
      vec2 d = vUv - 0.5; col *= 1.0 - uVig * smoothstep(0.35, 0.85, dot(d, d) * 2.2);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), c.a);
    }`,
};

export function makeComposer(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, q: Quality, w: number, h: number){
  const Q = QUALITY[q];
  const rt = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, samples: Q.msaa });
  const c = new EffectComposer(renderer, rt);
  c.addPass(new RenderPass(scene, camera));
  if (Q.ao){
    const ao = new GTAOPass(scene, camera, w, h);
    ao.updateGtaoMaterial({ radius: 0.9, distanceExponent: 1.6, thickness: 1.4, scale: 1.1, samples: q === 'ultra' ? 16 : 10 });
    ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
    ao.blendIntensity = 0.85;
    c.addPass(ao);
  }
  if (Q.bloom) c.addPass(new UnrealBloomPass(new THREE.Vector2(w / 2, h / 2), Q.bloom, 0.35, 0.92));
  c.addPass(new OutputPass());
  c.addPass(new ShaderPass(GradeShader));
  return c;
}
