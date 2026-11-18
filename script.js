/* Something Versus Nothing — behavior. Content comes from data.js (T). */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const CAT_COLOR = { A: "var(--ember)", B: "var(--slate-w)", C: "var(--oasis)" };
  const TREE_VAR = { flame: "var(--flame)", origin: "var(--origin)", sun: "var(--sun-w)", slate: "var(--slate)", bare: "var(--taupe)", trunk: "var(--bark)" };
  const byN = Object.fromEntries(T.items.map((i) => [i.n, i]));
  const catOf = Object.fromEntries(T.categories.map((c) => [c.letter, c]));

  // ---------- hero and prose
  $("#site-subtitle").textContent = T.subtitle;
  $("#site-byline").textContent = T.byline.join(" · ");
  $("#site-thesis").textContent = T.thesis;
  $("#footer-byline").textContent = T.byline.join(" · ");
  const pars = (list) => list.map((p) => `<p>${p}</p>`).join("");
  $("#intro-title").textContent = T.intro.title;
  $("#intro-body").innerHTML = pars(T.intro.pars);
  $("#method-title").textContent = T.method.title;
  $("#method-body").innerHTML = pars(T.method.pars);
  $("#factors-title").textContent = T.factorsTitle;
  $("#oasis-title").textContent = T.oasis.title;
  $("#oasis-body").innerHTML = pars(T.oasis.pars);
  $("#oasis-solution").innerHTML = T.oasis.solution;
  $("#conclusion-title").textContent = T.conclusion.title;
  $("#conclusion-body").innerHTML = pars(T.conclusion.pars);

  const chips = (tree) => `<span class="chips">${tree.map((t) => `<a class="chip c-${t.color}" style="--c:${TREE_VAR[t.color]}" href="${t.url}" title="Open this node on the Family Tree">${esc(t.name)}</a>`).join("")}</span>`;

  // ---------- PNGO grid
  const cols = ["Problems", "Needs", "Gaps", "Opportunities"];
  const tbody = $("#pngo tbody");
  tbody.innerHTML = T.categories.map((c) => {
    const cells = cols.map((col) => {
      const its = T.items.filter((i) => i.category === c.letter && i.column === col);
      return `<td>${its.map((i) => `<button class="item state-${c.state}" type="button" data-n="${i.n}" id="item-${i.n}"><span class="n">${i.n}</span><span class="label">${esc(i.label)}</span><span class="short">${esc(i.short)}</span>${chips(i.tree)}</button>`).join("")}</td>`;
    }).join("");
    return `<tr><td class="cat-cell" style="--k:${CAT_COLOR[c.letter]}"><span class="cat-letter">${c.letter}</span><span class="cat-name">${esc(c.name)}</span><span class="cat-status">${esc(c.status)}</span></td>${cells}</tr>`;
  }).join("");

  // ---------- panel
  const panel = $("#panel");
  const inner = $("#panel-inner");
  let activeBtn = null;
  function show(n, scroll = true) {
    const i = byN[n]; if (!i) return;
    const c = catOf[i.category];
    let html = `<button class="panel-close" type="button" aria-label="Close">×</button>`;
    html += `<div class="panel-head"><p class="panel-kicker">Item ${i.n} · ${esc(i.column)} · Category ${c.letter}</p>`;
    html += `<h3 class="panel-title">${esc(i.short)}</h3><span class="state-pill ${c.state}">${esc(c.status)}</span></div>`;
    html += `<div class="panel-body"><p>${i.html}</p>`;
    html += `<h4>On the Family Tree</h4><p class="tree-line">${esc(i.treeText)}</p>${chips(i.tree)}`;
    html += `<h4>Evidence</h4><p class="evidence">${esc(i.evidence)}</p>`;
    html += `<h4>Category</h4><p class="evidence"><a href="#cat-${c.letter}">${c.letter}. ${esc(c.name)}</a></p></div>`;
    inner.innerHTML = html;
    inner.querySelector(".panel-close").addEventListener("click", () => { panel.classList.remove("open"); });
    panel.classList.add("open");
    panel.scrollTop = 0;
    if (activeBtn) activeBtn.classList.remove("active");
    activeBtn = $(`#item-${n}`); if (activeBtn) activeBtn.classList.add("active");
    history.replaceState(null, "", "#item-" + n);
    if (scroll && window.innerWidth > 960) panel.scrollIntoView({ block: "nearest" });
  }
  tbody.addEventListener("click", (e) => {
    const chip = e.target.closest("a.chip"); if (chip) return; // let the chip navigate to the tree
    const b = e.target.closest("button.item"); if (b) show(Number(b.dataset.n));
  });

  // ---------- categories
  $("#categories").innerHTML = T.categories.map((c) => {
    const surface = c.letter === "C" ? "on-sand" : "on-sky";
    const treeChips = c.tree.map((id) => ({ id, name: id === "branch-a" ? "Branch A" : id === "branch-b" ? "Branch B" : id === "branch-d" ? "Branch D" : "Bare branch: technology", color: id === "branch-a" ? "flame" : id === "branch-b" ? "origin" : id === "branch-d" ? "slate" : "bare", url: T.treeUrl + "#" + id }));
    return `<div class="category ${surface}" id="cat-${c.letter}" style="--k:${CAT_COLOR[c.letter]}"><div class="wrap">
      <div class="cat-head"><span class="cat-letter">${c.letter}</span><h3>${esc(c.name)}</h3><span class="status-pill ${c.state}">${esc(c.status)}</span></div>
      <p class="items-line">${c.itemsLine}</p>
      <div class="cat-blocks">
        <div class="cat-block"><h4>The factor</h4><p>${c.factor}</p></div>
        <div class="cat-block"><h4>Against the missio Dei</h4><p>${c.missio}</p></div>
        <div class="cat-block"><h4>Market forces</h4><p>${c.market}</p></div>
      </div>
      <div class="cat-foot"><span><strong>Status.</strong> ${c.statusText}</span>${chips(treeChips)}</div>
    </div></div>`;
  }).join("");
  // item numbers inside the items line become links to the grid
  document.querySelectorAll(".items-line strong").forEach((s) => {
    s.innerHTML = s.innerHTML.replace(/(\d+)/g, (m) => `<a href="#item-${m}" data-n="${m}">${m}</a>`);
  });
  $("#categories").addEventListener("click", (e) => {
    const a = e.target.closest("a[data-n]"); if (!a) return;
    e.preventDefault(); show(Number(a.dataset.n)); $("#items").scrollIntoView({ block: "start" });
  });

  // ---------- oasis: figure, reach table, limits
  const svg = $("#figure-svg"), node = $("#oasis-node");
  const lit = (on) => svg.classList.toggle("lit", on);
  node.addEventListener("mouseenter", () => lit(true));
  node.addEventListener("mouseleave", () => lit(false));
  node.addEventListener("focus", () => lit(true));
  node.addEventListener("blur", () => lit(false));
  node.addEventListener("click", () => lit(!svg.classList.contains("lit")));
  const signal = (on) => `<svg viewBox="0 0 24 24" aria-hidden="true"><rect class="bar${on ? " on" : ""}" x="3" y="14" width="4" height="7" rx="1"/><rect class="bar${on ? " on" : ""}" x="10" y="9" width="4" height="12" rx="1"/><rect class="bar${on ? " on" : ""}" x="17" y="3" width="4" height="18" rx="1"/></svg>`;
  $("#reach tbody").innerHTML = T.oasis.reach.map((r) => {
    const i = byN[r.item];
    return `<tr><td class="sig">${signal(true)}</td><td class="item-cell"><a href="#item-${r.item}" data-n="${r.item}"><span class="n">${r.item}</span>${esc(i ? i.short : "Item " + r.item)}</a></td><td>${r.text}</td></tr>`;
  }).join("");
  $("#reach").addEventListener("click", (e) => {
    const a = e.target.closest("a[data-n]"); if (!a) return;
    e.preventDefault(); show(Number(a.dataset.n)); $("#items").scrollIntoView({ block: "start" });
  });
  $("#limits").innerHTML = `<h4>Two limits, said plainly</h4><p>${T.oasis.limits}</p>`;

  // ---------- notes and bibliography
  $("#notes-list").innerHTML = T.notes.map((n) => `<li id="n${n.n}">${n.html} <a class="back" href="#r${n.n}" aria-label="Back to text">↩</a></li>`).join("");
  $("#bib-list").innerHTML = T.bibliography.map((b) => `<li>${b}</li>`).join("");

  // ---------- theme (shares the tree's key so a reader's choice carries across)
  const root = document.documentElement;
  try { const saved = localStorage.getItem("ft-theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  $("#theme-toggle").addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark" || (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("ft-theme", next); } catch (e) {}
  });

  // ---------- deep link
  const m = location.hash.match(/^#item-(\d+)$/);
  if (m && byN[Number(m[1])]) { show(Number(m[1]), false); $("#items").scrollIntoView({ block: "start" }); }
})();
