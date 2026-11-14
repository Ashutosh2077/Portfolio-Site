"use client";
import { useEffect, useState } from 'react';
import { asset } from './asset';

const TIPS = [
 'Tip: hover over Ashutosh to see his stats.',
 'Tip: click any project to watch it in action.',
 'Tip: press the speaker button for sound effects.',
 'Loading open worlds, AR menus and a lot of coffee…',
];

/**
 * Full-page "Loading level 1" screen. Progress follows real image loading.
 * Safety: it shows for at least ~0.9s (so it doesn't flash) and at most 6s, and CSS hides it on its own
 * after 8s even if JavaScript never runs.
 */
export default function Loader() {
 const [pct, setPct] = useState(0);
 const [phase, setPhase] = useState<'loading' | 'ready' | 'gone'>('loading');
 const [tip, setTip] = useState(0);

 useEffect(() => {
  const start = performance.now();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('is-loading');
  let shown = 0, raf = 0, finished = false;

  const target = () => {
   const imgs = Array.from(document.images).filter(i => i.loading !== 'lazy');
   const done = imgs.filter(i => i.complete).length;
   return imgs.length ? done / imgs.length : 1;
  };
  const finish = () => {
   if (finished) return;
   finished = true;
   setPct(100);
   setPhase('ready');
   window.setTimeout(() => { setPhase('gone'); document.documentElement.classList.remove('is-loading'); }, reduce ? 150 : 650);
  };
  const tick = () => {
   const t = performance.now() - start;
   // ease the counter toward the real progress, never faster than the minimum show time
   const goal = Math.min(target(), t / 900) * 100;
   shown += (goal - shown) * 0.12;
   setPct(Math.min(99, Math.round(shown)));
   const allLoaded = document.readyState === 'complete' && target() >= 1;
   if ((allLoaded && t > 900 && shown > 96) || t > 6000) { finish(); return; }
   raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  // timers keep working even where animation frames are paused
  const hardStop = window.setTimeout(finish, 6500);
  const tipTimer = window.setInterval(() => setTip(v => (v + 1) % TIPS.length), 1800);
  return () => { cancelAnimationFrame(raf); window.clearTimeout(hardStop); window.clearInterval(tipTimer); document.documentElement.classList.remove('is-loading'); };
 }, []);

 if (phase === 'gone') return null;
 const segs = 10;
 const lit = Math.round(pct / (100 / segs));

 return <div className={'loader' + (phase === 'ready' ? ' is-ready' : '')} role="status" aria-live="polite" aria-label={phase === 'ready' ? 'Ready' : `Loading ${pct}%`}>
  <div className="loader-card">
   <div className="loader-hero">
    <img src={asset('/images/stickers/controller.webp')} alt="" className="loader-pad" />
    <span className="loader-shadow" />
    <img src={asset('/images/stickers/star.webp')} alt="" className="loader-star s1" />
    <img src={asset('/images/stickers/coin.webp')} alt="" className="loader-star s2" />
    <img src={asset('/images/stickers/star-blue.webp')} alt="" className="loader-star s3" />
   </div>
   <p className="loader-title">{phase === 'ready' ? 'Ready!' : 'Loading level 1'}<span className="dots" aria-hidden="true">{phase === 'ready' ? '' : '...'}</span></p>
   <div className="loader-bar" aria-hidden="true">
    {Array.from({ length: segs }, (_, i) => <span key={i} className={i < lit ? 'on' : ''} style={{ '--i': i } as React.CSSProperties} />)}
   </div>
   <p className="loader-meta"><b>{pct}%</b><span key={tip} className="loader-tip">{TIPS[tip]}</span></p>
  </div>
 </div>;
}
