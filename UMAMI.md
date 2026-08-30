# UMAMI: self-hosted analytics for this site

This document is the complete playbook: what was implemented in the repo,
how to deploy Umami on your homelab, how to wire the site to it, and how
to read the numbers afterwards.

Why Umami: free, open source, cookieless (no GDPR consent banner needed),
self-hosted on infrastructure you already run, and the dashboard itself is
nice platform-engineering material.

What you get once live: unique visitors, countries, referrers (LinkedIn vs
Google vs GitHub vs direct), per-page views including /es and /it paths,
read-depth on every blog post, CV/email/LinkedIn click events, and Core Web
Vitals performance data.

---

## 1. What was implemented in the repo

| File | Change |
|---|---|
| `src/config.ts` | `ANALYTICS_SRC` and `ANALYTICS_WEBSITE_ID`, both empty by default |
| `src/components/BaseHead.astro` | Deferred tracker tag, rendered only when both config values are set; pinned to the production hostname via `data-domains`; `data-performance="true"` collects Core Web Vitals |
| `src/layouts/BaseLayout.astro` | On blog posts only (all locales): one-shot `post_read` event when the reader passes 75% scroll, or immediately when the post fits on screen. Includes `slug` and `locale` in the payload |
| `src/components/Hero.astro` | `data-umami-event="email_click"` on the email button, `data-umami-event="cv_download"` on the pdf button |
| `src/components/Footer.astro` | `email_click` on both email links, `linkedin_click` on the contact band LinkedIn button |
| `src/pages/cv.astro` | `cv_download` on the pdf button |
| `src/pages/now.astro` | `linkedin_click` on the LinkedIn link |
| `src/types/umami.d.ts` | Type for the `window.umami` global so `astro check` stays clean |

Behavior contract:

- Analytics ship OFF. Empty config values mean zero analytics code renders.
- The `data-umami-event` attributes are inert without the tracker script:
  no tracker loaded means no listeners, so they cost nothing.
- `data-domains` makes the tracker ignore any hostname that is not exactly
  `alvaro-rrdt.github.io` (derived automatically from `SITE.url`), so local
  dev and preview builds never record anything.
- The tracker is `defer` and third-party: if the homelab is down, the site
  loads exactly the same and stats simply pause.

Events emitted:

| Event | Fires when | Notes |
|---|---|---|
| pageview (automatic) | every page load and path change | covers posts, locale variants, /cv, /uses, /now |
| `post_read` | blog post scrolled past 75% | payload: `slug` (pathname), `locale` (en/es/it) |
| `cv_download` | hero pdf or /cv pdf click | buttons only exist once `CV_PDF_READY` is true in `src/data/cv.ts` |
| `email_click` | mailto CTAs in hero and footer | |
| `linkedin_click` | LinkedIn CTAs in footer contact band and /now | |

Not tracked (on purpose): the palette's email entry (it navigates via JS,
no anchor to tag), the quiet socials rows, and RSS readers (they fetch
rss.xml without loading pages).

---

## 2. Deploy Umami on the homelab

### Requirements

- A machine running Docker with the compose plugin (you have this).
- A public HTTPS endpoint for the container, via your reverse proxy or
  tunnel: `https://umami.<your-domain>`. HTTPS is mandatory: the site is
  served over HTTPS and browsers silently block mixed-content scripts.
- Roughly 300 MB RAM for the two containers.

### Files required

Two files in one directory on the homelab, nothing else. All persistent
data lives in a named Docker volume.

```
umami/
  docker-compose.yml
  .env
```

### `umami/.env`

Generate the values first (run each on the homelab):

```sh
openssl rand -hex 32   # -> UMAMI_APP_SECRET
openssl rand -hex 16   # -> UMAMI_DB_PASSWORD
# optional, only if you want 2FA on the dashboard:
openssl rand -hex 32   # -> UMAMI_2FA_KEY
```

```dotenv
# umami/.env
UMAMI_APP_SECRET=paste-output-of-first-command
UMAMI_DB_PASSWORD=paste-output-of-second-command
# UMAMI_2FA_KEY=paste-output-of-third-command
```

Keep this file private; it never leaves the homelab.

### `umami/docker-compose.yml`

