"use client";
import { useState } from 'react';

/** Video card: hovering (or tapping) anywhere on the card plays a muted, looping preview. */
export default function HoverVideo({ id, title, portrait, className = '' }: { id: string; title: string; portrait?: boolean; className?: string }) {
 const [playing, setPlaying] = useState(false);
 return (
  <figure
   className={className + (playing ? ' is-playing' : '')}
   onMouseEnter={() => setPlaying(true)}
   onMouseLeave={() => setPlaying(false)}
   onTouchStart={() => setPlaying(v => !v)}
  >
   <div className={'hover-video' + (portrait ? ' portrait' : '')}>
    {playing
     ? <iframe
        className="hover-video-frame"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`}
        title={title}
        allow="autoplay; encrypted-media"
        tabIndex={-1}
        aria-hidden="true"
       />
     : <img className="hover-video-poster" src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" />}
   </div>
   <figcaption>{title}</figcaption>
  </figure>
 );
}
