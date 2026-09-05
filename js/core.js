/* ============================================================
   KOVIDHA.OS — core.js
   Shared functionality: cursor, sound, nav, transitions, eggs
   ============================================================ */

'use strict';

/* ─── AUDIO ENGINE (no files needed — Web Audio API) ─── */
const Audio = (() => {
  let ctx = null;
  const init = () => { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); };

  const play = (freq, type = 'sine', duration = 0.08, vol = 0.04) => {
    if (!ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.start(); osc.stop(ctx.currentTime + duration);
  };

  return {
    hover: () => play(880, 'sine', 0.06, 0.03),
    click: () => { play(440, 'square', 0.05, 0.04); play(660, 'sine', 0.08, 0.03); },
    intro: () => { play(220, 'sine', 0.3, 0.06); setTimeout(() => play(330, 'sine', 0.3, 0.06), 200); setTimeout(() => play(440, 'sine', 0.5, 0.08), 400); },
    init
  };
})();

/* ─── CUSTOM CURSOR ─── */
const Cursor = (() => {
  let ox = window.innerWidth / 2, oy = window.innerHeight / 2;
  let ix = ox, iy = oy;
  let raf = null;

  const outer = document.getElementById('cur-outer');
  const inner = document.getElementById('cur-inner');

  const lerp = (a, b, t) => a + (b - a) * t;

  const track = (e) => { ix = e.clientX; iy = e.clientY; };

  const animate = () => {
    ox = lerp(ox, ix, 0.12);
    oy = lerp(oy, iy, 0.12);
    if (outer) { outer.style.left = ox + 'px'; outer.style.top = oy + 'px'; }
    if (inner) { inner.style.left = ix + 'px'; inner.style.top  = iy + 'px'; }
    raf = requestAnimationFrame(animate);
  };

  const attachHoverListeners = () => {
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cur-link'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cur-link'));
    });
  };

  const init = () => {
    if (!outer || !inner) return;
    window.addEventListener('mousemove', track);
    document.addEventListener('mousedown', () => { if (inner) inner.style.transform = 'translate(-50%,-50%) scale(0.7)'; });
    document.addEventListener('mouseup',   () => { if (inner) inner.style.transform = 'translate(-50%,-50%) scale(1)'; });
    animate();
    attachHoverListeners();

    // Re-attach after dynamic content
    const obs = new MutationObserver(attachHoverListeners);
    obs.observe(document.body, { childList: true, subtree: true });
  };

  return { init, attachHoverListeners };
})();

/* ─── NAVIGATION ─── */
const Nav = (() => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  let mobileOpen = false;

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };

  const setActive = () => {
    const links = document.querySelectorAll('.nav-links a');
    const path  = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href')?.split('/').pop() || '';
      a.classList.toggle('active', href === path || (path === 'index.html' && href === ''));
    });
  };

  const closeMenu = () => {
    mobileOpen = false;
    toggle?.classList.remove('open');
    document.querySelector('.nav-links')?.classList.remove('mobile-open');
    document.getElementById('nav')?.classList.remove('menu-open');
    document.body.classList.remove('no-scroll');
  };

  const init = () => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    setActive();

    if (toggle) {
      toggle.addEventListener('click', () => {
        mobileOpen = !mobileOpen;
        toggle.classList.toggle('open', mobileOpen);
        document.querySelector('.nav-links')?.classList.toggle('mobile-open', mobileOpen);
        document.getElementById('nav')?.classList.toggle('menu-open', mobileOpen);
        document.body.classList.toggle('no-scroll', mobileOpen);
      });
    }

    // Close menu when any nav link is tapped
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileOpen) closeMenu();
    });
  };

  return { init };
})();

/* ─── SMOOTH PAGE TRANSITIONS ─── */
const PageTransition = (() => {
  const el = document.getElementById('page-trans');

  const exit = (url) => {
    if (!el) { window.location.href = url; return; }
    el.classList.add('enter');
    setTimeout(() => { window.location.href = url; }, 450);
  };

  const enter = () => {
    if (!el) return;
    el.classList.add('exit');
    setTimeout(() => el.classList.remove('exit'), 600);
  };

  const init = () => {
    enter();
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http') || a.hasAttribute('data-no-trans')) return;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        Audio.click();
        exit(href);
      });
    });
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', Audio.hover);
    });
  };

  return { init };
})();

/* ─── INTERSECTION OBSERVER — REVEAL ─── */
const Reveal = (() => {
  const opts = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Animate skill bars
        entry.target.querySelectorAll('.skill-fill[data-w]').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.w; }, 100);
        });
        obs.unobserve(entry.target);
      }
    });
  }, opts);

  const init = () => {
    document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .tl-item, .sec-heading').forEach(el => obs.observe(el));
  };

  return { init };
})();

/* ─── CHAPTER COUNTER ─── */
const Chapter = (() => {
  const curr  = document.querySelector('.ch-curr');
  const total = document.querySelector('.ch-total');
  const sections = document.querySelectorAll('section[data-ch]');

  const update = () => {
    let active = 1;
    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6) active = i + 1;
    });
    if (curr)  curr.textContent  = String(active).padStart(2, '0');
    if (total) total.textContent = '/ ' + String(sections.length).padStart(2, '0');
  };

  const init = () => {
    if (!sections.length) return;
    window.addEventListener('scroll', update, { passive: true });
    update();
  };

  return { init };
})();

