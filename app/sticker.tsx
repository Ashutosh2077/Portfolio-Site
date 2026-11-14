"use client";
import { useEffect, useRef, useState } from 'react';

/**
 * A cut-out sticker from /public/images/stickers/<name>.webp.
 * If the file isn't there yet it renders the fallback (or nothing), so the layout never shows a broken image.
 */
export type StickerName =
 | 'controller' | 'star' | 'star-blue' | 'crown' | 'hearts' | 'pixel-pad' | 'handheld' | 'mystery-box'
 | 'rocket' | 'layers' | 'target' | 'trophy' | 'paper-plane' | 'laptop' | 'coin' | 'play';

export default function Sticker({ name, className, fallback = null, alt = '', src }: { name?: StickerName; className?: string; fallback?: React.ReactNode; alt?: string; src?: string }) {
 const [missing, setMissing] = useState(false);
 const img = useRef<HTMLImageElement>(null);
 // an image that failed before React hydrated never fires onError, so check once on mount
 useEffect(() => { const el = img.current; if (el && el.complete && el.naturalWidth === 0) setMissing(true); }, []);
 if (missing) return <>{fallback}</>;
 // lazy + async decode: stickers on screen still load right away, the rest wait until they are near the viewport
 return <img ref={img} src={src || `/images/stickers/${name}.webp`} alt={alt} aria-hidden={alt ? undefined : true} className={'sticker ' + (className || '')} draggable={false} loading="lazy" decoding="async" onError={() => setMissing(true)} />;
}
