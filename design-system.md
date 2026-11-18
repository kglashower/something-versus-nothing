# Something Versus Nothing: design system

The visual system for the Assessment 2.1 site, *Something Versus Nothing: Mission at the Mediated Frontier*. It is a sibling of the Family Tree system (`../Family Tree Site/design-system.md`) and shares its paper, ink, and labeling voice, so the two sites read as one body of work. Everything else is turned toward this artifact's thrust: the weather around the tree, the desert where infrastructure fails, and the choice between something and nothing.

---

## 1. The idea

**The tree showed what grew. This site shows the weather, the desert, and the oasis.**

Three images carry the paper, and the system is built from them.

| Image | What it means in the paper | How it shows on the site |
| --- | --- | --- |
| **The horizon** | The context the organization does not choose; the line between what we say (sky) and what is happening (ground) | A single horizontal rule across every section; the page is organized in horizontal bands, not around a central figure |
| **The desert** | Infrastructure deserts; the geographies where the church is densest and the signal weakest | Warm sand tones from the tree's own soil, used as ground bands; sparse, wide-spaced layout |
| **The oasis** | The one solid thing in an empty field; the chosen solution; "something" | The only new color in the system, used sparingly, always filled, always outlined |

**The governing device is the stroke.** The tree gave every shape a solid navy outline. This system keeps that outline and adds two degraded states, so every element can say where it stands:

| State | Stroke | Fill | Meaning |
| --- | --- | --- | --- |
| **Something** | solid 2px navy | filled | owned, built, present |
| **Degraded** | dashed 2px navy (6 on, 4 off) | tinted 35% | partly owned, provisional, in motion |
| **Nothing** | dotted 2px taupe (2 on, 5 off) | none | unowned, absent, the bare branch |

This is how the paper's argument is drawn: Category A (owned) renders solid, Category B (partly owned) dashed, Category C (unowned) dotted, until the reader reaches the oasis section, where the dotted field receives one solid teal disc. On hover, a dotted element becomes solid. That is the site's single motion, and it is the thesis: something versus nothing.

The title demonstrates the device. On the hero, SOMETHING is set solid and NOTHING is set as hollow outlined letters.

---

## 2. What is inherited and what departs

| | Family Tree | Something Versus Nothing |
| --- | --- | --- |
| Paper and ink | `--paper #faf6f0`, `--navy #0c1e30` | same, so the two sites sit side by side |
| Labels, nav, kickers | Lato, wide-tracked uppercase | same voice, same tracking |
| Outline discipline | 2–2.5px navy on every shape | kept, extended to dashed and dotted states |
| Shape | circles inside circles; organic tree | horizontal bands; horizon line; sharper corners |
| Body type | Lato only | a serif for prose (this is a paper) |
| Accent colors | four branch colors | the branch colors appear only as inheritance, weathered; one new color, the oasis |
| Figure | an SVG tree | an SVG horizon with desert ground and a single oasis |
| Band | cream legend strip | a sky band above the horizon, a sand band below it |
| Motion | hover lift 2px | hover turns dotted to solid |
| Dark mode | dusk navy paper `#101a26` | same paper, read as night in the desert |

Rule of thumb: if an element names the organization's inheritance, it borrows the tree's color. If it names what is new, it uses the oasis color. Nothing else is colored.

---

## 3. Color

Shared tokens are copied from the tree's `styles.css` verbatim, so a reader moving between the two sites sees the same paper and ink.

### Shared with the tree

| Token | Value | Use here |
| --- | --- | --- |
| `--paper` | `#faf6f0` | page background |
| `--navy` | `#0c1e30` | text, every solid outline, the horizon line |
| `--navy-2` | `#1d3348` | secondary text, links |
| `--cream` | `#f0decc` | chips, grid cell headers |
| `--cream-2` | `#f6e8da` | panel tint |
| `--rule` | `#d8d2c8` | hairlines |
| `--taupe` | `#b9a894` | the "nothing" stroke; bare-branch tags |
| `--soil` | `#e9c9a6` | desert ground band |
| `--sand` | `#fcba7e` | dune highlight in the figure |
| `--bark-2` | `#8c5a3c` | the church mark in the figure |

