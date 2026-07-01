import React, { Suspense, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, MeshReflectorMaterial, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { Link } from "react-router-dom";
import { CAR_CONFIG } from "./carConfig";
import "../../styles/cinema3d.css";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const ss = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

/* Riconoscimento automatico dello sportello guidatore (se il nome esatto non è impostato) */
const DOOR_RE = /door|porta|portiere|sportello|t(u|ü)r|puerta|dhalf|dl_|_dl|door_fl|fl_door/i;

/* ---------- Boundary per GLB mancante ---------- */
class GLBBoundary extends React.Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  componentDidCatch(e: unknown) { console.warn("[Inside Mobility] car.glb non trovato: uso il modello di riserva. Metti il tuo file in public/models/car.glb", e); }
  render() { return this.state.err ? this.props.fallback : this.props.children; }
}

type ReadyCb = (root: THREE.Object3D, door: THREE.Object3D | null, mixer: THREE.AnimationMixer | null, action: THREE.AnimationAction | null) => void;

/* ---------- Modello GLB reale ---------- */
function CarGLB({ onReady }: { onReady: ReadyCb }) {
  const gltf = useGLTF(CAR_CONFIG.modelPath) as any;
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  useEffect(() => {
    const names: string[] = [];
    scene.traverse((o: THREE.Object3D) => {
      if (o.name) names.push(o.type + ": " + o.name);
      const m = o as THREE.Mesh;
      if ((m as any).isMesh) { m.castShadow = true; m.receiveShadow = true; }
    });
    console.log("%c[Inside Mobility] NODI del GLB (copiali e mandali a Claude):", "color:#1f6ff2;font-weight:bold");
    console.log(names.join("\n"));
    console.log("[Inside Mobility] Animazioni:", (gltf.animations || []).map((a: any) => a.name));

    // 1) nome esatto dalla config  2) se non c'è, cerco un nodo "porta"
    let door: THREE.Object3D | null = scene.getObjectByName(CAR_CONFIG.driverDoorNodeName) || null;
    if (!door) { scene.traverse((o: THREE.Object3D) => { if (!door && o.name && DOOR_RE.test(o.name)) door = o; }); }
    if (door) console.log("[Inside Mobility] Sportello trovato:", (door as THREE.Object3D).name);
    else console.log("[Inside Mobility] Nessuno sportello separato: uso il finale con ingresso camera.");

    let mixer: THREE.AnimationMixer | null = null, action: THREE.AnimationAction | null = null;
    if (CAR_CONFIG.hasDoorAnimationClip && gltf.animations?.length) {
      mixer = new THREE.AnimationMixer(scene);
      const clip = THREE.AnimationClip.findByName(gltf.animations, CAR_CONFIG.doorAnimationClipName) || gltf.animations[0];
      if (clip) { action = mixer.clipAction(clip); action.play(); action.paused = true; }
    }
    onReady(scene, door, mixer, action);
  }, [scene]);
  return <primitive object={scene} position={[0, CAR_CONFIG.yOffset, 0]} scale={CAR_CONFIG.scale} />;
}

/* ---------- Auto di riserva (SOLO se manca del tutto il GLB) ---------- */
function FallbackCar({ onReady }: { onReady: ReadyCb }) {
  const g = useRef<THREE.Group>(null);
  const door = useRef<THREE.Group>(null);
  useEffect(() => { if (g.current) onReady(g.current, door.current, null, null); }, []);
  const paint = { color: "#1f6ff2", metalness: 0.7, roughness: 0.28 } as any;
  const glass = { color: "#0f1c30", metalness: 0.4, roughness: 0.1 } as any;
  const wheel = (x: number, z: number) => (
    <mesh position={[x, 0.42, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.42, 0.42, 0.32, 28]} />
      <meshStandardMaterial color="#0c0e14" metalness={0.3} roughness={0.6} />
    </mesh>
  );
  return (
    <group ref={g}>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow><boxGeometry args={[4.2, 0.7, 1.85]} /><meshStandardMaterial {...paint} /></mesh>
      <mesh position={[-0.15, 1.02, 0]} castShadow><boxGeometry args={[2.3, 0.68, 1.62]} /><meshStandardMaterial {...glass} /></mesh>
      <group ref={door} position={[0.55, 0.62, 0.92]}>
        <mesh position={[0.55, 0, 0.02]} castShadow><boxGeometry args={[1.25, 0.6, 0.06]} /><meshStandardMaterial {...paint} /></mesh>
      </group>
      {wheel(1.35, 0.95)}{wheel(-1.35, 0.95)}{wheel(1.35, -0.95)}{wheel(-1.35, -0.95)}
    </group>
  );
}

