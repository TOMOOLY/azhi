(function () {
  "use strict";

  /* nav: border on scroll, mobile toggle */
  var nav = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var links = document.getElementById("nav-links");
  function onScroll() { if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    links.classList.toggle("is-open", open);
    toggle.querySelector(".sr").textContent = open ? "关闭菜单" : "打开菜单";
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
  }

  /* one filled call to action per view: the nav button steps back while a section with its own is on screen */
  var navCta = document.querySelector("[data-nav-cta]");
  var owners = document.querySelectorAll("[data-own-cta]");
  if (navCta && owners.length && "IntersectionObserver" in window) {
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
      navCta.classList.toggle("is-quiet", visible.size > 0);
      navCta.classList.toggle("btn-quiet", visible.size > 0);
    }, { rootMargin: "-64px 0px 0px 0px", threshold: 0.15 });
    owners.forEach(function (o) { io.observe(o); });
  }

  /* tabs: roving tabindex, arrows / Home / End, panels hidden only once JS runs */
  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    var list = box.querySelector("[data-tablist]");
    var tabs = Array.prototype.slice.call(list.querySelectorAll("[data-tab]"));
    if (!tabs.length) return;
    list.hidden = false;
    list.setAttribute("role", "tablist");
    list.setAttribute("aria-orientation", window.matchMedia("(max-width: 860px)").matches && box.classList.contains("tabs-case") ? "horizontal" : "vertical");
    tabs.forEach(function (t) {
      var p = document.getElementById(t.getAttribute("data-tab"));
      t.setAttribute("role", "tab");
      t.setAttribute("aria-controls", p.id);
      p.setAttribute("role", "tabpanel");
      p.setAttribute("aria-labelledby", t.id);
      p.setAttribute("tabindex", "0");
    });
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("data-tab")).hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i, false); });
      t.addEventListener("keydown", function (e) {
        var n = tabs.length, k = e.key, to = -1;
        if (k === "ArrowDown" || k === "ArrowRight") to = (i + 1) % n;
        else if (k === "ArrowUp" || k === "ArrowLeft") to = (i - 1 + n) % n;
        else if (k === "Home") to = 0;
        else if (k === "End") to = n - 1;
        if (to > -1) { e.preventDefault(); select(to, true); }
      });
    });
    select(0, false);
    box.classList.add("is-ready");
  });
})();
