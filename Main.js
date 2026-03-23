/* ══════════════════════════════════════════
   UTILS
══════════════════════════════════════════ */
const $ = id => document.getElementById(id);

function px(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w || 1, h || 1);
}


/* ══════════════════════════════════════════
   SKY BACKGROUND CANVAS
══════════════════════════════════════════ */
(function initSky() {
  const canvas = $('bg-canvas');
  const ctx    = canvas.getContext('2d');

  function draw() {
    canvas.width  = innerWidth;
    canvas.height = innerHeight;

    const g = ctx.createLinearGradient(0, 0, 0, innerHeight);
    g.addColorStop(0,   '#0d0520');
    g.addColorStop(.28, '#1a0a2e');
    g.addColorStop(.52, '#3d1a55');
    g.addColorStop(.74, '#7a3050');
    g.addColorStop(.88, '#c95f2a');
    g.addColorStop(1,   '#e8a04a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    // pixel moon
    ctx.fillStyle = '#fff8e0';
    [
      [0,0],[1,0],[2,0],
      [0,1],[1,1],[2,1],[3,1],
      [0,2],[1,2],[2,2],[3,2],
      [1,3],[2,3]
    ].forEach(([x, y]) => ctx.fillRect(64 + x * 8, 48 + y * 8, 8, 8));

    // moon glow
    const mg = ctx.createRadialGradient(84, 78, 4, 84, 78, 60);
    mg.addColorStop(0, 'rgba(255,248,200,.22)');
    mg.addColorStop(1, 'transparent');
    ctx.fillStyle = mg;
    ctx.fillRect(24, 18, 120, 120);
  }

  draw();
  window.addEventListener('resize', draw);
})();


/* ══════════════════════════════════════════
   STARS
══════════════════════════════════════════ */
(function spawnStars() {
  const sizes = [2, 2, 2, 4, 4, 6];
  for (let i = 0; i < 60; i++) {
    const s  = document.createElement('div');
    const sz = sizes[Math.floor(Math.random() * sizes.length)];
    s.className = 'star';
    s.style.cssText = `
      left:              ${Math.random() * 100}%;
      top:               ${Math.random() * 72}%;
      width:             ${sz}px;
      height:            ${sz}px;
      animation-delay:   ${Math.random() * 3}s;
      animation-duration:${1.5 + Math.random() * 3}s;
      opacity:           ${0.3 + Math.random() * 0.7};
    `;
    document.body.appendChild(s);
  }
})();


/* ══════════════════════════════════════════
   BOOKSHELF
══════════════════════════════════════════ */
(function drawBookshelf() {
  const canvas = $('bookshelf');
  const ctx    = canvas.getContext('2d');
  canvas.width  = innerWidth;
  canvas.height = 64;
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = '#3d2010'; ctx.fillRect(0, 32, innerWidth, 8);
  ctx.fillStyle = '#5a3018'; ctx.fillRect(0, 30, innerWidth, 3);

  const cols  = ['#c94040','#4060c0','#50a060','#b060c0','#c07030','#405080','#e08040','#6040a0','#40a0a0','#c04080'];
  const bwArr = [8, 10, 6, 12, 8, 10, 8, 6, 12, 10];
  let x = 8;
  while (x < innerWidth - 20) {
    const w   = bwArr[Math.floor(Math.random() * bwArr.length)];
    const h   = 12 + Math.floor(Math.random() * 16);
    const col = cols[Math.floor(Math.random() * cols.length)];
    ctx.fillStyle = col;                    ctx.fillRect(x, 32 - h, w, h);
    ctx.fillStyle = 'rgba(0,0,0,.2)';       ctx.fillRect(x + w - 2, 32 - h, 2, h);
    ctx.fillStyle = 'rgba(255,255,255,.15)';ctx.fillRect(x, 32 - h, 2, h);
    x += w + 2;
  }
})();


/* ══════════════════════════════════════════
   BOY CHARACTER (canvas pixel art)
══════════════════════════════════════════ */
(function drawBoy() {
  const canvas = $('boy-canvas');
  const ctx    = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const p = (x, y, w, h, c) => px(ctx, x, y, w, h, c);

  p(10, 0,  12, 5,  '#3a2010'); // hair top
  p(11, 4,  10, 10, '#f5c89a'); // face
  p(13, 7,  2,  2,  '#2a1a0a'); // eye L
  p(17, 7,  2,  2,  '#2a1a0a'); // eye R
  p(13, 12, 1,  1,  '#c07050'); // smile
  p(14, 13, 4,  1,  '#c07050');
  p(18, 12, 1,  1,  '#c07050');
  p(10, 7,  2,  4,  '#e8b580'); // ear L
  p(20, 7,  2,  4,  '#e8b580'); // ear R
  p(14, 14, 4,  3,  '#f0b880'); // neck
  p(10, 17, 12, 13, '#4a6ea0'); // shirt
  p(9,  18, 14, 11, '#3a5e90');
  p(11, 17, 10, 2,  '#5a7eb0'); // collar
  p(7,  18, 4,  10, '#3a5e90'); // arm L
  p(21, 18, 4,  10, '#3a5e90'); // arm R
  p(7,  27, 3,  4,  '#f5c89a'); // hand L
  p(22, 27, 3,  4,  '#f5c89a'); // hand R
  p(11, 30, 5,  14, '#2a3a60'); // leg L
  p(16, 30, 5,  14, '#2a3a60'); // leg R
  p(10, 42, 6,  4,  '#1a1a2a'); // shoe L
  p(16, 42, 6,  4,  '#1a1a2a'); // shoe R
  // Book in hand
  p(23, 22, 6, 8, '#c94040');
  p(23, 22, 6, 1, '#e06060');
  p(23, 29, 6, 1, '#a02020');
  p(24, 23, 4, 6, '#fff0f0');
  p(28, 22, 1, 8, '#8a1818');
})();


/* ══════════════════════════════════════════
   GIRL CHARACTER (canvas pixel art)
══════════════════════════════════════════ */
(function drawGirl() {
  const canvas = $('girl-canvas');
  const ctx    = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const p = (x, y, w, h, c) => px(ctx, x, y, w, h, c);

  p(10, 0,  12, 6,  '#6a2a10'); // hair back
  p(9,  1,  14, 4,  '#7a3820');
  p(8,  6,  4,  20, '#6a2a10'); // long sides
  p(20, 6,  4,  20, '#6a2a10');
  p(9,  3,  14, 3,  '#8a4828'); // highlight
  p(11, 4,  10, 10, '#f7d4aa'); // face
  p(13, 7,  2,  2,  '#2a1a0a'); // eye L
  p(17, 7,  2,  2,  '#2a1a0a'); // eye R
  p(13, 6,  2,  1,  '#2a1a0a'); // lash L
  p(17, 6,  2,  1,  '#2a1a0a'); // lash R
  p(12, 11, 2,  1,  '#f0a0a0'); // blush L
  p(18, 11, 2,  1,  '#f0a0a0'); // blush R
  p(14, 12, 4,  1,  '#d07060'); // smile
  p(13, 11, 1,  1,  '#d07060');
  p(18, 11, 1,  1,  '#d07060');
  p(10, 7,  2,  4,  '#eec07a'); // ear L
  p(20, 7,  2,  4,  '#eec07a'); // ear R
  p(14, 14, 4,  3,  '#f7d4aa'); // neck
  p(9,  17, 14, 14, '#d060a0'); // dress
  p(8,  18, 16, 12, '#c04090');
  p(10, 17, 12, 2,  '#e080b0'); // collar
  p(7,  28, 18, 6,  '#c04090'); // skirt
  p(6,  31, 20, 5,  '#b03080');
  p(6,  18, 4,  10, '#c04090'); // arm L
  p(22, 18, 4,  10, '#c04090'); // arm R
  p(6,  27, 3,  4,  '#f7d4aa'); // hand L
  p(23, 27, 3,  4,  '#f7d4aa'); // hand R
  p(12, 34, 4,  10, '#f7d4aa'); // leg L
  p(17, 34, 4,  10, '#f7d4aa'); // leg R
  p(11, 42, 5,  4,  '#8a2060'); // shoe L
  p(16, 42, 5,  4,  '#8a2060'); // shoe R
  p(21, 1,  4,  4,  '#f7c948'); // hair flower
  p(22, 0,  2,  2,  '#f7c948');
  p(23, 2,  1,  1,  '#fff');
  // Bible in hand
  p(3, 17, 6, 9, '#e0f0e0');
  p(3, 17, 6, 1, '#a0c0a0');
  p(3, 25, 6, 1, '#80a080');
  p(4, 18, 4, 7, '#f0fff0');
  p(8, 17, 1, 9, '#60a060');
})();


/* ══════════════════════════════════════════
   AUDIO — Web Audio synth
══════════════════════════════════════════ */
let audioCtx     = null;
let musicStarted = false;

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playChime() {
  try {
    const ac    = getAudio();
    const notes = [523, 659, 784, 1047];

    notes.forEach((freq, i) => {
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const t = ac.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(.18, t + .05);
      gain.gain.exponentialRampToValueAtTime(.001, t + .7);
      osc.start(t); osc.stop(t + .8);
    });

    // Blow whoosh
    const buf = ac.createBuffer(1, ac.sampleRate * .4, ac.sampleRate);
    const d   = buf.getChannelData(0);
    for (let j = 0; j < d.length; j++) {
      d[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / d.length, 2) * .25;
    }
    const src  = ac.createBufferSource();
    src.buffer = buf;
    const filt = ac.createBiquadFilter();
    filt.type = 'bandpass'; filt.frequency.value = 1200; filt.Q.value = .5;
    src.connect(filt); filt.connect(ac.destination);
    src.start(ac.currentTime);
  } catch (e) {}
}

function startAmbientMusic() {
  if (musicStarted) return;
  musicStarted = true;
  try {
    const ac     = getAudio();
    const chords = [
      [261, 329, 392],
      [293, 369, 440],
      [246, 311, 392],
      [220, 277, 349]
    ];
    let ci = 0;
    function playChord() {
      const chord = chords[ci % chords.length]; ci++;
      chord.forEach(freq => {
        const osc  = ac.createOscillator();
        const gain = ac.createGain();
        const filt = ac.createBiquadFilter();
        filt.type = 'lowpass'; filt.frequency.value = 800;
        osc.connect(filt); filt.connect(gain); gain.connect(ac.destination);
        osc.type = 'sine'; osc.frequency.value = freq;
        const t = ac.currentTime;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(.04, t + 1.2);
        gain.gain.setValueAtTime(.04, t + 2.5);
        gain.gain.exponentialRampToValueAtTime(.001, t + 4.5);
        osc.start(t); osc.stop(t + 5);
      });
    }
    playChord();
    setInterval(playChord, 4000);
  } catch (e) {}
}

document.addEventListener('click', startAmbientMusic, { once: true });


/* ══════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════ */
function spawnParticles(x, y) {
  const emojis = ['✨','💛','🌟','💫','🤍','❤️','✦','•'];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist  = 60 + Math.random() * 200;
    el.style.cssText = `
      left:               ${x}px;
      top:                ${y}px;
      --tx:               ${Math.cos(angle) * dist}px;
      --ty:               ${Math.sin(angle) * dist - 90}px;
      --rot:              ${Math.random() * 720 - 360}deg;
      animation-delay:    ${Math.random() * .3}s;
      animation-duration: ${1.8 + Math.random() * .8}s;
      font-size:          ${10 + Math.random() * 12}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
}

function spawnFloatingHearts() {
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'float-heart';
      el.textContent = ['🤍','💛','✦','❤️'][Math.floor(Math.random() * 4)];
      el.style.cssText = `
        left:               ${8 + Math.random() * 84}%;
        bottom:             80px;
        animation-delay:    ${Math.random() * .5}s;
        animation-duration: ${3 + Math.random() * 2}s;
        font-size:          ${10 + Math.random() * 10}px;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }, i * 200);
  }
}


