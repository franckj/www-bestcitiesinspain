# www-bestcitiesinspain: Claude Code instructions

Independent English guide to the 8 best cities in Spain for a first visit. Astro 7 static site on Cloudflare Pages (project `bestcitiesinspain`), built on the geo travel kit (`ops/domains/geo-travel-kit.md`, same code as www-visitprosecco).

Part of Franck's portfolio. Cross-project context (rules, access, decisions) lives in `franckj/ops`: read its `BA-STATE.md` first when you need it.

## At the start of a session
`git pull`, then read: `README.md`, `CHANGELOG.md`.

## Commands
- `npm run build`: `astro build`
- `npm run dev`: `astro dev`
- `npm run preview`: `astro preview`
- `npm run deploy`: `astro build && wrangler pages deploy dist --project-name bestcitiesinspain --branch main`

## Rules
- Franck prompts, Claude Code builds. Be direct.
- **A deploy needs Franck's word** ("deploy") in the session. Pushing to `main` can ship; building and committing do not.
- No invented facts, numbers, prices or reviews: every figure comes from a source you checked, or it stays out.
- Never commit keys, tokens, `.env` files or credentials. Name a secret by its variable name only.
- Add a `CHANGELOG.md` entry for every change, in the same commit.
- After a live page change: submit the changed URLs (IndexNow) and resubmit the sitemap, as described in `franckj/ops`.
- Update the docs you changed or whose state changed before ending a session, then commit and push.

_Generated 2026-11-01 from the repo's README and package.json. Add the project's real conventions here as they come up._
