"use client";
import GameplayVideo from './gameplay-video';
import HoverVideo from './hover-video';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Flag, Gamepad2, GraduationCap, Code2, Mountain, Globe2, Joystick, Martini, Scan, Glasses, Sparkles, Briefcase, Heart } from 'lucide-react';
const playlist = 'https://www.youtube.com/playlist?list=PLLY9yrVQ6BGI6hRnuLCrN-zt2yWUlgakR';
const showreelVideos = [
 { id:'nvcBKJKIMOs', title:'Laila Majnu: Streets of Crime' },
 { id:'Lx3lPsv2p9g', title:'Cricket Pinball', portrait:true },
 { id:'IlEdBdUURcA', title:'Pinball Island', portrait:true },
 { id:'i8i3NyJuOmg', title:'Greenlam AR', portrait:true },
 { id:'zTZsxcrGTKc', title:'Cleanup Day' },
];

const scenes = [
 { id:'origin', label:'The beginning', era:'2019 — 2023', title:'Got admitted to\nengineering college.', subtitle:'Engineering the foundation', text:'My journey starts at NIET, Greater Noida, studying Electronics & Communication Engineering. Learning how systems work became the foundation for imagining what I could build with them.', place:'B.Tech ECE · NIET Greater Noida', tags:['Engineering','Curiosity','Problem solving'], icon:GraduationCap, color:'#762b3e', kind:'ORIGIN STORY' },
 { id:'first-game', label:'My first game', era:'2021', title:'One laptop.\nOne week.\nMy first game.', subtitle:'The Circle Eater', text:'In 2021, I got my first laptop. Within a week, I made my first game and took part in a game jam. The Circle Eater was my first step from wanting to make games to actually putting one out into the world.', place:'My first game + my first game jam', tags:['Unity','2D','HTML5','Android','Game jam'], icon:Gamepad2, color:'#762b3e', kind:'FIRST RELEASE' },
 { id:'engineering', label:'My first internship', era:'FEB — AUG 2023', title:'My first\ninternship.', subtitle:'Capgemini Engineering — an MNC', text:'A bigger team. A stronger foundation in collaboration, DevOps, Go and Linux.', place:'Software Engineer Intern', tags:['Teamwork','DevOps','Go','Linux'], icon:Code2, color:'#762b3e', kind:'FIRST INTERNSHIP' },
 { id:'unity', label:'A new direction', era:'JAN 2024 — PRESENT', title:'Became a full-time\ngame developer.', subtitle:'Full Time Unity Game Developer', text:'At VMS Techs, I build casual, mobile and PC games, alongside AR and VR experiences. Programming meets imagination through gameplay, real-world interactions and immersive environments.', place:'VMS Techs', tags:['Unity','C#','REST APIs','8th Wall','AR / VR'], icon:Gamepad2, color:'#762b3e', kind:'CAREER CHECKPOINT' },
 { id:'arcade', label:'Find the loop', era:'OFFICE PROJECT 01 / 04', title:'Shipped Arcade Sim,\nan arcade tycoon game.', subtitle:'One machine. A whole lot of possibility.', text:'A hypercasual arcade management simulator built around machine placement, resource management, customer AI and strategic expansion. Each decision becomes part of a growing tycoon experience.', place:'Arcade management simulator · VMS Techs', tags:['Unity','AdMob','Blender','Customer AI'], icon:Joystick, color:'#762b3e', kind:'OFFICE PROJECT', origin:'office' },
 { id:'cocktails', label:'Beyond the screen', era:'OFFICE PROJECT 02 / 04', title:'Built an AR menu\nfor cocktail brands.', subtitle:'A menu becomes an experience.', text:'An interactive AR menu for multiple liquor brands. Guests can explore cocktails, recipes and preparation steps in an immersive format that brings a new dimension to the event experience.', place:'Augmented reality menu · VMS Techs', tags:['8th Wall','Unity','JavaScript'], icon:Martini, color:'#762b3e', kind:'OFFICE PROJECT', origin:'office' },
 { id:'stag', label:'Reality, remixed', era:'OFFICE PROJECT 03 / 04', title:'Built an AR world map\nfor Royal Stag.', subtitle:'Let the real world into the story.', text:'An interactive augmented reality world map blending 3D assets with real-world environments. Chroma key, models and animations turn exploration into a dynamic visual experience.', place:'Augmented reality experience · VMS Techs', tags:['8th Wall','Unity','Blender','Chroma key'], icon:Scan, color:'#762b3e', kind:'OFFICE PROJECT', origin:'office' },
 { id:'glow', label:'Step inside', era:'OFFICE PROJECT 04 / 04', title:'Built Open Glow,\na VR thrill adventure.', subtitle:'The player is now inside the adventure.', text:'A VR thrill adventure with realistic visuals and immersive gameplay. Players navigate adrenaline-filled scenarios designed for Oculus devices, moving from watching a world to experiencing it.', place:'Virtual reality adventure · VMS Techs', tags:['Unity','Oculus SDK','Blender'], icon:Glasses, color:'#762b3e', kind:'OFFICE PROJECT', origin:'office' },
 { id:'chains', label:'Chase the sky', era:'PERSONAL PROJECT 01 / 02', title:'Made a climbing game:\nFrom Chains to the Skies.', subtitle:'What if the struggle was the fun?', text:'A 2D climbing adventure inspired by Getting Over It and Only Up. Physics-based movement challenges players to find their way through uniquely designed levels, wrapped in a stylized art direction.', place:'2D physics adventure · self-initiated', tags:['Unity','C#','GitHub','Photopea','SDK integration'], icon:Mountain, color:'#762b3e', kind:'PERSONAL PROJECT', origin:'personal' },
 { id:'laila', label:'Build a world', era:'PERSONAL PROJECT 02 / 02', title:'Built Laila Majnu,\nan Indian open-world game.', subtitle:'An open world with an Indian heart.', text:'GTA-inspired freedom meets Bollywood-style storytelling. Lively NPCs, custom vehicles and landmarks such as the Taj Mahal bring a culturally rich, interactive environment to life.', place:'3D open-world game · self-initiated', tags:['Unity','C#','Blender','JSON'], icon:Globe2, color:'#762b3e', kind:'PERSONAL PROJECT', origin:'personal' },
];

