/* ═══════════════════════════════════════════════════════════════
    AUDIO SETUP — Local MP3 with Fade In/Out
    Starts at 4:05 (245s)
═══════════════════════════════════════════════════════════════ */

/**
 * Starts the music at 4:05 and fades the volume up to 0.8
 */
function playYouTubeMusic() {
    const audio = document.getElementById('yt-player');
    if (!audio) return;

    // 1. Set start point to 4:05 (245 seconds)
    audio.currentTime = 245; 
    audio.volume = 0; // Start at zero for the fade-in
    
    audio.play().then(() => {
        // 2. Fade In Logic (0 to 0.8 over 1.6 seconds)
        let fadeIn = setInterval(() => {
            if (audio.volume < 0.8) {
                // Increase volume by 0.05 every 100ms
                audio.volume = Math.min(audio.volume + 0.05, 0.8);
            } else {
                clearInterval(fadeIn);
            }
        }, 100);
    }).catch(e => {
        console.warn('Audio playback was blocked or failed:', e);
    });

    // 3. Loop Logic: If song ends, restart at 4:05
    audio.addEventListener('ended', function() {
        audio.currentTime = 245;
        audio.play();
    });
}

/**
 * Gracefully fades the music out and pauses it
 */
function fadeOutMusic() {
    const audio = document.getElementById('yt-player');
    if (!audio || audio.paused) return;

    let fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
            audio.volume = Math.max(audio.volume - 0.05, 0);
        } else {
            clearInterval(fadeOut);
            audio.pause();
            
            // This is the "Waiting" part:
            // Reset the song to 4:05 so it starts correctly next time
            audio.currentTime = 245; 
            
            // Set volume back to 0 so the next 'play' can fade it back in
            audio.volume = 0; 
        }
    }, 100);
}
/* ═══════════════════════════════════════════════════════════════
   main.js — Birthday v5
   No footer · Perfect centering · Scroll storytelling
═══════════════════════════════════════════════════════════════ */

'use strict';

const $ = id => document.getElementById(id);


