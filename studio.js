(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-lock");
    };
    toggle.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-lock", open);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  var root = document.querySelector("[data-carousel]");
  if (root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-dot]"));
    var index = 0;
    var timer = null;

    var show = function (next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var on = i === index;
        slide.classList.toggle("is-active", on);
        slide.setAttribute("aria-hidden", on ? "false" : "true");
        if (on) slide.removeAttribute("tabindex");
        else slide.setAttribute("tabindex", "-1");
      });
      dots.forEach(function (dot, i) {
        var on = i === index;
        dot.setAttribute("aria-selected", on ? "true" : "false");
        dot.tabIndex = on ? 0 : -1;
      });
    };

    var stop = function () {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    var play = function () {
      stop();
      if (reduce || slides.length < 2) return;
      timer = setInterval(function () {
        show(index + 1);
      }, 6800);
    };

    var prev = root.querySelector("[data-prev]");
    var next = root.querySelector("[data-next]");
    if (prev) {
      prev.addEventListener("click", function () {
        show(index - 1);
        play();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        show(index + 1);
        play();
      });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        show(i);
        play();
      });
    });

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        show(index - 1);
        play();
      } else if (event.key === "ArrowRight") {
        show(index + 1);
        play();
      }
    });

    var startX = 0;
    var dragging = false;
    root.addEventListener("touchstart", function (event) {
      if (!event.changedTouches[0]) return;
      dragging = true;
      startX = event.changedTouches[0].clientX;
      stop();
    }, { passive: true });
    root.addEventListener("touchend", function (event) {
      if (!dragging || !event.changedTouches[0]) return;
      dragging = false;
      var dx = event.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 42) show(index + (dx < 0 ? 1 : -1));
      play();
    }, { passive: true });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", play);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) play();
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else play();
    });

    show(0);
    play();
  }

  var more = document.querySelector("[data-more]");
  var panel = document.querySelector("#more-works");
  if (more && panel) {
    more.addEventListener("click", function () {
      var willOpen = panel.hasAttribute("hidden");
      if (willOpen) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
      more.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (willOpen) {
        panel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    });
  }

  var spyLinks = Array.prototype.slice.call(document.querySelectorAll("[data-spy]"));
  if (spyLinks.length) {
    var mark = function () {
      var current = "works";
      spyLinks.forEach(function (link) {
        var id = link.getAttribute("data-spy");
        var section = document.getElementById(id);
        if (!section) return;
        if (section.getBoundingClientRect().top - 96 <= 0) current = id;
      });
      spyLinks.forEach(function (link) {
        link.classList.toggle("is-current", link.getAttribute("data-spy") === current);
      });
    };
    mark();
    window.addEventListener("scroll", mark, { passive: true });
  }
})();