export default function Home(){
 const root=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(-1);
 const [progress,setProgress]=useState(0);
 useEffect(()=>{
  const scope=root.current;
  if(!scope)return;
  const sceneEls=Array.from(scope.querySelectorAll<HTMLElement>('[data-scene]'));
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  const update=()=>{
   frame=0;
   const h=window.innerHeight;
   const max=document.documentElement.scrollHeight-h;
   setProgress(max>0?Math.min(100,Math.max(0,window.scrollY/max*100)):0);
   let current=-1;
   sceneEls.forEach((scene,i)=>{
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
 const reached=scenes.slice(0,active+1).filter(c=>c.kind==='OFFICE PROJECT'||c.kind==='PERSONAL PROJECT').length;
 return <div ref={root} className="journey">
 <a href="#origin" className="skip">Skip introduction</a>
 <header className="hud"><a href="#start" className="brand"><Gamepad2 size={22}/> AS<span> / A WORK IN PLAY</span></a><div className="hud-progress"><span>READING MY STORY <b>{Math.round(progress)}%</b></span><div className="progress-track"><div style={{width:progress+'%'}}/></div></div><a href="#contact" className="contact-short">Say hello <ArrowUpRight size={16}/></a></header>
 <aside className="chapter-map" aria-label="Journey checkpoints"><a href="#start" aria-label="Introduction" className={active<0?'current':''}><span className="map-dot"/><span className="map-label">START</span></a>{scenes.map((c,i)=><a key={c.id} href={'#'+c.id} aria-label={c.label} aria-current={active===i?'step':undefined} className={active===i?'current':active>i?'visited':''}><span className="map-dot"/><span className="map-label">{c.label}</span></a>)}<a href="#contact" aria-label="Contact"><Flag size={13}/></a></aside>
 <main>

 <section id="start" className="start-screen">
 <div className="cover-heading"><span className="overline">THE PERSONAL JOURNAL OF</span><p className="intro-name">Ashutosh Singh<span className="name-period">.</span></p><div className="cover-rule"><span>GAME DEVELOPER & CURIOUS HUMAN</span><span>VOL. 01 / STILL WRITING</span></div></div>
 <div className="cover-body"><div className="start-copy"><span className="margin-note">It started with a laptop.</span><h1>And then I<br/>made a <em>game.</em></h1><p className="intro-description">A first laptop in 2021. A first game within a week.<br/>This is the story of how a little curiosity became games, open worlds, AR and VR.</p><a className="start-button" href="#origin">Follow the story <ArrowDown size={20}/></a><span className="start-hint">KEEP SCROLLING. THERE’S A LOT TO UNPACK.</span></div>
 <div className="cover-scrap"><figure className="photo-print laptop-memory"><img src="/images/first-laptop.png" alt="My first laptop from 2021, where my game development journey began"/><figcaption>The laptop that started it all / 2021</figcaption></figure><span className="scribble-note">2021 — where it got real.</span><span className="jam-stamp">FIRST LAPTOP<br/><b>↓ 1 WEEK ↓</b><br/>FIRST GAME JAM</span></div></div>
 <div className="start-footer"><span>ENGINEERING → GAMES → IMMERSIVE EXPERIENCES</span><span>SCROLL TO TURN THE PAGE ↓</span></div></section>

 <div className="timeline-world"><div className="world-line" aria-hidden="true"/>{scenes.map((c,i)=>{
  const Icon=c.icon;
  return <section id={c.id} data-scene key={c.id} className={'scene '+(i%2===0?'from-left':'from-right')} style={{'--scene-color':c.color} as React.CSSProperties}>
 <div className="checkpoint" aria-hidden="true"><span>{String(i+1).padStart(2,'0')}</span></div>
 <div className="scene-art">{c.id==='chains'?<figure className="project-memory"><GameplayVideo/><figcaption>From Chains to the Skies / gameplay in motion</figcaption><a href="https://www.youtube.com/watch?v=la1yCiQzJss" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></figure>:c.id==='first-game'?<a className="photo-print first-game-photo" href="https://cubethrone.itch.io/the-circle-eater" target="_blank" rel="noreferrer"><img src="/images/circle-eater.jpg" alt="The Circle Eater game screenshot" loading="lazy"/><span>My first release. Play it on itch.io ↗</span></a>:c.id==='arcade'?<a className="photo-print arcade-photo" href="https://play.google.com/store/apps/details?id=com.VMSTech.Arcade_Simulator&hl=en_IN" target="_blank" rel="noreferrer"><img src="/images/arcade-sim-icon.png" alt="Arcade Sim app icon on Google Play" loading="lazy"/><span>A hypercasual game. Get it on Google Play ↗</span></a>:c.id==='laila'?<figure className="photo-print laila-photo"><img src="/images/LailaMajnuStreetsOfCrime.png" alt="Laila Majnu: Streets of Crime key art" loading="lazy"/><figcaption>Key art from the project</figcaption></figure>:c.id==='origin'?<figure className="photo-print memory-photo origin-photo"><span className="year-stamp">2019</span><img src="/images/niet-college.webp" alt="NIET, Greater Noida campus" loading="lazy"/><figcaption>A place to begin.</figcaption></figure>:c.id==='engineering'?<figure className="photo-print memory-photo capgemini-photo"><span className="year-stamp">2023</span><img src="/images/Capgemini.webp" alt="Capgemini Engineering office" loading="lazy"/><figcaption>Learning by doing.</figcaption></figure>:c.id==='unity'?<figure className="photo-print memory-photo vms-photo"><span className="year-stamp">2024</span><img src="/images/vms-tech-fulltime-office.jpg" alt="VMS Techs office" loading="lazy"/><figcaption>This became my day job.</figcaption></figure>:c.origin==='office'||c.origin==='personal'?<PlaceholderArt icon={Icon} caption={c.origin==='office'?'Case study visuals coming soon':'Screenshots coming soon'}/>:null}</div>
 <article className="scene-card"><div className={'card-meta'+(c.origin?' meta-'+c.origin:'')}><span>{c.origin==='office'?<><Briefcase size={13}/> {c.kind}</>:c.origin==='personal'?<><Heart size={13}/> {c.kind}</>:c.kind}</span><span>{String(i+1).padStart(2,'0')} / {String(scenes.length).padStart(2,'0')}</span></div><span className="era">{c.era}</span><h2>{c.title}</h2><h3>{c.subtitle}</h3><p>{c.text}</p><div className="place"><Icon size={16}/>{c.place}</div><div className="tags">{c.tags.map(t=><span key={t}>{t}</span>)}</div>{(c.kind==='OFFICE PROJECT'||c.kind==='PERSONAL PROJECT')&&c.id!=='chains'&&<a className="project-link" href="#showreel">Explore the project playlist <ArrowDown size={16}/></a>}{c.id==='first-game'&&<a className="project-link play-first" href="https://cubethrone.itch.io/the-circle-eater" target="_blank" rel="noreferrer">Play my first game <ArrowUpRight size={18}/></a>}<div className="checkpoint-status"><span>✦</span> {c.kind==='OFFICE PROJECT'?'SHIPPED AT VMS TECHS':c.kind==='PERSONAL PROJECT'?'BUILT ON MY OWN TIME':'A PAGE FROM MY JOURNEY'}</div></article>
 </section>})}</div>

 <section id="toolkit" className="inventory"><div className="overline">THINGS I’VE PICKED UP ALONG THE WAY</div><h2>The tools on<br/><em>my desk.</em></h2><div className="inventory-grid">{[{name:'Code & web',items:['C#','C++','JavaScript','Three.js'],icon:Code2},{name:'Engines & immersion',items:['Unity','8th Wall','AR & VR','MyWebAR'],icon:Gamepad2},{name:'Art & design',items:['Blender','Photoshop'],icon:Sparkles},{name:'Workflow & data',items:['GitHub','Vim','MySQL','JSON'],icon:LayersIcon}].map((s,i)=><div className="inventory-item" key={s.name}><s.icon size={24}/><span className="overline">0{i+1}</span><h3>{s.name}</h3><div className="inventory-tags">{s.items.map(t=><span key={t}>{t}</span>)}</div></div>)}</div></section>
 <section id="showreel" className="showreel"><div className="overline">PRESS PLAY / THE PROJECT ARCHIVE</div><h2>Better seen <em>in motion.</em></h2><p>Explore the gameplay and immersive experiences in my project playlist. Hover a preview to play it.</p><div className="showreel-grid">{showreelVideos.map(v=><div className={'video-frame'+(v.portrait?' portrait':'')} key={v.id}><div className="video-bar"><span><span className="live-dot"/> {v.title}</span><a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer">Open YouTube ↗</a></div><HoverVideo id={v.id} title={v.title} portrait={v.portrait}/></div>)}</div><p className="fallback">If a player doesn’t load, <a href={playlist} target="_blank" rel="noreferrer">watch the playlist on YouTube ↗</a></p></section>
 <section id="contact" className="final-level"><Flag size={38}/><div className="overline">THIS ISN’T THE LAST PAGE</div><h2>Got something<br/><em>in mind?</em></h2><p>A new game. An immersive experience. A team with a big idea.<br/>I’m ready to hear what you have in mind.</p><a className="start-button" href="mailto:dineshaushutosh@gmail.com">Let’s talk about it <ArrowUpRight size={20}/></a><div className="contact-links"><a href="mailto:dineshaushutosh@gmail.com">dineshaushutosh@gmail.com</a><a href="tel:+919599471440">+91 9599471440</a></div><a href="#start" className="replay">↑ Back to the first page</a></section>
 </main><footer><span>ASHUTOSH SINGH</span><span>Turning imaginative ideas into immersive gaming experiences.</span></footer><div className="quest-status" aria-hidden="true"><span className="live-dot"/>{active<0?'TURN THE FIRST PAGE':scenes[Math.min(active,scenes.length-1)].label.toUpperCase()}<span className="quest-count">{reached}/6 PROJECTS</span></div>
 </div>
}
function LayersIcon({size=24}:{size?:number}){return <Code2 size={size}/>}
function PlaceholderArt({icon:Icon,caption}:{icon:React.ComponentType<{size?:number}>,caption:string}){
 return <figure className="photo-print placeholder-photo"><div className="placeholder-frame"><Icon size={44}/></div><figcaption>{caption}</figcaption></figure>;
}
