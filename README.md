# Vyom Comparison Site

Static, fast GitHub Pages site for astrology app comparisons.

## Structure

- `index.html`: Homepage and primary comparison card grid
- `compare/index.html`: Full comparison hub page
- `compare/matrix-a.html`: Batch A matrix
- `compare/matrix-b.html`: Batch B matrix
- `compare/vyom-vs-*.html`: Individual competitor pages
- `assets/data.js`: Source-of-truth competitor and feature dataset
- `assets/site.js`: Rendering and filtering logic
- `assets/styles.css`: Shared styles

## GitHub Pages deploy

1. Push this repository to GitHub.
2. In repository settings, open Pages.
3. Set source to `Deploy from a branch`.
4. Select `main` branch and root folder.
5. Save.

Final public URL: `https://vyom-astro.github.io/`.
