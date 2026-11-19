// PeMA beta gate: the code is today's date as ddmmyy (UK time, or the visitor's own date).
// A light gate for testers, not a password: nothing is sent or stored by this page.
(function () {
  'use strict';
  var PEMA_URL = 'https://pema.bimuti.com/';
  var open = document.getElementById('pema-open');
  var dlg = document.getElementById('pema-gate');
  if (!open || !dlg || typeof dlg.showModal !== 'function') return;
  var form = document.getElementById('gate-form');
  var input = document.getElementById('gate-code');
  var msg = document.getElementById('gate-msg');

  function ddmmyy(timeZone) {
    var opts = { day: '2-digit', month: '2-digit', year: '2-digit' };
    if (timeZone) opts.timeZone = timeZone;
    var parts = {};
    new Intl.DateTimeFormat('en-GB', opts).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    return parts.day + parts.month + parts.year;
  }

  open.addEventListener('click', function () {
    input.value = ''; msg.textContent = ''; input.removeAttribute('aria-invalid');
    dlg.showModal();
    input.focus();
  });
  document.getElementById('gate-cancel').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  input.addEventListener('input', function () { input.value = input.value.replace(/\D/g, '').slice(0, 6); msg.textContent = ''; });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var code = input.value;
    var ok = code.length === 6 && (code === ddmmyy('Europe/London') || code === ddmmyy());
    if (ok) { msg.textContent = 'Opening PeMA…'; window.location.href = PEMA_URL; return; }
    input.setAttribute('aria-invalid', 'true');
    msg.textContent = code.length < 6 ? 'Please enter all 6 digits.' : 'That code is not right. Please try again.';
    input.select();
  });
})();
