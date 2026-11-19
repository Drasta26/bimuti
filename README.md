# Bimuti

Home page for Bimuti apps. **Your app. Your data. Your choice.**

Bimuti comes from *vimukti* (विमुक्ति): freedom.

- `site/` is the whole website: plain HTML and CSS, plus one tiny script (`share.js`) for the Share button. No cookies, trackers, outside scripts or fonts.
- `site/share.png` is the link preview image shown when the page is shared; `site/404.html` is the friendly "page not found" page.
- Works on one screen from 320x568 phones up to desktop; respects dark mode, larger text and reduced motion.
- `site/_headers` sets Cloudflare security headers.
- Each app lives on its own sub-address (for example `rentuk.bimuti.com`), so each app's on-device data stays separate.

Licence: MIT.
