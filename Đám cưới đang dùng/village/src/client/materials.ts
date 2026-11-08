import * as THREE from 'three';

// Đồng hồ và gió dùng chung cho mọi shader: lúa, tre, nước.
export const shared = { time: { value: 0 }, wind: { value: 0.3 }, light: { value: new THREE.Color(1, 1, 1) } };

// Vật liệu đung đưa theo gió: đỉnh ngọn lắc nhiều, gốc đứng yên. Mỗi cây lệch pha theo vị trí.
export function swayMaterial(){
  const m = new THREE.MeshStandardMaterial({ roughness: 0.9, flatShading: true });
  m.onBeforeCompile = sh => {
    sh.uniforms.uTime = shared.time; sh.uniforms.uWind = shared.wind;
    sh.vertexShader = 'uniform float uTime;\nuniform float uWind;\n' + sh.vertexShader.replace('#include <begin_vertex>', `
      vec3 transformed = vec3(position);
      #ifdef USE_INSTANCING
        vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
      #else
        vec3 ip = vec3(0.0);
      #endif
      float h = clamp(position.y, 0.0, 1.0);
      float gust = 0.6 + 0.4 * sin(uTime * 0.7 + ip.x * 0.05);
      transformed.x += sin(uTime * 2.2 + ip.x * 0.35 + ip.z * 0.21) * uWind * gust * h * h * 0.32;
      transformed.z += cos(uTime * 1.6 + ip.z * 0.3) * uWind * h * h * 0.12;`);
  };
  return m;
}

// Mặt nước: gợn sóng lấp lánh, màu theo ánh sáng trời. Dùng được cho cả ao nhỏ vẽ instanced.
export function waterMaterial(deep = 0x3d8285, shallow = 0x86bdb0){
  return new THREE.ShaderMaterial({
    uniforms: { uTime: shared.time, uLight: shared.light, uDeep: { value: new THREE.Color(deep) }, uShallow: { value: new THREE.Color(shallow) } },
    vertexShader: `
      varying vec3 vW; varying vec2 vUv;
      void main(){
        vec4 p = vec4(position, 1.0);
        #ifdef USE_INSTANCING
          p = instanceMatrix * p;
        #endif
        vec4 w = modelMatrix * p; vW = w.xyz; vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: `
      uniform float uTime; uniform vec3 uLight; uniform vec3 uDeep; uniform vec3 uShallow;
      varying vec3 vW; varying vec2 vUv;
      void main(){
        float r = sin(vW.x * 0.9 + uTime * 1.3) * sin(vW.z * 1.3 - uTime * 0.9) + 0.5 * sin((vW.x + vW.z) * 2.1 + uTime * 2.0);
        float edge = smoothstep(0.35, 0.5, distance(vUv, vec2(0.5)));
        vec3 c = mix(uDeep, uShallow, 0.35 + 0.25 * r + 0.3 * edge);
        c += vec3(0.9, 0.95, 1.0) * smoothstep(1.05, 1.4, r) * 0.25;
        gl_FragColor = vec4(c * uLight, 1.0);
      }`,
  });
}
