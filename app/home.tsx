"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Gamepad2, Layers, Mail, MousePointerClick, Play, Rocket, Send, Target, UserRound, Volume2, VolumeX, X } from 'lucide-react';
import { blip, cascade, loadMuted, pop, setMuted, unlock } from './sfx';
import HoverVideo from './hover-video';
import Sticker, { type StickerName } from './sticker';
import Loader from './loader';
import { archive, heroStats, links, memories, milestones, projects, roles, skillGroups, toolbox, type Project } from './content';
import { asset } from './asset';

const NAV = [
 { id: 'top', label: 'Home' },
 { id: 'about', label: 'About' },
 { id: 'projects', label: 'Projects' },
 { id: 'experience', label: 'Experience' },
];
const FILTERS = [
 { id: 'all', label: 'All' },
 { id: 'games', label: 'Games' },
 { id: 'xr', label: 'AR & VR' },
 { id: 'office', label: 'Studio work' },
 { id: 'personal', label: 'Personal' },
] as const;
type FilterId = typeof FILTERS[number]['id'];
const kindLabel = (k: Project['kind']) => k === 'office' ? 'Studio project' : k === 'personal' ? 'Personal project' : 'Project';

const STAT_ICON: Record<string, { sticker: StickerName; icon: React.ReactNode }> = {
 pad: { sticker: 'controller', icon: <Gamepad2 size={26} /> },
 rocket: { sticker: 'rocket', icon: <Rocket size={26} /> },
 layers: { sticker: 'layers', icon: <Layers size={26} /> },
 target: { sticker: 'target', icon: <Target size={26} /> },
};

// sticker shown on project cards until real screenshots are added
const PLACEHOLDER: Record<string, StickerName> = { quiz: 'mystery-box', vr: 'rocket', 'ar-map': 'target', 'ar-menu': 'star-blue' };