### Inherited, weathered

The tree's branch colors return only to mark where a problem comes from. They are desaturated and lightened, as a color is after years in the sun, so they read as memory rather than as the tree's live canopy.

| Token | Value | Derived from | Use |
| --- | --- | --- | --- |
| `--ember` | `#c9735a` | `--flame` at about 75% saturation | Category A, the inherited wineskin (Branch A and B inheritance) |
| `--slate-w` | `#7f9cab` | `--slate` lightened | Category B, the catalyst without a doctrine (Branch D inheritance) |
| `--sun-w` | `#e8a65c` | `--sun` lightened | tree-location chips that point at Branch C nodes |

### New

| Token | Value | Use |
| --- | --- | --- |
| `--oasis` | `#2f8f83` | Category C; the chosen solution; every "something" highlight; link hover; the one filled disc in the figure |
| `--oasis-2` | `#bfe0da` | oasis tint for fills at the degraded state and for the selected grid cell |
| `--sky` | `#e6edf1` | the sky band above the horizon; section backgrounds for "what we say" |
| `--sky-2` | `#c9d6de` | sky at the horizon, for the gradient in the figure |

Contrast: oasis on paper is 4.6:1 for text at 17px and above; use `--navy` for oasis-colored text under 17px. Ember and slate-w are never used for running text, only for strokes, chips, and headings at 20px and above.

### Dark mode

