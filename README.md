# World Cup 2026 Predictions — React app

## Local dev
npm install
npm run dev

## How it loads data
On load, the app fetches /predictions/manifest.json, then /predictions/{date}.json
for each date listed. Both live in public/predictions/ so they're copied verbatim
into the production build. If the manifest is missing or empty (e.g. a fresh
deploy before the first day's data exists), it falls back to bundled sample
data from June 18, 2026 in src/data/fallbackData.js, with a visible notice.

## Keeping it updated automatically
Have your scheduled prediction agent (Antigravity, or whatever you use) write
each day's file to public/predictions/{date}.json and rewrite
public/predictions/manifest.json to include every date that has a file, then
commit and push to the `main` branch of this repo.

The included .github/workflows/deploy.yml rebuilds the site and redeploys to
GitHub Pages automatically on every push to main — no manual step after the
agent commits.

## One-time GitHub Pages setup
1. Push this repo to GitHub.
2. In the repo's Settings -> Pages, set "Source" to "GitHub Actions."
3. If deploying to https://USERNAME.github.io/REPO_NAME/ (not a custom
   domain or a username.github.io root repo), set `base: '/REPO_NAME/'` in
   vite.config.js instead of './'.
4. Push to main once — the Action will build and publish automatically.

## If your agent doesn't have git push access
Either grant it access (configure git credentials it can use to commit and
push to this repo), or have it write the JSON files to a folder you sync
manually/with a simple script that does `git add -A && git commit -m "predictions" && git push`.
