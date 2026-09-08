import { ArrowUpRight, ArrowDown, Play, Mail, Code2, Box, Layers, MoveUpRight } from 'lucide-react';

const playlist = 'https://www.youtube.com/playlist?list=PLLY9yrVQ6BGI6hRnuLCrN-zt2yWUlgakR';
const projects = [
  { number: '01', type: '2D / PHYSICS ADVENTURE', title: 'From Chains\nto the Skies', idea: 'Every great climb starts with a little friction.', description: 'A 2D climbing adventure inspired by Getting Over It and Only Up. Physics-based movement turns each ascent into a challenge, while stylized levels give every attempt its own character.', focus: 'Physics-based movement · Level design · SDK integration', stack: ['Unity', 'C#', 'GitHub', 'Photopea'], className: 'climb' },
  { number: '02', type: '3D / OPEN WORLD', title: 'Laila Majnu', idea: 'A familiar world. An unmistakably Indian story.', description: 'An open-world game inspired by GTA, with Bollywood-style storytelling at its heart. Lively NPCs, custom vehicles and landmarks like the Taj Mahal bring a culturally rich environment to life.', focus: 'NPC behaviour · Vehicle systems · World building', stack: ['Unity', 'C#', 'Blender', 'JSON'], className: 'world' },
  { number: '03', type: 'HYPERCASUAL / SIMULATION', title: 'Arcade Sim', idea: 'Small decisions. A growing arcade empire.', description: 'An arcade management simulator built around a satisfying loop: place machines, manage resources, serve customers and expand. Customer AI and strategic progression turn a simple space into a growing business.', focus: 'Customer AI · Resource management · Strategic expansion', stack: ['Unity', 'AdMob', 'Blender'], className: 'arcade' },
];
const immersive = [
  { number: '04', type: 'AUGMENTED REALITY', title: 'Summer of Cocktails', description: 'A menu you can explore. An interactive AR experience for multiple liquor brands, bringing cocktail recipes and preparation steps into an immersive format for event attendees.', stack: ['8th Wall', 'Unity', 'JavaScript'] },
  { number: '05', type: 'AUGMENTED REALITY', title: 'Royal Stag', description: 'A world map that comes to life. Blending 3D assets, animation and chroma key with real-world surroundings to create an interactive way to explore.', stack: ['8th Wall', 'Unity', 'Blender'] },
  { number: '06', type: 'VIRTUAL REALITY', title: 'Open Glow', description: 'Step inside the adventure. A VR thrill experience with realistic visuals and immersive gameplay, built for players to navigate adrenaline-filled scenarios on Oculus devices.', stack: ['Unity', 'Oculus SDK', 'Blender'] },
];
export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="navigation">
        <a href="#" className="brand" aria-label="Ashutosh Singh home">as<span>●</span></a>
        <nav aria-label="Main navigation"><a href="#work">Selected work</a><a href="#story">My story</a><a href="#toolkit">Toolkit</a></nav>
        <a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={16}/></a>
      </header>
      <main id="main">
        <section className="hero">
          <div className="eyebrow"><span className="dot"/> ASHUTOSH SINGH <span className="divider">/</span> UNITY GAME DEVELOPER</div>
          <h1>I build worlds.<br/><span>You bring them</span><br/><span className="accent">to life.</span><span className="heading-star" aria-hidden="true">✳</span></h1>
          <div className="hero-bottom">
            <p>From that one-more-try feeling to places you can step inside. I turn imaginative ideas into immersive gaming experiences.</p>
            <a className="button" href="#work">Explore my work <ArrowDown size={18}/></a>
          </div>
          <div className="hero-foot"><span>GAMES. WORLDS. EXPERIENCES.</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>
        <section className="reel-section" aria-labelledby="reel-title">
          <div className="reel-copy"><span className="eyebrow">THE WORK, IN MOTION</span><h2 id="reel-title">Less explaining.<br/>More experiencing.</h2><p>A collection of my project videos. See the mechanics, worlds and interactions in action.</p><a className="text-link" href={playlist} target="_blank" rel="noreferrer">Open the YouTube playlist <ArrowUpRight size={18}/></a></div>
          <div className="reel"><div className="reel-top"><span><Play size={13}/> PROJECT PLAYLIST</span><span>UNITY / AR / VR</span></div><iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=PLLY9yrVQ6BGI6hRnuLCrN-zt2yWUlgakR" title="Ashutosh Singh project video playlist" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/><p className="video-note">Player unavailable? <a href={playlist} target="_blank" rel="noreferrer">Watch on YouTube ↗</a></p></div>
        </section>
        <section id="work" className="work-section">
          <div className="section-heading"><div><span className="eyebrow">CHAPTER 01 / FINDING THE FUN</span><h2>First, make it <em>play.</em></h2></div><p>Movement. Decisions. Discovery.<br/>Three different ways to keep a player curious.</p></div>
          <div className="project-list">{projects.map(p => <article className={'project '+p.className} key={p.number}><div className="project-index"><span>{p.number}</span><MoveUpRight size={28} aria-hidden="true"/></div><div className="project-title"><span className="eyebrow">{p.type}</span><h3>{p.title}</h3><div className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div></div><div className="project-copy"><h4>{p.idea}</h4><p>{p.description}</p><p className="focus">{p.focus}</p></div></article>)}</div>
        </section>
        <section className="immersive-section">
          <div className="section-heading"><div><span className="eyebrow">CHAPTER 02 / BEYOND THE SCREEN</span><h2>Then, make it <em>real.</em></h2></div><p>What happens when the world<br/>becomes part of the experience?</p></div>
          <div className="immersive-grid">{immersive.map(p=><article className="immersive-card" key={p.number}><div className="card-top"><span>{p.number}</span>{p.number==='06'?<Box size={30}/>:<Layers size={30}/>}</div><span className="eyebrow">{p.type}</span><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div></article>)}</div>
        </section>
        <section id="story" className="story-section">
          <div className="story-intro"><span className="eyebrow">CHAPTER 03 / THE PERSON BEHIND THE PLAY</span><h2>Curiosity is<br/>my game engine.</h2><p>I’m Ashutosh, a Unity game developer, creative problem solver and fast learner. My path has taken me from electronics and software engineering to building games and immersive experiences.</p><p>The thread connecting it all? Learning how things work, then imagining what else they could become.</p></div>
          <div className="timeline">
            <article><span className="timeline-date">JAN 2024 — PRESENT</span><h3>Unity Game Developer</h3><h4>VMS Techs</h4><p>Building casual, mobile and PC games alongside AR and VR experiences. Working with C#, REST APIs, Unity and 8th Wall.</p></article>
            <article><span className="timeline-date">FEB 2023 — AUG 2023</span><h3>Software Engineer Intern</h3><h4>Capgemini Engineering</h4><p>A foundation in software engineering, working with Go, Docker, CI/CD, Linux and Vim.</p></article>
            <article><span className="timeline-date">2019 — 2023</span><h3>B.Tech, Electronics & Communication</h3><h4>NIET, Greater Noida</h4><p>The engineering foundation behind my curiosity for systems, technology and interactive experiences.</p></article>
          </div>
        </section>
        <section id="toolkit" className="toolkit-section"><div className="section-heading"><div><span className="eyebrow">THE TOOLS BEHIND THE WORLDS</span><h2>Ideas meet <em>execution.</em></h2></div><Code2 size={38} aria-hidden="true"/></div><div className="skills">
          <div><span>01 / CODE & WEB</span><p>C# · C++ · JavaScript · Three.js</p></div><div><span>02 / ENGINES & IMMERSION</span><p>Unity · 8th Wall · AR & VR · MyWebAR</p></div><div><span>03 / 3D & DESIGN</span><p>Blender · Photoshop</p></div><div><span>04 / WORKFLOW & DATA</span><p>GitHub · Vim · MySQL · JSON</p></div>
        </div></section>
        <section id="contact" className="contact-section"><span className="eyebrow">THE NEXT CHAPTER</span><h2>Let’s build something<br/><em>worth playing.</em></h2><div className="contact-bottom"><p>Have a game, an experience or a role in mind?<br/>I’d love to hear about it.</p><a className="button" href="mailto:dineshaushutosh@gmail.com">Get in touch <Mail size={18}/></a></div><div className="contact-links"><a href="mailto:dineshaushutosh@gmail.com">dineshaushutosh@gmail.com <ArrowUpRight size={16}/></a><a href="tel:+919599471440">+91 9599471440 <ArrowUpRight size={16}/></a></div></section>
      </main>
      <footer><span>© {new Date().getFullYear()} Ashutosh Singh</span><span>IMAGINED. BUILT. PLAYED.</span><a href="#">Back to top ↑</a></footer>
    </>
  );
}