/* ─── DEV CONSOLE EASTER EGG ─── */
const DevConsole = (() => {
  const panel  = document.getElementById('dev-console');
  const output = document.getElementById('dc-out');
  const input  = document.getElementById('dc-in');
  let open     = false;
  let history  = [];
  let histIdx  = -1;

  const commands = {
    help: () => `<span class="dc-sys">Available commands:</span>\n  help · about · skills · projects · contact · chocoholic · clear · exit`,
    about: () => `<span class="dc-sys">KOVIDHA SUBASINGHE</span>\nIntern Software Engineer · SWE Undergraduate\nBSc @ Birmingham City University via Java Institute\nInnobot Health (Nov 2025) · Galle, Sri Lanka`,
    skills: () => `<span class="dc-sys">SKILL MATRIX</span>\nLanguages:  Java · Python · PHP · JavaScript\nAutomation: Python · Selenium · Google APIs · RPA\nFrameworks: Spring Boot · Laravel · Bootstrap\nDatabases:  MySQL · PostgreSQL · SQLite`,
    projects: () => `<span class="dc-sys">PROJECTS</span>\natlas         → Multi-tenant client ops SaaS, Laravel/Livewire/PostgreSQL\nlms_sentinel  → LMS control plane, Ed25519 licensing + HMAC heartbeats\nedulms        → White-label LMS, data-plane node under Sentinel\npjbiology     → LMS, 5000+ students, PHP/MySQL/Bootstrap\nleisureland · pelicanmall · rekaira · lqlk · flexGym · amity`,
    contact: () => `<span class="dc-sys">CONTACT</span>\nEmail:    kovidhasubasinghe@gmail.com\nGitHub:   github.com/RogueChocoholic\nLinkedIn: linkedin.com/in/kovidha-subasinghe\nBehance:  behance.net/kovidhasubasinghe (design era)`,
    chocoholic: () => `<span style="color:#c17f24"><i class="fa-solid fa-mug-hot" aria-hidden="true"></i> EASTER EGG FOUND</span>\nYet another chocoholic found among the lines.\nDark chocolate only. No milk. No exceptions.\n<span style="color:#8a6a50">// cacao-opacity: 100%</span>`,
    clear: () => { if (output) output.innerHTML = ''; return null; },
    exit: () => { toggle(); return null; }
  };

  const print = (html) => {
    if (!output || html === null) return;
    output.innerHTML += html + '\n';
    output.scrollTop = output.scrollHeight;
  };

  const run = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    print(`<span class="dc-sys">$</span> ${cmd}`);
    if (!trimmed) return;
    history.unshift(trimmed); histIdx = -1;
    const fn = commands[trimmed];
    if (fn) { const res = fn(); if (res) print(res); }
    else print(`<span class="dc-err">Command not found: ${trimmed}. Type 'help'.</span>`);
  };

  const toggle = () => {
    open = !open;
    if (panel) panel.classList.toggle('open', open);
    if (open && input) { setTimeout(() => input.focus(), 420); print('<span class="dc-sys">KOVIDHA.OS DevConsole v2.4.1 — type \'help\'</span>'); }
  };

  const init = () => {
    if (!panel) return;

    // ` key toggle
    window.addEventListener('keydown', e => {
      if (e.key === '`' || e.key === '~') { e.preventDefault(); toggle(); }
      if (!open) return;
      if (e.key === 'ArrowUp')   { histIdx = Math.min(histIdx + 1, history.length - 1); if (input) input.value = history[histIdx] || ''; }
      if (e.key === 'ArrowDown') { histIdx = Math.max(histIdx - 1, -1); if (input) input.value = histIdx < 0 ? '' : history[histIdx]; }
    });

    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { run(input.value); input.value = ''; }
      });
    }

    document.getElementById('dc-close')?.addEventListener('click', toggle);
  };

  return { init, toggle };
})();

/* ─── KONAMI CODE EASTER EGG ─── */
const Konami = (() => {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;

  const trigger = () => {
    document.body.style.filter = 'sepia(0.4) hue-rotate(-10deg)';
    const msg = document.createElement('div');
    msg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(13,5,0,.97);border:1px solid #c17f24;padding:2rem 3rem;z-index:99999;font-family:Courier Prime,monospace;color:#f5e6d3;text-align:center;font-size:.9rem;';
    msg.innerHTML = `<div style="color:#c17f24;font-size:1.1rem;margin-bottom:.75rem;"><i class="fa-solid fa-mug-hot" aria-hidden="true"></i> CHEAT CODE DETECTED</div><div>Cacao mode: ACTIVATED</div><div style="color:#8a6a50;font-size:.75rem;margin-top:.5rem;">// only the real ones find this</div>`;
    document.body.appendChild(msg);
    setTimeout(() => { msg.remove(); document.body.style.filter = ''; }, 3000);
  };

  const init = () => {
    window.addEventListener('keydown', e => {
      if (e.key === code[idx]) { idx++; if (idx === code.length) { trigger(); idx = 0; } }
      else { idx = e.key === code[0] ? 1 : 0; }
    });
  };

  return { init };
})();

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('click', Audio.init, { once: true });
  window.addEventListener('mousemove', Audio.init, { once: true });

  Cursor.init();
  Nav.init();
  PageTransition.init();
  Reveal.init();
  Chapter.init();
  DevConsole.init();
  Konami.init();
});
