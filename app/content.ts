import { asset } from './asset';
import type { StickerName } from './sticker';
// All site copy lives here so it can be edited without touching layout code.
// Links set to null render as "coming soon" until a real URL is added.

export const links = {
 email: 'dineshaushutosh@gmail.com',
 linkedin: null as string | null,
 github: null as string | null,
 instagram: null as string | null,
 youtube: 'https://www.youtube.com/playlist?list=PLLY9yrVQ6BGI6hRnuLCrN-zt2yWUlgakR' as string | null, // swap for the channel URL
 resume: null as string | null, // e.g. '/Ashutosh-Singh-Resume.pdf' once the PDF is in /public
 lailaPlayStore: 'https://play.google.com/store/apps/details?id=com.ItsAGameStudio.LailaMajnu&hl=en_IN' as string | null,
 monkeyMart: 'https://ashutosh2077.itch.io/monkey-mart',
 cricketPinball: 'https://ashutosh2077.itch.io/cricket-pinball',
 driveFancade: 'https://ashutosh2077.itch.io/drive-fancade',
 arcadePlayStore: 'https://play.google.com/store/apps/details?id=com.VMSTech.Arcade_Simulator&hl=en_IN',
 circleEater: 'https://cubethrone.itch.io/the-circle-eater',
 playlist: 'https://www.youtube.com/playlist?list=PLLY9yrVQ6BGI6hRnuLCrN-zt2yWUlgakR',
};

export type Role = {
 id: string; company: string; role: string; when: string; place: string;
 summary: string; responsibilities: string[]; tech: string[]; achievements: string[];
};

export const roles: Role[] = [
 {
  id: 'vms', company: 'VMS Techs (BuzyBug)', role: 'Unity Game Developer', when: '2023 – Present', place: 'Full-time',
  summary: 'Building games and immersive experiences for brands and players, from first prototype to release.',
  responsibilities: [
   'Gameplay systems and game feel for casual, mobile and PC titles',
   'NPC and customer AI, navigation and game logic',
   'UI, 3D environments and asset integration',
   'Performance optimisation for mobile and VR targets',
   'AR experiences for the web with 8th Wall, and VR for Oculus',
  ],
  tech: ['Unity', 'C#', 'REST APIs', '8th Wall', 'JavaScript', 'Oculus SDK', 'Blender', 'AdMob'],
  achievements: [
   'Shipped Arcade Sim, an arcade tycoon game, on Google Play',
   'Built an interactive AR cocktail menu for multiple liquor brands',
   'Built an AR world map for Royal Stag',
   'Built a VR thrill adventure for Oculus devices',
  ],
 },
 {
  id: 'capgemini', company: 'Capgemini Engineering', role: 'Software Engineer Intern', when: 'Jan – Aug 2023', place: 'Internship',
  summary: 'An internship inside a large engineering organisation, focused on collaboration and DevOps practice.',
  responsibilities: [
   'Worked as part of a larger engineering team',
   'Wrote and maintained code in Go on Linux',
   'Used Git and GitLab for version control and code review',
   'Worked with Docker and CI/CD pipelines',
  ],
  tech: ['Go', 'Linux', 'Docker', 'Git', 'GitLab', 'CI/CD'],
  achievements: [
   'Built a strong foundation in team workflows and DevOps',
   'Brought version control and pipeline habits into game development',
  ],
 },
];

export type Project = {
 id: string; title: string; kind: 'office' | 'personal' | 'other'; type: string;
 short: string; body: string[]; tags: string[];
 groups: ('games' | 'xr')[];
 image?: string; video?: string; portrait?: boolean;
 links?: { href: string; label: string }[];
 status?: string; featured?: boolean;
};