/* ═══════════════════════════════════════════════════════════════
   SKY BACKGROUND CANVAS
   Redraws on resize & scroll. Gradient shifts from cold indigo
   at top to warm amber as the user scrolls into the story.
═══════════════════════════════════════════════════════════════ */
(function initSky() {
  const canvas = $('bg-canvas');
  const ctx    = canvas.getContext('2d');

  function draw() {
    canvas.width  = innerWidth;
    canvas.height = innerHeight;

    const maxScroll = Math.max(
      document.body.scrollHeight - innerHeight, 1
    );
    const r = Math.min(window.scrollY / maxScroll, 1); // 0 → 1

    const g = ctx.createLinearGradient(0, 0, 0, innerHeight);
    g.addColorStop(0,    `hsl(${270 - r*55},  ${58 + r*18}%, ${7  + r*8}%)`);
    g.addColorStop(0.35, `hsl(${278 - r*75},  ${52 + r*14}%, ${11 + r*9}%)`);
    g.addColorStop(0.65, `hsl(${318 - r*95},  ${48 + r*18}%, ${17 + r*14}%)`);
    g.addColorStop(0.85, `hsl(${18  + r*8},   ${58 + r*18}%, ${26 + r*18}%)`);
    g.addColorStop(1,    `hsl(${33  + r*5},   ${66 + r*10}%, ${38 + r*14}%)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    // Pixel moon — fades out halfway through scroll
    const moonAlpha = Math.max(0, 1 - r * 2.2);
    if (moonAlpha > 0) {
      ctx.globalAlpha = moonAlpha;
      ctx.fillStyle   = '#fff8e0';
      [
        [0,0],[1,0],[2,0],
        [0,1],[1,1],[2,1],[3,1],
        [0,2],[1,2],[2,2],[3,2],
        [1,3],[2,3]
      ].forEach(([x, y]) => ctx.fillRect(62 + x*8, 46 + y*8, 8, 8));

      const mg = ctx.createRadialGradient(86, 74, 4, 86, 74, 58);
      mg.addColorStop(0, 'rgba(255,248,200,.20)');
      mg.addColorStop(1, 'transparent');
      ctx.fillStyle = mg;
      ctx.fillRect(28, 16, 116, 116);
      ctx.globalAlpha = 1;
    }
  }

  draw();
  window.addEventListener('resize',  draw);
  window.addEventListener('scroll',  draw, { passive: true });
})();


/* ═══════════════════════════════════════════════════════════════
   STARS — parallax on scroll
═══════════════════════════════════════════════════════════════ */
const starEls = [];

(function spawnStars() {
  const sizes = [2, 2, 2, 4, 4, 6];
  for (let i = 0; i < 68; i++) {
    const s     = document.createElement('div');
    const sz    = sizes[Math.floor(Math.random() * sizes.length)];
    const depth = 0.02 + Math.random() * 0.30;   // parallax factor
    s.className     = 'star';
    s.dataset.depth = depth;
    s.style.cssText = `
      left:    ${Math.random() * 100}%;
      top:     ${Math.random() * 78}%;
      width:   ${sz}px;
      height:  ${sz}px;
      --dur:   ${1.6 + Math.random() * 2.4}s;
      --delay: ${Math.random() * 3}s;
      --op:    ${0.28 + Math.random() * 0.62};
    `;
    document.body.appendChild(s);
    starEls.push(s);
  }
})();

window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  starEls.forEach(s => {
    s.style.transform = `translateY(${-sy * parseFloat(s.dataset.depth)}px)`;
  });
}, { passive: true });


/* ═══════════════════════════════════════════════════════════════
   BOTTOM AMBIENT HEARTS — float up periodically
═══════════════════════════════════════════════════════════════ */
function scheduleAmbientHearts() {
  setInterval(() => {
    const el = document.createElement('div');
    el.className = 'float-heart';
    el.textContent = ['🤍','💛','✦','❤️'][Math.floor(Math.random() * 4)];
    el.style.cssText = `
      left:    ${5 + Math.random() * 90}%;
      bottom:  40px;
      --dur:   ${4 + Math.random() * 3}s;
      --delay: 0s;
      font-size: ${8 + Math.random() * 7}px;
      opacity: ${0.25 + Math.random() * 0.3};
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 7500);
  }, 3200);
}
scheduleAmbientHearts();


/* ═══════════════════════════════════════════════════════════════
   CHARACTERS — canvas pixel art
═══════════════════════════════════════════════════════════════ */
(function drawBoy() {
  const ctx = $('boy-canvas').getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const p = (x,y,w,h,c) => { ctx.fillStyle=c; ctx.fillRect(x,y,w,h); };

  p(10,0, 12,5, '#3a2010');           // hair
  p(11,4, 10,10,'#f5c89a');           // face
  p(13,7, 2,2,  '#2a1a0a');           // eye L
  p(17,7, 2,2,  '#2a1a0a');           // eye R
  p(13,12,1,1,  '#c07050');           // smile
  p(14,13,4,1,  '#c07050');
  p(18,12,1,1,  '#c07050');
  p(10,7, 2,4,  '#e8b580');           // ears
  p(20,7, 2,4,  '#e8b580');
  p(14,14,4,3,  '#f0b880');           // neck
  p(9, 17,14,13,'#4a6ea0');           // shirt
  p(9, 18,14,11,'#3a5e90');
  p(11,17,10,2, '#5a7eb0');           // collar
  p(7, 18,4,10, '#3a5e90');           // arms
  p(21,18,4,10, '#3a5e90');
  p(7, 27,3,4,  '#f5c89a');           // hands
  p(22,27,3,4,  '#f5c89a');
  p(11,30,5,14, '#2a3a60');           // legs
  p(16,30,5,14, '#2a3a60');
  p(10,42,6,4,  '#1a1a2a');           // shoes
  p(16,42,6,4,  '#1a1a2a');
  p(23,22,6,8,  '#c94040');           // book
  p(23,22,6,1,  '#e06060');
  p(23,29,6,1,  '#a02020');
  p(24,23,4,6,  '#fff0f0');
  p(28,22,1,8,  '#8a1818');
})();

