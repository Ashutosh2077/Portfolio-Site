"use client";
import { useEffect, useRef, useState } from 'react';

/*
 * Two small Three.js demos that share one procedurally drawn texture atlas.
 *  - "art":  a handful of cube buildings. Toggle 4 separate textures vs 1 atlas + batching, wireframe, drag to orbit.
 *  - "perf": a 400-building city. Toggle texture atlas, batching and LOD; draw calls and triangles are read
 *            live from the renderer, so the numbers are real for this scene, not made up.
 * Three.js is loaded only when the panel is opened, so it costs nothing on first page load.
 */

export const TILES = [
 { name: 'Sandstone', base: '#E9C98F', line: '#B8894A', win: '#5B3A1E' },
 { name: 'Glass', base: '#5AA0D8', line: '#2C6BA6', win: '#CFE8FF' },
 { name: 'Brick', base: '#C4553A', line: '#8E3423', win: '#2A1A14' },
 { name: 'Concrete', base: '#BDB7AC', line: '#8D877C', win: '#3A3A44' },
] as const;

/** draws one 256×256 building facade: base colour, floor lines, window grid */
function drawTile(ctx: CanvasRenderingContext2D, x: number, y: number, t: (typeof TILES)[number], size = 256) {
 ctx.fillStyle = t.base; ctx.fillRect(x, y, size, size);
 ctx.fillStyle = t.line;
 for (let r = 0; r < 8; r++) ctx.fillRect(x, y + r * (size / 8), size, 3);
 ctx.fillStyle = t.win;
 for (let r = 0; r < 8; r++) for (let c = 0; c < 4; c++) ctx.fillRect(x + 16 + c * 60, y + 10 + r * (size / 8), 30, 18);
}

/** 512×512 atlas: the four facades in a 2×2 grid */
export function makeAtlasCanvas() {
 const cv = document.createElement('canvas'); cv.width = cv.height = 512;
 const ctx = cv.getContext('2d')!;
 TILES.forEach((t, i) => drawTile(ctx, (i % 2) * 256, Math.floor(i / 2) * 256, t));
 return cv;
}
function makeTileCanvas(i: number) {
 const cv = document.createElement('canvas'); cv.width = cv.height = 256;
 drawTile(cv.getContext('2d')!, 0, 0, TILES[i]);
 return cv;
}

type Geo = import('three').BufferGeometry<import('three').NormalBufferAttributes>;
export type LabStats = { calls: number; tris: number; ms: number; textures: number; materials: number };
type Opts = { atlas: boolean; batch: boolean; lod: boolean; wire: boolean };

