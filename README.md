# I Still Call Myself a Designer — Presentation Site

A presentation-style Next.js microsite designed for a live talk in a civic context.

## Stack
- Next.js + React + TypeScript
- Tailwind CSS

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Controls
- `→` or `Space`: next slide
- `←`: previous slide
- `O`: toggle overview panel
- `P`: presentation mode
- Mouse wheel / trackpad scroll: snap slide navigation
- Click overview items to jump slides

## Content architecture
- Slide content is stored in `content/slides.ts`.
- Components render from this structured data.
- Each slide includes a `notes` field for hidden speaker notes.

## Replace case study content later
1. Open `content/slides.ts`.
2. Update `case1`, `case2`, and `case3` `data` + `subtitle` + `notes`.
3. For richer visuals, add fields (e.g. `metrics`, `journeySteps`) to the case study slides.
4. Update the rendering logic in `components/Slides.tsx` for new fields.

## Design intent
- Legibility-first layout for live speaking.
- Subtle interactions: constellation, inside/outside toggle, interactive Double Diamond, before/after slider, workshop timer.
- Calm civic-modern palette and restrained motion.


## Deploy on Railway ("Rail")
Yes — this project can be deployed to Railway as a standard Next.js app.

### Quick steps
1. Push this repo to GitHub.
2. In Railway, create a **New Project** → **Deploy from GitHub repo**.
3. Select this repository and branch.
4. Railway will detect Node/Next.js and run:
   - build: `npm install && npm run build`
   - start: `node .next/standalone/server.js`
5. After first deploy, open the generated Railway domain.

### Recommended environment
- `NODE_ENV=production`
- `NPM_CONFIG_PRODUCTION=false` (only if Railway install behavior needs adjustment)

### Notes
- `railway.json` is included to make deploy behavior explicit.
- No database or external services are required for this presentation build.
- For custom domains, attach your domain in Railway project settings.


### Railway deployment troubleshooting
If deployment fails on Railway, the most common cause is process start mismatch for Next.js. This project now uses `output: "standalone"` and starts with `node .next/standalone/server.js` for better platform compatibility.

Checklist:
1. Confirm Railway service uses Node 20+ (repo includes `.nvmrc`).
2. Confirm build logs include `next build` success.
3. Confirm start command is `node .next/standalone/server.js`.
4. Redeploy after clearing build cache if Railway reused an old build artifact.
