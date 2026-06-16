(function () {
  const manifest = window.GlobalDataTopTabs || { items: [] };
  const defaultDocumentTitle = document.title;
  let activeExtraId = "";
  let navTabs = null;
  let pageHost = null;
  let pageFrame = null;

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }
    callback();
  }

  function escapeSelectorValue(value) {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(value);
    }
    return String(value).replace(/["\\]/g, "\\$&");
  }

  function getExtraItems() {
    const items = Array.isArray(manifest.items) ? manifest.items : [];
    const seen = new Set();

    return items
      .filter((item) => {
        if (!item || !item.id || !item.label || seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })
      .map((item) => ({
        id: String(item.id),
        label: String(item.label),
        title: item.title ? String(item.title) : String(item.label),
        url: item.url ? String(item.url) : "",
        order: Number.isFinite(Number(item.order)) ? Number(item.order) : 999
      }))
      .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label, "zh-CN"));
  }

  function getDefaultViews() {
    return [document.querySelector(".hero-panel"), document.querySelector(".workspace")].filter(Boolean);
  }

  function syncTabAccessibility() {
    if (!navTabs) return;

    navTabs.querySelectorAll(".nav-tab").forEach((tab) => {
      const isActive = tab.classList.contains("is-active");
      if (tab.getAttribute("role") !== "tab") tab.setAttribute("role", "tab");
      if (tab.getAttribute("aria-selected") !== String(isActive)) {
        tab.setAttribute("aria-selected", String(isActive));
      }
      if (isActive) {
        if (tab.getAttribute("aria-current") !== "page") tab.setAttribute("aria-current", "page");
      } else {
        tab.removeAttribute("aria-current");
      }
    });
  }

  function findTabById(id) {
    if (!navTabs) return null;
    return navTabs.querySelector(`.nav-tab[data-nav="${escapeSelectorValue(id)}"]`);
  }

  function appendExtraTabs() {
    if (!navTabs) return;

    const fragment = document.createDocumentFragment();
    const extraIds = getExtraItems().map((item) => item.id);

    if (activeExtraId && !extraIds.includes(activeExtraId)) {
      activeExtraId = "";
    }

    getExtraItems().forEach((item) => {
      const existing = findTabById(item.id);
      if (existing) {
        existing.classList.add("top-tab-extra");
        existing.dataset.topTabsExtra = item.id;
        existing.classList.toggle("is-active", activeExtraId === item.id);
        return;
      }

      const button = document.createElement("button");
      button.className = "nav-tab top-tab-extra";
      button.type = "button";
      button.dataset.nav = item.id;
      button.dataset.topTabsExtra = item.id;
      button.textContent = item.label;
      if (activeExtraId === item.id) button.classList.add("is-active");
      fragment.append(button);
    });

    if (fragment.childNodes.length > 0) {
      navTabs.append(fragment);
    }

    if (activeExtraId) {
      navTabs.querySelectorAll(".nav-tab").forEach((tab) => {
        tab.classList.toggle("is-active", tab.dataset.nav === activeExtraId);
      });
    }

    syncTabAccessibility();
  }

  function updateHash(item) {
    const nextHash = `tab=${encodeURIComponent(item.id)}`;
    if (window.location.hash.slice(1) === nextHash) return;
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${nextHash}`);
  }

  function clearExtraHash() {
    if (!window.location.hash.startsWith("#tab=")) return;
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }

  function showDefaultShell() {
    activeExtraId = "";
    getDefaultViews().forEach((view) => {
      view.hidden = false;
    });

    if (pageHost) pageHost.hidden = true;
    if (pageFrame) {
      pageFrame.removeAttribute("src");
      pageFrame.title = "业务页面";
    }
    document.title = defaultDocumentTitle;

    appendExtraTabs();
    clearExtraHash();
  }

  function showExtraPage(item, shouldUpdateHash = true) {
    if (!item || !item.url) return;

    activeExtraId = item.id;
    getDefaultViews().forEach((view) => {
      view.hidden = true;
    });

    if (pageHost) pageHost.hidden = false;
    if (pageFrame) {
      if (pageFrame.getAttribute("src") !== item.url) {
        pageFrame.src = item.url;
      }
      pageFrame.title = item.title;
    }

    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle) pageTitle.textContent = item.title;
    document.title = `${item.label} - 全球数据法规字典`;

    appendExtraTabs();
    syncTabAccessibility();
    if (shouldUpdateHash) updateHash(item);

    window.dispatchEvent(new CustomEvent("regulation:navigate", {
      detail: { id: item.id, label: item.label, title: item.title, url: item.url }
    }));
  }

  function activateFromHash() {
    const raw = window.location.hash.startsWith("#tab=") ? window.location.hash.slice(5) : "";
    if (!raw) return;

    const targetId = decodeURIComponent(raw);
    const item = getExtraItems().find((extra) => extra.id === targetId);
    if (item) showExtraPage(item, false);
  }

  function enhanceTopTabs() {
    navTabs = document.getElementById("navTabs");
    pageHost = document.getElementById("tabPageHost");
    pageFrame = document.getElementById("tabPageFrame");

    if (!navTabs) return;

    navTabs.setAttribute("role", "tablist");
    appendExtraTabs();
    syncTabAccessibility();

    navTabs.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-nav]");
      const item = getExtraItems().find((extra) => tab?.dataset.nav === extra.id);
      if (!item) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      showExtraPage(item);
    }, true);

    navTabs.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-nav]");
      if (!tab || tab.dataset.topTabsExtra) return;

      requestAnimationFrame(() => {
        showDefaultShell();
        syncTabAccessibility();
      });
    });

    window.addEventListener("hashchange", activateFromHash);
    activateFromHash();
  }

  onReady(() => requestAnimationFrame(enhanceTopTabs));
})();
