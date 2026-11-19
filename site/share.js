// Share button: uses the phone's own share sheet, or copies the link on computers.
// Nothing is sent anywhere by this page.
(function () {
  'use strict';
  var btn = document.getElementById('share');
  if (!btn) return;
  var label = btn.querySelector('span');
  var url = 'https://bimuti.com/';
  var canCopy = navigator.clipboard && window.isSecureContext;
  if (!navigator.share && !canCopy) return;
  btn.hidden = false;
  btn.addEventListener('click', function () {
    if (navigator.share) {
      navigator.share({ title: 'Bimuti', text: 'Beautiful, simple apps that never see your data.', url: url }).catch(function () {});
      return;
    }
    navigator.clipboard.writeText(url).then(function () {
      label.textContent = 'Copied'; btn.setAttribute('aria-label', 'Link copied');
      setTimeout(function () { label.textContent = 'Share'; btn.setAttribute('aria-label', 'Share Bimuti'); }, 2000);
    });
  });
})();
