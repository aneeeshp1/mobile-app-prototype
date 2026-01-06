# Copilot Instructions — Project Handoff

This file contains concise, actionable instructions to help GitHub Copilot (or any future contributor) continue development, build, test, and deploy this prototype even if the current chat session is closed.

## Project & Repo
- Repository: https://github.com/aneeeshp1/mobile-app-prototype
- Live site (GitHub Pages): https://aneeeshp1.github.io/mobile-app-prototype/
- Default branch: `main`
- Build artifacts output: `dist/`

## Local dev & build commands
- Install dependencies: `npm install`
- Run dev server: `npm run dev` (http://localhost:5173)
- Build for production: `npm run build` (produces `dist/`)
- Preview production build: `npm run preview`

## Key files & where to modify features
- Main app: `src/App.jsx`
- Login form: `src/components/LoginForm.jsx`
- Home page: `src/components/HomePage.jsx`
- Global styles: `src/index.css`, `src/App.css`
- Component styles: `src/styles/LoginForm.css`, `src/styles/HomePage.css`
- Vite config: `vite.config.js` (base: `./` set for GitHub Pages)
- package.json has `homepage: "./"`
- GitHub Actions workflow: `.github/workflows/deploy.yml`

## Mobile-frame notes (UI)
- The mobile phone frame is implemented via the `.mobile-frame` CSS rules. Keep both login and home screens within a single mobile frame.
- Fixed dimensions: width 375px, height 667px (CSS uses `max-width` + `height`). To change, edit `height`/`max-width` in `src/styles/HomePage.css` and `src/styles/LoginForm.css`.
- Make content scrollable inside the frame using `overflow-y: auto` on inner containers.

## Deployment (GitHub Pages)
- Deployment is automated via GitHub Actions using `.github/workflows/deploy.yml`.
- Workflow steps: checkout → setup node → npm install → npm run build → upload artifact → deploy-pages@v4.
- If deployment fails with a 404, check GitHub Pages is enabled in repository Settings → Pages.
- To manually re-run deploy: use GitHub UI Actions page or run `gh run list` and `gh run rerun <run-id>`.

## Authentication & pushing
- Recommended: authenticate locally with GitHub CLI: `gh auth login` (chooses browser/device flow).
- Alternative: use a Personal Access Token (PAT) with `repo` scope (do not commit tokens to the repo).

## Common maintenance tasks
- Add a new feature component: create file under `src/components/`, add styles under `src/styles/`, import where needed in `src/App.jsx`.
- Update dependencies: edit `package.json` and run `npm install`, then build/test locally.
- Fix build issues: run `npm run build` and check `dist/` and console errors. Check GH Actions logs for CI build failures.

## CI / Debugging
- Check workflow logs: GitHub UI → Actions → select run → view logs; or `gh run list --repo <owner>/<repo>` and `gh run view <id> --log`.
- If Pages deployment fails: verify `has_pages` and that Pages is enabled (Settings → Pages), ensure `GITHUB_TOKEN` has `pages: write` (Actions provides token automatically).

## Routines for Copilot to follow
1. Pull the latest `main` branch: `git pull`.
2. Run `npm install` and `npm run dev` to test UI changes locally.
3. Make changes, test in dev server and in `npm run build` + `npm run preview`.
4. Commit changes, push to `main` branch: `git push origin main` (workflow will deploy).
5. Monitor Actions and Pages URL.

## Contacts & Context
- Maintainer GitHub: `aneeeshp1` (use GitHub issues/PRs for collaboration)
- Last verified deploy: 2026-01-05

---

If you want, I can also add smaller helper scripts (e.g., `scripts/deploy.sh`) or a one-time GitHub Action to run smoke tests after deploy — tell me which you prefer.