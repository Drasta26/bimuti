// Gentle depth for the home page. Runs only on this device; nothing is sent anywhere.
// - On computers, the background layers shift slightly with the pointer, and a soft
//   light follows the pointer over the app cards.
// Everything stays still for people who prefer less motion.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var scene = document.querySelector('.scene');

  if (reduce.matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  // Pointer depth: layers move at different speeds, like looking into the scene.
  var tx = 0, ty = 0, queued = false;
  window.addEventListener('pointermove', function (e) {
    tx = (e.clientX / window.innerWidth) * 2 - 1;
    ty = (e.clientY / window.innerHeight) * 2 - 1;
    if (!queued && scene) {
      queued = true;
      requestAnimationFrame(function () {
        scene.style.setProperty('--px', tx.toFixed(3));
        scene.style.setProperty('--py', ty.toFixed(3));
        queued = false;
      });
    }
  }, { passive: true });

  // Soft light that follows the pointer on the app cards.
  document.querySelectorAll('.app').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var b = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - b.left) + 'px');
      card.style.setProperty('--my', (e.clientY - b.top) + 'px');
    });
  });
})();
