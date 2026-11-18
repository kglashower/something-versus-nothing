#!/usr/bin/env python3
"""Build data.js for the Something Versus Nothing site from the paper draft and the brainstorm.

Run from this folder:  python3 generate.py
Sources: ../Contextual Needs - Draft.md (prose, notes, bibliography)
         ../Contextual Needs - Brainstorm.md (the ten items table)
"""
import json, re, html, pathlib

HERE = pathlib.Path(__file__).resolve().parent
DRAFT = HERE.parent / "Contextual Needs - Draft.md"
BRAIN = HERE.parent / "Contextual Needs - Brainstorm.md"
TREE = "https://kglashower.github.io/missiological-family-tree/"

# ---------- inline markdown -> html
def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r"\[\^(\d+)\]", lambda m: f'<sup><a href="#n{m.group(1)}" id="r{m.group(1)}">{m.group(1)}</a></sup>', s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", s)
    s = re.sub(r"(https?://[^\s<)]+)", r'<a href="\1">\1</a>', s)
    return s

def paragraphs(block):
    return [p.strip() for p in re.split(r"\n\s*\n", block) if p.strip()]

text = DRAFT.read_text(encoding="utf-8")

# ---------- front matter
m = re.match(r"# ([^\n]+)\n## ([^\n]+)\n\n(.+?)\n\n---", text, re.S)
title, subtitle, byline_block = m.group(1), m.group(2), m.group(3)
byline = [l.strip() for l in byline_block.splitlines() if l.strip()]

# ---------- sections by "## "
parts = re.split(r"^## ", text, flags=re.M)[1:]
sections = {}
for p in parts:
    head, _, body = p.partition("\n")
    sections[head.strip()] = body

def sec(prefix):
    for k, v in sections.items():
        if k.startswith(prefix):
            return k, v
    raise KeyError(prefix)

def prose(prefix):
    k, v = sec(prefix)
    # drop subsections and tables
    v = v.split("\n### ")[0]
    return [inline(p) for p in paragraphs(v) if not p.startswith("|")]

intro_title, intro_body = sec("1. ")
method_title, _ = sec("2. ")
factors_title, factors_body = sec("3. ")
oasis_title, oasis_body = sec("4. ")
concl_title, _ = sec("5. ")

# thesis pull line: the last two sentences of the intro's third paragraph
intro_pars = paragraphs(intro_body)
thesis = re.search(r"(At the mediated frontier.+?something and nothing\.)", intro_pars[2]).group(1)

# ---------- categories
cats = []
for chunk in re.split(r"^### ", factors_body, flags=re.M)[1:]:
    head, _, body = chunk.partition("\n")
    mm = re.match(r"Category ([ABC])\. (.+)", head.strip())
    letter, name = mm.group(1), mm.group(2)
    fields = {}
    for p in paragraphs(body):
        lm = re.match(r"\*\*(.+?)\*\*\s*(.*)", p, re.S)
        if lm:
            fields[lm.group(1).rstrip(".")] = inline(lm.group(2))
    items = [int(x) for x in re.findall(r"\d+", next(k for k in fields if k.startswith("Items")))]
    status_word = {"A": "Owned", "B": "Partly owned", "C": "Unowned"}[letter]
    state = {"A": "solid", "B": "dashed", "C": "dotted"}[letter]
    tree = {"A": ["branch-a", "branch-b"], "B": ["branch-d"], "C": ["bare-technology"]}[letter]
    cats.append({
        "letter": letter, "name": name, "items": items, "state": state, "status": status_word, "tree": tree,
        "itemsLine": fields[next(k for k in fields if k.startswith("Items"))],
        "factor": fields["The factor"], "missio": fields["Against the missio Dei"],
        "market": fields["Market forces"], "statusText": fields["Status"],
    })

# ---------- oasis section
oasis_pars = paragraphs(oasis_body)
solution = re.search(r"(The singular solution.+?mediated church\.)", oasis_pars[1]).group(1)
solution = re.sub(r"\[\^\d+\]", "", solution)
reach_par = next(p for p in oasis_pars if p.startswith("The solution reaches"))
reach_rows = []
for seg in re.split(r"(?=For item \d+,)", reach_par)[1:]:
    n = int(re.match(r"For item (\d+)", seg).group(1))
    body = re.sub(r"^For item \d+,\s*", "", seg).strip()
    reach_rows.append({"item": n, "text": inline(body[0].upper() + body[1:])})
