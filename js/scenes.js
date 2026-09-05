/* ============================================================
   KOVIDHA.OS — scenes.js
   Scroll-based storytelling, parallax, skill bars, interactions
   ============================================================ */

'use strict';

/* ─── PARALLAX ─── */
const Parallax = (() => {
  const items = [];

  const collect = () => {
    document.querySelectorAll('[data-para]').forEach(el => {
      items.push({ el, speed: parseFloat(el.dataset.para) || 0.2 });
    });
  };

  const update = () => {
    const sy = window.scrollY;
    items.forEach(({ el, speed }) => {
      el.style.transform = `translateY(${sy * speed}px)`;
    });
  };

  const init = () => {
    collect();
    if (!items.length) return;
    window.addEventListener('scroll', update, { passive: true });
    update();
  };

  return { init };
})();

/* ─── SKILL BAR ANIMATION ─── */
const SkillBars = (() => {
  const SKILLS = {
    languages: [
      { name: 'Java',       pct: 80 },
      { name: 'Python',     pct: 85 },
      { name: 'PHP',        pct: 80 },
      { name: 'JavaScript', pct: 75 },
    ],
    frameworks: [
      { name: 'Laravel',     pct: 65 },
      { name: 'Spring Boot', pct: 55 },
    ],
    architecture: [
      { name: 'Microservices',    pct: 75 },
      { name: 'REST APIs',        pct: 80 },
      { name: 'Multi-tenant SaaS',pct: 72 },
    ],
    databases: [
      { name: 'MySQL',             pct: 90 },
      { name: 'PostgreSQL',        pct: 85 },
      { name: 'Firebase Firestore',pct: 78 },
      { name: 'SQLite',            pct: 72 },
    ],
    automation: [
      { name: 'Python (RPA)',      pct: 82 },
      { name: 'Selenium',          pct: 78 },
      { name: 'Google APIs',       pct: 75 },
      { name: 'API Integration',   pct: 80 },
    ],
  };

  /* Map a proficiency weight to a human label (shown instead of a raw %) */
  const skillLabel = (pct) => {
    if (pct >= 85) return 'Advanced';
    if (pct >= 70) return 'Proficient';
    if (pct >= 55) return 'Solid';
    return 'Learning';
  };

  const renderCategory = (container, label, skills) => {
    const cat = document.createElement('div');
    const lbl = document.createElement('div');
    lbl.className = 'skill-cat-lbl';
    lbl.textContent = label;
    cat.appendChild(lbl);

    skills.forEach(s => {
      const row = document.createElement('div');
      row.className = 'skill-row';
      row.innerHTML = `
        <div class="skill-info">
          <span class="skill-nm">${s.name}</span>
          <span class="skill-pct">${skillLabel(s.pct)}</span>
        </div>
        <div class="skill-track">
          <div class="skill-fill" data-w="${s.pct}%"></div>
        </div>`;
      cat.appendChild(row);
    });

    container.appendChild(cat);
  };

  const init = () => {
    const container = document.getElementById('skill-cats');
    if (!container) return;

    renderCategory(container, 'Languages',    SKILLS.languages);
    renderCategory(container, 'Automation',   SKILLS.automation);
    renderCategory(container, 'Architecture', SKILLS.architecture);
    renderCategory(container, 'Frameworks',   SKILLS.frameworks);
    renderCategory(container, 'Databases',    SKILLS.databases);

    /* Observer to trigger bar animations */
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-fill[data-w]').forEach((bar, i) => {
            setTimeout(() => { bar.style.width = bar.dataset.w; }, i * 80 + 100);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    obs.observe(container);
  };

  return { init };
})();

