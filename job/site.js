/* job.html · 门头 Signboard · v20261105b */
(() => {
  const d = document;
  const $ = (id) => d.getElementById(id);
  const rm = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width: 721px)');
  const hoverDesk = matchMedia('(hover: hover) and (min-width: 900px)');
  const onChange = (mq, fn) => (mq.addEventListener ? mq.addEventListener('change', fn) : mq.addListener(fn));

  /* scroll-velocity marquee */
  const mq = $('marquee');
  if (mq) {
    const track = mq.querySelector('.marquee__track');
    let x = 0, w = 0, v = 0, lastY = scrollY, lastT = 0, raf = 0, visible = false, hover = false;
    const measure = () => { w = track.firstElementChild.getBoundingClientRect().width; };
    const tick = (t) => {
      const dt = Math.min(0.05, (t - lastT) / 1000 || 0.016);
      lastT = t;
      const sv = Math.abs(scrollY - lastY) / dt;
      lastY = scrollY;
      v += (Math.min(sv, 5000) - v) * 0.08;
      if (!hover && w) {
        x -= 70 * (1 + v / 300) * dt;
        if (x <= -w) x += w;
        track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || !visible || rm.matches) return;
      lastT = performance.now(); lastY = scrollY;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    measure();
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(measure);
    addEventListener('resize', measure, { passive: true });
    mq.addEventListener('mouseenter', () => { hover = true; });
    mq.addEventListener('mouseleave', () => { hover = false; });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(mq);
    onChange(rm, () => { if (rm.matches) { stop(); track.style.transform = ''; x = 0; } else start(); });
  }

  /* case titles split at the seam: reads batched, then transforms written straight to the two halves */
  const cases = [...d.querySelectorAll('.case')].map((c) => ({
    c, l: c.querySelector('.plate__half--l'), r: c.querySelector('.plate__half--r'), plate: c.querySelector('.plate'),
  })).filter((o) => o.l && o.r && o.plate);
  let pending = false, wasOn = false;
  const split = () => {
    pending = false;
    const on = wide.matches && !rm.matches;
    if (!on) {
      if (wasOn) for (const o of cases) { o.l.style.transform = ''; o.r.style.transform = ''; }
      wasOn = false; return;
    }
    wasOn = true;
    const vh = innerHeight;
    const reads = cases.map((o) => {
      const r = o.c.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return null;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh)));
      return (0.5 - p) * 2 * 0.45 * parseFloat(getComputedStyle(o.plate).fontSize);
    });
    reads.forEach((off, i) => {
      if (off == null) return;
      cases[i].l.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
      cases[i].r.style.transform = `translate3d(0,${(-off).toFixed(1)}px,0)`;
    });
  };
  const queue = () => { if (!pending) { pending = true; requestAnimationFrame(split); } };
  if (cases.length) {
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue, { passive: true });
    onChange(wide, queue); onChange(rm, queue);
    split();
  }

  /* index hover preview (desktop only) */
  const fig = d.querySelector('.preview');
  const pimg = $('preview-img');
  const rows = $('rows');
  if (fig && pimg && rows) {
    const show = (row) => {
      if (!hoverDesk.matches) return;
      const src = row.dataset.img;
      if (!src || pimg.getAttribute('src') === src) return;
      pimg.src = src;
      fig.classList.remove('swap'); void fig.offsetWidth; fig.classList.add('swap');
    };
    let warmed = false;
    const warm = () => {
      if (warmed || !hoverDesk.matches) return;
      warmed = true;
      rows.querySelectorAll('.row[data-img]').forEach((row) => { const i = new Image(); i.decoding = 'async'; i.src = row.dataset.img; });
    };
    rows.addEventListener('pointerenter', warm, { once: true });
    rows.addEventListener('focusin', warm, { once: true });
    rows.querySelectorAll('.row[data-img]').forEach((row) => {
      row.addEventListener('pointerenter', () => show(row));
      row.addEventListener('focus', () => show(row));
    });
  }

  /* dialog for collections without a page */
  const lb = $('lb'), lbImg = $('lb-img'), lbCap = $('lb-cap');
  let opener = null;
  if (lb && lbImg) {
    d.querySelectorAll('[data-dialog]').forEach((b) => b.addEventListener('click', () => {
      opener = b;
      lbImg.src = b.dataset.img; lbImg.alt = b.dataset.dialog; lbCap.textContent = b.dataset.dialog;
      if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
      $('lb-close').focus();
    }));
    const close = () => { if (lb.close) lb.close(); else lb.removeAttribute('open'); };
    $('lb-close').addEventListener('click', close);
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    lb.addEventListener('close', () => { if (opener) opener.focus(); });
  }

  /* copy email + toast */
  const copy = $('copy'), status = $('copy-status');
  let timer = 0;
  const toast = (msg) => {
    status.textContent = msg; status.classList.add('is-on');
    clearTimeout(timer);
    timer = setTimeout(() => { status.classList.remove('is-on'); setTimeout(() => { status.textContent = ''; }, 300); }, 2600);
  };
  if (copy && status) copy.addEventListener('click', async () => {
    const email = copy.dataset.email;
    let ok = false;
    try { await navigator.clipboard.writeText(email); ok = true; } catch (_) {
      const ta = d.createElement('textarea');
      ta.value = email; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0';
      d.body.appendChild(ta); ta.select();
      try { ok = d.execCommand('copy'); } catch (_) { ok = false; }
      ta.remove();
    }
    toast(ok ? `邮箱已复制：${email}` : `没能复制，邮箱是 ${email}`);
  });

  /* floating contact: after the hero, hidden while the contact section is on screen */
  const fl = $('float'), hero = $('top'), contact = $('contact');
  if (fl && hero && 'IntersectionObserver' in window) {
    let heroIn = true, contactIn = false;
    const set = () => fl.classList.toggle('is-on', !heroIn && !contactIn);
    new IntersectionObserver(([e]) => { heroIn = e.isIntersecting; set(); }).observe(hero);
    if (contact) new IntersectionObserver(([e]) => { contactIn = e.isIntersecting; set(); }).observe(contact);
  } else if (fl) fl.classList.add('is-on');
})();
