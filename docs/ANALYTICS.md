# Analytics & Traffic Logging

This portfolio includes two analytics systems: a built-in localStorage logger and
integration hooks for Plausible Analytics.

---

## System 1: Built-in localStorage Analytics

### What It Tracks

Every page visit and project view is logged with:

- event type (pageview / project_view)
- page_url
- timestamp (ISO 8601)
- referrer (source URL or "direct")
- device_type (mobile / desktop)
- session_id (unique per browser session)
- project_name (for project_view events)

### How It Works

The Analytics module in js/main.js runs on every page load:

```javascript
Analytics.init();         // logs a pageview
Analytics.trackProject(); // logs a project_view when a modal opens
```

Data is stored in the visitor's browser under the key: `ss-analytics-log`
Maximum 500 entries are kept (oldest are removed when limit is reached).

### Viewing Analytics Data

Open your browser DevTools (F12) on any page of the site, then run in the Console:

```javascript
// View all logged events
const log = JSON.parse(localStorage.getItem('ss-analytics-log') || '[]');
console.table(log);

// Count pageviews
log.filter(e => e.event === 'pageview').length;

// Count unique sessions
new Set(log.map(e => e.session_id)).size;

// Most viewed projects
const projects = log.filter(e => e.event === 'project_view');
const counts = {};
projects.forEach(e => counts[e.project_name] = (counts[e.project_name] || 0) + 1);
console.table(counts);

// Traffic by device type
const devices = log.reduce((acc, e) => {
  acc[e.device_type] = (acc[e.device_type] || 0) + 1; return acc;
}, {});
console.table(devices);

// Traffic by referrer
const refs = log.reduce((acc, e) => {
  const src = e.referrer || 'direct';
  acc[src] = (acc[src] || 0) + 1; return acc;
}, {});
console.table(refs);
```

### Limitations

- Data is stored per-visitor in their browser — you cannot aggregate across all visitors
- Data is lost if visitor clears browser storage
- This is suitable for personal reference, not production analytics

---

## System 2: Plausible Analytics (Recommended for Real Traffic Data)

Plausible is a privacy-friendly, GDPR-compliant analytics service that gives you real
visitor data across all users.

### Setup

1. Go to plausible.io and create an account (has a free trial)
2. Add your domain
3. In index.html and pages/*.html, uncomment this line in the `<head>`:

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.js"></script>
```

Replace `yourdomain.com` with your actual domain.

4. The Analytics module in main.js already fires Plausible events if the script is loaded:

```javascript
if (window.plausible) window.plausible(event, { props: extra });
```

This means project views are automatically tracked as custom events in Plausible.

### What Plausible Tracks

- Unique visitors
- Pageviews per page
- Referrer sources (Google, GitHub, LinkedIn, direct, etc.)
- Country (approximate)
- Device type (mobile/desktop)
- Custom events (project views, with project name)

---

## System 3: Umami (Self-Hosted Alternative)

Umami is a free, open-source, self-hostable analytics tool.

### Setup

1. Deploy Umami on Railway, Fly.io, or your own server (see umami.is/docs)
2. Get your tracking script URL and website ID
3. Add to `<head>`:

```html
<script async defer data-website-id="YOUR_WEBSITE_ID" src="https://your-umami-instance.com/umami.js"></script>
```

4. The Analytics module fires `window.umami.track()` automatically if present.

---

## Disabling Analytics

To disable the built-in localStorage logger, open `js/main.js` and find the `log()` function.
Comment out or delete the localStorage block:

```javascript
// try {
//   const key = 'ss-analytics-log';
//   ...
// } catch (e) {}
```

To disable Plausible, simply remove or comment out the `<script>` tag in the HTML files.

---

## Privacy Considerations

- The localStorage analytics logs are stored only in each visitor's own browser
- No data is sent to any server by the built-in system
- Plausible does not use cookies and is GDPR compliant by design
- Umami, when self-hosted, keeps all data on your own infrastructure
- No personally identifiable information (PII) is collected or stored by any of these systems
- Consider adding a privacy note to your site footer if deploying Plausible

---

## Recommended Setup

For a real deployed portfolio, use Plausible:
- Free 30-day trial, then ~$9/month
- Gives you real cross-visitor data with referrer breakdown
- Shows which projects get the most clicks
- No cookie banners required