Same inversion as the tree (`--paper #101a26`, cream ink), read as the desert at night. Sky becomes `#182634`, soil becomes `#3b2f22` (the tree's dark soil), the oasis lightens to `#4fb3a5`, ember to `#d98a70`, slate-w to `#9bb6c4`. Taupe dotted strokes stay `#7b7468` as on the tree. The horizon rule inverts to cream.

---

## 4. Type

Two faces. Lato is the shared voice with the tree and does all labeling. A serif carries the prose, because this artifact is a paper and the tree was a diagram.

| Role | Face | Size | Tracking | Case |
| --- | --- | --- | --- | --- |
| Hero title | Lato Light 300 | 56–80px | 0.16em | UPPERCASE; "SOMETHING" filled, "NOTHING" as 2px outlined text (`-webkit-text-stroke`), "VERSUS" at 40% size between them |
| Hero subtitle | Source Serif 4 italic 400 | 22px | normal | sentence: *Mission at the Mediated Frontier* |
| Section title | Lato Black 900 | 24px | 0.12em | UPPERCASE, navy |
| Category title | Lato Black 900 | 22px | 0.02em | Title case, colored by category (ember, slate-w, oasis) |
| Kicker / label | Lato Regular 400 | 11–12px | 0.14em | UPPERCASE, navy-2 |
| Body | Source Serif 4 400 | 18px / 1.65 | normal | sentence |
| Pull line | Source Serif 4 italic 400 | 24px | normal | the single-sentence thesis lines ("It is between something and nothing.") |
| Grid cell text | Lato Regular 400 | 14px / 1.45 | normal | sentence; grid cells stay in Lato so the grid reads as an instrument, not prose |
| Footnote | Source Serif 4 400 | 15px / 1.5 | normal | sentence; note markers in Lato Bold, oasis color |
| Scripture reference | Lato Regular 400 italic | 14px | normal | as the tree's "Our Foundation" line |

Google Fonts: `Lato:300,400,700,900` and `Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400`. Measure for prose is 68 characters (max-width 40rem at 18px). Lato labels never exceed 14px except titles.

---

## 5. Shape

- **The horizon.** A 2px navy rule, full bleed, is the section divider throughout. Sections alternate: sky band (what we say, the missio Dei analysis) above the line, sand band (what is happening, the items and market forces) below it. The rule is the only full-bleed element.
- **Bands, not cards.** Content sits in horizontal bands with generous vertical rhythm (72px between sections on desktop, 48px on phones). Where a card is needed (a grid cell, a category panel), the corner radius is 4px, not the tree's 14px. The tree was round; the frontier is edged.
- **Strokes carry state.** See the device in §1. A stroke is 2px. Solid is navy. Dashed is navy, `stroke-dasharray: 6 4`. Dotted is taupe, `stroke-dasharray: 2 5`, `stroke-linecap: round`. In CSS on boxes, the same three states are `border: 2px solid`, `border: 2px dashed`, and `border: 2px dotted var(--taupe)`.
- **Chips.** Pills (999px), as on the tree, for the Family Tree location tags, so the chip itself looks like it was lifted off the tree. A chip's dot takes the tree branch color it points to. Every chip is a link to the tree node.
- **Discs.** The oasis is a circle, 2px navy outline, filled oasis color, with one lighter tint circle inside it, exactly as the tree's canopy circles are built. It is the only circle on the site that is not a chip. That restraint is deliberate: the one round thing on the frontier is the thing brought from the tree.
- **Signal mark.** A three-bar icon (grid power, connectivity, affordability), each bar drawn in the state that applies: dotted when the failure stands, solid when the oasis answers it. Used in the oasis section and as the site's favicon.

---

## 6. The figure

One inline SVG, `viewBox 0 0 1200 420`, placed at the top of the oasis section and echoed in miniature in the hero.

- **Sky** fills the upper 55% with a vertical gradient `--sky` to `--sky-2`.
- **Horizon** is a 2.5px navy line at y=230, with a slight rise toward the right, so the eye moves.
- **Ground** is `--soil` with two low dune shapes in `--sand` at 40% opacity, navy-outlined on their top edges only, as the tree's ground band was.
- **The desert's absences** are drawn as dotted taupe outlines on the ground: a dotted house shape (no grid), a dotted arc (no signal), a dotted coin (no affordability). Labels in Lato 11px taupe uppercase beneath each.
- **The oasis** is a single solid disc, 56 units, in `--oasis`, sitting just above the horizon at x≈860, with a small `--bark-2` church mark (a rectangle and a triangle, navy outlined) at its base. A solid navy line runs from the disc to each of the three dotted absences; on hover of the disc, the three absences turn solid and fill with `--oasis-2`.
- **The tree** appears at the far left of the figure as a small desaturated silhouette in `--taupe` at 30% opacity, canopy only, with a link target to the Family Tree site. It is the reminder that this frontier is the weather around that tree.
- Nothing animates on load. The hover transition is 180ms.

---

## 7. Components

**Header.** Identical bar to the tree: sticky, blurred paper, Lato uppercase brand and nav, round theme toggle. The brand reads SOMETHING VERSUS NOTHING. The first nav item is "← Family Tree", linking to `https://kglashower.github.io/missiological-family-tree/`. Remaining items: The Weather · Ten Items · Three Factors · The Oasis · Notes.

**Hero.** Kicker in oasis color ("MISS 7013 · Assessment 2.1 · OneHope"), the two-state title, the serif subtitle, a byline, then the paper's thesis as a serif pull line with a 4px oasis left rule (the tree used sun for this rule; the color change is the only difference). Below it, a one-line cross-reference in Lato: "This site is the weather. The tree is at ← Family Tree."

**The PNGO grid.** The paper's Appendix A as the site's instrument. A table of three category rows by four columns (Problems, Needs, Gaps, Opportunities), column headers in cream with Lato labels, 1px rules between cells. Each item is a small box in Lato 14px with its number in a navy disc, a one-line title, and a chip pointing at its Family Tree location. The box border carries the category's state: Category A solid, B dashed, C dotted. Clicking an item slides in a side panel (bottom sheet on phones), exactly the tree's panel component, with the item's full text, its evidence line, and its chip. Hovering any Category C item turns its border solid in oasis color. A legend strip beneath the grid, in the tree's legend-band style, explains the three stroke states.

**Category panels.** Three horizontal bands, one per category, each with four labeled blocks: The factor · Against the missio Dei · Market forces · Status. The Status block is drawn as a wide pill in the category's stroke state with one word in Lato uppercase: OWNED (solid), PARTLY OWNED (dashed), UNOWNED (dotted). Category C's band sits on sand; A and B sit on sky, since they are already being answered.

**The oasis section.** The figure, then the solution statement as a serif pull line, then a four-row table: item · how the oasis reaches it, each row's leading mark being the three-bar signal icon in the state the item is in. Then a two-column block for the two limits (the KPI, the gatekeeping risk), dashed-bordered, because they are the parts still in motion.

**Notes and bibliography.** As on the tree: numbered notes with return links, bibliography in Turabian, hanging indent, serif. Note markers in the prose are Lato Bold in oasis color.

**Footer.** Byline, the course line, a link to the tree, and a link to the GitHub repository.

---

## 8. Layout and rhythm

- Container `min(1100px, 100% - 32px)`, as the tree, narrowed to `40rem` for prose.
- The grid is the one element allowed to be wider than prose: full container width, horizontally scrollable on phones with the category column frozen.
- Mobile first. On phones the three category bands stack, the grid scrolls sideways, the panel becomes a bottom sheet, and the figure keeps its aspect ratio with labels dropped below 480px.
- Vertical rhythm on an 8px base. Section padding 72/48. Paragraph spacing 1em. The horizon rule has 40px of air above and below.

---

## 9. Cross-links to the Family Tree

The tree site reads `location.hash` and opens the node whose id matches, so any element here can point at a specific node. Chip targets:

| This site | Tree node id |
| --- | --- |
| Item 1, Item 3, Item 4 (bare branch 1) | `bare-technology` |
| Item 9 (bare branch 2) | `bare-displacement` |
| Item 5 (urbanization) | `bare-urban` |
| Item 2 (Generous) | `generous` |
| Item 6 (Branch D, Collaborative) | `branch-d`, `collaborative` |
| Item 7 (Loving) | `loving` |
| Item 8 (Branch A, Committed) | `branch-a`, `committed` |
| Item 10 (Entrusting) | `entrusting` |
| Category A | `branch-a`, `branch-b` |
| Category B | `branch-d` |
| Category C | `bare-technology` |
| The trunk, wherever the missio Dei is named | `trunk` |

Format: `https://kglashower.github.io/missiological-family-tree/#<id>`. Links open in the same tab; the tree's header already links back.

---

## 10. Accessibility and modes

- Stroke state is never the only signal. Every state also carries its word (OWNED, PARTLY OWNED, UNOWNED) or its legend entry.
- All color pairs used for text meet 4.5:1 in both modes; oasis text is restricted to 17px and above on paper.
- The figure has `role="img"` and an `aria-label` that states the whole picture in one sentence; the three absences and the oasis are also listed in a visually hidden list.
- `prefers-reduced-motion` disables the hover transition; dotted elements then switch state without animation.
- Theme follows the system with a toggle, stored in `localStorage` as the tree does, under the same key so a reader's choice carries across the two sites.

---

## 11. Build notes

Same no-build pattern as the tree: `index.html`, `styles.css`, `script.js`, `data.js`. Content lives in `data.js` and is generated from `../Contextual Needs - Draft.md` by a small Python script, so the paper and the site never diverge. Tokens in §3 go on `:root` in the same order and naming as the tree's `styles.css`, with the new tokens appended. The signal icon and the oasis disc are inline SVG symbols reused by id. Publish as a new public repository, `kglashower/something-versus-nothing`, GitHub Pages from `main` root; add it to the root `.claude/launch.json` for previews.
