# Bimuti

Home page for Bimuti apps. **Your app. Your data. Your choice.**

Bimuti comes from *vimukti* (विमुक्ति): freedom.

- `site/` is the whole website: plain HTML and CSS, plus two tiny scripts (`share.js` for the Share button, `pema-gate.js` for the PeMA beta code). No cookies, trackers, outside scripts or fonts.
- `site/share.png` is the link preview image shown when the page is shared; `site/404.html` is the friendly "page not found" page.
- Works on one screen from 320x568 phones up to desktop; respects dark mode, larger text and reduced motion.
- `site/_headers` lists the security headers we want. GitHub Pages (our current host) does not apply this file; it takes effect only on a host that supports it, such as Cloudflare Pages. Each page also sets its own Content Security Policy and no-referrer rule.
- `site/privacy.html` is the plain-English privacy page; `site/sitemap.xml`, `site/robots.txt` and `site/manifest.webmanifest` help search engines and phones.
- `site/pema-gate.js` checks the PeMA beta code on the visitor's device (a light gate for testers, not security).
- Each app lives on its own sub-address (for example `rentuk.bimuti.com`), so each app's on-device data stays separate.

Licence: MIT.
