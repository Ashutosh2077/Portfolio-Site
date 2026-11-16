"use client";
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Clapperboard, Lightbulb, Play } from 'lucide-react';
import { caseStudies, projects, type CaseStudy, type Clip, type Metric, type Project } from './content';
import { asset } from './asset';

/** "Under the hood" section: a frame-budget explainer, then one block per optimisation case study. */
export default function DeepDives({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
 return <>
  <FrameBudget />
  {caseStudies.map(c => <CaseBlock key={c.id} c={c} onOpenProject={onOpenProject} />)}
 </>;
}

/* ---------- frame budget toy: drag CPU/GPU ms and see what frame rate you get ---------- */
const TARGETS = [30, 60, 90] as const;
const metric = (c: CaseStudy | undefined, label: string) => c?.metrics.find(m => m.label === label);

function FrameBudget() {
 const city = caseStudies.find(c => c.id === 'city');
 const cpuM = metric(city, 'CPU time'), gpuM = metric(city, 'GPU time');
 const hasReal = cpuM?.before != null && gpuM?.before != null && cpuM.after != null && gpuM.after != null;
 const [target, setTarget] = useState<number>(60);
 const [cpu, setCpu] = useState(hasReal ? cpuM!.before! : 25);
 const [gpu, setGpu] = useState(hasReal ? gpuM!.before! : 10);
 const budget = 1000 / target;
 const frame = Math.max(cpu, gpu);
 const fps = Math.min(999, Math.round(1000 / frame));
 const bound = cpu >= gpu ? 'CPU' : 'GPU';
 const ok = frame <= budget + 0.01;
 const scale = Math.max(40, cpu, gpu, budget) * 1.05;
 const pct = (v: number) => `${(v / scale) * 100}%`;

 return <div className="card budget" data-pop>
  <div className="budget-text">
   <p className="kind">Before the case studies: a 60-second lesson</p>
   <h3>Every frame has a time budget</h3>
   <p>To hit 60 FPS, the game has <b>16.7 ms</b> to finish each frame. The CPU (game logic, culling, draw calls) and the GPU (drawing pixels) work side by side, so the slower one sets your frame rate.</p>
   <p className="muted">Drag the sliders and watch which side holds the game back.</p>
  </div>
  <div className="budget-toy">
   <div className="budget-targets" role="group" aria-label="Target frame rate">
    {TARGETS.map(t => <button key={t} type="button" aria-pressed={target === t} className={'chip-btn' + (target === t ? ' is-active' : '')} onClick={() => setTarget(t)}>{t} FPS{t === 90 ? ' (VR)' : ''}</button>)}
   </div>
   {hasReal && <div className="budget-presets">
    <button type="button" className="link-btn" onClick={() => { setCpu(cpuM!.before!); setGpu(gpuM!.before!); }}>My city: before</button>
    <button type="button" className="link-btn" onClick={() => { setCpu(cpuM!.after!); setGpu(gpuM!.after!); }}>My city: after</button>
   </div>}
   <div className="bars" style={{ '--budget-f': budget / scale } as React.CSSProperties}>
    <span className="budget-line" aria-hidden="true"><small>{budget.toFixed(1)} ms budget</small></span>
    <Bar label="CPU" value={cpu} set={setCpu} width={pct(cpu)} over={cpu > budget} />
    <Bar label="GPU" value={gpu} set={setGpu} width={pct(gpu)} over={gpu > budget} />
   </div>
   <p className={'verdict ' + (ok ? 'is-ok' : 'is-bad')} aria-live="polite">
    <b>{fps} FPS</b> · {ok ? `Inside the ${target} FPS budget.` : `${bound}-bound: ${(frame - budget).toFixed(1)} ms over budget. Optimise the ${bound} side first.`}
   </p>
  </div>
 </div>;
}

function Bar({ label, value, set, width, over }: { label: string; value: number; set: (n: number) => void; width: string; over: boolean }) {
 return <label className="bar-row">
  <span className="bar-label">{label}<small>{value.toFixed(1)} ms</small></span>
  <span className="bar-track"><span className={'bar-fill' + (over ? ' over' : '')} style={{ width }} /></span>
  <input type="range" min={2} max={40} step={0.5} value={value} onChange={e => set(Number(e.target.value))} aria-label={`${label} time in milliseconds`} />
 </label>;
}

/* ---------- one case study ---------- */
function CaseBlock({ c, onOpenProject }: { c: CaseStudy; onOpenProject: (p: Project) => void }) {
 const project = projects.find(p => p.id === c.project);
 const shownMetrics = c.metrics.filter(m => m.before != null && m.after != null);
 return <article id={'dive-' + c.id} className={'card dive tone-' + c.tone} data-pop>
  <header className="dive-head">
   <span className="dive-num">{c.num}</span>
   <div>
    <h3>{c.title}</h3>
    {project && <button type="button" className="link-btn" onClick={() => onOpenProject(project)}>From {project.title} <ArrowUpRight size={15} /></button>}
   </div>
  </header>

  <div className="dive-grid">
   <BeforeAfter before={c.before} after={c.after} title={c.title} />
   <div className="dive-text">
    <h4>The problem</h4>
    <p>{c.problem}</p>
    <h4>What I did</h4>
    <ol className="dive-steps">{c.steps.map(s => <li key={s}>{s}</li>)}</ol>
   </div>
  </div>

  {c.techniques && <>
   <h4 className="dive-sub">The toolkit, and what each one saves</h4>
   <ul className="techniques">
    {c.techniques.map(t => <li key={t.name}>
     <b>{t.name}</b>
     <span>{t.what}</span>
     <span className="saves">{t.saves.map(s => <em key={s} className={'saves-' + s.toLowerCase()}>{s}</em>)}</span>
    </li>)}
   </ul>
  </>}

  {shownMetrics.length > 0 && <div className="metrics">
   {shownMetrics.map(m => <MetricCard key={m.label} m={m} />)}
   {c.device && <p className="metrics-device">Measured on {c.device}</p>}
  </div>}

  <aside className="lesson">
   <Lightbulb size={22} aria-hidden="true" />
   <div>
    <b>{c.lesson.title}</b>
    <p>{c.lesson.body}</p>
    <p className="lesson-tip"><span>Try it:</span> {c.lesson.tip}</p>
   </div>
  </aside>
 </article>;
}

function MetricCard({ m }: { m: Metric }) {
 const b = m.before!, a = m.after!;
 const higherIsBetter = m.unit === 'FPS';
 const change = b === 0 ? 0 : Math.round(((a - b) / b) * 100);
 const good = higherIsBetter ? a > b : a < b;
 const fmt = (v: number) => v.toLocaleString('en-IN') + (m.unit ? ` ${m.unit}` : '');
 return <div className="metric">
  <small>{m.label}</small>
  <span className="metric-vals"><s>{fmt(b)}</s> → <b>{fmt(a)}</b></span>
  <span className={'metric-change' + (good ? ' good' : '')}>{change > 0 ? '+' : ''}{change}%</span>
 </div>;
}

/* ---------- before / after video ---------- */
function BeforeAfter({ before, after, title }: { before: Clip; after: Clip; title: string }) {
 const both = !!before && !!after;
 const [side, setSide] = useState<'before' | 'after'>(after ? 'after' : 'before');
 const clip = side === 'after' ? (after ?? before) : (before ?? after);
 return <div className="ba">
  {both && <div className="ba-tabs" role="group" aria-label="Before or after">
   <button type="button" aria-pressed={side === 'before'} className={side === 'before' ? 'is-active' : ''} onClick={() => setSide('before')}>Before</button>
   <button type="button" aria-pressed={side === 'after'} className={side === 'after' ? 'is-active' : ''} onClick={() => setSide('after')}>After</button>
  </div>}
  <ClipView key={side} clip={clip} title={`${title}, ${side}`} />
 </div>;
}

export function ClipView({ clip, title }: { clip: Clip; title: string }) {
 const ref = useRef<HTMLVideoElement>(null);
 const [yt, setYt] = useState(false);
 // play local clips only while on screen, to save battery and data
 useEffect(() => {
  const v = ref.current;
  if (!v) return;
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.4 });
  io.observe(v);
  return () => io.disconnect();
 }, [clip]);

 if (!clip) return <div className="clip clip-empty"><Clapperboard size={36} /><b>Clip coming soon</b></div>;
 if (clip.src) return <div className="clip">
  <video ref={ref} src={asset(clip.src)} poster={clip.poster ? asset(clip.poster) : undefined} muted loop playsInline controls preload="metadata" aria-label={title} />
 </div>;
 if (clip.youtube) return <div className="clip">
  {yt ? <iframe src={`https://www.youtube-nocookie.com/embed/${clip.youtube}?autoplay=1&mute=1&rel=0&playsinline=1`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
   : <button type="button" className="clip-thumb" onClick={() => setYt(true)} aria-label={`Play video: ${title}`}>
     <img src={clip.poster ? asset(clip.poster) : `https://i.ytimg.com/vi/${clip.youtube}/hqdefault.jpg`} alt="" loading="lazy" />
     <span className="play-pill"><Play size={18} /> Watch</span>
    </button>}
 </div>;
 return null;
}