/* ─── TERMINAL SKILLS DEMO ─── */
const TermDemo = (() => {
  const OUTPUTS = [
    { delay: 0,    prompt: '$', text: 'kovidha --list-skills --category languages' },
    { delay: 400,  prompt: null, text: '  → Java       [proficient]' },
    { delay: 600,  prompt: null, text: '  → Python     [proficient]' },
    { delay: 800,  prompt: null, text: '  → PHP        [proficient]' },
    { delay: 1000, prompt: null, text: '  → JavaScript [solid]' },
    { delay: 1400, prompt: '$', text: 'kovidha --list-tools' },
    { delay: 1800, prompt: null, text: '  → Postman · IntelliJ · VS Code · HeidiSQL' },
    { delay: 2200, prompt: '$', text: 'kovidha --status' },
    { delay: 2600, prompt: null, text: '  Currently: Intern @ Innobot Health (Nov 2025)' },
    { delay: 2900, prompt: null, text: '  Focus:     Backend · Automation · RPA · APIs' },
    { delay: 3300, prompt: '$', text: '█' },
  ];

  let triggered = false;

  const run = (body) => {
    if (!body) return;
    body.innerHTML = '';

    OUTPUTS.forEach(({ delay, prompt, text }) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.style.cssText = 'opacity:0;transform:translateY(4px);transition:opacity 200ms,transform 200ms;';
        if (prompt) {
          line.innerHTML = `<span style="color:var(--amber-400)">${prompt}</span> <span style="color:var(--cream-200)">${text}</span>`;
        } else {
          line.innerHTML = `<span style="color:var(--cream-600)">${text}</span>`;
        }
        body.appendChild(line);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          line.style.opacity = '1'; line.style.transform = 'translateY(0)';
        }));
        body.scrollTop = body.scrollHeight;
      }, delay);
    });
  };

  const init = () => {
    const body = document.getElementById('s-term-body');
    if (!body) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          run(body);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    obs.observe(body);
  };

  return { init };
})();

/* ─── PROJECT CARD HOVER 3D TILT ─── */
const CardTilt = (() => {
  const MAX = 8; // degrees

  const apply = (card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateX(${-dy * MAX}deg) rotateY(${dx * MAX}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 500ms cubic-bezier(0.16,1,0.3,1)';
    });
    card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
  };

  const init = () => {
    document.querySelectorAll('.proj-card').forEach(apply);
  };

  return { init };
})();

/* ─── SECTION CHAPTER HEADINGS — split word reveal ─── */
const HeadingReveal = (() => {
  const split = (el) => {
    // Clone the element to work safely
    const clone = el.cloneNode(true);
    
    // Clear original content
    el.innerHTML = '';

    // Process each child node
    clone.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Split only text nodes
        const words = node.textContent.split(/(\s+)/);
        
        words.forEach(word => {
          if (word.trim() === '') {
            el.appendChild(document.createTextNode(word));
          } else {
            const line = document.createElement('span');
            line.className = 'line';
            
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.textContent = word;
            
            line.appendChild(wordSpan);
            el.appendChild(line);
          }
        });
      } 
      else if (node.nodeType === Node.ELEMENT_NODE) {
        // Preserve existing elements (like <span class="acc">) and wrap them
        const line = document.createElement('span');
        line.className = 'line';
        
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.appendChild(node.cloneNode(true));   // keep the original span
        
        line.appendChild(wordSpan);
        el.appendChild(line);
      }
    });
  };

  const init = () => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.sec-heading[data-split]').forEach(el => {
      split(el);
      obs.observe(el);
    });
  };

  return { init };
})();

/* ─── CINEMATIC HORIZONTAL SCROLL (mobile projects) ─── */
const HScroll = (() => {
  const init = () => {
    const track = document.querySelector('.proj-hscroll');
    if (!track) return;

    let isDown = false, startX, scrollLeft;

    track.addEventListener('mousedown',  e => { isDown = true; track.classList.add('dragging'); startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
    track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mouseup',    () => { isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mousemove',  e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  };

  return { init };
})();

/* ─── AMBIENT BACKGROUND PARTICLES ─── */
const Particles = (() => {
  const HERO = document.getElementById('hero');

  const create = () => {
    if (!HERO) return;
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 2 + 1;
      p.style.cssText = `
        position:absolute;
        width:${size}px;
        height:${size}px;
        background:var(--amber-400);
        border-radius:50%;
        top:${Math.random() * 100}%;
        left:${Math.random() * 100}%;
        opacity:${Math.random() * 0.15 + 0.03};
        animation:floatP ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 4}s infinite alternate;
        pointer-events:none;
        z-index:1;
      `;
      HERO.appendChild(p);
    }

    const style = document.createElement('style');
    style.textContent = `@keyframes floatP { from { transform: translateY(0) translateX(0); } to { transform: translateY(-${20 + Math.random()*20}px) translateX(${Math.random()*10-5}px); } }`;
    document.head.appendChild(style);
  };

  const init = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    create();
  };

  return { init };
})();

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  Parallax.init();
  SkillBars.init();
  TermDemo.init();
  CardTilt.init();
  HeadingReveal.init();
  HScroll.init();
  Particles.init();
});