limits_par = next(p for p in oasis_pars if p.startswith("Two limits"))
oasis_prose = [inline(p) for p in oasis_pars if not (p.startswith("The solution reaches") or p.startswith("Two limits"))]

# ---------- notes and bibliography
notes = []
for mm in re.finditer(r"^\[\^(\d+)\]:\s*(.+)$", sections["Notes"], re.M):
    notes.append({"n": int(mm.group(1)), "html": inline(mm.group(2))})
bib_body = sections["Bibliography"].split("\n---")[0]
bibliography = [inline(p) for p in paragraphs(bib_body)]
check_line = re.search(r"\*(Citation check.+?)\*\s*$", sections["Bibliography"], re.S)
citation_check = inline(check_line.group(1)) if check_line else ""

# ---------- items from the brainstorm table
TREE_IDS = {1: ["bare-technology"], 2: ["generous"], 3: ["bare-technology", "branch-b"], 4: ["entrusting", "bare-technology"],
            5: ["branch-b", "bare-urban"], 6: ["branch-d", "collaborative"], 7: ["loving"], 8: ["branch-a", "committed"],
            9: ["bare-displacement"], 10: ["entrusting"]}
TREE_NAMES = {"bare-technology": "Bare branch: technology", "bare-displacement": "Bare branch: displacement", "bare-urban": "Bare branch: urbanization",
              "generous": "Generous", "entrusting": "Entrusting", "loving": "Loving", "committed": "Committed", "collaborative": "Collaborative",
              "branch-a": "Branch A", "branch-b": "Branch B", "branch-c": "Branch C", "branch-d": "Branch D", "trunk": "The trunk"}
TREE_COLOR = {"branch-a": "flame", "branch-b": "origin", "branch-c": "sun", "branch-d": "slate", "committed": "flame", "loving": "origin",
              "generous": "origin", "collaborative": "slate", "entrusting": "slate", "bare-technology": "bare", "bare-displacement": "bare", "bare-urban": "bare", "trunk": "trunk"}
COLUMN = {"P": "Problems", "N": "Needs", "G": "Gaps", "O": "Opportunities"}
cat_of = {n: c["letter"] for c in cats for n in c["items"]}

items = []
for row in BRAIN.read_text(encoding="utf-8").splitlines():
    mm = re.match(r"\|\s*(\d+)\s*\|\s*([PNGO](?:/[PNGO])?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|$", row)
    if not mm:
        continue
    n = int(mm.group(1)); label = mm.group(2); body = mm.group(3); tree = mm.group(4); evidence = mm.group(5)
    tm = re.match(r"\*\*(.+?)\*\*[:;]?\s*(.*)", body)
    short = tm.group(1).rstrip(":")
    rest = tm.group(2)
    primary = label.split("/")[-1] if label.endswith("O") else label.split("/")[0]
    items.append({
        "n": n, "label": label, "column": COLUMN[primary], "short": short, "html": inline(body),
        "treeText": tree, "evidence": evidence, "category": cat_of[n],
        "tree": [{"id": t, "name": TREE_NAMES[t], "color": TREE_COLOR[t], "url": TREE + "#" + t} for t in TREE_IDS[n]],
    })
items.sort(key=lambda x: x["n"])
assert len(items) == 10, len(items)

data = {
    "title": title, "subtitle": subtitle, "byline": byline, "thesis": thesis, "treeUrl": TREE,
    "intro": {"title": re.sub(r"^\d+\.\s*", "", intro_title), "pars": prose("1. ")},
    "method": {"title": re.sub(r"^\d+\.\s*", "", method_title), "pars": prose("2. ")},
    "factorsTitle": re.sub(r"^\d+\.\s*", "", factors_title),
    "categories": cats, "items": items,
    "oasis": {"title": re.sub(r"^\d+\.\s*", "", oasis_title), "pars": oasis_prose, "solution": inline(solution), "reach": reach_rows, "limits": inline(limits_par)},
    "conclusion": {"title": re.sub(r"^\d+\.\s*", "", concl_title), "pars": prose("5. ")},
    "notes": notes, "bibliography": bibliography, "citationCheck": citation_check,
}
out = "// Generated by generate.py from ../Contextual Needs - Draft.md and ../Contextual Needs - Brainstorm.md. Edit those, not this.\nconst T = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
(HERE / "data.js").write_text(out, encoding="utf-8")
print("data.js written:", len(items), "items,", len(cats), "categories,", len(notes), "notes,", len(bibliography), "bibliography entries")
