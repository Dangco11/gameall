import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { shared } from '../materials.ts';
import { taperTube } from './dinh.ts';
import { bark, leafCard, seeded, shaftTexture } from './tex.ts';

// Cảnh quan quanh sân đình: cây đa cổ thụ rễ nổi và rễ phụ buông, các bụi tre, chuối, cau, hàng nhãn phía xa, bụi hoa giấy,
// chậu cúc, thảm cỏ. Tán lá là các thẻ lá có độ trong xếp chồng nhiều lớp (mỗi loại một InstancedMesh, vài lượt vẽ cho cả nghìn chùm lá),
// pháp tuyến hướng ra ngoài tán cho bóng tán mềm, đung đưa theo gió trong shader. Thêm chim bay và tia nắng xuyên tán lá.

/* ------------------------------------------------------------ đung đưa theo gió */
// aSway: 0 ở gốc, 1 ở ngọn. Dời trong hệ toạ độ thế giới nên không bị méo theo tỉ lệ từng cây.
const SWAY = `
  vec4 mvPosition = vec4( transformed, 1.0 );
  #ifdef USE_INSTANCING
    mvPosition = instanceMatrix * mvPosition;
  #endif
  vec4 swW = modelMatrix * mvPosition;
  float swPh = swW.x * 0.21 + swW.z * 0.17;
  float swG = 0.6 + 0.4 * sin(uTime * 0.6 + swW.x * 0.03);
  swW.x += sin(uTime * 1.9 + swPh) * uWind * swG * aSway * uAmp;
  swW.z += cos(uTime * 1.4 + swPh * 1.3) * uWind * swG * aSway * uAmp * 0.6;
  mvPosition = viewMatrix * swW;
  gl_Position = projectionMatrix * mvPosition;`;
// pháp tuyến của thẻ lá hướng từ tâm tán ra ngoài (aCenter), cho cả tán sáng tối như một khối lá thật
const ROUND_NORMAL = `
  vec3 objectNormal = vec3( normal );
  #ifdef USE_INSTANCING
    vec3 rnDir = normalize(instanceMatrix[3].xyz - aCenter + vec3(0.0, 0.35, 0.0));
    objectNormal = normalize(mix(objectNormal, inverse(mat3(instanceMatrix)) * rnDir, uRound));
  #endif
  #ifdef USE_TANGENT
    vec3 objectTangent = vec3( tangent.xyz );
  #endif`;
function windy<T extends THREE.Material>(m: T, amp: number, round = 0): T {
  m.onBeforeCompile = sh => {
    sh.uniforms.uTime = shared.time; sh.uniforms.uWind = shared.wind; sh.uniforms.uAmp = { value: amp }; sh.uniforms.uRound = { value: round };
    sh.vertexShader = 'uniform float uTime;\nuniform float uWind;\nuniform float uAmp;\nuniform float uRound;\nattribute float aSway;\n' + (round ? 'attribute vec3 aCenter;\n' : '') + sh.vertexShader
      .replace('#include <project_vertex>', SWAY)
      .replace('#include <beginnormal_vertex>', round ? ROUND_NORMAL : '#include <beginnormal_vertex>');
  };
  m.customProgramCacheKey = () => 'windy' + amp + '_' + round;
  return m;
}
// thẻ lá: hai tấm phẳng chéo nhau, gốc ở dưới
function cardGeo(w = 1, h = 1, bottom = false){
  const a = new THREE.PlaneGeometry(w, h), b = new THREE.PlaneGeometry(w, h).rotateY(Math.PI / 2);
  const g = mergeGeometries([a, b]); if (bottom) g.translate(0, h / 2, 0);
  const p = g.attributes.position as THREE.BufferAttribute, s = new Float32Array(p.count);
  for (let i = 0; i < p.count; i++) s[i] = bottom ? p.getY(i) / h : 0.5 + p.getY(i) / h;
  g.setAttribute('aSway', new THREE.BufferAttribute(s, 1));
  return g;
}
const swayAttr = (g: THREE.BufferGeometry, f: (p: THREE.Vector3) => number) => {
  const p = g.attributes.position as THREE.BufferAttribute, s = new Float32Array(p.count), v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) s[i] = f(v.fromBufferAttribute(p, i));
  g.setAttribute('aSway', new THREE.BufferAttribute(s, 1)); return g;
};

