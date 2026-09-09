"use client";
import { useState } from 'react';

export default function HoverVideo({ id, title, portrait }: { id: string; title: string; portrait?: boolean }) {
 const [playing, setPlaying] = useState(false);
 return (
  <div
   className={'hover-video'+(portrait?' portrait':'')}
   onMouseEnter={() => setPlaying(true)}
   onMouseLeave={() => setPlaying(false)}
   onTouchStart={() => setPlaying(v => !v)}
  >
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
 );
}
