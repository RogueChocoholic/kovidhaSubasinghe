/* ============================================================
   KOVIDHA.OS — intro.js
   Boot sequence: terminal animation + transition to main site
   ============================================================ */

'use strict';

const Intro = (() => {
  /* Boot messages — each: [delay_ms, prompt, message, status] */
  const LINES = [
    [0,   '>', 'KOVIDHA.OS v2.4.1 — booting...', null],
    [400, '>', 'Mounting filesystem...', null],
    [700, '•', 'Loading kernel modules', '[  OK  ]'],
    [950, '•', 'Loading portfolio engine', '[  OK  ]'],
    [1150,'•', 'Initialising: backend.core', '[  OK  ]'],
    [1350,'•', 'Initialising: automation.daemon', '[  OK  ]'],
    [1500,'•', 'Loading: project archive', '[  OK  ]'],
    [1700,'•', 'Loading: cacao dependency v4.2.0', '[  WARN ]'],   // chocoholic ☕
    [2000,'>', 'All systems nominal.', null],
    [2250,'>', 'Welcome.', null],
  ];

  const overlay  = document.getElementById('intro');
  const tbody    = document.getElementById('t-body');
  const revName  = document.querySelector('.intro-name');

  let done = false;

  /* Create one terminal line element */
  const makeLine = (prompt, text, status) => {
    const line = document.createElement('div');
    line.className = 't-line';

    const p = document.createElement('span');
    p.className = 't-prompt';
    p.textContent = prompt;

    const t = document.createElement('span');
    t.textContent = text;

    line.appendChild(p);
    line.appendChild(t);

    if (status) {
      const s = document.createElement('span');
      s.className = status.includes('WARN') ? 't-warn' : 't-ok';
      s.textContent = status;
      line.appendChild(s);
    }

    return line;
  };

  /* Sequence runner */
  const run = () => {
    if (!overlay || !tbody) { skip(); return; }

    LINES.forEach(([delay, prompt, text, status]) => {
      setTimeout(() => {
        if (tbody) {
          const line = makeLine(prompt, text, status);
          tbody.appendChild(line);
          /* tiny reflow trick to trigger transition */
          requestAnimationFrame(() => requestAnimationFrame(() => line.classList.add('show')));
          tbody.scrollTop = tbody.scrollHeight;
        }
      }, delay);
    });

    /* Show name reveal */
    const totalDelay = LINES[LINES.length - 1][0] + 400;
    setTimeout(() => {
      if (revName) {
        revName.style.display = 'block';
        requestAnimationFrame(() => requestAnimationFrame(() => revName.classList.add('show')));
      }
    }, totalDelay);

    /* Auto-transition */
    setTimeout(() => {
      if (!done) exit();
    }, totalDelay + 900);
  };

  /* Remove cursor line */
  const removeCursor = () => {
    document.getElementById('t-cur')?.remove();
  };

  /* Transition out */
  const exit = () => {
    if (done) return;
    done = true;
    removeCursor();

    /* Quick glitch on name before exit */
    if (revName) {
      revName.classList.add('glitch');
      revName.setAttribute('data-text', revName.textContent);
    }

    setTimeout(() => {
      if (overlay) overlay.classList.add('exit');
      document.body.classList.remove('no-scroll');

      /* Fire hero reveal after overlay fades */
      setTimeout(() => {
        overlay?.remove();
        triggerHeroReveal();
      }, 750);
    }, 300);
  };

  /* Hero animations after intro */
  const triggerHeroReveal = () => {
    document.querySelector('.hero-label')?.classList.add('vis');
    setTimeout(() => document.querySelector('.hero-name')?.classList.add('vis'), 150);
    setTimeout(() => document.querySelector('.hero-bio')?.classList.add('vis'), 300);
    setTimeout(() => document.querySelector('.hero-scroll')?.classList.add('vis'), 550);
  };

  /* Allow skip on any key / click */
  const bindSkip = () => {
    const skipFn = (e) => {
      if (e.type === 'keydown' && (e.key === 'Escape' || e.key === ' ')) { e.preventDefault(); exit(); }
      if (e.type === 'click') exit();
    };
    window.addEventListener('keydown', skipFn, { once: false });
    /* only click after a delay so it's not instant */
    setTimeout(() => window.addEventListener('click', skipFn, { once: true }), 1000);

    /* Remove listener after exit */
    overlay?.addEventListener('transitionend', () => window.removeEventListener('keydown', skipFn));
  };

  const skip = () => exit();

  const init = () => {
    if (!overlay) return; /* No intro on inner pages */
    document.body.classList.add('no-scroll');
    bindSkip();
    run();
  };

  return { init, skip };
})();

document.addEventListener('DOMContentLoaded', Intro.init);
