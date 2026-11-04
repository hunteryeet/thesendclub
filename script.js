const fallback = {
  events: [],
  content: [],
  gallery: [],
  settings: {
    tagline: "Good people. Dirty bikes. Big rides. The adventure is better when we're all in it together.",
    youtube: "", instagram: "", facebook: "", tiktok: "", podcast: ""
  }
};
async function loadJSON(path, defaultValue) {
  try { const r = await fetch(path + "?v=" + Date.now()); if (!r.ok) throw new Error("Not found"); return await r.json(); }
  catch (_) { return defaultValue; }
}
function safe(value="") { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function renderEvents(items) {
  const grid = document.querySelector("#events-grid"), empty = document.querySelector("#events-empty");
  const active = (items || []).filter(x => (x.title || x.flyer || x.description) && x.published !== false).sort((a,b) => (a.date || "9999").localeCompare(b.date || "9999"));
  if (!active.length) { grid.innerHTML = ""; empty.hidden = false; return; }
  empty.hidden = true;
  grid.innerHTML = active.map(e => {
    const dateText = e.dateLabel || (e.date ? new Date(`${e.date}T12:00:00`).toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"}) : "EVENT DETAILS");
    const title = e.title || "Upcoming Ride";
    const hasDetails = e.description || e.location || e.time || e.link;
    return `<article class="event-card ${e.flyer ? "has-flyer" : ""}">${e.flyer ? `<img class="event-flyer" src="${safe(e.flyer)}" alt="${safe(title)} event flyer" loading="lazy">` : '<div class="event-top"></div>'}<div class="event-body"><div class="event-date">${safe(dateText)}</div><h3>${safe(title)}</h3>${e.description ? `<p>${safe(e.description)}</p>` : ""}${e.time ? `<div class="event-location">◷ ${safe(e.time)}</div>` : ""}${e.location ? `<div class="event-location">⌖ ${safe(e.location)}</div>` : ""}${e.link ? `<a class="event-link" href="${safe(e.link)}" target="_blank" rel="noopener">EVENT DETAILS ↗</a>` : ""}${e.flyer && !hasDetails ? `<p>See the flyer above for event information.</p>` : ""}</div></article>`;
  }).join("");
}
function renderContent(items) {
  const grid = document.querySelector("#content-grid"), empty = document.querySelector("#content-empty");
  const active = (items || []).filter(x => x.title && x.published !== false);
  if (!active.length) { grid.innerHTML = ""; empty.hidden = false; return; }
  empty.hidden = true;
  grid.innerHTML = active.map(c => `<article class="content-card"><div class="content-thumb" ${c.image ? `style="background-image:linear-gradient(#10110f33,#10110f66),url('${safe(c.image)}');background-size:cover;background-position:center"` : ""}><span class="content-type">${safe(c.type || "VIDEO")}</span></div><div class="content-body"><h3>${safe(c.title)}</h3><p>${safe(c.description || "")}</p>${c.url ? `<a href="${safe(c.url)}" target="_blank" rel="noopener">WATCH / LISTEN ↗</a>` : ""}</div></article>`).join("");
}
function renderGallery(items) {
  const grid = document.querySelector("#gallery-grid");
  if (!items || !items.filter(x => x.image).length) return;
  grid.innerHTML = items.filter(x => x.image).map((g,i) => `<div class="gallery-item"><img src="${safe(g.image)}" alt="${safe(g.alt || g.caption || "The Send Club Offroading")}" loading="lazy">${g.caption ? `<span class="gallery-caption">${safe(g.caption)}</span>` : ""}</div>`).join("");
}
function renderSocial(settings) {
  const links = [
    ["YOUTUBE", settings.youtube], ["INSTAGRAM", settings.instagram],
    ["FACEBOOK", settings.facebook], ["TIKTOK", settings.tiktok], ["PODCAST", settings.podcast]
  ].filter(x => x[1]);
  document.querySelector("#social-links").innerHTML = links.length ? links.map(x => `<a href="${safe(x[1])}" target="_blank" rel="noopener">${x[0]} ↗</a>`).join("") : `<a href="#content">CONTENT COMING SOON</a>`;
  if (settings.tagline) document.querySelector("#hero-tagline").textContent = settings.tagline;
}
(async function init() {
  document.querySelector("#year").textContent = new Date().getFullYear();
  const [events, content, gallery, settings] = await Promise.all([
    loadJSON("/content/events.json", fallback.events), loadJSON("/content/content.json", fallback.content),
    loadJSON("/content/gallery.json", fallback.gallery), loadJSON("/content/settings.json", fallback.settings)
  ]);
  renderEvents(events.items || events); renderContent(content.items || content); renderGallery(gallery.items || gallery); renderSocial(settings);
  const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".main-nav");
  toggle.addEventListener("click", () => { const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)); });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); }));
})();