"use client";
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Box, ChevronRight, Code2, Gauge, Glasses, Smartphone, Wrench } from 'lucide-react';
import {
 engineeringClip, engineeringSummary, extraStack, gameplayVideo, primaryStack, projects, releases, skillAreas, unityTools, xrClips,
 type Clip, type Project, type SkillArea, type StackItem,
} from './content';
import { ClipView } from './deep-dives';
import CityLab, { makeAtlasCanvas, TILES, type LabStats } from './city-lab';
import Sticker from './sticker';
import { asset } from './asset';

const AREA_ICON: Record<SkillArea['id'], React.ReactNode> = {
 engineering: <Code2 size={30} strokeWidth={2.6} />,
 art: <Box size={30} strokeWidth={2.4} />,
 perf: <Gauge size={30} strokeWidth={2.4} />,
 tools: <Wrench size={30} strokeWidth={2.4} />,
 ship: <Smartphone size={30} strokeWidth={2.4} />,
 xr: <Glasses size={30} strokeWidth={2.4} />,
};
/** true inside the hidden measuring copies: media renders as an empty box of the same size */
const Measuring = createContext(false);

export default function SkillsSection({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
 const [active, setActive] = useState<SkillArea['id']>('engineering');
 const area = skillAreas.find(a => a.id === active)!;
 // lock the panel to the tallest panel's height, so switching cards never moves the tech stack below
 const wrap = useRef<HTMLDivElement>(null);
 const measure = useRef<HTMLDivElement>(null);
 const [panelH, setPanelH] = useState(0);
 useEffect(() => {
  const m = measure.current, w = wrap.current;
  if (!m || !w) return;
  const update = () => setPanelH(Math.ceil(Math.max(...Array.from(m.children).map(c => (c as HTMLElement).offsetHeight))));
  const ro = new ResizeObserver(update);
  ro.observe(w);
  Array.from(m.children).forEach(c => ro.observe(c));
  window.addEventListener('resize', update);
  document.fonts?.ready.then(update).catch(() => {});
  return () => { ro.disconnect(); window.removeEventListener('resize', update); };
 }, []);
 const pick = (id: SkillArea['id']) => {
  setActive(id);
  // on phones the panel sits below the cards, so bring it into view
  if (window.matchMedia('(max-width: 900px)').matches) requestAnimationFrame(() => document.getElementById('sk-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
 };

 return <section id="skills" className="skills-sec">
  <div className="wrap">
   <div className="sk-head" data-pop>
    <Skyline />
    <p className="label label-sun">Skills & expertise</p>
    <h2>Engineering, art and <span className="hl">game feel.</span></h2>
    <p className="sk-lead">I design, build and optimise games, from core gameplay systems to complete 3D worlds for mobile and PC.</p>
   </div>

   <div className="sk-grid">
    <div className="sk-cards" role="tablist" aria-label="Skill areas">
     {skillAreas.map(a => <button key={a.id} type="button" role="tab" id={'sk-tab-' + a.id} aria-selected={active === a.id} aria-controls="sk-panel"
      className={'sk-card' + (active === a.id ? ' is-active' : '')} onClick={() => pick(a.id)}>
      <span className="sk-card-icon">{AREA_ICON[a.id]}</span>
      <span className="sk-card-text"><b>{a.name}</b><small>{a.short}</small></span>
      <ChevronRight className="sk-chev" size={22} strokeWidth={3} />
     </button>)}
    </div>

    <div className="sk-panel-wrap" ref={wrap}>
     <div id="sk-panel" className="sk-panel" role="tabpanel" aria-labelledby={'sk-tab-' + active} key={active} style={panelH ? { minHeight: panelH } : undefined}>
      <header className="sk-panel-head">
       <span className="sk-panel-icon">{AREA_ICON[active]}</span>
       <div><h3>{area.name}</h3><p>{area.sub}</p></div>
      </header>
      <PanelBody id={active} onOpenProject={onOpenProject} />
     </div>
     {/* hidden copies of every panel (no videos load) used only to find the tallest one */}
     <Measuring.Provider value={true}>
      <div className="sk-measure" ref={measure} aria-hidden="true" inert>
       {skillAreas.map(a => <div key={a.id} className="sk-panel">
        <header className="sk-panel-head"><span className="sk-panel-icon">{AREA_ICON[a.id]}</span><div><h3>{a.name}</h3><p>{a.sub}</p></div></header>
        <PanelBody id={a.id} onOpenProject={() => {}} />
       </div>)}
      </div>
     </Measuring.Provider>
    </div>
   </div>

   <div className="card sk-stack" data-pop>
    <div className="sk-stack-row">
     <div className="sk-stack-title">
      <Sticker name="layers" className="sk-stack-sticker" />
      <div><b>My technology stack</b><small>Tools I use every day to build, optimise and ship games.</small></div>
     </div>
     <ul className="sk-logos">
      {primaryStack.map(t => <li key={t.name} className="sk-logo">
       <span className="sk-logo-mark" style={t.logo ? undefined : { background: t.bg }}><StackMark t={t} /></span>
       <small>{t.name}</small>
      </li>)}
     </ul>
    </div>
    <p className="sk-also"><b>Also worked with:</b> {extraStack.map(t => t.name).join(' · ')}</p>
   </div>
  </div>
 </section>;
}

/* ---------- right-hand panel, one body per area ----------
 * Every body has the same shape: a 16:9 "stage" for the main visual, then a slim footer line.
 * That keeps all six panels the same size, so none looks empty and nothing below jumps. */
function PanelBody({ id, onOpenProject }: { id: SkillArea['id']; onOpenProject: (p: Project) => void }) {
 const laila = projects.find(p => p.id === 'laila')!;
 const goDive = (d: string) => document.getElementById('dive-' + d)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

 if (id === 'engineering') return <>
  <div className="sk-stage"><Media clip={engineeringClip} fallback={gameplayVideo} title="Gameplay and engineering" /></div>
  <div className="sk-foot">
   <p>{engineeringSummary}</p>
   <button type="button" className="sk-mini-project" onClick={() => onOpenProject(laila)} title={'Open ' + laila.title}>
    <img src={asset('/images/laila-icon-128.webp')} alt="" width={36} height={36} /><span>{laila.title}</span><ArrowUpRight size={15} />
   </button>
  </div>
 </>;

 if (id === 'art') return <ArtBody goDive={goDive} />;
 if (id === 'perf') return <PerfBody goDive={goDive} />;
 if (id === 'tools') return <ToolsBody />;

 if (id === 'ship') return <>
  <div className="sk-stage sk-stage-pad">
   <ul className="sk-apps">
    {releases.map(r => <li key={r.title}><a href={r.href} target="_blank" rel="noreferrer" className="sk-app">
     <span className="sk-app-icon">{r.icon ? <img src={r.icon} alt="" width={56} height={56} loading="lazy" /> : <Sticker name={r.sticker} />}</span>
     <span className="sk-app-text"><b>{r.title}</b><small>{r.note}</small></span>
     <span className={'sk-store ' + (r.store === 'Google Play' ? 'is-play' : 'is-itch')}>{r.store}</span>
     <ArrowUpRight size={18} />
    </a></li>)}
   </ul>
  </div>
  <div className="sk-foot"><p>{releases.filter(r => r.store === 'Google Play').length} on Google Play · {releases.filter(r => r.store === 'itch.io').length} on itch.io · all built in Unity</p></div>
 </>;

 return <XrBody />;
}

/** one-line on/off switch used under the 3D demos */
function Toggle({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) {
 return <button type="button" role="switch" aria-checked={on} className={'sk-switch' + (on ? ' is-on' : '')} onClick={() => set(!on)}><i />{label}</button>;
}
const fmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k' : String(n);

function ArtBody({ goDive }: { goDive: (d: string) => void }) {
 const measuring = useContext(Measuring);
 const [atlas, setAtlas] = useState(true);
 const [wire, setWire] = useState(false);
 const [stats, setStats] = useState<LabStats | null>(null);
 const [atlasUrl, setAtlasUrl] = useState('');
 useEffect(() => { if (!measuring) setAtlasUrl(makeAtlasCanvas().toDataURL('image/png')); }, [measuring]);
 return <>
  <div className="sk-stage sk-stage-art">
   {measuring ? <div className="lab-canvas" /> : <CityLab mode="art" opts={{ atlas, batch: atlas, lod: false, wire }} onStats={setStats} />}
   <aside className="sk-atlas">
    <span className="sk-kicker">The atlas</span>
    <div className="sk-atlas-img">{atlasUrl && <img src={atlasUrl} alt="Texture atlas with four building facades: sandstone, glass, brick and concrete" width={160} height={160} />}</div>
    <ul>{TILES.map(t => <li key={t.name}><i style={{ background: t.base }} />{t.name}</li>)}</ul>
    <p>8 buildings · 1 texture</p>
   </aside>
  </div>
  <div className="sk-foot">
   <div className="sk-switches">
    <Toggle on={atlas} set={setAtlas} label="One atlas" />
    <Toggle on={wire} set={setWire} label="Wireframe" />
   </div>
   <p className="sk-live"><b>{stats ? stats.calls : '–'}</b> draw calls · <b>{atlas ? 1 : 4}</b> {atlas ? 'texture' : 'textures'}</p>
   <button type="button" className="sk-ghost" onClick={() => goDive('atlas')}>Deep dive <ArrowUpRight size={15} /></button>
  </div>
 </>;
}

function PerfBody({ goDive }: { goDive: (d: string) => void }) {
 const measuring = useContext(Measuring);
 const [atlas, setAtlas] = useState(false);
 const [batch, setBatch] = useState(false);
 const [lod, setLod] = useState(false);
 const [stats, setStats] = useState<LabStats | null>(null);
 const note = !atlas && !batch && !lod ? 'Nothing optimised: every building is its own draw call.'
  : batch && !atlas ? 'Batching can only merge objects that share a material, so 4 textures still means 4+ calls. Turn on the atlas.'
  : atlas && !batch ? 'One material now, but each building is still sent separately. Turn on batching.'
  : lod && !(atlas && batch) ? 'LOD cuts triangles far away. Combine it with atlas and batching.'
  : atlas && batch && lod ? 'All three on: 2 draw calls (near + far) and far fewer triangles.'
  : 'Atlas and batching: the whole city in one draw call. Add LOD to cut triangles.';
 return <>
  <div className="sk-stage sk-stage-perf">
   {measuring ? <div className="lab-canvas" /> : <CityLab mode="perf" opts={{ atlas, batch, lod, wire: false }} onStats={setStats} />}
   <div className="sk-hud" aria-live="polite">
    <div><small>Draw calls</small><b>{stats ? fmt(stats.calls) : '–'}</b></div>
    <div><small>Triangles</small><b>{stats ? fmt(stats.tris) : '–'}</b></div>
    <div><small>Textures</small><b>{atlas ? 1 : 4}</b></div>
   </div>
  </div>
  <div className="sk-foot sk-foot-perf">
   <div className="sk-switches">
    <Toggle on={atlas} set={setAtlas} label="Texture atlas" />
    <Toggle on={batch} set={setBatch} label="Batching" />
    <Toggle on={lod} set={setLod} label="LOD" />
   </div>
   <p>{note} <button type="button" className="sk-link" onClick={() => goDive('city')}>Deep dive ↗</button></p>
  </div>
 </>;
}

function ToolsBody() {
 const [tab, setTab] = useState(unityTools[0].id);
 const tool = unityTools.find(t => t.id === tab)!;
 return <>
  <div className="sk-stage">
   <div className="ue">
    <div className="ue-bar"><span className="ue-dots"><i /><i /><i /></span><span><Wrench size={13} /> Unity Editor · My tools</span></div>
    <div className="ue-tabs" role="tablist">
     {unityTools.map(t => <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'is-active' : ''} onClick={() => setTab(t.id)}>{t.name}</button>)}
    </div>
    <div className="ue-screen" role="tabpanel"><Media key={tool.id} clip={tool.video} title={tool.name} /></div>
   </div>
  </div>
  <div className="sk-foot"><p><b>{tool.name}:</b> {tool.summary}</p></div>
 </>;
}

function XrBody() {
 const [i, setI] = useState(0);
 const c = xrClips[i];
 return <>
  <div className="sk-stage sk-stage-xr">
   <div className="sk-phone"><Media key={c.youtube} clip={{ youtube: c.youtube }} title={c.title} /></div>
   <div className="sk-xr-pick">
    <span className="sk-kicker">Pick a project</span>
    {xrClips.map((x, n) => <button key={x.youtube} type="button" aria-pressed={i === n} className={'sk-tile sk-tile-row' + (i === n ? ' is-active' : '')} onClick={() => setI(n)}><b>{x.title}</b></button>)}
   </div>
  </div>
  <div className="sk-foot"><p>Built with 8th Wall · runs in the phone browser, no app to install</p></div>
 </>;
}

/** a tool's logo, or a coloured monogram until a logo file is added */
function StackMark({ t }: { t: StackItem }) {
 if (t.logo) return <img src={asset(`/images/logos/${t.logo}.webp`)} alt="" width={56} height={56} loading="lazy" decoding="async" />;
 return <span className="sk-mono" style={{ color: t.fg }}>{t.mono}</span>;
}

/** a local clip plays muted on loop; otherwise a muted, looping YouTube embed */
function Media({ clip, fallback, title }: { clip: Clip; fallback?: string; title: string }) {
 if (useContext(Measuring)) return <div className="clip" />;
 if (clip?.src) return <ClipView clip={clip} title={title} />;
 const yt = clip?.youtube ?? fallback;
 if (!yt) return <ClipView clip={null} title={title} />;
 return <div className="clip"><iframe src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&mute=1&loop=1&playlist=${yt}&controls=1&modestbranding=1&rel=0&playsinline=1`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>;
}

/** your skyline image if /images/skyline.webp exists, else a simple drawn one */
function Skyline() {
 const [missing, setMissing] = useState(false);
 const img = useRef<HTMLImageElement>(null);
 useEffect(() => { const el = img.current; if (el && el.complete && el.naturalWidth === 0) setMissing(true); }, []);
 if (!missing) return <img ref={img} className="sk-skyline" src={asset('/images/skyline.webp')} alt="" aria-hidden="true" onError={() => setMissing(true)} />;
 return <svg className="sk-skyline" viewBox="0 0 760 170" aria-hidden="true" preserveAspectRatio="xMaxYMax meet">
  <g fill="currentColor">
   {/* palms */}
   <path d="M120 160c2-30 4-52 10-72l4 1c-5 20-7 42-8 71z" /><path d="M132 88c-14-14-34-14-46-6 14-2 28 2 38 10-16-4-32 2-40 12 14-6 30-6 42 0z" /><path d="M132 88c12-16 32-18 46-10-14 0-28 4-38 12 16-2 32 4 38 16-12-8-28-10-42-6z" />
   <path d="M672 160c1-34 3-58 9-80l4 1c-5 22-7 46-7 79z" /><path d="M682 80c-14-14-34-14-46-6 14-2 28 2 38 10-16-4-32 2-40 12 14-6 30-6 42 0z" /><path d="M682 80c12-16 32-18 46-10-14 0-28 4-38 12 16-2 32 4 38 16-12-8-28-10-42-6z" />
   {/* low buildings */}
   <rect x="40" y="128" width="70" height="32" /><rect x="160" y="112" width="44" height="48" /><rect x="210" y="122" width="40" height="38" />
   <rect x="430" y="118" width="54" height="42" /><rect x="490" y="104" width="40" height="56" /><rect x="580" y="96" width="56" height="64" /><rect x="700" y="120" width="52" height="40" />
   {/* domed monument with minarets */}
   <rect x="262" y="58" width="8" height="102" /><path d="M266 40l5 18h-10z" />
   <rect x="400" y="58" width="8" height="102" /><path d="M404 40l5 18h-10z" />
   <rect x="284" y="104" width="104" height="56" /><path d="M300 104c0-34 18-52 36-58 18 6 36 24 36 58z" /><rect x="333" y="30" width="6" height="18" />
   {/* water tower */}
   <rect x="536" y="60" width="38" height="30" rx="4" /><path d="M540 90l-6 70h6l4-70zm30 0 6 70h-6l-4-70z" />
   {/* birds */}
   <path d="M600 30q8-6 14 0q6-6 14 0q-7-2-14 4q-7-6-14-4z" /><path d="M640 52q6-5 11 0q5-5 11 0q-6-2-11 3q-5-5-11-3z" />
   <rect x="0" y="156" width="760" height="14" />
  </g>
 </svg>;
}