export default function CityLab({ mode, opts, onStats }: { mode: 'art' | 'perf'; opts: Opts; onStats: (s: LabStats) => void }) {
 const host = useRef<HTMLDivElement>(null);
 const api = useRef<{ rebuild: (o: Opts) => void; dispose: () => void } | null>(null);
 const optsRef = useRef(opts);
 optsRef.current = opts;
 const statsRef = useRef(onStats);
 statsRef.current = onStats;
 const [failed, setFailed] = useState(false);

 useEffect(() => {
  let cancelled = false;
  (async () => {
   try {
    const THREE = await import('three');
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
    const { mergeGeometries } = await import('three/examples/jsm/utils/BufferGeometryUtils.js');
    const el = host.current;
    if (cancelled || !el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.info.autoReset = false;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#140d33');
    if (mode === 'perf') scene.fog = new THREE.Fog('#140d33', 16, 40);
    scene.add(new THREE.HemisphereLight('#fff3d6', '#2a1f55', 2.2));
    const sun = new THREE.DirectionalLight('#ffffff', 1.6); sun.position.set(6, 10, 4); scene.add(sun);

    const camera = new THREE.PerspectiveCamera(mode === 'art' ? 40 : 55, el.clientWidth / el.clientHeight, 0.1, 200);
    if (mode === 'art') camera.position.set(7, 6, 9); else camera.position.set(0, 5.5, 9);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    if (mode === 'art') { controls.target.set(0, 1.2, 0); controls.autoRotate = true; controls.autoRotateSpeed = 1.2; controls.minDistance = 6; controls.maxDistance = 18; }
    else { controls.target.set(0, 0.5, -10); controls.enableZoom = false; controls.maxPolarAngle = Math.PI * 0.45; controls.minAzimuthAngle = -0.5; controls.maxAzimuthAngle = 0.5; }
    controls.update();

    // textures: one atlas, or four separate ones
    const atlasTex = new THREE.CanvasTexture(makeAtlasCanvas()); atlasTex.colorSpace = THREE.SRGBColorSpace;
    const tileTex = TILES.map((_, i) => { const t = new THREE.CanvasTexture(makeTileCanvas(i)); t.colorSpace = THREE.SRGBColorSpace; return t; });

    // building list (same layout every rebuild)
    type B = { x: number; z: number; w: number; d: number; h: number; tile: number };
    const rand = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
    const list: B[] = [];
    if (mode === 'art') {
     const spots = [[-3, -1.2], [-1, -1.2], [1, -1.2], [3, -1.2], [-3, 1.2], [-1, 1.2], [1, 1.2], [3, 1.2]];
     spots.forEach(([x, z], i) => list.push({ x, z, w: 1.4, d: 1.4, h: 1.2 + rand() * 2.6, tile: i % 4 }));
    } else {
     for (let gx = -10; gx < 10; gx++) for (let gz = -18; gz < 2; gz++) {
      if (gx === -1 || gx === 0) continue; // the street the camera looks down
      list.push({ x: gx * 1.25 + (gx < 0 ? -0.6 : 0.6), z: gz * 1.25, w: 0.9, d: 0.9, h: 0.6 + rand() * 2.8, tile: Math.floor(rand() * 4) });
     }
    }

    // geometry for one building; detailed = extra segments + a rooftop tank (what LOD removes far away)
    const buildingGeo = (b: B, detailed: boolean, useAtlas: boolean) => {
     const seg = detailed ? 4 : 1;
     const body = new THREE.BoxGeometry(b.w, b.h, b.d, seg, seg * 2, seg);
     const parts: Geo[] = [body];
     if (detailed) { const tank = new THREE.CylinderGeometry(0.16, 0.16, 0.3, 12); tank.translate(b.w * 0.2, b.h / 2 + 0.15, -b.d * 0.15); parts.push(tank); }
     const g = mergeGeometries(parts.map(p => p.index ? p.toNonIndexed() : p))!;
     parts.forEach(p => p.dispose());
     if (useAtlas) { // squeeze UVs into this building's quarter of the atlas
      const uv = g.attributes.uv; const ox = (b.tile % 2) * 0.5, oy = (1 - Math.floor(b.tile / 2)) * 0.5;
      for (let i = 0; i < uv.count; i++) uv.setXY(i, ox + 0.01 + uv.getX(i) * 0.48, oy + 0.01 + uv.getY(i) * 0.48);
     }
     g.translate(b.x, b.h / 2, b.z);
     return g;
    };

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(mode === 'art' ? 11 : 60, mode === 'art' ? 6 : 60), new THREE.MeshStandardMaterial({ color: '#2a2150' }));
    ground.rotation.x = -Math.PI / 2; ground.position.z = mode === 'art' ? 0 : -10; scene.add(ground);

    let group = new THREE.Group(); scene.add(group);
    let mats: InstanceType<typeof THREE.MeshStandardMaterial>[] = [];
    const LOD_DIST = 21; // closer than this = detailed mesh

    const rebuild = (o: Opts) => {
     group.traverse(obj => { const m = obj as InstanceType<typeof THREE.Mesh>; if (m.geometry) m.geometry.dispose(); });
     mats.forEach(m => m.dispose());
     scene.remove(group); group = new THREE.Group(); scene.add(group);
     mats = (o.atlas ? [atlasTex] : tileTex).map(map => new THREE.MeshStandardMaterial({ map, wireframe: o.wire, roughness: 0.85 }));
     const matFor = (b: B) => mats[o.atlas ? 0 : b.tile];
     const near = (b: B) => !o.lod || camera.position.distanceTo(new THREE.Vector3(b.x, 0, b.z)) < LOD_DIST;
     if (!o.batch) {
      list.forEach(b => group.add(new THREE.Mesh(buildingGeo(b, mode === 'art' || near(b), o.atlas), matFor(b))));
     } else {
      // merge everything that shares a material (and LOD level) into one mesh = one draw call
      const buckets = new Map<string, { geos: ReturnType<typeof buildingGeo>[]; mat: InstanceType<typeof THREE.MeshStandardMaterial> }>();
      list.forEach(b => {
       const detailed = mode === 'art' || near(b);
       const key = (o.atlas ? 'a' : b.tile) + (detailed ? 'd' : 's');
       if (!buckets.has(key)) buckets.set(key, { geos: [], mat: matFor(b) });
       buckets.get(key)!.geos.push(buildingGeo(b, detailed, o.atlas));
      });
      buckets.forEach(({ geos, mat }) => { group.add(new THREE.Mesh(mergeGeometries(geos)!, mat)); geos.forEach(g => g.dispose()); });
     }
     ground.visible = !o.wire;
    };
    rebuild(optsRef.current);

    // render only while on screen
    let visible = true, frame = 0, ms = 0, last = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !frame) frame = requestAnimationFrame(loop); }, { threshold: 0.05 });
    io.observe(el);
    const ro = new ResizeObserver(() => { const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); });
    ro.observe(el);
    function loop(t: number) {
     frame = 0;
     if (!visible) return;
     controls.update();
     renderer.info.reset();
     const t0 = performance.now();
     renderer.render(scene, camera);
     ms = ms * 0.9 + (performance.now() - t0) * 0.1;
     if (t - last > 250) {
      last = t;
      const o = optsRef.current;
      const g0 = ground.visible ? 1 : 0;
      statsRef.current({ calls: renderer.info.render.calls - g0, tris: renderer.info.render.triangles - 2 * g0, ms, textures: o.atlas ? 1 : 4, materials: o.atlas ? 1 : 4 });
     }
     frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);

    api.current = {
     rebuild,
     dispose: () => {
      cancelAnimationFrame(frame); io.disconnect(); ro.disconnect(); controls.dispose();
      group.traverse(obj => { const m = obj as InstanceType<typeof THREE.Mesh>; if (m.geometry) m.geometry.dispose(); });
      mats.forEach(m => m.dispose()); atlasTex.dispose(); tileTex.forEach(t => t.dispose());
      renderer.dispose(); renderer.domElement.remove();
     },
    };
   } catch { if (!cancelled) setFailed(true); }
  })();
  return () => { cancelled = true; api.current?.dispose(); api.current = null; };
 }, [mode]);

 useEffect(() => { api.current?.rebuild(opts); }, [opts.atlas, opts.batch, opts.lod, opts.wire]); // eslint-disable-line react-hooks/exhaustive-deps

 return <div ref={host} className="lab-canvas" aria-label={mode === 'art' ? 'Interactive 3D buildings sharing one texture atlas. Drag to rotate.' : 'Interactive 3D city showing draw calls and triangles.'} role="img">
  {failed && <p className="lab-fail">3D preview needs WebGL, which this browser has turned off.</p>}
 </div>;
}
