# World Cup 2026 Predictions — React app

## Local dev
npm install
npm run dev

## How it loads data
On load, the app fetches /predictions/manifest.json, then /predictions/{date}.json
for each date listed. Both live in public/predictions/ so they're copied verbatim
into the production build. If the manifest is missing or empty, it falls back to
bundled sample data from June 18, 2026 in src/data/fallbackData.js, with a visible notice.

## The agent
One agent prompt, saved verbatim in agent-prompts/daily-agent-prompt.md, runs once
per day, ideally in the morning before that day's first kickoff. Each run does two
jobs in sequence: it grades any finished, ungraded matches by adding actual_result,
actual_winner, graded_correct, and graded_at to the existing match object, then
generates fresh predictions for the day's not-yet-kicked-off matches. It writes any
modified date files plus today's file, updates manifest.json, and does a single
git commit and push covering everything touched that run.

## Match object schema
- market_baseline / adjusted_probability — win/draw/win %, averaged across two
  sportsbooks, then adjusted only by named, verified facts
- predicted_outcome, confidence (low/medium/high)
- key_factors — the specific facts behind any adjustment from baseline
- unverified_or_unknown — anything that couldn't be confirmed
- sources — every source used, including both named sportsbooks
- weather_check — { checked, conditions, asymmetric_factor_found }. Only renders
  on the site when asymmetric_factor_found is true; most days this is false.
- social_sentiment_signal — Reddit-only fan-mood snapshot, informational only,
  never allowed to move adjusted_probability
- actual_result, actual_winner, graded_correct, graded_at — added once a match
  is settled; absent until then

## Keeping it updated automatically
The included .github/workflows/deploy.yml rebuilds and redeploys to GitHub Pages
automatically on every push to main — no manual step after the agent commits.

## One-time GitHub Pages setup
1. Push this repo to GitHub.
2. In Settings -> Pages, set "Source" to "GitHub Actions."
3. If deploying to https://USERNAME.github.io/REPO_NAME/, set
   base: '/REPO_NAME/' in vite.config.js instead of './'.
4. Push to main once — the Action builds and publishes automatically.

## If your agent doesn't have git push access
Either grant it access, or have it write the JSON files to a folder you sync
manually with a script that runs git add -A && git commit -m "predictions" && git push.