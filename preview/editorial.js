(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* —— Clock (Asia/Shanghai) and year —— */
  var clockFmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", hour12: false });
  function tickClocks() {
    var t = clockFmt.format(new Date());
    document.querySelectorAll("[data-clock]").forEach(function (el) { el.textContent = t; });
  }
  tickClocks();
  setInterval(tickClocks, 15000);
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* —— Mobile nav —— */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setNav(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setNav(false); toggle.focus(); }
    });
  }

  /* —— Top bar flips over dark sections —— */
  var topbar = document.querySelector(".ed-topbar");
  var darkSections = document.querySelectorAll("[data-nav-dark]");
  function updateNavInvert() {
    if (!topbar) return;
    var y = topbar.offsetHeight / 2;
    var onDark = false;
    darkSections.forEach(function (sec) {
      var r = sec.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) onDark = true;
    });
    topbar.classList.toggle("is-on-dark", onDark);
  }
  updateNavInvert();
  window.addEventListener("scroll", updateNavInvert, { passive: true });
  window.addEventListener("resize", updateNavInvert);

  /* —— Back to top —— */
  var toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    var syncTop = function () { toTop.classList.toggle("is-visible", window.scrollY > 900); };
    syncTop();
    window.addEventListener("scroll", syncTop, { passive: true });
  }

  /* —— Contact form → mail draft —— */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var lines = [
        "姓名：" + (data.get("name") || ""),
        "邮箱：" + (data.get("email") || ""),
        "公司或品牌：" + (data.get("brand") || ""),
        "需要的服务：" + (data.get("service") || ""),
        "时间线：" + (data.get("timeline") || ""),
        "",
        String(data.get("about") || "")
      ];
      var href = "mailto:shiqiangqiang96@163.com?subject=" +
        encodeURIComponent("造物设 · 项目咨询") + "&body=" + encodeURIComponent(lines.join("\n"));
      window.location.href = href;
      if (status) {
        status.textContent = "已生成邮件草稿。若邮件应用没有打开，请直接写信至 shiqiangqiang96@163.com。";
      }
    });
  }

  /* —— Works list: image follows the pointer (fine pointers only) —— */
  var floatEl = document.querySelector("[data-works-float]");
  if (floatEl && !reduceMotion && window.matchMedia("(min-width: 810px) and (pointer: fine)").matches) {
    var img = floatEl.querySelector("img");
    document.querySelectorAll("[data-hover-img]").forEach(function (link) {
      var src = link.getAttribute("data-hover-img");
      if (!src) return;
      link.addEventListener("mouseenter", function () { img.src = src; floatEl.classList.add("is-on"); });
      link.addEventListener("mousemove", function (e) {
        floatEl.style.left = e.clientX + "px";
        floatEl.style.top = e.clientY + "px";
      });
      link.addEventListener("mouseleave", function () { floatEl.classList.remove("is-on"); });
    });
  }

  /* —— Worked-with list swaps the photo on hover and focus —— */
  var trustedNames = document.querySelectorAll("[data-trusted-name]");
  var trustedPhoto = document.querySelector("[data-trusted-photo]");
  trustedNames.forEach(function (link) {
    function activate() {
      trustedNames.forEach(function (n) { n.classList.remove("is-active"); });
      link.classList.add("is-active");
      var src = link.getAttribute("data-photo");
      if (trustedPhoto && src) {
        trustedPhoto.src = src;
        trustedPhoto.alt = link.textContent.trim() + " 作品";
      }
    }
    link.addEventListener("mouseenter", activate);
    link.addEventListener("focus", activate);
  });

  /* —— Contact closer: light the frame when it is on screen —— */
  var lightWorld = document.querySelector("[data-light-world]");
  if (lightWorld) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      lightWorld.classList.add("is-lit");
    } else {
      var stage = lightWorld.querySelector(".ed-light-world-stage") || lightWorld;
      var ioLight = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            ioLight.disconnect();
            requestAnimationFrame(function () {
              requestAnimationFrame(function () { lightWorld.classList.add("is-lit"); });
            });
          }
        });
      }, { threshold: [0, 0.25, 0.45, 0.65] });
      ioLight.observe(stage);
    }
  }

  /* —— Reveal on scroll —— */
  var nodes = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  nodes.forEach(function (el) { io.observe(el); });
})();
