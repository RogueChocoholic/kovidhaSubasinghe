/* Project case study page renderer */
'use strict';

function renderProjectCaseStudy() {
  if (typeof PROJECTS === 'undefined') {
    console.error('project-detail: PROJECTS not loaded');
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get('p') || 'pjbiology';
  const data = PROJECTS[id] || PROJECTS.pjbiology;

  const pageTitle = `${data.title} | Kovidha Subasinghe`;
  const seoDesc = `${data.short} Case study by Kovidha Subasinghe — ${data.stack.slice(0, 4).join(', ')}.`;
  const imagePath = data.thumb || data.thumbFallback || (typeof SITE !== 'undefined' ? SITE.ogImage : '');
  const imageAbs = imagePath && imagePath.startsWith('http')
    ? imagePath
    : (typeof absoluteAsset === 'function' ? absoluteAsset(imagePath) : imagePath);

  if (typeof applyPageSEO === 'function') {
    applyPageSEO({
      title: pageTitle,
      description: seoDesc,
      path: `/project-detail.html?p=${id}`,
      image: imageAbs,
    });
  }

  document.title = pageTitle;

  const labelEl = document.getElementById('proj-label');
  const titleEl = document.getElementById('proj-title');
  const heroBg = document.getElementById('proj-hero-bg');
  const statsEl = document.getElementById('proj-stats');
  const bodyEl = document.getElementById('proj-body');
  const stackEl = document.getElementById('proj-stack');

  if (!labelEl || !titleEl || !heroBg || !statsEl || !bodyEl || !stackEl) {
    console.error('project-detail: missing DOM nodes');
    return;
  }

  labelEl.textContent = data.label;
  titleEl.textContent = data.title;

  const heroImage = data.thumb || data.thumbFallback;
  if (heroImage) {
    heroBg.style.backgroundImage = `url('${heroImage}')`;
    heroBg.style.backgroundSize = 'cover';
    heroBg.style.backgroundPosition = 'center';
    heroBg.style.filter = 'brightness(0.35)';
  } else {
    heroBg.style.background = data.heroGrad;
    heroBg.style.backgroundImage = 'none';
    heroBg.style.filter = 'none';
  }

  const extWrap = document.getElementById('proj-external-wrap');
  const extLink = document.getElementById('proj-external');
  if (data.external && extWrap && extLink) {
    extWrap.style.display = 'block';
    extLink.href = data.external;
    const labelSpan = extLink.querySelector('span');
    if (labelSpan) {
      labelSpan.textContent = data.external.includes('github.com') ? 'View on GitHub' : 'View live site';
    }
  } else if (extWrap) {
    extWrap.style.display = 'none';
  }

  statsEl.innerHTML = data.stats.map((s, i) => `
    ${i ? '<div style="width:1.5px;background:rgba(193,127,36,.1);"></div>' : ''}
    <div class="proj-stat">
      <div class="proj-stat-val">${s.val}</div>
      <div class="proj-stat-lbl">${s.lbl}</div>
    </div>`).join('');

  bodyEl.innerHTML = data.body;
  stackEl.innerHTML = data.stack.map(t =>
    `<span style="font-family:var(--font-mono);font-size:.85rem;padding:.5rem 1.25rem;border:1px solid rgba(193,127,36,.25);color:var(--amber-300);">${t}</span>`
  ).join('');

  const next = data.next;
  const nextTitle = document.getElementById('next-proj-title');
  const nextLink = document.getElementById('next-proj-link');
  if (next && nextTitle && nextLink) {
    nextTitle.textContent = next.title;
    nextLink.href = `project-detail.html?p=${next.id}`;
  }

  /* Observe reveal classes injected into case study body */
  if (typeof Reveal !== 'undefined' && Reveal.init) {
    Reveal.init();
  }
}

document.addEventListener('DOMContentLoaded', renderProjectCaseStudy);