export const projects: Project[] = [
 {
  id: 'laila', title: 'Laila Majnu: Streets of Crime', kind: 'personal', type: 'Open-world action-adventure · Android',
  short: 'An Indian open-world action-adventure game, developed and published for Android.',
  body: [
   'Open-world freedom meets Bollywood-style storytelling. Lively NPCs, custom vehicles and landmarks such as the Taj Mahal make a culturally rich world to explore.',
   'I handled the complete production: gameplay architecture, world building, optimisation for Android devices and monetisation.',
  ],
  tags: ['Unity', 'C#', 'Blender', 'JSON', 'Android', 'Monetisation'],
  groups: ['games'], image: asset('/images/LailaMajnuStreetsOfCrime.webp'), video: 'nvcBKJKIMOs',
  links: [], status: 'Released November 2026', featured: true,
 },
 {
  id: 'chains', title: 'From Chains to the Skies', kind: 'personal', type: '2D physics climbing game',
  short: 'A 2D climbing adventure where the struggle is the fun.',
  body: ['Inspired by Getting Over It and Only Up. Physics-based movement challenges players to find their way through hand-designed levels, wrapped in a stylised art direction.'],
  tags: ['Unity', 'C#', 'GitHub', 'Photopea', 'SDK integration'],
  groups: ['games'], video: 'la1yCiQzJss',
 },
 {
  id: 'cricket-pinball', title: 'Cricket Pinball', kind: 'personal', type: 'Arcade pinball · mobile',
  short: 'Pinball meets cricket: flip the ball, smash shots, chase the high score.',
  body: ['A pinball game with a cricket twist, built for quick sessions on a phone. Real ball physics, punchy flippers and score targets themed around the game India loves.'],
  tags: ['Unity', 'C#', 'Physics', 'Mobile'],
  groups: ['games'], video: 'Lx3lPsv2p9g', portrait: true,
  links: [{ href: links.cricketPinball, label: 'Play on itch.io' }],
 },
 {
  id: 'pinball-island', title: 'Pinball Island', kind: 'personal', type: 'Arcade pinball · mobile',
  short: 'A tropical pinball table full of ramps, bumpers and bonuses.',
  body: ['An island-themed pinball table designed for portrait phones. Tuned ball physics, layered targets and bonus combos keep every run different.'],
  tags: ['Unity', 'C#', 'Physics', 'Mobile'],
  groups: ['games'], video: 'IlEdBdUURcA', portrait: true,
 },
 {
  id: 'vr', title: 'VR Thrill Adventure', kind: 'office', type: 'Virtual reality · Oculus',
  short: 'An adrenaline-filled VR adventure for Oculus devices.',
  body: ['Realistic visuals and immersive gameplay. Players move from watching a world to experiencing it, through scenarios designed around presence and scale.'],
  tags: ['Unity', 'Meta Quest', 'Blender'],
  groups: ['xr'],
 },
 {
  id: 'ar-map', title: 'AR World Map', kind: 'office', type: 'Augmented reality · Royal Stag',
  short: 'An interactive AR world map that blends 3D with the real world.',
  body: ['3D models, animation and chroma key turn exploring a map into a dynamic visual experience, right in the browser.'],
  tags: ['8th Wall', 'Unity', 'Blender', 'Chroma key'],
  groups: ['xr'],
 },
 {
  id: 'ar-menu', title: 'AR Summer of Cocktails', kind: 'office', type: 'Augmented reality · events',
  short: 'A cocktail menu that becomes an AR experience.',
  body: ['An interactive AR menu for multiple liquor brands. Guests explore cocktails, recipes and preparation steps in an immersive format at events.'],
  tags: ['8th Wall', 'Unity', 'JavaScript'],
  groups: ['xr'], video: 'i1RchX9ucCE', portrait: true,
 },
 {
  id: 'greenlam', title: 'Greenlam AR', kind: 'office', type: 'Augmented reality · Greenlam',
  short: 'Web AR for Greenlam, right in the phone browser.',
  body: ['A browser-based AR experience built for Greenlam. Visitors scan and see 3D content placed in their own space, with no app to install.'],
  tags: ['8th Wall', 'Web AR', 'Blender'],
  groups: ['xr'], video: 'i8i3NyJuOmg', portrait: true,
 },
 {
  id: 'arcade', title: 'Arcade Sim', kind: 'office', type: 'Hypercasual tycoon · Android',
  short: 'An arcade management simulator, live on Google Play.',
  body: ['Machine placement, resource management, customer AI and strategic expansion. Every decision grows your arcade.'],
  tags: ['Unity', 'AdMob', 'Blender', 'Customer AI'],
  groups: ['games'], image: asset('/images/arcade-sim-icon.webp'),
  links: [{ href: links.arcadePlayStore, label: 'Get it on Google Play' }],
 },
];