/* ══════════════════════════════════════════
   CANDLE BLOW — swap CSS classes
   style.css defines:
     .green-candle   → animated (lit)
     .green-candle.blown → plays blow-out keyframe
   Same for purple, yellow, blue.
══════════════════════════════════════════ */
const CANDLES = ['candle-green','candle-purple','candle-yellow','candle-blue'];

function blowCandles() {
  CANDLES.forEach((id, i) => {
    setTimeout(() => {
      const el = $(id);
      if (!el) return;
      // Re-clone the element to restart animation cleanly
      const clone = el.cloneNode(true);
      clone.classList.add('blown');
      el.parentNode.replaceChild(clone, el);
    }, i * 120); // stagger each candle for a natural blow effect
  });
}

function relightCandles() {
  CANDLES.forEach(id => {
    // Find by original id (it might have been replaced)
    const existing = $(id);
    if (existing) {
      existing.classList.remove('blown');
      // Re-clone to restart lit animation
      const clone = existing.cloneNode(true);
      existing.parentNode.replaceChild(clone, existing);
    }
  });
}


/* ══════════════════════════════════════════
   BLOW INTERACTION
══════════════════════════════════════════ */
let blown     = false;
let wishShown = false;

$('blow-btn').addEventListener('click', function () {
  if (blown) return;
  const btn = this;

  // Step 1 — Make a wish
  if (!wishShown) {
    wishShown = true;
    $('wish-text').classList.add('visible');
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled    = false;
      btn.textContent = '💨 Blow Now!';
    }, 2400);
    return;
  }

  // Step 2 — Blow!
  blown        = true;
  btn.disabled = true;
  $('wish-text').classList.remove('visible');

  playChime();
  blowCandles();

  // Particles from cake area
  const cakeEl   = document.querySelector('.cake');
  const cakeRect = cakeEl ? cakeEl.getBoundingClientRect() : { left: innerWidth/2, top: innerHeight/2, width: 0, height: 0 };
  spawnParticles(
    cakeRect.left + cakeRect.width  / 2,
    cakeRect.top  + cakeRect.height * 0.3
  );
  setTimeout(() => spawnFloatingHearts(), 700);

  // Reveal message card
  setTimeout(() => {
    $('message-card').style.display = 'block';
    $('replay-btn').style.display   = 'inline-block';
    $('message-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1100);
});


/* ══════════════════════════════════════════
   REPLAY
══════════════════════════════════════════ */
$('replay-btn').addEventListener('click', function () {
  blown     = false;
  wishShown = false;

  $('message-card').style.display = 'none';
  this.style.display              = 'none';
  $('wish-text').textContent      = '✨ Close your eyes... ✨';
  $('wish-text').classList.remove('visible');
  $('blow-btn').textContent       = '🕯️ Blow the Candles';
  $('blow-btn').disabled          = false;

  relightCandles();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});