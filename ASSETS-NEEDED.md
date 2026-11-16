# Assets needed: every video, image, link and fact

Updated to match the site as it is now (Home → About → Projects → Skills → Deep dives → Experience → Contact).

**How to send:** drop files in `_source-assets/incoming/` using the file names below (rough names are fine). Send full-quality originals; I'll resize, compress and convert them (WebP for images, MP4 for clips).
**Big or long videos:** upload to YouTube (unlisted is fine) and send the link instead.

**Legend:** 🔴 needed, a placeholder or fallback shows today · 🟠 replace, it's there but not clearly yours · 🟢 check, just confirm · ✅ done

---

## Quick count

| Type | Needed | Optional |
|------|--------|----------|
| 🎬 Videos | 10 | 6 |
| 🖼️ Images | 9 | 5 |
| 🔗 Links | 4 | 2 |
| ✍️ Facts to confirm | 8 | – |

**Do these first:** V8–V11 (deep-dive before/after) → V12–V14 (tools) → V1 (gameplay reel) → the rest.

---

## 🎬 Videos

**Specs for all clips:** MP4 · 1080p (720p OK) · 16:9 unless noted · no sound needed (they play muted) · 10–30 s · loop-friendly if possible.
**Tips:** Unity Recorder (Window → General → Recorder) gives clean 1080p. For before/after, use the **same camera path**, and keep **Stats / Profiler / Frame Debugger** visible so the numbers show in the video.

### Skills section: Game Engineering
| # | What to record | File | Length | Today |
|---|----------------|------|--------|-------|
| 🔴 V1 | One gameplay reel: third-person movement, combat, a mission, NPCs and traffic, driving. Your best 20–30 s | `skill-gameplay.mp4` or YouTube | 20–30 s | Laila trailer |

### Skills section: 3D Art & Performance (live 3D demos, no video needed)
These two panels are now interactive Three.js scenes built in code: cube buildings sharing one atlas, plus a 360-building city with Atlas / Batching / LOD toggles. The draw-call and triangle numbers are measured live.
| # | Optional upgrade | File | Spec |
|---|------------------|------|------|
| ⚪ V2 | Your **real atlas texture** from Laila Majnu, to replace the generated 2×2 one | `atlas-real.png` | square, 1024–2048 px |
| ⚪ V3 | 4–8 of your **real building models**, to replace the cubes | `buildings.glb` (Blender → glTF export) | under 3 MB total, one material using the atlas |

### Skills section: AR / VR
| # | What | File | Today |
|---|------|------|-------|
| ⚪ V6 | Meta Quest headset recording (adds a 3rd option) | `skill-vr.mp4` or YouTube | not shown |
| ✅ | Greenlam AR, AR Summer of Cocktails | – | done |

### Skills section: Tools & Automation (3 tabs)
| # | Tab | What to record | File | Length | Today |
|---|-----|----------------|------|--------|-------|
| 🔴 V12 | Pole Placement | Poles snapping along a road, evenly spaced | `tool-pole.mp4` | 10–20 s | "Clip coming soon" |
| 🔴 V13 | Traffic Waypoints | Drawing lanes, then AI cars following them | `tool-traffic.mp4` | 10–20 s | "Clip coming soon" |
| 🔴 V14 | In-Engine Notes | Pinning a note in the scene, ticking a to-do | `tool-notes.mp4` | 10–20 s | "Clip coming soon" |

### Deep dives (most important)
| # | Where | What to record | File | Length | Today |
|---|-------|----------------|------|--------|-------|
| 🔴 V8 | Texture atlasing: **Before** | Many-material scene, Frame Debugger/Stats showing draw calls | `atlas-before.mp4` | 10–20 s | "Clip coming soon" |
| 🔴 V9 | Texture atlasing: **After** | Same view after atlasing, fewer draw calls | `atlas-after.mp4` | 10–20 s | "Clip coming soon" |
| 🔴 V10 | City: **Before** | Drive or fly-through, Stats/Profiler visible | `city-before.mp4` | 15–30 s | "Clip coming soon" |
| 🔴 V11 | City: **After** | The **same route** after optimising | `city-after.mp4` | 15–30 s | "Clip coming soon" |
| ⚪ V15 | City (optional) | Occlusion culling seen from above in Scene view | `city-occlusion.mp4` | 10–15 s | not shown |
| ⚪ V16 | City (optional) | LOD switching as the camera moves away | `city-lod.mp4` | 5–10 s | not shown |

### Projects
| # | Project | What to record | Send as | Today |
|---|---------|----------------|---------|-------|
| 🔴 V17 | VR Thrill Adventure | Headset recording of the best moments | YouTube link | sticker |
| 🔴 V18 | AR World Map (Royal Stag) | Phone screen recording (portrait OK) | YouTube link | sticker |
| ⚪ V19 | Arcade Sim | Gameplay: placing machines, customers playing | YouTube link | icon only |
| ✅ | Laila Majnu, Chains to the Skies, Cricket Pinball, Pinball Island, Greenlam AR, AR Summer of Cocktails, Cleanup Day | – | – | done |

> ⚠️ Studio/client work (Royal Stag, Greenlam, liquor brands, VR): check your company is fine with showing it publicly.

