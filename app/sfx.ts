// Tiny hyper-casual sound effects made with the Web Audio API (no audio files).
// Browsers only allow audio after the visitor's first click/tap/key press, so we unlock on that.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;
let last = 0;

const KEY = 'as-sfx-muted';
export function loadMuted() {
 try { muted = localStorage.getItem(KEY) === '1'; } catch { /* storage blocked */ }
 return muted;
}
export function setMuted(m: boolean) {
 muted = m;
 try { localStorage.setItem(KEY, m ? '1' : '0'); } catch { /* storage blocked */ }
}

export function unlock() {
 if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
 const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
 if (!AC) return;
 ctx = new AC();
 master = ctx.createGain();
 master.gain.value = 0.22;
 master.connect(ctx.destination);
}

function tone(freq: number, to: number, dur: number, type: OscillatorType, delay = 0, vol = 1) {
 if (!ctx || !master || muted || ctx.state !== 'running') return;
 const t = ctx.currentTime + delay;
 const o = ctx.createOscillator();
 const g = ctx.createGain();
 o.type = type;
 o.frequency.setValueAtTime(freq, t);
 o.frequency.exponentialRampToValueAtTime(to, t + dur);
 g.gain.setValueAtTime(0.0001, t);
 g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
 g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
 o.connect(g); g.connect(master);
 o.start(t); o.stop(t + dur + 0.02);
}

/** soft "blip" for hovering things; pitch varies a little so it never sounds robotic */
export function blip() {
 const now = performance.now();
 if (now - last < 45) return; // avoid machine-gun blips when sweeping across many items
 last = now;
 const base = 660 + Math.random() * 260;
 tone(base, base * 1.6, 0.07, 'sine', 0, 0.7);
}

/** bouncy "boop" for clicks */
export function pop() {
 tone(320, 900, 0.09, 'triangle', 0, 0.9);
 tone(900, 1300, 0.06, 'sine', 0.05, 0.5);
}

/** rising "dup-dup-dup-dup" when the info cards pop out */
export function cascade(n = 4) {
 const notes = [523, 659, 784, 1047, 1319];
 for (let i = 0; i < n; i++) tone(notes[i % notes.length], notes[i % notes.length] * 1.25, 0.09, 'square', i * 0.07, 0.28);
}
