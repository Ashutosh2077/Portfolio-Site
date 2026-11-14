import Sticker from './sticker';

export const metadata = { title: 'Level not found — Ashutosh Singh' };

/** Cute 404: "this level doesn't exist", with the site's sticker style and chunky game buttons. */
export default function NotFound() {
 return <main className="nf">
  <Sticker name="pixel-pad" className="nf-deco a" />
  <Sticker name="star" className="nf-deco b" />
  <Sticker name="handheld" className="nf-deco c" />
  <Sticker name="coin" className="nf-deco d" />
  <div className="nf-inner">
   <Sticker name="hearts" className="nf-hearts" alt="Lives: 3 out of 4" />
   <p className="nf-code" aria-label="404"><span aria-hidden="true">4</span><Sticker name="mystery-box" className="nf-zero" /><span aria-hidden="true">4</span></p>
   <h1>Oops! This level doesn’t exist.</h1>
   <p>The page you’re looking for wandered off the map. You still have 3 lives left, so let’s get you back in the game.</p>
   <div className="nf-actions">
    <a className="game-btn tone-blue tilt-left" href="/">
     <span className="gb-face">
      <svg className="gb-icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M5 15.5 16 5.5l11 10V27a1.5 1.5 0 0 1-1.5 1.5H20v-8h-8v8H6.5A1.5 1.5 0 0 1 5 27z" /></svg>
      Back to Home
     </span>
    </a>
    <a className="game-btn tone-mint tilt-right" href="/#projects">
     <span className="gb-face">
      <svg className="gb-icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M8 5.5c0-1.6 1.7-2.5 3-1.7l15.2 9.9c1.2.8 1.2 2.6 0 3.4L11 26.9c-1.3.8-3-.1-3-1.7z" /></svg>
      Play My Games
     </span>
    </a>
   </div>
  </div>
 </main>;
}
