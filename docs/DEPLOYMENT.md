# Deployment Guide

This is a static website — no server, database, or build step required.
Any static file host will work.

---

## Recommended Hosting Options

### Option 1: GitHub Pages (Free, Recommended)

Best for: portfolios, no custom domain needed initially.

Steps:
1. Create a GitHub account if you don't have one
2. Create a new public repository (e.g. "portfolio" or "saarsharir.github.io")
3. Upload the entire project folder to the repository
4. Go to Settings > Pages > Source: select "main" branch, root folder
5. Your site will be live at: https://yourusername.github.io/portfolio

Custom domain: In Settings > Pages, add your domain and set a CNAME DNS record.

### Option 2: Netlify (Free, Best for Custom Domains)

Steps:
1. Go to netlify.com and sign up
2. Drag and drop your portfolio folder onto the Netlify dashboard
3. Your site is live in seconds at a random URL
4. Rename the site and add a custom domain in Site Settings

Netlify also supports auto-deploy from GitHub: connect your repo and it redeploys on every push.

### Option 3: Vercel (Free)

Steps:
1. Go to vercel.com and sign up with GitHub
2. Click "New Project" and import your portfolio repository
3. No configuration needed — click Deploy
4. Add a custom domain in Project Settings > Domains

### Option 4: Shared Hosting / cPanel

Upload the entire project folder via FTP or cPanel File Manager to your public_html directory.
Ensure index.html is in the root of the uploaded folder.

---

## File Checklist Before Deploying

Make sure you have updated these before going live:

- [ ] Replace `saar@example.com` with your real email in index.html
- [ ] Replace GitHub URL with your real GitHub profile
- [ ] Replace LinkedIn URL with your real LinkedIn profile
- [ ] Add your real resume PDF to `assets/saar-sharir-cv.pdf`
- [ ] Update experience dates and role titles in index.html
- [ ] Review and edit `data/projects.json` with your real projects
- [ ] Add your real name to footer copyright line

---

## Updating the Website

To update content after deploying:

1. Edit the relevant file locally (HTML, JSON, CSS)
2. If using GitHub Pages or Vercel: commit and push — site updates automatically
3. If using Netlify drag-and-drop: drag the updated folder again
4. If using FTP: upload the changed files

Changes to `data/projects.json` only require re-uploading that one file.

---

## Contact Form

The contact form currently simulates a send. To make it actually send emails:

Option A — Formspree (Easiest):
1. Go to formspree.io and create a free account
2. Create a new form and get your form endpoint URL
3. In index.html, find the `<form>` element and add: `action="https://formspree.io/f/YOUR_ID" method="POST"`
4. Remove the JavaScript form handler or keep it for the UX animation

Option B — EmailJS:
1. Sign up at emailjs.com
2. Connect your email account
3. Replace the ContactForm.init() simulation in main.js with the EmailJS SDK call

---

## Performance Tips

- Compress images in images/projects/ before uploading (use TinyPNG or Squoosh)
- The Google Fonts preload is automatic via the @import in style.css
- For best performance, consider self-hosting fonts (download and serve locally)
- Enable Gzip/Brotli compression on your hosting provider if available

---

## Custom Domain Setup (All Providers)

1. Buy a domain from Namecheap, Google Domains, or similar
2. In your DNS settings, add:
   - A record pointing to your host's IP (check host's documentation)
   - Or CNAME record: www → your-site.netlify.app (for Netlify)
3. Enable HTTPS/SSL — all recommended hosts do this automatically