export const archive: { id: string; title: string; portrait?: boolean }[] = [
 { id: 'zTZsxcrGTKc', title: 'Cleanup Day' },
];

// ---------- SKILLS ----------
// Six areas on the left; clicking one fills the dark panel on the right (see skills-section.tsx).
// Every `clip` slot takes { src: '/videos/name.mp4' } or { youtube: 'id' }. Left as null, the panel
// falls back to existing gameplay footage, so nothing looks empty while you record.
export type SkillArea = { id: 'engineering' | 'art' | 'perf' | 'tools' | 'ship' | 'xr'; name: string; short: string; sub: string };
export const skillAreas: SkillArea[] = [
 { id: 'engineering', name: 'Game Engineering', short: 'Gameplay, AI and architecture', sub: 'The systems that make a game play well, written in C#.' },
 { id: 'art', name: '3D Art & Environments', short: 'Modelling and world building', sub: 'Many buildings, one texture atlas. Drag to rotate.' },
 { id: 'perf', name: 'Performance Optimisation', short: 'Smooth games on real phones', sub: 'A live 360-building city. Turn each technique on and watch the numbers.' },
 { id: 'tools', name: 'Tools & Automation', short: 'Custom Unity editor tools', sub: 'Tools I built to dress a big city in hours, not weeks.' },
 { id: 'ship', name: 'Mobile & Publishing', short: 'Released games you can play', sub: 'Shipped and playable. Tap any game to try it.' },
 { id: 'xr', name: 'AR / VR Development', short: 'Web AR and Meta Quest VR', sub: 'AR in the phone browser, and VR for Meta Quest.' },
];

// Game Engineering: one gameplay video plus a one-line summary.
export const engineeringClip: Clip = null; // e.g. { src: '/videos/skill-gameplay.mp4' }; falls back to gameplayVideo
export const engineeringSummary = 'Third-person controller, combat, missions, NPC AI and vehicles, built as modular systems in C#.';

// 3D Art & Environments and Performance Optimisation use the live Three.js demos in city-lab.tsx.

// AR / VR: switch between these clips.
export const xrClips = [
 { title: 'Greenlam AR', youtube: 'i8i3NyJuOmg', project: 'greenlam' },
 { title: 'AR Summer of Cocktails', youtube: 'i1RchX9ucCE', project: 'ar-menu' },
];

// Games you can play right now, shown in the "Android and PC Development" panel.
// `icon`: an image in /public/images; without one, `sticker` is shown instead.
export type Release = { title: string; note: string; store: 'Google Play' | 'itch.io'; href: string; icon?: string; sticker?: StickerName };
export const releases: Release[] = [
 { title: 'Laila Majnu: Streets of Crime', note: 'Open-world action-adventure · Android', store: 'Google Play', href: links.lailaPlayStore!, icon: asset('/images/laila-icon-128.webp') },
 { title: 'Arcade Sim', note: 'Arcade tycoon · Android', store: 'Google Play', href: links.arcadePlayStore, icon: asset('/images/arcade-sim-icon.webp') },
 { title: 'Monkey Mart', note: 'Free to play', store: 'itch.io', href: links.monkeyMart, sticker: 'mystery-box' },
 { title: 'Cricket Pinball', note: 'Free to play', store: 'itch.io', href: links.cricketPinball, sticker: 'coin' },
 { title: 'Drive Fancade', note: 'Free to play', store: 'itch.io', href: links.driveFancade, sticker: 'handheld' },
];

// Gameplay preview video (YouTube id). Swap for a dedicated third-person gameplay clip if you have one.
export const gameplayVideo = 'nvcBKJKIMOs';