// Một loại lá = một InstancedMesh; mỗi thẻ có vị trí, cỡ, góc xoay và tâm tán riêng
class Foliage {
  readonly mesh: THREE.InstancedMesh;
  private n = 0; private centers: Float32Array;
  constructor(map: THREE.Texture, cap: number, amp: number, opts: { cast?: boolean; round?: number; tint?: number; bottom?: boolean; rough?: number } = {}){
    const geo = cardGeo(1, 1, opts.bottom);
    this.centers = new Float32Array(cap * 3);
    geo.setAttribute('aCenter', new THREE.InstancedBufferAttribute(this.centers, 3));
    const m = windy(new THREE.MeshStandardMaterial({ map, alphaTest: 0.45, side: THREE.DoubleSide, roughness: opts.rough ?? 0.72, color: opts.tint ?? 0xffffff }), amp, opts.round ?? 0);
    this.mesh = new THREE.InstancedMesh(geo, m, cap);
    this.mesh.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map, alphaTest: 0.45 });
    this.mesh.castShadow = opts.cast ?? true; this.mesh.receiveShadow = true; this.mesh.count = 0;
  }
  add(p: THREE.Vector3, s: number, center: THREE.Vector3, rnd: () => number, color?: THREE.Color){
    if (this.n >= this.mesh.instanceMatrix.count) return;
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler((rnd() - 0.5) * 0.8, rnd() * Math.PI * 2, (rnd() - 0.5) * 0.8));
    this.mesh.setMatrixAt(this.n, new THREE.Matrix4().compose(p, q, new THREE.Vector3(s, s * (0.85 + rnd() * 0.3), s)));
    if (color) this.mesh.setColorAt(this.n, color);
    this.centers.set([center.x, center.y, center.z], this.n * 3);
    this.mesh.count = ++this.n;
  }
  upright(p: THREE.Vector3, w: number, h: number, ry: number, center: THREE.Vector3, color?: THREE.Color){
    if (this.n >= this.mesh.instanceMatrix.count) return;
    this.mesh.setMatrixAt(this.n, new THREE.Matrix4().compose(p, new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ry), new THREE.Vector3(w, h, w)));
    if (color) this.mesh.setColorAt(this.n, color);
    this.centers.set([center.x, center.y, center.z], this.n * 3);
    this.mesh.count = ++this.n;
  }
  done(){ this.mesh.instanceMatrix.needsUpdate = true; (this.mesh.geometry.getAttribute('aCenter') as THREE.InstancedBufferAttribute).needsUpdate = true; if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true; this.mesh.computeBoundingSphere(); }
}

function bambooTexture(){
  const c = document.createElement('canvas'); c.width = 64; c.height = 512; const g = c.getContext('2d')!;
  const gr = g.createLinearGradient(0, 0, 64, 0); gr.addColorStop(0, '#4a6a22'); gr.addColorStop(0.45, '#8aa848'); gr.addColorStop(1, '#3a561a');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 512);
  for (let y = 0; y < 512; y += 64){ g.fillStyle = 'rgba(60,50,20,0.55)'; g.fillRect(0, y, 64, 4); g.fillStyle = 'rgba(220,230,170,0.35)'; g.fillRect(0, y + 4, 64, 3); }
  for (let i = 0; i < 40; i++){ g.fillStyle = 'rgba(120,110,60,0.25)'; g.fillRect(Math.random() * 64, Math.random() * 512, 2, 20); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1, 6); return t;
}

export class Nature {
  readonly group = new THREE.Group();
  private birds: { g: THREE.Group; wl: THREE.Mesh; wr: THREE.Mesh; r: number; h: number; sp: number; ph: number; cx: number; cz: number }[] = [];
  private shafts: { m: THREE.Mesh; base: number; ground: THREE.Vector3 }[] = [];
  private shaftMat: THREE.MeshBasicMaterial;
  private sunDir = new THREE.Vector3(-0.45, 0.7, 0.55).normalize();