---

## 🖼️ Images

### Deep dives
| # | What | File | Spec |
|---|------|------|------|
| 🔴 I1 | The **atlas texture** itself (the packed image) | `atlas-texture.png` | full resolution |
| ⚪ I2 | Blender screenshot of the **UV layout** pointing into the atlas | `atlas-uv-blender.png` | full resolution |
| ⚪ I3 | Profiler screenshots, before and after | `profiler-before.png`, `profiler-after.png` | full resolution |

### Tech stack logos (letter tiles today)
| # | Logo | File | Spec |
|---|------|------|------|
| 🔴 I4 | C# | `CSharp_logo.png` | square, transparent background, 512 px |
| 🔴 I5 | Photoshop | `Photoshop_logo.png` | same |
| 🔴 I6 | Git | `Git_logo.png` | same |

### Mobile & Publishing: itch.io game icons (stickers today)
| # | Game | File | Spec |
|---|------|------|------|
| 🔴 I7 | Monkey Mart | `monkey-mart-icon.png` | square, 512 px |
| 🔴 I8 | Cricket Pinball | `cricket-pinball-icon.png` | same |
| 🔴 I9 | Drive Fancade | `drive-fancade-icon.png` | same |

### Project cards
| # | Project | File | Today |
|---|---------|------|-------|
| 🔴 I10 | VR Thrill Adventure: cover | `vr-cover.png` | sticker |
| 🔴 I11 | AR World Map: cover | `ar-map-cover.png` | sticker |
| ⚪ I12 | Chains to the Skies, Cricket Pinball, Pinball Island: covers (nicer than YouTube thumbnails) | `chains-cover.png` etc. | YouTube thumbnail |
| ⚪ I13 | Arcade Sim: 2–3 gameplay screenshots | `arcade-1.png`… | icon only |

### Site-wide art: confirm or replace
| # | Asset | Where | Status |
|---|-------|-------|--------|
| 🟠 I14 | **16 stickers** from `Glossy 3D Gaming Sticker Sheet.png` | hero, headings, loader, cards | Made by you? If AI-made or downloaded, replace them with your own renders (Blender or game items, transparent PNG, ~512 px each) |
| 🟠 I15 | **"Ashutosh Singh" title logo** from `Playful Ashutosh Singh Logo.png` | hero | Same question. Replacement: transparent PNG, 1500 px or wider |
| ⚪ I16 | Social share banner (shown when the link is posted on WhatsApp or LinkedIn) | link previews | 1200 × 630 px → `og-image.png` |
| 🟢 | Portrait cutout, 5 memory photos (NIET, laptop, Circle Eater, Capgemini, VMS) | hero, About | confirm all are your own photos |
| ✅ | Laila Majnu icon, skyline, engine logos (Unity, Blender, C++, Phaser, Mixamo, Meta Quest) | – | done |

---

## 🔗 Links

| # | Link | Today |
|---|------|-------|
| 🔴 L1 | LinkedIn URL | "Soon" |
| 🔴 L2 | GitHub URL | "Soon" |
| 🔴 L3 | Resume PDF → `Ashutosh-Singh-Resume.pdf` | "Soon" |
| 🔴 L4 | Instagram URL, or tell me to remove it | "Soon" |
| ⚪ L5 | Pinball Island store/itch.io link (adds a Play button) | none |
| ⚪ L6 | YouTube **channel** URL (it points to a playlist now) | playlist |
| ✅ | Laila Majnu Play Store, Arcade Sim, Monkey Mart, Cricket Pinball, Drive Fancade | done |

---

## 📊 Numbers for the deep dives (before → after)

**Texture atlasing**
- Materials: ___ → ___
- Draw calls / batches: ___ → ___
- Texture memory (MB): ___ → ___

**City**
- Draw calls: ___ → ___
- Triangles (k): ___ → ___
- CPU time (ms): ___ → ___
- GPU time (ms): ___ → ___
- FPS: ___ → ___
- Test phone: ___

Tick the city techniques you actually used (I'll remove the rest):
- [ ] Frustum culling - [ ] Occlusion culling - [ ] Distance culling - [ ] LOD groups - [ ] Atlas + batching - [ ] Baked lighting

---

## ✍️ Facts to confirm

| # | Text on site | Where | Correct? |
|---|--------------|-------|----------|
| F1 | "3.5+ Years: game dev experience" | hero cards | ___ |
| F2 | "10+: Games & XR projects" | hero cards | ___ |
| F3 | "Open World · AR / VR · Multiplayer" (multiplayer is still claimed, but the quiz game was removed) | hero cards | keep "Multiplayer"? ___ |
| F4 | "3 released: games on itch.io & Play Store". **Out of date:** at least 7 now | About | real count: ___ |
| F5 | "Laila Majnu: Released November 2026" | Projects | ___ |
| F6 | Timeline: 2019 B.Tech, 2021 first game, 2023 Capgemini, 2023 VMS, 2026 Google Play | About | ___ |
| F7 | Descriptions I wrote for Cricket Pinball, Pinball Island, Greenlam AR | Projects | ___ |
| F8 | The 3 Unity tool one-liners, and the "What I did" steps in both deep dives | Skills, Deep dives | ___ |
