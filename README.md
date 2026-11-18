# Something Versus Nothing: Mission at the Mediated Frontier

Contextual problems, needs, gaps, and opportunities in OneHope's ministry context. MISS 7013 Missional Theology, Assessment 2.1, Southeastern University. A sibling of [A Missiological Family Tree](https://kglashower.github.io/missiological-family-tree/) (Assessment 1.1), which it links to throughout.

A static site: `index.html`, `styles.css`, `script.js`, and `data.js`. No build step.

- **`data.js`** holds every word on the site. It is generated; do not edit it by hand.
- **`generate.py`** builds `data.js` from the paper (`../Contextual Needs - Draft.md`) and the ten-item table in `../Contextual Needs - Brainstorm.md`. Edit those, then run `python3 generate.py` from this folder.
- **`design-system.md`** documents the colors, type, shapes, the solid/dashed/dotted stroke device, and the cross-links to the Family Tree.
- **`favicon.svg`** is the three-bar signal mark.

**Publish on GitHub Pages:** push to `main`, then in Settings → Pages choose "Deploy from a branch", branch `main`, folder `/ (root)`.

**Preview locally:** any static server from this folder, for example `python3 -m http.server 8766`.