/* ---------- Regia: camera pilotata dallo scroll ----------
   0.00  auto piccola e centrata, lontana (sportello CHIUSO)
   ~     l'auto compie un GIRO COMPLETO su se stessa (rotazione 360°)
   0.60  verso fine rotazione si APRE lo sportello lato guida
   0.85  la camera si avvicina allo sportello aperto
   1.00  ingresso in abitacolo, immersione e zoom finale -> parte il sito */
const CAM = [
  { p: 0.00, pos: [0, 1.5, 10.6], tgt: [0, 0.95, 0] },
  { p: 0.50, pos: [0, 1.42, 6.2], tgt: [0, 1.0, 0] },
  { p: 0.72, pos: [2.4, 1.32, 4.0], tgt: [0.15, 1.05, 0] },
  { p: 0.88, pos: [1.25, 1.2, 1.8], tgt: [0.22, 1.08, -0.25] },
  { p: 1.00, pos: [0.22, 1.15, 0.10], tgt: [0.1, 1.12, -4] },
];
function sample(key: "pos" | "tgt", p: number) {
  if (p <= CAM[0].p) return CAM[0][key];
  for (let i = 0; i < CAM.length - 1; i++) {
    const a = CAM[i], b = CAM[i + 1];
    if (p <= b.p) { const t = ss(a.p, b.p, p); return (a[key] as number[]).map((v, j) => v + ((b[key] as number[])[j] - v) * t); }
  }
  return CAM[CAM.length - 1][key];
}

