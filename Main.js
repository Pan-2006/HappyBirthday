/* ══════════════════════════════════════════
   UTILS
══════════════════════════════════════════ */
const $ = id => document.getElementById(id);

/** Fill a rectangle on a canvas context (pixel shorthand). */
function px(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w || 1, h || 1);
}


/* ══════════════════════════════════════════
   BACKGROUND GRADIENT SKY
══════════════════════════════════════════ */
(function initBackground() {
  const canvas = $('bg-canvas');
  const ctx    = canvas.getContext('2d');

  function draw() {
    canvas.width  = innerWidth;
    canvas.height = innerHeight;

    // Sky gradient
    const g = ctx.createLinearGradient(0, 0, 0, innerHeight);
    g.addColorStop(0,    '#0d0520');
    g.addColorStop(.3,   '#1a0a2e');
    g.addColorStop(.55,  '#3d1a55');
    g.addColorStop(.75,  '#7a3050');
    g.addColorStop(.88,  '#c95f2a');
    g.addColorStop(1,    '#e8a04a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    // Pixel moon
    ctx.fillStyle = '#fff8e0';
    [
      [0,0],[1,0],[2,0],
      [0,1],[1,1],[2,1],[3,1],
      [0,2],[1,2],[2,2],[3,2],
      [1,3],[2,3]
    ].forEach(([x, y]) => ctx.fillRect(60 + x * 8, 50 + y * 8, 8, 8));

    // Moon glow
    const mg = ctx.createRadialGradient(80, 80, 4, 80, 80, 60);
    mg.addColorStop(0, 'rgba(255,248,200,.25)');
    mg.addColorStop(1, 'transparent');
    ctx.fillStyle = mg;
    ctx.fillRect(20, 20, 120, 120);
  }

  draw();
  window.addEventListener('resize', draw);
})();


/* ══════════════════════════════════════════
   STARS
══════════════════════════════════════════ */
(function spawnStars() {
  const sizes = [2, 2, 2, 4, 4, 6];
  for (let i = 0; i < 55; i++) {
    const s   = document.createElement('div');
    const sz  = sizes[Math.floor(Math.random() * sizes.length)];
    s.className = 'star';
    s.style.cssText = `
      left:             ${Math.random() * 100}%;
      top:              ${Math.random() * 70}%;
      width:            ${sz}px;
      height:           ${sz}px;
      animation-delay:  ${Math.random() * 3}s;
      animation-duration:${1.5 + Math.random() * 3}s;
      opacity:          ${0.3 + Math.random() * 0.7}
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

  // Shelf plank
  ctx.fillStyle = '#3d2010'; ctx.fillRect(0, 32, innerWidth, 8);
  ctx.fillStyle = '#5a3018'; ctx.fillRect(0, 30, innerWidth, 3);

  // Books
  const colors  = ['#c94040','#4060c0','#50a060','#b060c0','#c07030','#405080','#e08040','#6040a0','#40a0a0','#c04080'];
  const widths  = [8, 10, 6, 12, 8, 10, 8, 6, 12, 10];
  let x = 8;

  while (x < innerWidth - 20) {
    const w   = widths[Math.floor(Math.random() * widths.length)];
    const h   = 12 + Math.floor(Math.random() * 16);
    const col = colors[Math.floor(Math.random() * colors.length)];

    ctx.fillStyle = col;               ctx.fillRect(x, 32 - h, w, h);
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(x + w - 2, 32 - h, 2, h);
    ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.fillRect(x, 32 - h, 2, h);
    x += w + 2;
  }
})();


/* ══════════════════════════════════════════
   CAKE DRAWING
══════════════════════════════════════════ */
function drawCake(ctx, blown) {
  ctx.clearRect(0, 0, 80, 100);
  const p = (x, y, w, h, c) => px(ctx, x, y, w, h, c);

  // Plate
  p(10, 90, 60, 4, '#c8a060');
  p(8,  93, 64, 3, '#a08040');

  // Bottom tier
  p(14, 65, 52, 26, '#f0a0b0');
  p(14, 65, 52,  3, '#f8c0d0');  // highlight
  p(14, 88, 52,  3, '#c07080');  // shadow
  // Frosting drips
  [[16,62,4,4],[24,60,4,6],[35,61,4,5],[46,60,5,6],[56,62,4,4]]
    .forEach(([x,y,w,h]) => p(x, y, w, h, '#fff0f5'));

  // Middle tier
  p(20, 44, 40, 22, '#f8c8a0');
  p(20, 44, 40,  3, '#fde0c0');
  p(20, 63, 40,  3, '#c89060');
  [[22,41,4,4],[30,40,4,5],[40,40,4,5],[50,41,4,4]]
    .forEach(([x,y,w,h]) => p(x, y, w, h, '#fff8f0'));

  // Top tier
  p(26, 26, 28, 19, '#b8d8a0');
  p(26, 26, 28,  3, '#d0f0b0');
  p(26, 42, 28,  3, '#80a060');
  [[28,23,4,4],[35,22,4,5],[44,23,4,4]]
    .forEach(([x,y,w,h]) => p(x, y, w, h, '#f0fff0'));

  // Hearts on bottom tier
  const heartPixels = [
    [1,0],[2,0],[4,0],[5,0],
    [0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],
    [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],
    [1,3],[2,3],[3,3],[4,3],[5,3],
    [2,4],[3,4],[4,4],
    [3,5]
  ];
  [[18,70],[52,70],[34,68]].forEach(([ox, oy]) => {
    heartPixels.forEach(([hx, hy]) => p(ox + hx, oy + hy, 1, 1, '#e84060'));
  });

  // Stars on middle tier
  [[24,52],[52,52],[38,50]].forEach(([sx, sy]) => {
    p(sx+2, sy,   1, 5, '#f7c948');
    p(sx,   sy+2, 5, 1, '#f7c948');
    p(sx+1, sy+1, 1, 1, '#f7c948');
    p(sx+3, sy+1, 1, 1, '#f7c948');
    p(sx+1, sy+3, 1, 1, '#f7c948');
    p(sx+3, sy+3, 1, 1, '#f7c948');
  });

  // Candles
  const candleX = [30, 37, 44];
  candleX.forEach((cx, i) => {
    const cy = 14 + (i === 1 ? 0 : 2);
    p(cx,   cy,     4, 14, '#f5e0a0'); // wax
    p(cx,   cy,     4,  2, '#ffe0b0'); // highlight
    p(cx+1, cy,     2, 14, '#fff5d0');
    // wick (dark when blown)
    p(cx+1, cy - 3, 2, 4, blown ? '#666' : '#222');
  });
}


/* ══════════════════════════════════════════
   FLAME ANIMATION
══════════════════════════════════════════ */
let flameFrame    = 0;
let flamesOn      = true;
let flameInterval = null;

function drawFlames(ctx, frame) {
  ctx.clearRect(0, 0, 80, 100);
  if (!flamesOn) return;

  const candleX = [30, 37, 44];
  candleX.forEach((cx, i) => {
    const cy      = 14 + (i === 1 ? 0 : 2);
    const flicker = Math.sin(frame * 0.3 + i * 2.1) * 0.4;
    const baseY   = cy - 7 + Math.round(flicker);

    // Outer flame (orange)
    ctx.fillStyle = 'rgba(255,140,20,0.85)';
    [[cx, baseY+1, 2, 4], [cx-1, baseY+2, 4, 3], [cx, baseY, 2, 2]]
      .forEach(([x, y, w, h]) => ctx.fillRect(x, y, w, h));

    // Inner flame (yellow)
    ctx.fillStyle = 'rgba(255,230,80,0.9)';
    ctx.fillRect(cx + 0.5, baseY + 2, 1, 3);

    // Core (white)
    ctx.fillStyle = 'rgba(255,255,220,.95)';
    ctx.fillRect(cx + 0.5, baseY + 3, 1, 1);

    // Glow
    const grd = ctx.createRadialGradient(cx+1, baseY+2, 0, cx+1, baseY+2, 10);
    grd.addColorStop(0, 'rgba(255,200,50,.25)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(cx - 9, baseY - 8, 20, 20);
  });
}

// Init cake & flames
const cakeCtx  = $('cake-canvas').getContext('2d');
const flameCtx = $('flame-canvas').getContext('2d');
cakeCtx.imageSmoothingEnabled  = false;
flameCtx.imageSmoothingEnabled = false;
drawCake(cakeCtx, false);

function startFlames() {
  if (flameInterval) clearInterval(flameInterval);
  flameInterval = setInterval(() => {
    flameFrame++;
    drawFlames(flameCtx, flameFrame);
  }, 80);
}
startFlames();


/* ══════════════════════════════════════════
   BOY CHARACTER
══════════════════════════════════════════ */
(function drawBoy() {
  const canvas = $('boy-canvas');
  const ctx    = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const p = (x, y, w, h, c) => px(ctx, x, y, w, h, c);

  // Hair
  p(11, 0, 10, 4, '#3a2010'); p(10, 1, 12, 3, '#3a2010');
  p(10, 0, 12, 5, '#3a2010');
  // Face
  p(11, 4, 10, 10, '#f5c89a');
  // Eyes
  p(13, 7, 2, 2, '#2a1a0a'); p(17, 7, 2, 2, '#2a1a0a');
  // Smile
  p(13, 12, 1, 1, '#c07050'); p(14, 13, 4, 1, '#c07050'); p(18, 12, 1, 1, '#c07050');
  // Ears
  p(10, 7, 2, 4, '#e8b580'); p(20, 7, 2, 4, '#e8b580');
  // Neck
  p(14, 14, 4, 3, '#f0b880');
  // Shirt
  p(10, 17, 12, 13, '#4a6ea0');
  p(9,  18, 14, 11, '#3a5e90');
  p(11, 17, 10,  2, '#5a7eb0');
  // Arms
  p(7,  18, 4, 10, '#3a5e90'); p(21, 18, 4, 10, '#3a5e90');
  p(7,  27, 3,  4, '#f5c89a'); p(22, 27, 3,  4, '#f5c89a');
  // Legs
  p(11, 30, 5, 14, '#2a3a60'); p(16, 30, 5, 14, '#2a3a60');
  p(11, 30, 4,  2, '#3a4a70'); p(17, 30, 4,  2, '#3a4a70');
  // Shoes
  p(10, 42, 6, 4, '#1a1a2a'); p(16, 42, 6, 4, '#1a1a2a');
  // Book in hand
  p(23, 22, 6, 8, '#c94040'); p(23, 22, 6, 1, '#e06060'); p(23, 29, 6, 1, '#a02020');
  p(24, 23, 4, 6, '#fff0f0'); p(28, 22, 1, 8, '#8a1818');
})();


/* ══════════════════════════════════════════
   GIRL CHARACTER
══════════════════════════════════════════ */
(function drawGirl() {
  const canvas = $('girl-canvas');
  const ctx    = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const p = (x, y, w, h, c) => px(ctx, x, y, w, h, c);

  // Long hair
  p(10, 0, 12,  6, '#6a2a10'); p(9, 1, 14, 4, '#7a3820');
  p(8,  6,  4, 20, '#6a2a10'); p(20, 6, 4, 20, '#6a2a10');
  p(9,  3, 14,  3, '#8a4828');
  // Face
  p(11, 4, 10, 10, '#f7d4aa');
  // Eyes with lashes
  p(13, 7, 2, 2, '#2a1a0a'); p(17, 7, 2, 2, '#2a1a0a');
  p(13, 6, 2, 1, '#2a1a0a'); p(17, 6, 2, 1, '#2a1a0a');
  // Blush
  p(12, 11, 2, 1, '#f0a0a0'); p(18, 11, 2, 1, '#f0a0a0');
  // Smile
  p(14, 12, 4, 1, '#d07060'); p(13, 11, 1, 1, '#d07060'); p(18, 11, 1, 1, '#d07060');
  // Ears
  p(10, 7, 2, 4, '#eec07a'); p(20, 7, 2, 4, '#eec07a');
  // Neck
  p(14, 14, 4, 3, '#f7d4aa');
  // Dress
  p(9,  17, 14, 14, '#d060a0'); p(8, 18, 16, 12, '#c04090');
  p(10, 17, 12,  2, '#e080b0');
  // Dress skirt
  p(7,  28, 18, 6, '#c04090'); p(6, 31, 20, 5, '#b03080');
  // Arms
  p(6,  18,  4, 10, '#c04090'); p(22, 18, 4, 10, '#c04090');
  p(6,  27,  3,  4, '#f7d4aa'); p(23, 27, 3,  4, '#f7d4aa');
  // Legs
  p(12, 34, 4, 10, '#f7d4aa'); p(17, 34, 4, 10, '#f7d4aa');
  // Shoes
  p(11, 42, 5, 4, '#8a2060'); p(16, 42, 5, 4, '#8a2060');
  // Hair flower
  p(21, 1, 4, 4, '#f7c948'); p(22, 0, 2, 2, '#f7c948'); p(23, 2, 1, 1, '#fff');
  // Bible in hand
  p(3, 17, 6, 9, '#e0f0e0'); p(3, 17, 6, 1, '#a0c0a0'); p(3, 25, 6, 1, '#80a080');
  p(4, 18, 4, 7, '#f0fff0'); p(8, 17, 1, 9, '#60a060');
})();


/* ══════════════════════════════════════════
   AUDIO  — Web Audio synth
══════════════════════════════════════════ */
let audioCtx = null;

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playChime() {
  try {
    const ac    = getAudio();
    const notes = [523, 659, 784, 1047];

    // Ascending chime
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

    // Blow whoosh (white noise burst)
    const buf = ac.createBuffer(1, ac.sampleRate * 0.4, ac.sampleRate);
    const d   = buf.getChannelData(0);
    for (let j = 0; j < d.length; j++) {
      d[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / d.length, 2) * 0.25;
    }
    const src  = ac.createBufferSource();
    src.buffer = buf;
    const filt = ac.createBiquadFilter();
    filt.type            = 'bandpass';
    filt.frequency.value = 1200;
    filt.Q.value         = 0.5;
    src.connect(filt); filt.connect(ac.destination);
    src.start(ac.currentTime);
  } catch (e) {}
}

function startMusic() {
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
        filt.type            = 'lowpass';
        filt.frequency.value = 800;
        osc.connect(filt); filt.connect(gain); gain.connect(ac.destination);
        osc.type            = 'sine';
        osc.frequency.value = freq;
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

let musicStarted = false;
document.addEventListener('click', startMusic, { once: true });


/* ══════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════ */
function spawnParticles(x, y) {
  const emojis = ['✨','💛','🌟','💫','🤍','❤️','✦','•'];
  for (let i = 0; i < 28; i++) {
    const el    = document.createElement('div');
    el.className = 'particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const angle = Math.random() * Math.PI * 2;
    const dist  = 60 + Math.random() * 180;
    el.style.cssText = `
      left:               ${x}px;
      top:                ${y}px;
      --tx:               ${Math.cos(angle) * dist}px;
      --ty:               ${Math.sin(angle) * dist - 80}px;
      --rot:              ${Math.random() * 720 - 360}deg;
      animation-delay:    ${Math.random() * 0.3}s;
      animation-duration: ${1.8 + Math.random() * 0.8}s;
      font-size:          ${10 + Math.random() * 10}px
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}

function spawnFloatingHearts() {
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const el    = document.createElement('div');
      el.className = 'float-heart';
      el.textContent = ['🤍','💛','✦','❤️'][Math.floor(Math.random() * 4)];
      el.style.cssText = `
        left:               ${10 + Math.random() * 80}%;
        bottom:             80px;
        animation-delay:    ${Math.random() * 0.5}s;
        animation-duration: ${3 + Math.random() * 2}s;
        font-size:          ${10 + Math.random() * 8}px
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }, i * 200);
  }
}


/* ══════════════════════════════════════════
   BLOW INTERACTION
══════════════════════════════════════════ */
let blown     = false;
let wishShown = false;

$('blow-btn').addEventListener('click', function () {
  if (blown) return;
  const btn = this;

  // Step 1 — show wish moment
  if (!wishShown) {
    wishShown = true;
    $('wish-text').classList.add('visible');
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled    = false;
      btn.textContent = '💨 Blow Now!';
    }, 2200);
    return;
  }

  // Step 2 — blow out candles
  blown        = true;
  btn.disabled = true;
  $('wish-text').classList.remove('visible');
  playChime();

  // Extinguish flames
  flamesOn = false;
  flameCtx.clearRect(0, 0, 80, 100);
  if (flameInterval) { clearInterval(flameInterval); flameInterval = null; }
  drawCake(cakeCtx, true);

  // Particles
  const cakeRect = $('cake-canvas').getBoundingClientRect();
  spawnParticles(
    cakeRect.left + cakeRect.width / 2,
    cakeRect.top  + cakeRect.height * 0.3
  );
  setTimeout(() => spawnFloatingHearts(), 600);

  // Reveal message
  setTimeout(() => {
    $('message-card').style.display = 'block';
    $('replay-btn').style.display   = 'inline-block';
  }, 1000);
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
  $('blow-btn').textContent       = '🕯️ Blow the Candles';
  $('blow-btn').disabled          = false;

  flamesOn = true;
  drawCake(cakeCtx, false);
  startFlames();
});
