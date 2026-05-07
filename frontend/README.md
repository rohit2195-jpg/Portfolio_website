# Portfolio Website

This project is now a `Vite + React` portfolio app with hash-based routing so it can be hosted on GitHub Pages without server-side routing support.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open the local URL Vite prints in the terminal.

## Project structure

- `src/App.jsx` wires up the routes.
- `src/components/` contains shared layout pieces.
- `src/pages/` contains the page content for Home, About, Projects, and Contact.
- `src/styles.css` contains the shared site styling.

## Build for production

```bash
npm run build
```

The production output is written to `dist/`.

## GitHub Pages deployment

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that deploys the built `dist/` folder to GitHub Pages whenever you push to `main`.

Before using it:

1. Push this folder to a GitHub repository.
2. In GitHub, open `Settings > Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main`.

## Notes

- Routing uses `HashRouter`, so page URLs will look like `/#/about`.
- `vite.config.js` uses `base: "./"` so the built app can be served from a GitHub Pages project path.
- Static images can be stored in `public/` and referenced as `/your-image.jpg`, or imported from `src/` when you want them bundled.