export default function Home() {
 const [section, setSection] = useState('top');
 const [peek, setPeek] = useState(false);
 const [filter, setFilter] = useState<FilterId>('all');
 const [skill, setSkill] = useState('unity');
 const [project, setProject] = useState<Project | null>(null);
 const [copied, setCopied] = useState(false);
 const [hasPhoto, setHasPhoto] = useState(true);
 const dialog = useRef<HTMLDialogElement>(null);
 const photo = useRef<HTMLImageElement>(null);
 const [mute, setMute] = useState(false);

 // hyper-casual sound effects: blip on hover, pop on click (audio unlocks on first click/tap/key)
 useEffect(() => {
  setMute(loadMuted());
  const SEL = 'a, button, .polaroid, .fact, .archive-item';
  const onDown = () => unlock();
  const onOver = (e: PointerEvent) => {
   if (e.pointerType !== 'mouse') return;
   const el = (e.target as Element).closest(SEL);
   if (!el || (e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) return;
   blip();
  };
  const onClick = (e: MouseEvent) => { if ((e.target as Element).closest('a, button')) pop(); };
  window.addEventListener('pointerdown', onDown, { passive: true });
  window.addEventListener('keydown', onDown);
  document.addEventListener('pointerover', onOver, { passive: true });
  document.addEventListener('click', onClick);
  return () => { window.removeEventListener('pointerdown', onDown); window.removeEventListener('keydown', onDown); document.removeEventListener('pointerover', onOver); document.removeEventListener('click', onClick); };
 }, []);
 const wasPeek = useRef(false);
 useEffect(() => { if (peek && !wasPeek.current) cascade(4); wasPeek.current = peek; }, [peek]);
 const toggleMute = () => { const m = !mute; setMute(m); setMuted(m); if (!m) { unlock(); } };

 // active nav item + gentle pop-in for blocks as they scroll into view
 useEffect(() => {
  const ids = [...NAV.map(n => n.id), 'contact'];
  const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  const pops = Array.from(document.querySelectorAll<HTMLElement>('[data-pop]'));
  document.documentElement.classList.add('js');
  let frame = 0;
  const update = () => {
   frame = 0;
   const h = window.innerHeight;
   let cur = 'top';
   els.forEach(el => { if (el.getBoundingClientRect().top < h * 0.35) cur = el.id; });
   setSection(cur);
   pops.forEach(el => { if (el.getBoundingClientRect().top < h * 0.92) el.classList.add('in'); });
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); };
 }, []);

 useEffect(() => { const el = photo.current; if (el && el.complete && el.naturalWidth === 0) setHasPhoto(false); }, []);

 useEffect(() => {
  const d = dialog.current;
  if (!d) return;
  if (project && !d.open) d.showModal();
  if (!project && d.open) d.close();
 }, [project]);

 const featured = projects.find(p => p.featured)!;
 const matches = (p: Project) => filter === 'all' || p.kind === filter || p.groups.includes(filter as 'games' | 'xr');
 const shown = useMemo(() => projects.filter(p => !p.featured && (filter === 'all' || p.kind === filter || p.groups.includes(filter as 'games' | 'xr'))), [filter]);
 const activeSkill = skillGroups.flatMap(g => g.skills).find(s => s.id === skill)!;

 const copyEmail = async () => {
  try { await navigator.clipboard.writeText(links.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }
  catch { const el = document.getElementById('email-text'); if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = window.getSelection(); s?.removeAllRanges(); s?.addRange(r); } }
 };

 return <div className="site">
  <Loader />
  <a href="#about" className="skip">Skip to content</a>

  <header className="topbar">
   <a href="#top" className="logo" aria-label="Ashutosh Singh, back to top">
    <Sticker name="controller" className="logo-pad" fallback={<Gamepad2 size={34} />} />
    <span><b>Ashutosh Singh</b><small>Game Developer</small></span>
   </a>
   <nav className="nav" aria-label="Sections">
    {NAV.map(n => <a key={n.id} href={'#' + n.id} className={section === n.id ? 'is-active' : ''} aria-current={section === n.id ? 'location' : undefined}>{n.label}</a>)}
   </nav>
   <button type="button" className="icon-btn sound-btn" onClick={toggleMute} aria-pressed={!mute} aria-label={mute ? 'Turn sound effects on' : 'Turn sound effects off'} title={mute ? 'Sound off' : 'Sound on'}>{mute ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
   <a href="#contact" className="btn btn-blue btn-sm contact-btn"><Send size={17} /> Contact</a>
  </header>

  <main>
   {/* HERO */}
   <section id="top" className={'hero' + (peek ? ' peek' : '')}>
    <Sticker name="star" className="deco d-star1" />
    <Sticker name="star-blue" className="deco d-star2" />
    <Sticker name="hearts" className="deco d-hearts" />
    <Sticker name="pixel-pad" className="deco d-pixel" />
    <span className="ground gr-handheld" aria-hidden="true" />
    <Sticker name="handheld" className="deco d-handheld" />
    <span className="ground gr-box" aria-hidden="true" />
    <Sticker name="mystery-box" className="deco d-box" />
    <Sticker name="coin" className="deco d-coin" />

    <div className="hero-title">
     <h1 className="hero-name"><span className="sr-only">Ashutosh Singh</span><img src={asset('/images/hero-name.webp')} alt="" aria-hidden="true" className="hero-name-img" width={1468} height={763} fetchPriority="high" decoding="async" /><Sticker name="crown" className="name-crown" /></h1>
     <p className="tagline"><span>I make</span> <span className="u">games.</span></p>
    </div>

    <div className="me"
     onMouseEnter={() => setPeek(true)} onMouseLeave={() => setPeek(false)}
     onFocus={() => setPeek(true)} onBlur={() => setPeek(false)}>
     <button type="button" className="me-hit" aria-expanded={peek} aria-controls="hero-stats" onClick={() => setPeek(p => !p)}>
      <span className="sr-only">Show quick facts about me</span>
      {hasPhoto
       ? <img ref={photo} src={asset('/images/me-cutout.webp')} alt="Ashutosh Singh" className="me-photo" width={338} height={990} fetchPriority="high" decoding="async" onError={() => setHasPhoto(false)} />
       : <span className="me-placeholder"><UserRound size={64} /><b>Your photo goes here</b><small>public/images/me-cutout.webp</small></span>}
     </button>
     <span className="me-shadow" aria-hidden="true" />
     <span className="hover-hint" aria-hidden="true"><MousePointerClick size={18} strokeWidth={2.6} /> Hover me!</span>
     <ul id="hero-stats" className="stats">
      {heroStats.map((s, i) => <li key={s.id} className={'stat stat-' + i + ' tone-' + s.tone}>
       <span className="stat-icon"><Sticker name={STAT_ICON[s.icon].sticker} fallback={STAT_ICON[s.icon].icon} /></span>
       <span><b>{s.big}</b><small>{s.small}</small></span>
      </li>)}
     </ul>
    </div>

    <div className="hero-ctas">
     <a className="game-btn tone-blue tilt-left" href="#projects">
      <Sparks />
      <span className="gb-face">
       <svg className="gb-icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M8 5.5c0-1.6 1.7-2.5 3-1.7l15.2 9.9c1.2.8 1.2 2.6 0 3.4L11 26.9c-1.3.8-3-.1-3-1.7z" /></svg>
       Play My Games
      </span>
     </a>
     <a className="game-btn tone-mint tilt-right" href="#about">
      <Sparks />
      <span className="gb-face">
       <svg className="gb-icon" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="10" r="6.2" /><path d="M4.5 28c0-6.4 5.1-10.6 11.5-10.6S27.5 21.6 27.5 28z" /></svg>
       About Me
      </span>
     </a>
    </div>
   </section>

   {/* ABOUT */}
   <section id="about" className="about">
    <div className="wrap">
     <div className="about-grid">
      <div className="card about-card" data-pop>
       <Sticker name="laptop" className="card-sticker" />
       <p className="label">About me</p>
       <h2>Hi, I’m Ashutosh. <span className="hl">I make games.</span></h2>
       <p>I’m a Unity Game Developer at VMS Techs (BuzyBug). I came to games through engineering, and I love problems that are half logic and half feeling: a jump that has to feel right, an NPC that has to seem alive, an open world that has to run smoothly on a phone.</p>
       <p>I’ve built hypercasual tycoon games, AR experiences for brands and VR adventures. In my own time I made Laila Majnu: Streets of Crime, an Indian open-world game, and published it on Google Play.</p>
      </div>
      <div className="facts" data-pop>
       <div className="fact tone-coral"><b>B.Tech ECE</b><small>NIET, Greater Noida</small></div>
       <div className="fact tone-blue"><b>2021</b><small>First game, in one week</small></div>
       <div className="fact tone-mint"><b>3 released</b><small>Games on itch.io & Play Store</small></div>
       <div className="fact tone-grape"><b>Open to work</b><small>Game development roles</small></div>
      </div>
     </div>

     <div className="levels" data-pop>
      <h3><Sticker name="trophy" className="h-sticker" /> Level ups</h3>
      <ol>{milestones.map(m => <li key={m.title}><span className="lv-year">{m.year}</span><b>{m.title}</b><small>{m.note}</small></li>)}</ol>
     </div>

     <div className="skills" data-pop>
      <h3><Sticker name="layers" className="h-sticker" /> Skills <small>Pick one to see where I used it</small></h3>
      <div className="skills-grid">
       <div className="skill-chips">
        {skillGroups.flatMap(g => g.skills).map(s => <button key={s.id} type="button" aria-pressed={skill === s.id} className={'chip-btn' + (skill === s.id ? ' is-active' : '')} onClick={() => setSkill(s.id)}>{s.name}</button>)}
       </div>
       <div className="card skill-detail" aria-live="polite" key={activeSkill.id}>
        <b>{activeSkill.name}</b>
        <p>{activeSkill.note}</p>
        <ul>{activeSkill.projects.map(id => { const p = projects.find(x => x.id === id)!; return <li key={id}><button type="button" onClick={() => setProject(p)}>{p.title} <ArrowUpRight size={15} /></button></li>; })}
         {activeSkill.id === 'devops' && <li className="muted">Capgemini Engineering, 2023</li>}
        </ul>
       </div>
      </div>
      <ul className="toolbox">{toolbox.map(t => <li key={t}>{t}</li>)}</ul>
     </div>

     <div className="memories" data-pop>
      {memories.map((m, i) => <figure key={m.src} className="polaroid" style={{ '--tilt': `${[-4, 3, -2, 4, -3][i]}deg` } as React.CSSProperties}>
       <img src={m.src} alt={m.caption} loading="lazy" />
       <figcaption><b>{m.caption}</b>{m.note}</figcaption>
      </figure>)}
     </div>
    </div>
   </section>

   {/* PROJECTS */}
   <section id="projects" className="projects">
    <div className="wrap">
     <div className="sec-head" data-pop>
      <Sticker name="handheld" className="sec-sticker" />
      <div><p className="label">Projects</p><h2>Games I’ve <span className="hl">built.</span></h2></div>
     </div>
     <div className="filters" role="group" aria-label="Filter projects">
      {FILTERS.map(f => <button key={f.id} type="button" aria-pressed={filter === f.id} className={'chip-btn' + (filter === f.id ? ' is-active' : '')} onClick={() => setFilter(f.id)}>{f.label}</button>)}
     </div>

     {matches(featured) && <button type="button" className="card featured" onClick={() => setProject(featured)}>
      <span className="featured-media"><img src={featured.image} alt="" loading="lazy" decoding="async" width={960} height={960} /><span className="play-pill"><Play size={18} /> Watch gameplay</span></span>
      <span className="featured-body">
       <span className="badge">Featured · {featured.status}</span>
       <span className="f-title">{featured.title}</span>
       <span className="f-text">{featured.short}</span>
       <span className="tags">{featured.tags.map(t => <span key={t}>{t}</span>)}</span>
       <span className="more-link">Open project <ArrowUpRight size={16} /></span>
      </span>
     </button>}

     <div className="grid">
      {shown.map(p => <button key={p.id} type="button" className="card pcard" onClick={() => setProject(p)}>
       <span className="pcard-media">
        {p.image ? <img src={p.image} alt="" loading="lazy" className={p.id === 'arcade' ? 'contain' : ''} />
         : p.video ? <img src={`https://i.ytimg.com/vi/${p.video}/hqdefault.jpg`} alt="" loading="lazy" />
         : <Sticker name={PLACEHOLDER[p.id] || 'mystery-box'} className="pcard-sticker" />}
        {p.video && <span className="play-dot"><Play size={16} /></span>}
       </span>
       <span className="pcard-body">
        <span className="kind">{kindLabel(p.kind)}</span>
        <span className="p-title">{p.title}</span>
        <span className="p-text">{p.short}</span>
       </span>
      </button>)}
     </div>

     <div className="archive">
      <div className="archive-head"><h3>More from the video archive</h3><a className="link" href={links.playlist} target="_blank" rel="noreferrer">Full playlist <ArrowUpRight size={15} /></a></div>
      <p className="muted">Hover a preview to play it. Tap on phones.</p>
      <div className="archive-row">{archive.map(v => <HoverVideo key={v.id} id={v.id} title={v.title} portrait={v.portrait} className={'card archive-item' + (v.portrait ? ' portrait' : '')} />)}</div>
     </div>
    </div>
   </section>

   {/* EXPERIENCE */}
   <section id="experience" className="experience">
    <div className="wrap">
     <div className="sec-head" data-pop>
      <Sticker name="trophy" className="sec-sticker" />
      <div><p className="label">Experience</p><h2>Where I’ve <span className="hl">worked.</span></h2></div>
     </div>
     <div className="roles">
      {roles.map((r, i) => <article key={r.id} className={'card role tone-' + (i ? 'blue' : 'coral')} data-pop>
       <div className="role-top"><span className="when">{r.when}</span><span className="place">{r.place}</span></div>
       <h3>{r.role}</h3>
       <p className="company">{r.company}</p>
       <p>{r.summary}</p>
       <h4>What I do</h4>
       <ul className="ticks">{r.responsibilities.map(x => <li key={x}>{x}</li>)}</ul>
       <h4>Highlights</h4>
       <ul className="ticks stars">{r.achievements.map(x => <li key={x}>{x}</li>)}</ul>
       <div className="tags">{r.tech.map(t => <span key={t}>{t}</span>)}</div>
      </article>)}
     </div>
    </div>
   </section>

   {/* CONTACT */}
   <section id="contact" className="contact">
    <Sticker name="star" className="deco c-star" />
    <Sticker name="coin" className="deco c-coin" />
    <div className="wrap contact-inner" data-pop>
     <Sticker name="paper-plane" className="contact-sticker" />
     <p className="label">Contact</p>
     <h2>Let’s make something <span className="hl">fun.</span></h2>
     <p className="lead">I’m open to new opportunities in game development. If your team is building something ambitious, I’d love to hear about it.</p>
     <div className="email-row">
      <a className="btn btn-blue" href={'mailto:' + links.email}><Mail size={20} /> Email me</a>
      <span id="email-text" className="email-text">{links.email}</span>
      <button type="button" className="icon-btn" onClick={copyEmail} aria-label="Copy email address">{copied ? <Check size={18} /> : <Copy size={18} />}</button>
      <output className="copied">{copied ? 'Copied!' : ''}</output>
     </div>
     <ul className="socials">
      <Social href={links.linkedin} label="LinkedIn" tone="blue" />
      <Social href={links.github} label="GitHub" tone="ink" />
      <Social href={links.instagram} label="Instagram" tone="coral" />
      <Social href={links.youtube} label="YouTube" tone="coral" />
      <Social href={links.resume} label="Resume" tone="mint" />
      <Social href={links.lailaPlayStore} label="Play Store" tone="grape" />
     </ul>
    </div>
   </section>
  </main>

  <footer className="footer"><span>© Ashutosh Singh · Game Developer</span><a href="#top">Back to top ↑</a></footer>

  <dialog ref={dialog} className="dlg" onClose={() => setProject(null)} onClick={e => { if (e.target === dialog.current) setProject(null); }} aria-labelledby="dlg-title">
   {project && <div className="dlg-inner">
    <button type="button" className="icon-btn dlg-close" onClick={() => setProject(null)} aria-label="Close"><X size={20} /></button>
    <div className="dlg-media">
     {project.video ? <iframe src={`https://www.youtube-nocookie.com/embed/${project.video}?autoplay=1&mute=1&rel=0&playsinline=1`} title={project.title + ' video'} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      : project.image ? <img src={project.image} alt={project.title} className={project.id === 'arcade' ? 'contain' : ''} />
      : <Sticker name="mystery-box" className="dlg-sticker" />}
    </div>
    <div className="dlg-body">
     <span className="kind">{kindLabel(project.kind)} · {project.type}</span>
     <h3 id="dlg-title">{project.title}</h3>
     {project.status && <span className="badge">{project.status}</span>}
     {project.body.map(b => <p key={b}>{b}</p>)}
     <div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>
     <div className="dlg-links">
      {project.links?.map(l => <a key={l.href} className="btn btn-blue btn-sm" href={l.href} target="_blank" rel="noreferrer">{l.label} <ArrowUpRight size={16} /></a>)}
      {project.id === 'laila' && (links.lailaPlayStore ? <a className="btn btn-blue btn-sm" href={links.lailaPlayStore} target="_blank" rel="noreferrer">Get it on Google Play <ArrowUpRight size={16} /></a> : <span className="soon">Play Store link coming soon</span>)}
      {project.video && <a className="btn btn-white btn-sm" href={`https://www.youtube.com/watch?v=${project.video}`} target="_blank" rel="noreferrer">Watch on YouTube <ArrowUpRight size={16} /></a>}
     </div>
    </div>
   </div>}
  </dialog>
 </div>;
}

/** three little "energy" strokes drawn beside a button, like a comic sound effect */
function Sparks() {
 return <svg className="gb-sparks" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 20 L14 23" /><path d="M12 8 L17 16" /><path d="M24 4 L24 13" /></svg>;
}

function Social({ href, label, tone }: { href: string | null; label: string; tone: string }) {
 if (!href) return <li><span className={'social tone-' + tone + ' is-soon'} aria-disabled="true">{label}<small>Soon</small></span></li>;
 return <li><a className={'social tone-' + tone} href={href} target="_blank" rel="noreferrer">{label} <ArrowUpRight size={16} /></a></li>;
}
