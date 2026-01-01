<!-- .github/copilot-instructions.md - guidance for AI coding agents working on this repo -->
# Copilot instructions — protien (React + Vite)

This file gives concise, actionable guidance for AI coding agents (Copilot-style) to be productive in this repository.

Key facts (quick):
- Framework: React (v19) with Vite. Entry: `src/main.jsx` mounting `App.jsx` into `#root` in `index.html`.
- Scripts: `npm run dev` (Vite dev server), `npm run build` (vite build), `npm run preview` (vite preview). See `package.json`.
- Static assets: grouped under `src/assets/{frontend_assets,admin_assets}` with an `assets.js` that imports images and re-exports an `assets` object plus lists (`menu_list`, `food_list`). Use those modules rather than hardcoding asset paths.
- Linting: `npm run lint` runs `eslint .`.

When you're editing code, prefer small, focused changes and preserve existing project conventions (JSX, simple CSS files per component).

What to edit and why:
- UI components live under `src/Components/` (example: `src/Components/NavBar/Navbar.jsx` and `Navbar.css`). Match their CSS class names when updating styles.
- Assets are consumed via `src/assets/frontend_assets/assets.js` and `src/assets/admin_assets/assets.js`. If you add images, update the corresponding `assets.js` to export them and to include them in `assets` / lists.

Common patterns and examples:
- Importing assets: `import { assets, menu_list } from '../assets/frontend_assets/assets'` — prefer named imports from those index files.
- Component structure: functional components exported as default. Example: `src/Components/NavBar/Navbar.jsx` returns a root `div` with class `Navbar` and uses `Navbar.css`.
- Keep components small and presentational where possible; state is not centralized in this template.

Debugging & run commands (Windows / cmd.exe):
```bash
npm install
npm run dev   # starts Vite dev server, HMR enabled
npm run build # production build
npm run preview # preview the production build locally
```

Project-specific conventions and gotchas:
- Assets modules export many image imports and a few data arrays (`menu_list`, `food_list`). When adding/removing images, update these modules to avoid broken imports.
- File paths in this repo assume Vite dev server root (e.g. `/src/...`). When referencing images from CSS, prefer relative imports or put them through the `assets` modules.
- ESLint is present and configured via devDependencies. Run `npm run lint` before large PRs.
- The codebase currently uses plain JS/JSX (not TypeScript) despite TypeScript typings in devDependencies — do not convert files to TS without explicit instruction.

Integration points / external services:
- There is a `url` value exported in `src/assets/admin_assets/assets.js` set to `http://localhost:4000` — treat this as the likely backend URL during local development. Confirm with the repo owner before changing.

Style and API choices for code generation:
- Use modern React (hooks/functional components). Keep components small and use named helper functions where needed.
- Follow existing naming: components use PascalCase filenames and default exports. CSS files are colocated and import via `./Component.css`.
- Avoid adding global state or routing unless asked — this template is a minimal app scaffold.

Examples you can follow:
- `src/Components/NavBar/Navbar.jsx` — presentational header with an `assets.logo` image (commented out). When restoring images, import `assets` from `src/assets/frontend_assets/assets.js` and use `assets.logo`.
- `src/assets/frontend_assets/assets.js` — single place that centralizes asset imports and example data arrays.

If you need to change repo-level configuration:
- Update `package.json` scripts when adding build or test steps.
- Modify `vite.config.js` only for bundling or plugin changes; prefer minimal edits.

When unsure or making larger changes:
- Leave a short comment in code (`// TODO: reason`) and create a PR describing why the change is needed.
- Ask the repo owner about the intended backend at `http://localhost:4000` before switching endpoints.

Request feedback
- If anything in these instructions is unclear or you need more examples (tests, routing, state management), ask the developer and include a proposed code snippet.

-- End of copilot instructions
