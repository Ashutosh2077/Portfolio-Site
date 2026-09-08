"use client";
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Flag, Gamepad2, GraduationCap, Code2, Mountain, Globe2, Joystick, Martini, Scan, Glasses, Sparkles } from 'lucide-react';
const playlist = 'https://www.youtube.com/playlist?list=PLLY9yrVQ6BGI6hRnuLCrN-zt2yWUlgakR';
const chapters = [
 { id:'origin', label:'The beginning', era:'2019 — 2023', title:'Every world starts\nwith a spark.', subtitle:'Engineering the foundation', text:'My journey starts at NIET, Greater Noida, studying Electronics & Communication Engineering. Learning how systems work became the foundation for imagining what I could build with them.', place:'B.Tech ECE · NIET Greater Noida', tags:['Engineering','Curiosity','Problem solving'], icon:GraduationCap, word:'BEGIN', color:'#66d9ff', kind:'ORIGIN STORY' },
 { id:'engineering', label:'First checkpoint', era:'FEB — AUG 2023', title:'From learning\nto building.', subtitle:'Software Engineer Intern', text:'At Capgemini Engineering, I stepped into software engineering. Go, Docker, CI/CD and Linux gave me a new set of tools—and a closer look at how software comes together.', place:'Capgemini Engineering', tags:['Go','Docker','CI/CD','Linux','Vim'], icon:Code2, word:'BUILD', color:'#aaa1ff', kind:'CAREER CHECKPOINT' },
 { id:'unity', label:'A new direction', era:'JAN 2024 — PRESENT', title:'The world became\nmy playground.', subtitle:'Unity Game Developer', text:'At VMS Techs, I build casual, mobile and PC games, alongside AR and VR experiences. Programming meets imagination through gameplay, real-world interactions and immersive environments.', place:'VMS Techs', tags:['Unity','C#','REST APIs','8th Wall','AR / VR'], icon:Gamepad2, word:'PLAY', color:'#ff92cc', kind:'CAREER CHECKPOINT' },
 { id:'chains', label:'Chase the sky', era:'PROJECT 01 / 06', title:'From Chains\nto the Skies', subtitle:'What if the struggle was the fun?', text:'A 2D climbing adventure inspired by Getting Over It and Only Up. Physics-based movement challenges players to find their way through uniquely designed levels, wrapped in a stylized art direction.', place:'2D physics adventure', tags:['Unity','C#','GitHub','Photopea','SDK integration'], icon:Mountain, word:'CLIMB', color:'#66d9ff', kind:'PROJECT DISCOVERED' },
 { id:'laila', label:'Build a world', era:'PROJECT 02 / 06', title:'Laila Majnu', subtitle:'An open world with an Indian heart.', text:'GTA-inspired freedom meets Bollywood-style storytelling. Lively NPCs, custom vehicles and landmarks such as the Taj Mahal bring a culturally rich, interactive environment to life.', place:'3D open-world game', tags:['Unity','C#','Blender','JSON'], icon:Globe2, word:'ROAM', color:'#ffba72', kind:'PROJECT DISCOVERED' },
 { id:'arcade', label:'Find the loop', era:'PROJECT 03 / 06', title:'Arcade Sim', subtitle:'One machine. A whole lot of possibility.', text:'A hypercasual arcade management simulator built around machine placement, resource management, customer AI and strategic expansion. Each decision becomes part of a growing tycoon experience.', place:'Arcade management simulator', tags:['Unity','AdMob','Blender','Customer AI'], icon:Joystick, word:'GROW', color:'#b99aff', kind:'PROJECT DISCOVERED' },
 { id:'cocktails', label:'Beyond the screen', era:'PROJECT 04 / 06', title:'Summer of\nCocktails', subtitle:'A menu becomes an experience.', text:'An interactive AR menu for multiple liquor brands. Guests can explore cocktails, recipes and preparation steps in an immersive format that brings a new dimension to the event experience.', place:'Augmented reality menu', tags:['8th Wall','Unity','JavaScript'], icon:Martini, word:'BLEND', color:'#ff92cc', kind:'PROJECT DISCOVERED' },
 { id:'stag', label:'Reality, remixed', era:'PROJECT 05 / 06', title:'Royal Stag', subtitle:'Let the real world into the story.', text:'An interactive augmented reality world map blending 3D assets with real-world environments. Chroma key, models and animations turn exploration into a dynamic visual experience.', place:'Augmented reality experience', tags:['8th Wall','Unity','Blender','Chroma key'], icon:Scan, word:'MERGE', color:'#6ce6c3', kind:'PROJECT DISCOVERED' },
 { id:'glow', label:'Step inside', era:'PROJECT 06 / 06', title:'Open Glow', subtitle:'The player is now inside the adventure.', text:'A VR thrill adventure with realistic visuals and immersive gameplay. Players navigate adrenaline-filled scenarios designed for Oculus devices, moving from watching a world to experiencing it.', place:'Virtual reality adventure', tags:['Unity','Oculus SDK','Blender'], icon:Glasses, word:'ENTER', color:'#aaa1ff', kind:'PROJECT DISCOVERED' },
];
export default function Home(){
 const root=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(-1);
 const [progress,setProgress]=useState(0);
 useEffect(()=>{
  const scope=root.current;
  if(!scope)return;
  const scenes=Array.from(scope.querySelectorAll<HTMLElement>('[data-scene]'));
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  const update=()=>{
   frame=0;
   const h=window.innerHeight;
   const max=document.documentElement.scrollHeight-h;
   setProgress(max>0?Math.min(100,Math.max(0,window.scrollY/max*100)):0);
   let current=-1;
   scenes.forEach((scene,i)=>{
    const r=scene.getBoundingClientRect();
    if(r.top<h*.55)current=i;
    const entry=Math.max(0,Math.min(1,(h*.92-r.top)/(h*.6)));
    scene.style.setProperty('--entry',String(reduce.matches?1:entry));
   });
   setActive(current);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  update();
  scope.classList.add('motion-ready');
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  reduce.addEventListener('change',schedule);
  return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);reduce.removeEventListener('change',schedule);cancelAnimationFrame(frame)};
 },[]);
 const reached=Math.max(0,Math.min(6,active-2));
 return <div ref={root} className="journey">
 <a href="#origin" className="skip">Skip introduction</a>
 <header className="hud"><a href="#start" className="brand"><Gamepad2 size={22}/> AS<span> / PLAYER ONE</span></a><div className="hud-progress"><span>STORY PROGRESS <b>{Math.round(progress)}%</b></span><div className="progress-track"><div style={{width:progress+'%'}}/></div></div><a href="#contact" className="contact-short">Next quest <ArrowUpRight size={16}/></a></header>
 <aside className="chapter-map" aria-label="Journey checkpoints"><a href="#start" aria-label="Introduction" className={active<0?'current':''}><span className="map-dot"/><span className="map-label">START</span></a>{chapters.map((c,i)=><a key={c.id} href={'#'+c.id} aria-label={c.label} aria-current={active===i?'step':undefined} className={active===i?'current':active>i?'visited':''}><span className="map-dot"/><span className="map-label">{c.label}</span></a>)}<a href="#contact" aria-label="Contact"><Flag size={13}/></a></aside>
 <main>
 <section id="start" className="start-screen"><div className="orbit orbit-one" aria-hidden="true"/><div className="orbit orbit-two" aria-hidden="true"/><div className="start-copy"><div className="overline"><span className="live-dot"/> AN INTERACTIVE DEVELOPER STORY</div><p className="intro-name">ASHUTOSH SINGH</p><h1>Life is a journey.<br/>I make it <em>playable.</em></h1><p className="intro-description">Engineer. Game developer. World builder.<br/>Follow the checkpoints that shaped me—and discover the worlds I’ve built along the way.</p><a className="start-button" href="#origin">Begin the journey <ArrowDown size={20}/></a><span className="start-hint">SCROLL TO MOVE FORWARD</span></div><div className="start-footer"><span>01 PLAYER · 06 PROJECTS · ENDLESS CURIOSITY</span><span>UNITY / AR / VR</span></div></section>
 <div className="timeline-world"><div className="world-line" aria-hidden="true"/>{chapters.map((c,i)=>{const Icon=c.icon;return <section id={c.id} data-scene key={c.id} className={'scene '+(i%2===0?'from-left':'from-right')} style={{'--scene-color':c.color} as React.CSSProperties}>
 <div className="checkpoint" aria-hidden="true"><span>{String(i+1).padStart(2,'0')}</span></div>
 <div className="scene-art" aria-hidden="true"><span className="ghost-word">{c.word}</span><div className="icon-orbit"><Icon strokeWidth={1} size={85}/></div><span className="art-caption">{c.era}</span></div>
 <article className="scene-card"><div className="card-meta"><span>{c.kind}</span><span>{String(i+1).padStart(2,'0')} / 09</span></div><span className="era">{c.era}</span><h2>{c.title}</h2><h3>{c.subtitle}</h3><p>{c.text}</p><div className="place"><Icon size={16}/>{c.place}</div><div className="tags">{c.tags.map(t=><span key={t}>{t}</span>)}</div>{i>=3&&<a className="project-link" href="#showreel">Explore the project playlist <ArrowDown size={16}/></a>}<div className="checkpoint-status"><span>✦</span> {c.kind==='PROJECT DISCOVERED'?'WORLD EXPLORED':'CHECKPOINT REACHED'}</div></article>
 </section>})}</div>
 <section id="toolkit" className="inventory"><div className="overline">YOUR DEVELOPER’S INVENTORY</div><h2>Skills collected.<br/><em>Possibilities unlocked.</em></h2><div className="inventory-grid">{[{name:'Code & web',items:'C# · C++ · JavaScript · Three.js',icon:Code2},{name:'Engines & immersion',items:'Unity · 8th Wall · AR & VR · MyWebAR',icon:Gamepad2},{name:'Art & design',items:'Blender · Photoshop',icon:Sparkles},{name:'Workflow & data',items:'GitHub · Vim · MySQL · JSON',icon:LayersIcon}].map((s,i)=><div className="inventory-item" key={s.name}><s.icon size={24}/><span className="overline">SLOT 0{i+1}</span><h3>{s.name}</h3><p>{s.items}</p></div>)}</div></section>
 <section id="showreel" className="showreel"><div className="overline">BONUS LEVEL / THE WORLDS IN MOTION</div><h2>Now watch them <em>come alive.</em></h2><p>Explore the gameplay and immersive experiences in my project playlist.</p><div className="video-frame"><div className="video-bar"><span><span className="live-dot"/> PROJECT ARCHIVE</span><a href={playlist} target="_blank" rel="noreferrer">Open YouTube ↗</a></div><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/videoseries?list=PLLY9yrVQ6BGI6hRnuLCrN-zt2yWUlgakR" title="Ashutosh Singh project playlist" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div><p className="fallback">If the player doesn’t load, <a href={playlist} target="_blank" rel="noreferrer">watch the playlist on YouTube ↗</a></p></section>
 <section id="contact" className="final-level"><Flag size={38}/><div className="overline">STORY STILL IN PROGRESS</div><h2>The next chapter?<br/><em>Let’s build it together.</em></h2><p>A new game. An immersive experience. A team with a big idea.<br/>I’m ready to hear what you have in mind.</p><a className="start-button" href="mailto:dineshaushutosh@gmail.com">Start our next quest <ArrowUpRight size={20}/></a><div className="contact-links"><a href="mailto:dineshaushutosh@gmail.com">dineshaushutosh@gmail.com</a><a href="tel:+919599471440">+91 9599471440</a></div><a href="#start" className="replay">↺ Replay the journey</a></section>
 </main><footer><span>ASHUTOSH SINGH</span><span>Turning imaginative ideas into immersive gaming experiences.</span></footer><div className="quest-status" aria-hidden="true"><span className="live-dot"/>{active<0?'YOUR JOURNEY AWAITS':chapters[Math.min(active,8)].label.toUpperCase()}<span className="quest-count">{reached}/6 WORLDS</span></div>
 </div>
}
function LayersIcon({size=24}:{size?:number}){return <Code2 size={size}/>}
