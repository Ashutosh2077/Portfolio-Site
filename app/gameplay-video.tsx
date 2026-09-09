"use client";
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type Player = { mute():void; unMute():void; isMuted():boolean; playVideo():void; destroy():void };
type YouTubeAPI = { Player:new(element:HTMLElement,options:{events:{onReady:(event:{target:Player})=>void;onError:()=>void}})=>Player };
declare global { interface Window { YT?:YouTubeAPI; onYouTubeIframeAPIReady?:()=>void } }
let apiPromise:Promise<YouTubeAPI>|undefined;
function loadAPI(){
 if(window.YT?.Player)return Promise.resolve(window.YT);
 if(!apiPromise)apiPromise=new Promise((resolve,reject)=>{
  const previous=window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady=()=>{previous?.();if(window.YT)resolve(window.YT)};
  const script=document.createElement('script');
  script.src='https://www.youtube.com/iframe_api';
  script.onerror=()=>{apiPromise=undefined;reject(new Error('Player unavailable'))};
  document.head.appendChild(script);
 });
 return apiPromise;
}
export default function GameplayVideo(){
 const host=useRef<HTMLDivElement>(null);
 const player=useRef<Player|null>(null);
 const [ready,setReady]=useState(false);
 const [muted,setMuted]=useState(true);
 const [failed,setFailed]=useState(false);
 useEffect(()=>{
  const element=host.current;
  if(!element)return;
  let disposed=false;
  let started=false;
  let sync:ReturnType<typeof setInterval>|undefined;
  const start=()=>{
   if(started)return;
   started=true;
   const iframe=document.createElement('iframe');
   iframe.title='From Chains to the Skies gameplay';
   iframe.src='https://www.youtube-nocookie.com/embed/la1yCiQzJss?autoplay=1&mute=1&playsinline=1&controls=0&iv_load_policy=3&enablejsapi=1&origin='+encodeURIComponent(window.location.origin);
   iframe.allow='autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share';
   iframe.allowFullscreen=true;
   element.appendChild(iframe);
   loadAPI().then(api=>{
    if(disposed)return;
    player.current=new api.Player(iframe,{events:{
     onReady:({target})=>{
      if(disposed)return;
      target.mute();
      target.playVideo();
      setReady(true);
      sync=setInterval(()=>{setMuted(target.isMuted())},500);
     },
     onError:()=>{if(!disposed){setFailed(true);setReady(false)}}
    }});
   }).catch(()=>{if(!disposed)setFailed(true)});
  };
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){start();observer.disconnect()}},{rootMargin:'200px'});
  observer.observe(element);
  return()=>{disposed=true;observer.disconnect();clearInterval(sync);player.current?.destroy();player.current=null;element.replaceChildren()};
 },[]);
 function toggleSound(){
  const current=player.current;
  if(!current||!ready)return;
  const wasMuted=current.isMuted();
  if(wasMuted){current.unMute();current.playVideo()}else current.mute();
  setMuted(!wasMuted);
 }
 return <><div className="memory-video" ref={host}/><div className="sound-note"><button type="button" className="handwritten-sound" onClick={toggleSound} disabled={!ready} aria-label={muted?'Unmute gameplay video':'Mute gameplay video'}>{muted?<VolumeX size={19} aria-hidden="true"/>:<Volume2 size={19} aria-hidden="true"/>}</button><span>{failed?'Use the YouTube link below':ready?(muted?'a little better with sound':'you’re listening now'):'starts quietly as you scroll'}</span></div></>;
}