  constructor(){
    const rnd = seeded(77);
    const banyanL = new Foliage(leafCard('banyan'), 900, 0.12, { round: 0.85 });
    const bambooL = new Foliage(leafCard('bamboo'), 3200, 0.22, { round: 0.6 });
    const longanL = new Foliage(leafCard('longan'), 900, 0.08, { round: 0.85, cast: false });
    const bushL = new Foliage(leafCard('bush'), 700, 0.05, { round: 0.8 });
    const bougL = new Foliage(leafCard('bougain'), 260, 0.06, { round: 0.7 });
    const grassL = new Foliage(leafCard('grass'), 2600, 0.12, { cast: false, bottom: true, rough: 0.9 });
    for (const f of [banyanL, bambooL, longanL, bushL, bougL, grassL]) this.group.add(f.mesh);

    const barkM = (k: 'banyan' | 'areca' | 'banana', rep: [number, number]) => {
      const b = bark(k), m = new THREE.MeshStandardMaterial({ map: b.map.clone(), normalMap: b.normalMap.clone(), roughness: 0.95 });
      for (const t of [m.map!, m.normalMap!]){ t.repeat.set(...rep); t.needsUpdate = true; }
      return m;
    };

    /* ---- cây đa cổ thụ bên trái: thân to nhiều múi, rễ nổi bò trên mặt đất, cành lớn vươn ngang, rễ phụ buông như rèm */
    {
      const bx = -11, bz = -2.8, parts: THREE.BufferGeometry[] = [];
      const trunkTop = new THREE.Vector3(bx + 0.3, 4.6, bz);
      for (let k = 0; k < 5; k++){                                     // nhiều thân quấn vào nhau thành gốc lớn
        const a = k / 5 * Math.PI * 2, r = 0.45;
        parts.push(taperTube(new THREE.CatmullRomCurve3([new THREE.Vector3(bx + Math.cos(a) * r * 1.6, 0, bz + Math.sin(a) * r * 1.6), new THREE.Vector3(bx + Math.cos(a + 0.6) * r, 2, bz + Math.sin(a + 0.6) * r), trunkTop.clone().add(new THREE.Vector3(Math.cos(a) * 0.3, 0, Math.sin(a) * 0.3))]), 0.62, 0.42, 24, 10));
      }
      for (let k = 0; k < 9; k++){                                     // rễ nổi bạnh ra mặt đất
        const a = k / 9 * Math.PI * 2 + rnd() * 0.3, L = 1.6 + rnd() * 1.6;
        parts.push(taperTube(new THREE.CatmullRomCurve3([new THREE.Vector3(bx + Math.cos(a) * 0.5, 0.9, bz + Math.sin(a) * 0.5), new THREE.Vector3(bx + Math.cos(a) * L * 0.5, 0.2, bz + Math.sin(a) * L * 0.5), new THREE.Vector3(bx + Math.cos(a) * L, -0.05, bz + Math.sin(a) * L)]), 0.32, 0.06, 16, 8));
      }
      // cành lớn tới các chùm tán; giữ tán ở bên trái để không che khung ảnh cô dâu trên mái đình
      const clusters = [new THREE.Vector3(-8.2, 7.4, -1.2), new THREE.Vector3(-11, 8.6, -3), new THREE.Vector3(-13.6, 7.2, -1.5), new THREE.Vector3(-10.2, 7.0, 0.8), new THREE.Vector3(-12.5, 6.6, -5), new THREE.Vector3(-9.0, 8.2, -4.5), new THREE.Vector3(-7.0, 6.2, 0.2)];
      const hangs: THREE.Vector3[] = [];
      for (const c of clusters){
        const mid = trunkTop.clone().lerp(c, 0.5).add(new THREE.Vector3(0, 0.6, 0));
        const br = new THREE.CatmullRomCurve3([trunkTop.clone(), mid, c.clone().add(new THREE.Vector3(0, -0.8, 0))]);
        parts.push(taperTube(br, 0.34, 0.09, 24, 8));
        for (let k = 0; k < 6; k++) hangs.push(br.getPointAt(0.35 + rnd() * 0.6));
        // tán lá: nhiều lớp thẻ lá trong khối bầu dục quanh đầu cành
        const R = 2.6 + rnd() * 0.8;
        for (let i = 0; i < 115; i++){
          const u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1), rr = R * Math.cbrt(0.35 + rnd() * 0.65);
          const p = new THREE.Vector3(c.x + Math.sin(v) * Math.cos(u) * rr, c.y + Math.cos(v) * rr * 0.55, c.z + Math.sin(v) * Math.sin(u) * rr);
          if (p.x > -5.6) p.x = -5.6 - rnd() * 0.5;
          banyanL.add(p, 1.5 + rnd() * 0.9, c, rnd, new THREE.Color().setHSL(0.24 + rnd() * 0.06, 0.45, 0.42 + rnd() * 0.16));
        }
      }
      for (const h of hangs){                                            // rễ phụ buông xuống, vài rễ chạm đất thành trụ
        const L = h.y * (0.5 + rnd() * 0.5), ground = L > h.y * 0.9;
        parts.push(taperTube(new THREE.CatmullRomCurve3([h, h.clone().add(new THREE.Vector3((rnd() - 0.5) * 0.3, -L * 0.5, (rnd() - 0.5) * 0.3)), h.clone().add(new THREE.Vector3((rnd() - 0.5) * 0.4, -L, (rnd() - 0.5) * 0.4))]), ground ? 0.08 : 0.035, ground ? 0.06 : 0.008, 10, 5));
      }
      const tree = new THREE.Mesh(mergeGeometries(parts), barkM('banyan', [3, 2])); tree.castShadow = tree.receiveShadow = true;
      this.group.add(tree);
    }