(function drawGirl() {
  const ctx = $('girl-canvas').getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const p = (x,y,w,h,c) => { ctx.fillStyle=c; ctx.fillRect(x,y,w,h); };

  p(10,0, 12,6, '#6a2a10');           // hair back
  p(9, 1, 14,4, '#7a3820');
  p(8, 6, 4,20, '#6a2a10');           // long sides
  p(20,6, 4,20, '#6a2a10');
  p(9, 3, 14,3, '#8a4828');           // highlight
  p(11,4, 10,10,'#f7d4aa');           // face
  p(13,7, 2,2,  '#2a1a0a');           // eyes
  p(17,7, 2,2,  '#2a1a0a');
  p(13,6, 2,1,  '#2a1a0a');           // lashes
  p(17,6, 2,1,  '#2a1a0a');
  p(12,11,2,1,  '#f0a0a0');           // blush
  p(18,11,2,1,  '#f0a0a0');
  p(14,12,4,1,  '#d07060');           // smile
  p(13,11,1,1,  '#d07060');
  p(18,11,1,1,  '#d07060');
  p(10,7, 2,4,  '#eec07a');           // ears
  p(20,7, 2,4,  '#eec07a');
  p(14,14,4,3,  '#f7d4aa');           // neck
  p(9, 17,14,14,'#d060a0');           // dress
  p(8, 18,16,12,'#c04090');
  p(10,17,12,2, '#e080b0');           // collar
  p(7, 28,18,6, '#c04090');           // skirt
  p(6, 31,20,5, '#b03080');
  p(6, 18,4,10, '#c04090');           // arms
  p(22,18,4,10, '#c04090');
  p(6, 27,3,4,  '#f7d4aa');           // hands
  p(23,27,3,4,  '#f7d4aa');
  p(12,34,4,10, '#f7d4aa');           // legs
  p(17,34,4,10, '#f7d4aa');
  p(11,42,5,4,  '#8a2060');           // shoes
  p(16,42,5,4,  '#8a2060');
  p(21,1, 4,4,  '#f7c948');           // hair flower
  p(22,0, 2,2,  '#f7c948');
  p(23,2, 1,1,  '#fff');
  p(3, 17,6,9,  '#e0f0e0');           // bible
  p(3, 17,6,1,  '#a0c0a0');
  p(3, 25,6,1,  '#80a080');
  p(4, 18,4,7,  '#f0fff0');
  p(8, 17,1,9,  '#60a060');
})();

/* ═══════════════════════════════════════════════════════════════
   PARTICLES
═══════════════════════════════════════════════════════════════ */
function spawnParticles(x, y) {
  const emojis = ['✨','💛','🌟','💫','🤍','❤️','✦','·'];
  for (let i = 0; i < 28; i++) {
    const el    = document.createElement('div');
    el.className = 'particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist  = 50 + Math.random() * 180;
    el.style.cssText = `
      left:  ${x}px; top: ${y}px;
      --tx:  ${Math.cos(angle) * dist}px;
      --ty:  ${Math.sin(angle) * dist - 90}px;
      --rot: ${Math.random() * 720 - 360}deg;
      --dur: ${1.7 + Math.random() * .8}s;
      --delay: ${Math.random() * .2}s;
      font-size: ${9 + Math.random() * 11}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}

function spawnHearts() {
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      const el    = document.createElement('div');
      el.className = 'float-heart';
      el.textContent = ['🤍','💛','✦','❤️','🌟'][Math.floor(Math.random()*5)];
      el.style.cssText = `
        left: ${8 + Math.random() * 84}%; bottom: 60px;
        --dur: ${3 + Math.random() * 2.5}s;
        --delay: ${Math.random() * .35}s;
        font-size: ${9 + Math.random() * 9}px;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }, i * 160);
  }
}

function spawnSmoke(x, y) {
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      const s  = document.createElement('div');
      s.className = 'smoke';
      const sz = 4 + Math.random() * 5;
      s.style.cssText = `
        left:   ${x + (Math.random() - .5) * 16}px;
        top:    ${y}px;
        width:  ${sz}px;
        height: ${sz}px;
      `;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1100);
    }, i * 110);
  }
}


