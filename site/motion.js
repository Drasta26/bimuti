// Gentle motion for the home page: seeds of light rising free (vimukti), and a soft
// light that follows the pointer over the app cards on computers.
// Runs only on this device. Stops in background tabs and for people who prefer less motion.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  // ---- Pointer light on the app cards (mouse and trackpad only) ----
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.app').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var b = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - b.left) + 'px');
        card.style.setProperty('--my', (e.clientY - b.top) + 'px');
      });
    });
  }

  // ---- Rising seeds ----
  var cv = document.querySelector('.seeds');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var dark = window.matchMedia('(prefers-color-scheme: dark)');
  var fine = window.matchMedia('(pointer: fine)').matches;
  var W = 0, H = 0, dpr = 1, seeds = [], mx = -9999, my = -9999, raf = 0, last = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var want = Math.max(10, Math.min(30, Math.round(W * H / 26000)));
    while (seeds.length < want) seeds.push(make(true));
    seeds.length = want;
  }
  function make(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 12,
      r: 1.3 + Math.random() * 2.6,
      v: 0.10 + Math.random() * 0.22,      // pixels per frame: slow
      sway: Math.random() * 6.28,
      age: 0
    };
  }
  function frame(t) {
    var dt = last ? Math.min(50, t - last) / 16.7 : 1;
    last = t;
    ctx.clearRect(0, 0, W, H);
    var rgb = dark.matches ? '255,214,170' : '255,170,90';
    for (var i = 0; i < seeds.length; i++) {
      var s = seeds[i];
      s.age += dt;
      s.y -= s.v * dt;
      s.x += Math.sin(s.sway + s.age * 0.011) * 0.16 * dt;
      if (fine) {
        var dx = s.x - mx, dy = s.y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110 && d > 0.1) { s.x += dx / d * 0.7 * dt; s.y += dy / d * 0.7 * dt; }
      }
      var fade = Math.min(1, s.age / 150) * Math.max(0, Math.min(1, (s.y + 12) / (H * 0.3)));
      var R = s.r * 4.2;
      var g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, R);
      g.addColorStop(0, 'rgba(' + rgb + ',' + (0.85 * fade) + ')');
      g.addColorStop(0.35, 'rgba(' + rgb + ',' + (0.32 * fade) + ')');
      g.addColorStop(1, 'rgba(' + rgb + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(s.x, s.y, R, 0, 6.2832); ctx.fill();
      if (s.y < -16) seeds[i] = make(false);
    }
    raf = requestAnimationFrame(frame);
  }
  function start() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

  resize();
  window.addEventListener('resize', resize);
  if (fine) {
    window.addEventListener('pointermove', function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener('pointerleave', function () { mx = my = -9999; });
  }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  reduce.addEventListener && reduce.addEventListener('change', function (e) { if (e.matches) { stop(); ctx.clearRect(0, 0, W, H); } else start(); });
  start();
})();