    /* ---- bụi tre: lũy tre sau đình và bên phải sân */
    const culmCap = 260, culmGeo = swayAttr(new THREE.CylinderGeometry(0.55, 1, 1, 8, 10).translate(0, 0.5, 0), p => p.y * p.y);
    const culms = new THREE.InstancedMesh(culmGeo, windy(new THREE.MeshStandardMaterial({ map: bambooTexture(), roughness: 0.55 }), 0.5), culmCap);
    culms.castShadow = culms.receiveShadow = true; culms.count = 0;
    const clumps: [number, number][] = [[-15, -9], [-9.5, -11.5], [-4, -12.5], [2, -12.8], [7.5, -11.8], [13, -10], [15.5, -5.5], [16.5, -1], [-16.5, -4.5], [17, 3.5], [-17.5, 2]];
    let ci = 0;
    for (const [cx, cz] of clumps){
      const center = new THREE.Vector3(cx, 7, cz);
      for (let k = 0; k < 14 && ci < culmCap; k++){
        const a = rnd() * Math.PI * 2, r = rnd() * 0.9, h = 8 + rnd() * 4, tilt = 0.05 + r * 0.12, w = 0.05 + rnd() * 0.03;
        const base = new THREE.Vector3(cx + Math.cos(a) * r, 0, cz + Math.sin(a) * r), dir = new THREE.Vector3(Math.cos(a) * Math.sin(tilt), Math.cos(tilt), Math.sin(a) * Math.sin(tilt));
        culms.setMatrixAt(ci++, new THREE.Matrix4().compose(base, new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir), new THREE.Vector3(w, h, w)));
        for (let i = 0; i < 18; i++){                                     // lá tre ở nửa trên, rủ ra ngoài
          const t = 0.45 + rnd() * 0.55, p = base.clone().addScaledVector(dir, h * t).add(new THREE.Vector3(Math.cos(a) * t * 1.2, 0, Math.sin(a) * t * 1.2));
          bambooL.add(p, 1.3 + rnd() * 0.8, center, rnd, new THREE.Color().setHSL(0.2 + rnd() * 0.05, 0.4, 0.4 + rnd() * 0.18));
        }
      }
    }
    culms.count = ci; this.group.add(culms);

    /* ---- chuối: bẹ thân, tàu lá to cong rủ, có vết rách */
    {
      const leafTex = leafCard('banana'), parts: THREE.BufferGeometry[] = [], stems: THREE.BufferGeometry[] = [];
      for (const [x, z, hgt] of [[10.4, -1.4, 2.6], [12.2, 0.4, 3.1], [9.4, 1.2, 2.2], [-13.2, 5.5, 2.8], [-12.4, 7.6, 2.3], [14.2, -2.2, 3.0]] as const){
        stems.push(new THREE.CylinderGeometry(0.13, 0.2, hgt, 12).translate(x, hgt / 2, z));
        for (let k = 0; k < 8; k++){
          const a = k / 8 * Math.PI * 2 + rnd() * 0.4, L = 2.2 + rnd() * 0.8, up = 0.9 + rnd() * 0.5, leaf = new THREE.PlaneGeometry(0.75, L, 1, 10).translate(0, L / 2, 0);
          const p = leaf.attributes.position as THREE.BufferAttribute;
          for (let i = 0; i < p.count; i++){
            const t = p.getY(i) / L, w = p.getX(i);
            // vươn ra ngoài rồi cong rủ xuống, phiến lá hơi gấp theo gân giữa
            const out = Math.sin(t * Math.PI * 0.62) * L * 0.8, y = hgt + t * L * up * (1 - t * 0.9) * 1.0 - Math.abs(w) * 0.15;
            const cx2 = Math.cos(a), sz = Math.sin(a);
            p.setXYZ(i, x + cx2 * out - sz * w, y, z + sz * out + cx2 * w);
          }
          leaf.computeVertexNormals();
          swayAttr(leaf, v => Math.min(1, Math.hypot(v.x - x, v.z - z) / 2));
          parts.push(leaf);
        }
      }
      const leaves = new THREE.Mesh(mergeGeometries(parts), windy(new THREE.MeshStandardMaterial({ map: leafTex, alphaTest: 0.45, side: THREE.DoubleSide, roughness: 0.6 }), 0.18));
      leaves.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: leafTex, alphaTest: 0.45 });
      const st = new THREE.Mesh(mergeGeometries(stems), barkM('banana', [2, 1]));
      for (const m of [leaves, st]){ m.castShadow = m.receiveShadow = true; this.group.add(m); }
    }

    /* ---- cau: thân mảnh cao vút có đốt, bẹ xanh, tán tàu lá xoè */
    {
      const frondTex = leafCard('frond'), trunks: THREE.BufferGeometry[] = [], fronds: THREE.BufferGeometry[] = [], shafts: THREE.BufferGeometry[] = [];
      for (const [x, z, h] of [[-12.5, -8, 11], [11.5, -8.5, 12], [9.2, -7.4, 10], [-14.6, -1.5, 10.5], [15, 2.6, 11], [-15.5, 9, 10]] as const){
        const lean = new THREE.Vector3((rnd() - 0.5) * 0.8, 0, (rnd() - 0.5) * 0.8), top = new THREE.Vector3(x, h, z).add(lean);
        trunks.push(taperTube(new THREE.CatmullRomCurve3([new THREE.Vector3(x, 0, z), new THREE.Vector3(x, h * 0.5, z).addScaledVector(lean, 0.3), top]), 0.15, 0.1, 20, 10));
        shafts.push(new THREE.CylinderGeometry(0.12, 0.14, 1.2, 10).translate(top.x, h + 0.6, top.z));
        for (let k = 0; k < 9; k++){
          const a = k / 9 * Math.PI * 2, L = 2.6, f = new THREE.PlaneGeometry(1.1, L, 1, 10).rotateZ(Math.PI / 2).translate(L / 2, 0, 0);
          const p = f.attributes.position as THREE.BufferAttribute;
          for (let i = 0; i < p.count; i++){
            const t = p.getX(i) / L, w = p.getY(i), droop = t * t * 1.6 - t * 0.7;
            p.setXYZ(i, top.x + Math.cos(a) * t * L * 0.9 - Math.sin(a) * w, h + 1.2 - droop, top.z + Math.sin(a) * t * L * 0.9 + Math.cos(a) * w);
          }
          f.computeVertexNormals(); swayAttr(f, v => Math.min(1, Math.hypot(v.x - top.x, v.z - top.z) / 2.4));
          fronds.push(f);
        }
      }
      const fm = new THREE.Mesh(mergeGeometries(fronds), windy(new THREE.MeshStandardMaterial({ map: frondTex, alphaTest: 0.45, side: THREE.DoubleSide, roughness: 0.65 }), 0.3));
      fm.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: frondTex, alphaTest: 0.45 });
      const tm = new THREE.Mesh(mergeGeometries(trunks), barkM('areca', [1, 4]));
      const sm = new THREE.Mesh(mergeGeometries(shafts), new THREE.MeshStandardMaterial({ color: 0x6a8a3a, roughness: 0.6 }));
      for (const m of [fm, tm, sm]){ m.castShadow = m.receiveShadow = true; this.group.add(m); }
    }

    /* ---- hàng nhãn xa phía sau và hai bên: tán tròn sẫm */
    {
      const trunks: THREE.BufferGeometry[] = [];
      for (let i = 0; i < 18; i++){
        const x = -30 + i * 3.6 + (rnd() - 0.5) * 1.5, z = -16 - rnd() * 6, h = 2 + rnd() * 1.2, c = new THREE.Vector3(x, h + 2.4, z);
        trunks.push(new THREE.CylinderGeometry(0.18, 0.28, h + 1.5, 8).translate(x, (h + 1.5) / 2, z));
        for (let k = 0; k < 46; k++){
          const u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1), r = 2.6 * Math.cbrt(0.3 + rnd() * 0.7);
          longanL.add(new THREE.Vector3(c.x + Math.sin(v) * Math.cos(u) * r * 1.1, c.y + Math.cos(v) * r * 0.75, c.z + Math.sin(v) * Math.sin(u) * r), 1.8 + rnd(), c, rnd, new THREE.Color().setHSL(0.27 + rnd() * 0.04, 0.4, 0.3 + rnd() * 0.1));
        }
      }
      for (const [x, z] of [[-22, 4], [-24, 12], [-21, 20], [22, 6], [24, 14], [21, 22], [-19, -9], [20, -8]]){
        const c = new THREE.Vector3(x, 4.4, z); trunks.push(new THREE.CylinderGeometry(0.2, 0.3, 3.4, 8).translate(x, 1.7, z));
        for (let k = 0; k < 50; k++){ const u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1), r = 2.8 * Math.cbrt(0.3 + rnd() * 0.7); longanL.add(new THREE.Vector3(c.x + Math.sin(v) * Math.cos(u) * r, c.y + Math.cos(v) * r * 0.75, c.z + Math.sin(v) * Math.sin(u) * r), 1.9 + rnd(), c, rnd, new THREE.Color().setHSL(0.26 + rnd() * 0.05, 0.42, 0.32 + rnd() * 0.1)); }
      }
      const tm = new THREE.Mesh(mergeGeometries(trunks), barkM('banyan', [1, 1])); tm.castShadow = true; this.group.add(tm);
    }

    /* ---- bụi cây cảnh viền sân, hoa giấy ở hai góc đình */
    const bush = (x: number, z: number, r: number, f: Foliage, n: number, hue = 0.25) => {
      const c = new THREE.Vector3(x, r * 0.55, z);
      for (let i = 0; i < n; i++){ const u = rnd() * Math.PI * 2, v = Math.acos(rnd()), rr = r * Math.cbrt(0.3 + rnd() * 0.7); f.add(new THREE.Vector3(x + Math.sin(v) * Math.cos(u) * rr, c.y + Math.cos(v) * rr * 0.7, z + Math.sin(v) * Math.sin(u) * rr), r * 0.9 + rnd() * 0.4, c, rnd, new THREE.Color().setHSL(hue + rnd() * 0.05, 0.45, 0.38 + rnd() * 0.15)); }
    };
    for (let z = 2; z <= 23; z += 1.7){ bush(-12.2 + (rnd() - 0.5) * 0.4, z, 0.75 + rnd() * 0.3, bushL, 12); if (z > 8) bush(12.2 + (rnd() - 0.5) * 0.4, z, 0.75 + rnd() * 0.3, bushL, 12); }
    for (const [x, z] of [[-9.4, -0.6], [9.4, -0.6], [-12, 0.4], [12.6, 4.2]]) bush(x, z, 1.25, bougL, 42, 0.3);

    /* ---- thảm cỏ ngoài sân gạch */
    for (let i = 0; i < 2600; i++){
      let x = (rnd() - 0.5) * 64, z = -12 + rnd() * 44;
      if (Math.abs(x) < 11.8 && z > -1 && z < 25.5) continue;                 // không mọc trên sân gạch
      if (Math.abs(x) < 9.6 && z > -8 && z < -1) continue;                    // không mọc dưới nền đình
      grassL.upright(new THREE.Vector3(x, 0, z), 0.7 + rnd() * 0.6, 0.35 + rnd() * 0.35, rnd() * Math.PI, new THREE.Vector3(x, -1, z), new THREE.Color().setHSL(0.22 + rnd() * 0.06, 0.4, 0.45 + rnd() * 0.15));
    }
    for (const f of [banyanL, bambooL, longanL, bushL, bougL, grassL]) f.done();

    /* ---- chim én bay lượn trên trời */
    const birdM = new THREE.MeshStandardMaterial({ color: 0x2a2622, roughness: 0.8, side: THREE.DoubleSide });
    const wing = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -0.06), new THREE.Vector3(0.38, 0, 0.04), new THREE.Vector3(0, 0, 0.12)]);
    wing.computeVertexNormals();
    for (let i = 0; i < 9; i++){
      const g = new THREE.Group(), body = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6).scale(0.7, 0.6, 2.2), birdM);
      const wl = new THREE.Mesh(wing, birdM), wr = new THREE.Mesh(wing, birdM); wl.scale.x = -1;
      g.add(body, wl, wr); this.group.add(g);
      this.birds.push({ g, wl, wr, r: 10 + rnd() * 12, h: 11 + rnd() * 6, sp: 0.12 + rnd() * 0.1, ph: rnd() * 6, cx: (rnd() - 0.5) * 10, cz: -6 + rnd() * 8 });
    }

    /* ---- tia nắng xuyên qua tán đa xuống sân */
    this.shaftMat = new THREE.MeshBasicMaterial({ map: shaftTexture(), color: 0xfff0c8, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
    for (const [x, z, w] of [[-7.2, 1.6, 1.4], [-8.6, 3.8, 1.0], [-6.2, 4.4, 0.8], [-9.6, 0.4, 1.2]]){
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, 16), this.shaftMat);
      this.shafts.push({ m, base: rnd() * 6, ground: new THREE.Vector3(x, 0, z) }); this.group.add(m);
    }
  }

  // day: 0 đêm .. 1 ban ngày (chim, tia nắng); sun: hướng mặt trời
  update(_dt: number, t: number, camera: THREE.Camera, day: number, sun: THREE.Vector3, sunWarm: number){
    for (const b of this.birds){
      b.g.visible = day > 0.3;
      if (!b.g.visible) continue;
      const a = t * b.sp + b.ph, x = b.cx + Math.cos(a) * b.r, z = b.cz + Math.sin(a) * b.r * 0.6, y = b.h + Math.sin(a * 2.3) * 1.2;
      b.g.position.set(x, y, z);
      b.g.lookAt(b.cx + Math.cos(a + 0.05) * b.r, y, b.cz + Math.sin(a + 0.05) * b.r * 0.6);
      const f = Math.sin(t * 11 + b.ph * 3) * 0.7;
      b.wl.rotation.z = f; b.wr.rotation.z = -f;
    }
    this.sunDir.copy(sun).normalize();
    const show = day > 0.2 && sun.y > 0.12;
    const toCam = new THREE.Vector3();
    for (const s of this.shafts){
      s.m.visible = show;
      if (!show) continue;
      // tấm sáng chạy dọc hướng nắng, luôn quay mặt về phía máy quay
      const axis = this.sunDir, c = s.m.position.copy(s.ground).addScaledVector(axis, 7.5);
      toCam.subVectors(camera.position, c); toCam.addScaledVector(axis, -toCam.dot(axis)).normalize();
      const xAxis = new THREE.Vector3().crossVectors(axis, toCam).normalize();
      s.m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(xAxis, axis, toCam));
    }
    this.shaftMat.opacity = show ? (0.1 + 0.05 * Math.sin(t * 0.4)) * Math.min(1, day) * (0.7 + sunWarm * 0.5) : 0;
    this.shaftMat.color.setHSL(0.11, 0.9, 0.75 - sunWarm * 0.1);
  }
}