function Scene({ progress, mobile }: { progress: React.MutableRefObject<number>; mobile: boolean }) {
  const root = useRef<THREE.Object3D | null>(null);
  const door = useRef<THREE.Object3D | null>(null);
  const doorBase = useRef(0);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const action = useRef<THREE.AnimationAction | null>(null);

  const onReady: ReadyCb = (r, d, m, a) => {
    root.current = r; door.current = d; mixer.current = m; action.current = a;
    if (d) doorBase.current = (d.rotation as any)[CAR_CONFIG.doorHingeAxis];
  };

  useFrame(({ camera }) => {
    const p = progress.current;
    const pos = sample("pos", p) as number[];
    const tgt = sample("tgt", p) as number[];
    camera.position.set(pos[0], pos[1], pos[2]);
    camera.lookAt(tgt[0], tgt[1], tgt[2]);
    // ROTAZIONE COMPLETA dell'auto su se stessa (giro di 360°) tra 0.08 e 0.66
    if (root.current) root.current.rotation.y = -Math.PI * 2 * ss(0.08, 0.66, p);
    // SPORTELLO: resta CHIUSO durante il giro, poi si apre verso la fine (0.60 -> 0.80)
    const open = ss(0.60, 0.80, p);
    if (CAR_CONFIG.hasDoorAnimationClip && action.current && mixer.current) {
      const dur = action.current.getClip().duration || 1;
      action.current.time = dur * open; mixer.current.update(0);
    } else if (door.current) {
      (door.current.rotation as any)[CAR_CONFIG.doorHingeAxis] = doorBase.current - THREE.MathUtils.degToRad(CAR_CONFIG.doorOpenAngleDeg) * open;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[6, 8, 4]} angle={0.5} penumbra={1} intensity={2.2} castShadow={!mobile} shadow-bias={-0.0002} />
      <spotLight position={[-6, 5, -4]} angle={0.6} penumbra={1} intensity={1.1} color="#5b9dff" />
      <Environment resolution={mobile ? 128 : 256}>
        <Lightformer intensity={2.4} position={[0, 4, -6]} scale={[12, 5, 1]} />
        <Lightformer intensity={1.2} position={[-5, 2, 2]} scale={[6, 6, 1]} color="#9cc4ff" />
        <Lightformer intensity={1.2} position={[5, 2, 2]} scale={[6, 6, 1]} color="#ffffff" />
      </Environment>

      <group position={[0, -0.02, 0]}>
        {/* Niente auto segnaposto durante il caricamento: la copertura nera + logo è gestita dall'overlay boot */}
        <Suspense fallback={null}>
          <GLBBoundary fallback={<FallbackCar onReady={onReady} />}>
            <CarGLB onReady={onReady} />
          </GLBBoundary>
        </Suspense>
      </group>

      <ContactShadows position={[0, 0.001, 0]} opacity={0.6} scale={16} blur={2.6} far={6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        {mobile ? (
          <meshStandardMaterial color="#080d16" metalness={0.5} roughness={0.6} />
        ) : (
          <MeshReflectorMaterial blur={[260, 70]} resolution={1024} mixBlur={1} mixStrength={35} roughness={1}
            depthScale={1.1} minDepthThreshold={0.4} maxDepthThreshold={1.25} color="#080d16" metalness={0.65} />
        )}
      </mesh>
    </>
  );
}

/* ---------- Overlay di caricamento (schermo nero + logo lampeggiante) ---------- */
function BootScreen({ done }: { done: boolean }) {
  const { progress } = useProgress();
  return (
    <div className={"c3d-boot" + (done ? " hide" : "")}>
      <img src="/img/mark.png" alt="Inside Mobility" />
      <span>INSIDE&nbsp;MOBILITY</span>
      <i><b style={{ width: Math.round(progress) + "%" }} /></i>
    </div>
  );
}

/* ---------- Componente principale ---------- */
export default function CinemaIntro() {
  const reduce = typeof window !== "undefined" && window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = typeof window !== "undefined" && window.matchMedia && matchMedia("(max-width: 768px)").matches;
  const sec = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const logo = useRef<HTMLDivElement>(null);
  const w1 = useRef<HTMLSpanElement>(null);
  const w2 = useRef<HTMLSpanElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);

  // stato "modello pronto": chiude la schermata nera di boot
  const { active, progress: loadPct } = useProgress();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!active && loadPct >= 100) { const t = setTimeout(() => setReady(true), 350); return () => clearTimeout(t); }
  }, [active, loadPct]);

  // all'apertura riparti dall'alto, così l'intro inizia dalla schermata nera
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (reduce || !sec.current) return;
    let ticking = false;
    const frame = () => {
      ticking = false;
      const vh = window.innerHeight;
      const total = sec.current!.offsetHeight - vh;
      if (total <= 0) return;
      const p = clamp(-sec.current!.getBoundingClientRect().top / total, 0, 1);
      progress.current = p;
      if (logo.current) logo.current.style.opacity = String(1 - ss(0.04, 0.13, p));
      const out = ss(0.5, 0.62, p);
      if (w1.current) { const a = ss(0.20, 0.34, p); w1.current.style.opacity = String(a * (1 - out)); w1.current.style.transform = `translateY(${40 * (1 - a) - out * 24}px)`; }
      if (w2.current) { const a = ss(0.28, 0.42, p); w2.current.style.opacity = String(a * (1 - out)); w2.current.style.transform = `translateY(${40 * (1 - a) - out * 24}px)`; }
      if (hero.current) { const h = ss(0.72, 0.93, p); hero.current.style.opacity = String(h); hero.current.style.transform = `translate(-50%, ${20 * (1 - h)}px)`; hero.current.style.pointerEvents = h > 0.9 ? "auto" : "none"; }
      if (cue.current) cue.current.style.opacity = String((1 - ss(0.02, 0.1, p)) * (ready ? 1 : 0));
      if (bar.current) bar.current.style.width = p * 100 + "%";
      // header e menu compaiono solo a intro conclusa
      document.body.classList.toggle("intro-lock", p < 0.985);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.body.classList.add("intro-lock");
    frame();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.body.classList.remove("intro-lock");
    };
  }, [reduce, ready]);

  return (
    <section className={"c3d" + (reduce ? " no-3d" : "")} ref={sec}>
      <div className="c3d-stage">
        {!reduce && (
          <div className="c3d-canvas">
            <Canvas shadows={!isMobile} dpr={isMobile ? [1, 1.3] : [1, 1.8]} camera={{ position: [0, 1.5, 10.6], fov: 38 }} gl={{ antialias: !isMobile, powerPreference: "high-performance" }}>
              <color attach="background" args={["#000000"]} />
              <Scene progress={progress} mobile={isMobile} />
            </Canvas>
          </div>
        )}

        <div className="c3d-overlay">
          <div className="c3d-logo" ref={logo}>
            <img src="/img/mark.png" alt="Inside Mobility" />
            <span>INSIDE&nbsp;MOBILITY</span>
          </div>
          <div className="c3d-words">
            <span className="cw" ref={w1}>Trova l'auto</span>
            <span className="cw gold-text" ref={w2}>dei tuoi sogni.</span>
          </div>
          <div className="c3d-hero in-pointer" ref={hero}>
            <span className="pill"><span className="dot-live"></span> Servizio attivo su tutta Italia</span>
            <p className="lead center">Non siamo una concessionaria. Siamo il servizio che trova <b>l'auto perfetta</b> per te — nuova, km 0 o usata, in acquisto, finanziamento, leasing o noleggio.</p>
            <div className="hero-cta" style={{ justifyContent: "center" }}>
              <Link to="/configuratore" className="btn btn-gold btn-lg">Configura la tua auto <span className="arrow">→</span></Link>
              <Link to="/servizi" className="btn btn-ghost btn-lg">Scopri come funziona</Link>
            </div>
          </div>
          <div className="c3d-cue" ref={cue}><span>Scorri</span><i></i></div>
        </div>
        <div className="c3d-bar"><i ref={bar}></i></div>

        {!reduce && <BootScreen done={ready} />}
      </div>
    </section>
  );
}

useGLTF.preload(CAR_CONFIG.modelPath);
