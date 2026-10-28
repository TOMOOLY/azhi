(function () {
  "use strict";

  document.body.classList.add("is-entering");

  /* —— Live clock (China GMT+8) —— */
  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }
  function tickClocks() {
    var now = new Date();
    // Asia/Shanghai
    var fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Shanghai",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    var parts = fmt.formatToParts(now);
    var h = "00", m = "00";
    parts.forEach(function (p) {
      if (p.type === "hour") h = p.value;
      if (p.type === "minute") m = p.value;
    });
    var t = h + ":" + m;
    document.querySelectorAll("[data-clock]").forEach(function (el) {
      el.textContent = t;
    });
  }
  tickClocks();
  setInterval(tickClocks, 1000);

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* —— Mobile nav —— */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  /* —— Nav invert on dark sections —— */
  var topbar = document.querySelector(".ed-topbar");
  var darkSections = document.querySelectorAll("[data-nav-dark]");
  function updateNavInvert() {
    if (!topbar || !darkSections.length) {
      if (topbar && document.body.classList.contains("ed-page-dark-start")) {
        topbar.classList.add("is-on-dark");
      }
      return;
    }
    var y = 28;
    var onDark = false;
    darkSections.forEach(function (sec) {
      var r = sec.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) onDark = true;
    });
    topbar.classList.toggle("is-on-dark", onDark);
    document.body.classList.toggle("ed-nav-dark", onDark);
  }
  updateNavInvert();
  window.addEventListener("scroll", updateNavInvert, { passive: true });
  window.addEventListener("resize", updateNavInvert);

  /* —— Back to top —— */
  var toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    function syncTop() {
      toTop.classList.toggle("is-visible", window.scrollY > 600);
    }
    syncTop();
    window.addEventListener("scroll", syncTop, { passive: true });
    toTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* —— Contact form enable —— */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var submit = form.querySelector("[data-form-submit]");
    var required = form.querySelectorAll("[data-required]");
    function checkForm() {
      var ok = true;
      required.forEach(function (el) {
        if (!String(el.value || "").trim()) ok = false;
      });
      if (submit) {
        submit.disabled = !ok;
        submit.classList.toggle("is-ready", ok);
      }
    }
    required.forEach(function (el) {
      el.addEventListener("input", checkForm);
      el.addEventListener("change", checkForm);
    });
    checkForm();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      checkForm();
      if (submit && submit.disabled) return;
      var name = (form.querySelector('[name="Name"]') || {}).value || "";
      var email = (form.querySelector('[name="Email"]') || {}).value || "";
      var company = (form.querySelector('[name="Company or brand"]') || {}).value || "";
      var need = (form.querySelectorAll('select[name="Location"]')[0] || {}).value || "";
      var budget = (form.querySelectorAll('select[name="Location"]')[1] || {}).value || "";
      var timeline = (form.querySelectorAll('select[name="Location"]')[2] || {}).value || "";
      var about = (form.querySelector("textarea") || {}).value || "";
      var body =
        "Name: " + name +
        "\nEmail: " + email +
        "\nCompany: " + company +
        "\nNeed: " + need +
        "\nBudget: " + budget +
        "\nTimeline: " + timeline +
        "\n\n" + about;
      var mailto =
        "mailto:shiqiangqiang96@163.com?subject=" +
        encodeURIComponent("造物设·项目咨询") +
        "&body=" +
        encodeURIComponent(body);
      try {
        window.location.href = mailto;
      } catch (err) {}
      alert("已准备邮件草稿。若未自动打开邮件客户端，请直接发至 shiqiangqiang96@163.com");
    });
  }

  /* —— Works floating hover image —— */
  var floatEl = document.querySelector("[data-works-float]");
  if (floatEl && window.matchMedia("(min-width: 810px)").matches) {
    var img = floatEl.querySelector("img");
    document.querySelectorAll("[data-hover-img]").forEach(function (link) {
      link.addEventListener("mouseenter", function () {
        var src = link.getAttribute("data-hover-img");
        if (src && img) {
          img.src = src;
          floatEl.classList.add("is-on");
        }
      });
      link.addEventListener("mousemove", function (e) {
        floatEl.style.left = e.clientX + "px";
        floatEl.style.top = e.clientY + "px";
      });
      link.addEventListener("mouseleave", function () {
        floatEl.classList.remove("is-on");
      });
    });
  }

  /* —— Testimonials rotate —— */
  var slides = document.querySelectorAll("[data-testimonial]");
  var counter = document.querySelector("[data-testimonial-count]");
  if (slides.length > 1) {
    var idx = 0;
    setInterval(function () {
      slides[idx].classList.remove("is-active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("is-active");
      if (counter) {
        counter.textContent =
          (idx + 1 < 10 ? "0" : "") + (idx + 1) + " / " +
          (slides.length < 10 ? "0" : "") + slides.length;
      }
    }, 5500);
  }

  /* —— Trusted-by name hover —— */
  var trustedNames = document.querySelectorAll("[data-trusted-name]");
  var trustedPhoto = document.querySelector("[data-trusted-photo]");
  trustedNames.forEach(function (li) {
    li.addEventListener("mouseenter", function () {
      trustedNames.forEach(function (n) { n.classList.remove("is-active"); });
      li.classList.add("is-active");
      var src = li.getAttribute("data-photo");
      if (trustedPhoto && src) trustedPhoto.src = src;
    });
  });

  /* —— About TOC —— */
  var toc = document.querySelector("[data-about-toc]");
  if (toc) {
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var sections = links
      .map(function (a) {
        var id = a.getAttribute("href").slice(1);
        var el = document.getElementById(id);
        return el ? { id: id, el: el, link: a } : null;
      })
      .filter(Boolean);

    function setActive(id) {
      links.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
      });
    }

    if (sections.length && "IntersectionObserver" in window) {
      var visible = {};
      var ioToc = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            visible[entry.target.id] = entry.isIntersecting;
          });
          var current = null;
          sections.forEach(function (s) {
            if (visible[s.id]) current = s.id;
          });
          if (current) setActive(current);
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.4] }
      );
      sections.forEach(function (s) { ioToc.observe(s.el); });
      setActive(sections[0].id);
    }
  }

  /* —— Contact light-world reveal —— */
  (function initLightWorld() {
    var section = document.querySelector("[data-light-world]");
    if (!section) return;

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function light() {
      section.classList.add("is-lit");
    }

    if (reduce) {
      light();
      return;
    }

    if (!("IntersectionObserver" in window)) {
      light();
      return;
    }

    var stage = section.querySelector(".ed-light-world-stage") || section;
    var lit = false;
    function reveal() {
      if (lit) return;
      lit = true;
      ioLight.disconnect();
      // Paint the black frame first, then let the CSS transition run on screen.
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          light();
        });
      });
    }
    var ioLight = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) reveal();
        });
      },
      { threshold: [0, 0.25, 0.45, 0.65] }
    );
    ioLight.observe(stage);
  })();

  /* —— Reveal on scroll —— */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.classList.add("is-in");
    });
    return;
  }

  var nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  nodes.forEach(function (el) { io.observe(el); });
})();