```yaml
services:
  umami:
    image: ghcr.io/umami-software/umami:latest # consider pinning a release tag
    ports:
      # host-binding so only your reverse proxy reaches it:
      - "127.0.0.1:3000:3000"
      # if your proxy is itself a container, drop the ports block and put
      # both services on a shared docker network instead
    environment:
      DATABASE_URL: postgresql://umami:${UMAMI_DB_PASSWORD}@db:5432/umami
      APP_SECRET: ${UMAMI_APP_SECRET}
      DISABLE_TELEMETRY: 1
      # optional hardening, see section 7:
      # TWO_FACTOR_ENCRYPTION_KEY: ${UMAMI_2FA_KEY}
      # TRACKER_SCRIPT_NAME: metrics.js
      # COLLECT_API_ENDPOINT: /api/metrics
    depends_on:
      db:
        condition: service_healthy
    init: true
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "curl http://localhost:3000/api/heartbeat"]
      interval: 5s
      timeout: 5s
      retries: 5
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: ${UMAMI_DB_PASSWORD}
    volumes:
      - umami-db-data:/var/lib/postgresql/data
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
volumes:
  umami-db-data:
```

Notes:

- Umami v3 requires PostgreSQL; the official image expects it (the service
  name `db` and credentials live only in this compose stack).
- Do not set a timezone on the `db` service: Postgres defaults to UTC,
  which is what Umami wants for consistent timestamps.
- On first start the app creates its tables automatically.

### Start it

```sh
cd umami
docker compose up -d
docker compose logs -f umami   # wait for "Ready", then Ctrl+C
```

Dashboard is now on `http://127.0.0.1:3000` on the homelab (and nowhere
else yet, thanks to the host binding).

### Expose it

Put your usual TLS layer in front and route `https://umami.<your-domain>`
to `127.0.0.1:3000` (nginx/Caddy proxy) or `http://<host>:3000`
(Cloudflare Tunnel, Tailscale Funnel, whatever your topology uses). Verify
`curl -I https://umami.<your-domain>/script.js` returns 200 over HTTPS
before moving on; that URL is exactly what the site will load.

### First login

1. Open `https://umami.<your-domain>`.
2. Username `admin`, password `umami`.
3. Change the password immediately (profile icon, top right).
4. Recommended: enable 2FA (profile settings). It requires the
   `TWO_FACTOR_ENCRYPTION_KEY` env var, so uncomment it in the compose
   file first and `docker compose up -d` again.

---

## 3. Dashboard setup

1. Sidebar: **Add website** (or Websites, then the edit pencil).
2. Name: `Portfolio`. Domain: `alvaro-rrdt.github.io` (no https, no
   trailing slash; must match the real hostname, since `data-domains` on
   the site matches it exactly).
3. Open the website's **Edit** dialog: the **Tracking code** section shows
   a snippet with `data-website-id="<uuid>"`. Copy that UUID.
4. Leave **outbound link** style settings alone; clicks here are captured
   by the explicit `data-umami-event` attributes already in the site.

Optional adblock resistance (do this now, not later, because the script
URL bakes into the site config): set `TRACKER_SCRIPT_NAME=metrics.js` and
`COLLECT_API_ENDPOINT=/api/metrics` in the compose env, `docker compose
up -d`, and use `https://umami.<your-domain>/metrics.js` as the script URL
everywhere below. Blocklists match the default `/script.js` path and
`/api/send` endpoint by name, so renaming both dodges them.

---

## 4. Wire the site to your instance

Edit two constants in `src/config.ts`:

```ts
export const ANALYTICS_SRC = "https://umami.<your-domain>/script.js"; // or metrics.js
export const ANALYTICS_WEBSITE_ID = "<uuid from tracking code dialog>";
```

Then ship it:

```sh
npx astro check                      # must report 0 errors
npm run build                        # must be clean
find dist -name '*.js' | wc -l       # must still print 0
```

Commit on this session's GitButler branch and land to main with
`but land <top-branch> --whole-stack` so the Forgejo mirror updates and
GitHub Actions deploys. Analytics turn on with the deploy, not before.

(Until you do this, everything stays off: the site currently ships with
no analytics code at all.)

---

## 5. Verify it works

1. First, exclude yourself from your own stats. On
   `https://alvaro-rrdt.github.io`, open devtools console and run:
   ```js
   localStorage.setItem("umami.disabled", 1);
   ```
   This is per-browser, per-site; repeat on any other browser you test
   with. Remove with `localStorage.removeItem("umami.disabled")`.