/* ═══════════════════════════════════════════════════════════════
   CANDLES
   style.css defines .color-candle (lit) and .color-candle.blown
═══════════════════════════════════════════════════════════════ */
const CANDLES = ['candle-green','candle-purple','candle-yellow','candle-blue'];

function blowCandles() {
  CANDLES.forEach((id, i) => {
    setTimeout(() => {
      const el = $(id); if (!el) return;
      const r  = el.getBoundingClientRect();
      spawnSmoke(r.left + r.width / 2, r.top);
      const clone = el.cloneNode(true);
      clone.classList.add('blown');
      el.parentNode.replaceChild(clone, el);
    }, i * 140);
  });
}

function relightCandles() {
  CANDLES.forEach(id => {
    const el = $(id); if (!el) return;
    const clone = el.cloneNode(true);
    clone.classList.remove('blown');
    el.parentNode.replaceChild(clone, el);
  });
}


/* ═══════════════════════════════════════════════════════════════
   SCROLL STORY — staggered IntersectionObserver reveals
   Each line gets a stagger delay based on its index so they
   appear one after another even if they enter viewport together.
═══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const items = Array.from(
    document.querySelectorAll('.story-line, .story-div')
  );

  // Assign transition-delay based on index for stagger
  items.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.06}s`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);       // reveal once, stay revealed
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => obs.observe(el));

  // Replay button after last line
  const lastLine = items.filter(el => el.classList.contains('story-line')).pop();
  if (lastLine) {
    const replayObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const wrap = $('replay-wrap');
        wrap.style.display = 'block';
        requestAnimationFrame(() => wrap.classList.add('visible'));
        replayObs.disconnect();
      }
    }, { threshold: 0.6 });
    replayObs.observe(lastLine);
  }
}


/* ═══════════════════════════════════════════════════════════════
   BLOW INTERACTION
═══════════════════════════════════════════════════════════════ */
let blown     = false;
let wishShown = false;

$('blow-btn').addEventListener('click', function () {
  if (blown) return;
  const btn = this;

  // Step 1: Make a wish moment
  if (!wishShown) {
    wishShown = true;
    $('wish-text').classList.add('visible');
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled    = false;
      btn.textContent = '💨 Blow Now!';
    }, 2600);
    return;
  }

  // Step 2: Blow!
  blown        = true;
  btn.disabled = true;
  $('wish-text').classList.remove('visible');

  playYouTubeMusic();
  blowCandles();

  // Particles from cake center
  const sr = $('pixel-stage').getBoundingClientRect();
  spawnParticles(sr.left + sr.width / 2, sr.top + sr.height * 0.22);
  setTimeout(() => spawnHearts(), 650);

  // Unlock scroll, show hint + story, then scroll down
  setTimeout(() => {
    document.documentElement.classList.add('unlocked');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflowY = 'auto';
    $('scroll-hint').style.display = 'block';

    const story = $('story');
    story.style.display = 'block';          // ← only revealed here
    story.setAttribute('aria-hidden', 'false');
    $('replay-wrap').style.display = 'none';

    initScrollReveal();

    setTimeout(() => {
      story.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 700);
  }, 1300);
});


/* ═══════════════════════════════════════════════════════════════
   REPLAY
═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   REPLAY
═══════════════════════════════════════════════════════════════ */
$('replay-btn').addEventListener('click', function () {
    // 1. Start the fade-out and reset process
    fadeOutMusic(); 

    // 2. Reset the interaction states
    blown     = false;
    wishShown = false;

    // 3. Lock scroll and hide story
    document.documentElement.classList.remove('unlocked');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflowY = 'hidden';

    $('story').style.display = 'none';
    $('story').setAttribute('aria-hidden', 'true');
    $('replay-wrap').style.display = 'none';
    $('replay-wrap').classList.remove('visible');
    
    // 4. Reset UI text
    $('wish-text').textContent = '✨ Make a wish... ✨';
    $('wish-text').classList.remove('visible');
    $('blow-btn').textContent = '🕯️ Blow the Candles';
    $('blow-btn').disabled = false;

    // 5. Relight and Scroll back to top
    relightCandles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});