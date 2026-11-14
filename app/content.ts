import { asset } from './asset';
// All site copy lives here so it can be edited without touching layout code.
// Links set to null render as "coming soon" until a real URL is added.

export const links = {
 email: 'dineshaushutosh@gmail.com',
 linkedin: null as string | null,
 github: null as string | null,
 instagram: null as string | null,
 youtube: 'https://www.youtube.com/playlist?list=PLLY9yrVQ6BGI6hRnuLCrN-zt2yWUlgakR' as string | null, // swap for the channel URL
 resume: null as string | null, // e.g. '/Ashutosh-Singh-Resume.pdf' once the PDF is in /public
 lailaPlayStore: null as string | null,
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
  id: 'quiz', title: 'Multiplayer Quiz Game', kind: 'other', type: 'Multiplayer game',
  short: 'A real-time multiplayer quiz game.',
  body: ['Screenshots and a full write-up are on the way.'],
  tags: ['Unity', 'C#', 'Multiplayer'],
  groups: ['games'],
 },
 {
  id: 'vr', title: 'VR Thrill Adventure', kind: 'office', type: 'Virtual reality · Oculus',
  short: 'An adrenaline-filled VR adventure for Oculus devices.',
  body: ['Realistic visuals and immersive gameplay. Players move from watching a world to experiencing it, through scenarios designed around presence and scale.'],
  tags: ['Unity', 'Oculus SDK', 'Blender'],
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
  id: 'ar-menu', title: 'AR Cocktail Menu', kind: 'office', type: 'Augmented reality · events',
  short: 'A menu that becomes an experience.',
  body: ['An interactive AR menu for multiple liquor brands. Guests explore cocktails, recipes and preparation steps in an immersive format at events.'],
  tags: ['8th Wall', 'Unity', 'JavaScript'],
  groups: ['xr'],
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

export const archive = [
 { id: 'Lx3lPsv2p9g', title: 'Cricket Pinball', portrait: true },
 { id: 'IlEdBdUURcA', title: 'Pinball Island', portrait: true },
 { id: 'i8i3NyJuOmg', title: 'Greenlam AR', portrait: true },
 { id: 'zTZsxcrGTKc', title: 'Cleanup Day' },
];

export type Skill = { id: string; name: string; note: string; projects: string[] };
export const skillGroups: { name: string; skills: Skill[] }[] = [
 { name: 'Core', skills: [
  { id: 'unity', name: 'Unity and C#', note: 'My daily tools since 2020.', projects: ['laila', 'chains', 'arcade', 'vr', 'quiz'] },
  { id: 'gameplay', name: 'Gameplay Programming', note: 'Movement, systems and the feel of play.', projects: ['laila', 'chains', 'arcade'] },
  { id: 'architecture', name: 'Game Architecture', note: 'Structuring a full game so it can grow.', projects: ['laila'] },
 ]},
 { name: 'Worlds', skills: [
  { id: '2d3d', name: '2D and 3D Game Development', note: 'From 2D physics to a 3D open world.', projects: ['chains', 'laila', 'arcade'] },
  { id: 'ai', name: 'AI and Navigation', note: 'NPCs and customers that feel alive.', projects: ['laila', 'arcade'] },
  { id: 'blender', name: 'Blender and 3D Environments', note: 'Modelling and building the spaces players explore.', projects: ['laila', 'arcade', 'ar-map', 'vr'] },
 ]},
 { name: 'Platforms', skills: [
  { id: 'xr', name: 'AR and VR Development', note: 'Web AR with 8th Wall, VR on Oculus.', projects: ['ar-map', 'ar-menu', 'vr'] },
  { id: 'android', name: 'Android and PC Development', note: 'Shipping to real devices and stores.', projects: ['laila', 'arcade'] },
  { id: 'perf', name: 'Performance Optimisation', note: 'Keeping an open world smooth on phones.', projects: ['laila', 'vr'] },
 ]},
 { name: 'Workflow', skills: [
  { id: 'devops', name: 'Git, Docker and CI/CD', note: 'Learned at Capgemini, used on every project since.', projects: ['chains'] },
 ]},
];

export const toolbox = ['C#', 'C++', 'JavaScript', 'Go', 'Three.js', 'Unity', '8th Wall', 'MyWebAR', 'Oculus SDK', 'Blender', 'Photoshop', 'Git', 'GitLab', 'Docker', 'Linux', 'Vim', 'MySQL', 'JSON'];

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