2. Reload the site. Devtools, Network tab: you should see
   `script.js` (200, from your Umami host) and a `POST` to `/api/send`.
3. The Umami dashboard should show your visit within seconds (the
   homepage has a realtime view).
4. Open any blog post, scroll to the bottom: an event named `post_read`
   appears under **Events**, with `slug` and `locale` properties.
5. Click an email CTA: `email_click` appears. (The pdf buttons only exist
   after `CV_PDF_READY` is flipped to true in `src/data/cv.ts`.)

Local end-to-end testing: `data-domains` deliberately blocks localhost
recording, so verify against production. If you ever need local recording,
temporarily comment out the `data-domains` attribute in BaseHead.astro,
and revert before committing.

Countries empty in the dashboard? Umami reads visitor location from CDN
geo headers when the hosting platform provides them; GitHub Pages provides
none, so detection falls back to the GeoIP database inside the container.
If it still shows nothing, set `GEO_DATABASE_URL` in the compose env to a
MaxMind-compatible MMDB URL and restart.

---

## 6. Reading the data

| Your question | Where to look |
|---|---|
| How many people visited | homepage cards: Visitors and Pageviews (unique vs total) |
| From where (geography) | **Countries** panel |
| From where (sources) | **Referrers** panel: expect linkedin.com, google, github.com, direct |
| Which posts get read | Pages panel filtered to `/blog`, or **Events > post_read** for engaged reads |
| Do people finish posts | `post_read` count vs pageview count per slug; the gap is bounce |
| Do es/it translations earn their keep | `post_read` properties: filter `locale = es` or `it` |
| Do recruiters take action | `cv_download`, `email_click`, `linkedin_click` event counts |
| Is the site fast for visitors | **Performance** report (Core Web Vitals, from `data-performance`) |

Realistic expectation for a portfolio: modest numbers. Even 30 unique
visitors with 3 `cv_download` events is a working recruiting funnel.

---

## 7. Maintenance and hardening

**Updates**

```sh
cd umami
docker compose pull
docker compose up -d
```

Database migrations apply automatically on container start. Pin the image
tag in production if surprises during your job hunt would annoy you.

**Backups** (the volume is the only state that matters)

```sh
docker compose exec db pg_dump -U umami umami | gzip > umami-$(date +%F).sql.gz
```

Restore: `gunzip -c file.sql.gz | docker compose exec -T db psql -U umami umami`.
Add a weekly cron for the dump if you care about history.

**Ops quick reference**

```sh
docker compose logs -f umami   # app logs
docker compose restart umami   # bounce after env changes
docker compose down            # stops; data survives in the volume
```

**Hardening checklist**

- Strong dashboard password, 2FA enabled (needs `TWO_FACTOR_ENCRYPTION_KEY`).
- `DISABLE_TELEMETRY: 1` (already in the compose above).
- Respect visitor Do Not Track: add `data-do-not-track="true"` to the tag
  in `BaseHead.astro` if you want it (fewer data, more goodwill).
- Fully private mode: `PRIVATE_MODE: 1` disables all external calls from
  the container (also disables website icons in the dashboard).
- Keep the dashboard reachable but know that `script.js` and the collect
  endpoint must stay public for the site to record.

**If you decommission it**: empty `ANALYTICS_SRC` /
`ANALYTICS_WEBSITE_ID` in `src/config.ts`, land, deploy. The site goes
back to shipping zero analytics code.

---

## 8. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| No `script.js` request at all | config values empty, or the deploy never landed | check `src/config.ts`, confirm the deploy went out |
| `script.js` blocked in devtools | mixed content or adblock | HTTPS on the Umami host is mandatory; rename tracker per section 3 |
| Script loads, no `/api/send` | `data-domains` mismatch | the hostname must match `SITE.url`'s hostname exactly (www matters) |
| Visits but no countries | no CDN geo headers + GeoIP issue | set `GEO_DATABASE_URL`, restart |
| `post_read` never fires | tracker failed to load (script guards on `window.umami`) | fix script loading first; the event script is a silent no-op without it |
| Dashboard unreachable after reboot | containers not restarting | `docker compose ps`, check `restart: always` survived |

Docs: https://umami.is/docs (v3). Source: https://github.com/umami-software/umami.
