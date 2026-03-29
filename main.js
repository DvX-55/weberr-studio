function getSanityUrl(query) {
  const cfg = window.SANITY_CONFIG || {};
  const dataset = cfg.dataset || "production";
  const projectId = cfg.projectId;
  const version = cfg.apiVersion || "2026-01-01";
  const encoded = encodeURIComponent(query);
  return `https://${projectId}.api.sanity.io/v${version}/data/query/${dataset}?query=${encoded}`;
}

async function fetchSanity(query) {
  try {
    const url = getSanityUrl(query);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch fail");
    const data = await res.json();
    return data.result || [];
  } catch (err) {
    console.error("Sanity fetch error", err);
    return [];
  }
}

function cardHtml(item, type) {
  if (type === "site") {
    const tags = item.tags ? item.tags.map((tag) => `<span class="tag">${tag}</span>`).join(" ") : "";
    const imageBox = item.image && item.image.asset?.url ? `<div class="card-image" style="background-image: url('${item.image.asset.url}')"></div>` : "";
    return `<article class="card" data-animate>
      ${imageBox}
      <h3>${item.titre || "Sans titre"}</h3>
      <p>${item.description || "Aucune description"}</p>
      <div class="tags">${tags}</div>
      ${item.lien ? `<a class="button secondary" href="${item.lien}" target="_blank" rel="noreferrer">Visiter</a>` : ""}
    </article>`;
  }

  const tagFree = item.gratuit ? "<strong>Gratuit</strong>" : "";
  return `<article class="card" data-animate>
      <h3>${item.nom || "Sans nom"} ${item.version ? `• ${item.version}` : ""}</h3>
      <p>${item.description || "Aucune description"}</p>
      <p>${item.icone ? `Icône: ${item.icone}` : ""} ${tagFree}</p>
      <div class="card-links">
        ${item.lienTelecharger ? `<a class="button secondary" href="${item.lienTelecharger}" target="_blank" rel="noreferrer">Télécharger</a>` : ""}
        ${item.lienGitHub ? `<a class="button secondary" href="${item.lienGitHub}" target="_blank" rel="noreferrer">GitHub</a>` : ""}
      </div>
    </article>`;
}

function renderGrid(selector, items, type) {
  const container = document.querySelector(selector);
  if (!container) return;
  if (!items || items.length === 0) {
    container.innerHTML = `<p style="color:#94a3b8;">Aucun élément disponible pour le moment.</p>`;
    return;
  }
  container.innerHTML = items.map((item) => cardHtml(item, type)).join("");
  !window.__observerSetup && setupObserver();
}

function setupObserver() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  document.querySelectorAll("[data-animate]").forEach((el) => obs.observe(el));
  window.__observerSetup = true;
}

async function loadPageData() {
  const isCatalogSites = document.querySelector("#catalog-sites-grid");
  const isCatalogApps = document.querySelector("#catalog-apps-grid");

  const siteQuery = `*[_type==\"sitePortfolio\"] | order(ordre asc){titre,description,lien,tags,image}`;
  const appQuery = `*[_type==\"appSoftware\"] | order(ordre asc){nom,version,description,icone,lienTelecharger,lienGitHub,gratuit}`;

  const [sites, apps] = await Promise.all([fetchSanity(siteQuery), fetchSanity(appQuery)]);

  if (document.querySelector("#portfolio-grid")) {
    renderGrid("#portfolio-grid", sites.slice(0, 3), "site");
  }
  if (document.querySelector("#apps-grid")) {
    renderGrid("#apps-grid", apps.slice(0, 3), "app");
  }

  if (isCatalogSites) {
    renderGrid("#catalog-sites-grid", sites, "site");
  }
  if (isCatalogApps) {
    renderGrid("#catalog-apps-grid", apps, "app");
  }
}

function initForm() {
  const form = document.querySelector("#contact-form");
  const result = document.querySelector("#form-result");
  if (!form || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    result.textContent = "Message envoyé (fictif). Je te réponds bientôt par email !";
    result.style.color = "#34d399";
    form.reset();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadPageData();
  initForm();
});