// The three tools shown in the Custom Unity Tools panel.
// `video`: a short clip of the tool in use ({ src: '/videos/pole-tool.mp4' } or { youtube: 'id' }). null shows "video coming soon".
export type UnityTool = { id: string; name: string; summary: string; points: string[]; video: Clip };
export const unityTools: UnityTool[] = [
 { id: 'pole', name: 'Pole Placement', video: null,
  summary: 'Places poles along a road in one click, snapped and evenly spaced.',
  points: ['Ground snapping', 'Even spacing'] },
 { id: 'traffic', name: 'Traffic Waypoints', video: null,
  summary: 'Draw lanes in the Scene view; AI traffic follows them.',
  points: ['Lanes and junctions', 'AI traffic'] },
 { id: 'notes', name: 'In-Engine Notes', video: null,
  summary: 'Notes and to-dos pinned right inside the scene.',
  points: ['Scene-pinned', 'To-do lists'] },
];

// Technology stack bar. Logos live in /public/images/logos (128 px WebP; originals in _source-assets/logos).
// `logo`: file name without .webp. No logo → a coloured monogram tile (`mono`, `bg`, `fg`) until you add one.
// `dark`: put the logo on a dark tile (for white logos).
export type StackItem = { name: string; logo?: string; dark?: boolean; mono?: string; bg?: string; fg?: string };
export const primaryStack: StackItem[] = [
 { name: 'Unity', logo: 'Unity_logo' },
 { name: 'C#', mono: 'C#', bg: '#5C2D91', fg: '#fff' },
 { name: 'Blender', logo: 'Blender_logo' },
 { name: 'Photoshop', mono: 'Ps', bg: '#001E36', fg: '#31A8FF' },
 { name: 'Git', mono: 'git', bg: '#F05032', fg: '#fff' },
];
export const extraStack: StackItem[] = [
 { name: 'C++', logo: 'C_logo' },
 { name: 'Phaser', logo: 'Phaser_Logo' },
 { name: 'Mixamo', logo: 'Mixamo_logo' },
 { name: 'Meta Quest', logo: 'AR_VR_logo', dark: true },
 { name: '8th Wall' },
 { name: 'JavaScript' },
 { name: 'Three.js' },
];

// ---------- DEEP DIVES (optimisation case studies) ----------
// Videos: put short MP4 clips in /public/videos and set `src` (e.g. '/videos/atlas-before.mp4'),
// or use a YouTube id in `youtube`. A clip left as null shows a "clip coming soon" placeholder.
// Metrics left as null are hidden; fill in your real Profiler numbers.
export type Clip = { src?: string; youtube?: string; poster?: string } | null;
export type Metric = { label: string; unit?: string; before: number | null; after: number | null };
export type Technique = { name: string; what: string; saves: ('CPU' | 'GPU' | 'Memory')[] };
export type CaseStudy = {
 id: string; num: string; title: string; project: string; tone: 'coral' | 'blue' | 'mint' | 'grape';
 problem: string; steps: string[];
 lesson: { title: string; body: string; tip: string };
 before: Clip; after: Clip;
 metrics: Metric[]; device: string | null;
 techniques?: Technique[];
};

export const caseStudies: CaseStudy[] = [
 {
  id: 'atlas', num: '01', title: 'Texture atlasing for 3D models', project: 'laila', tone: 'grape',
  problem: 'Every separate material on screen costs the CPU a draw call. A building made of a dozen materials is a dozen draw calls, and a street full of them adds up fast on a phone.',
  steps: [
   'Grouped models that share the same shader, such as buildings, shops and street props.',
   'Packed their separate textures into one texture atlas.',
   'Remapped the UVs in Blender so each model reads its own patch of the atlas.',
   'Swapped many materials for one shared material, so Unity can batch them together.',
   'Compressed the atlas for mobile to keep memory low.',
  ],
  lesson: {
   title: 'Why fewer materials means a faster game',
   body: 'The GPU is quick at drawing triangles. The slow part is the CPU telling it what to draw, and every material switch is another instruction. One atlas and one material lets Unity send many objects in a single batch.',
   tip: 'In Unity, open Window → Analysis → Frame Debugger and step through a frame. You will see every draw call and which material caused it.',
  },
  before: null, after: null,
  metrics: [
   { label: 'Materials', before: null, after: null },
   { label: 'Draw calls', before: null, after: null },
   { label: 'Texture memory', unit: 'MB', before: null, after: null },
  ],
  device: null,
 },
 {
  id: 'city', num: '02', title: 'A huge open-world city on a phone', project: 'laila', tone: 'mint',
  problem: 'A big city is thousands of objects. Left alone, the phone processes all of them every frame, even the ones behind the camera or hidden behind a wall.',
  steps: [
   'Profiled on a real Android device first, to find out whether the CPU or the GPU was the bottleneck.',
   'Split the city into chunks, so culling and batching work area by area.',
   'Stacked culling techniques, so the phone only handles what the player can actually see.',
   'Used atlased materials and batching to cut draw calls across the whole map.',
   'Measured CPU and GPU frame time after every change, and kept only what helped.',
  ],
  lesson: {
   title: 'Profile first, then fix',
   body: 'A frame is only as fast as the slower of the CPU and GPU. If the CPU takes 25 ms and the GPU takes 10 ms, cheaper shaders change nothing. Find the bottleneck first, then work on that side.',
   tip: 'In the Unity Profiler, compare CPU main-thread time with GPU time. Whichever is closer to your frame budget is the one to fix.',
  },
  before: null, after: null,
  metrics: [
   { label: 'Draw calls', before: null, after: null },
   { label: 'Triangles', unit: 'k', before: null, after: null },
   { label: 'CPU time', unit: 'ms', before: null, after: null },
   { label: 'GPU time', unit: 'ms', before: null, after: null },
   { label: 'Frame rate', unit: 'FPS', before: null, after: null },
  ],
  device: null,
  techniques: [
   { name: 'Frustum culling', what: 'Skips anything outside the camera’s view. Works best when the world is split into sensible chunks.', saves: ['CPU', 'GPU'] },
   { name: 'Occlusion culling', what: 'Skips buildings hidden behind other buildings. Baked ahead of time, so it is cheap while playing.', saves: ['CPU', 'GPU'] },
   { name: 'Distance culling', what: 'Small props such as bins, poles and signs vanish at a distance where nobody would notice.', saves: ['CPU', 'GPU'] },
   { name: 'LOD groups', what: 'Far-away buildings swap to simpler meshes with far fewer triangles.', saves: ['GPU'] },
   { name: 'Atlas and batching', what: 'Objects that share one material are drawn together, in far fewer draw calls.', saves: ['CPU'] },
   { name: 'Baked lighting', what: 'Light and shadow are worked out once in the editor and stored in lightmaps, not every frame.', saves: ['GPU'] },
  ],
 },
];

export const memories = [
 { src: asset('/images/niet-college.webp'), caption: 'NIET, 2019', note: 'Where the engineering started.' },
 { src: asset('/images/first-laptop.webp'), caption: 'First laptop, 2021', note: 'One week later, my first game.' },
 { src: asset('/images/circle-eater.webp'), caption: 'The Circle Eater', note: 'My first release and first game jam.' },
 { src: asset('/images/Capgemini.webp'), caption: 'Capgemini, 2023', note: 'My first big team.' },
 { src: asset('/images/vms-tech-fulltime-office.webp'), caption: 'VMS Techs', note: 'Making games became the day job.' },
];

// Info cards that pop out around the hero photo on hover (always shown on phones).
// Edit freely: these are the numbers visitors see first.
export const heroStats = [
 { id: 'years', icon: 'pad', big: '3.5+ Years', small: 'Game dev experience', tone: 'coral' },
 { id: 'projects', icon: 'rocket', big: '10+', small: 'Games & XR projects', tone: 'blue' },
 { id: 'engines', icon: 'layers', big: 'Unity · C#', small: 'Mobile · PC · Web', tone: 'grape' },
 { id: 'worlds', icon: 'target', big: 'Open World', small: 'AR / VR · Multiplayer', tone: 'mint' },
] as const;

export const milestones = [
 { year: '2019', title: 'Started B.Tech ECE', note: 'NIET, Greater Noida' },
 { year: '2021', title: 'First game, first game jam', note: 'The Circle Eater, made in one week' },
 { year: '2023', title: 'Software Engineer Intern', note: 'Capgemini Engineering' },
 { year: '2023', title: 'Became a Unity Game Developer', note: 'VMS Techs (BuzyBug)' },
 { year: '2026', title: 'Published on Google Play', note: 'Laila Majnu: Streets of Crime' },
];
