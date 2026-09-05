/* ============================================================
   KOVIDHA.OS — projects.js
   Shared project metadata for listings & case studies
   ============================================================ */

'use strict';

const PROJECTS = {
  meraeatlas: {
    label: 'Featured · Multi-tenant SaaS · Solo build',
    title: 'Atlas — Client Ops Platform',
    thumb: 'assets/projects/meraeatlas/01.png',
    thumbFallback: null,
    heroGrad: 'linear-gradient(135deg, #04110d 0%, #0a2e25 50%, #0d3d31 100%)',
    link: 'project-detail.html?p=meraeatlas',
    external: null,
    featured: true,
    stats: [
      { val: 'Multi', lbl: 'Tenant isolation' },
      { val: '4', lbl: 'Roles (RBAC)' },
      { val: '10+', lbl: 'Modules' },
      { val: 'PgSQL', lbl: 'Single database' },
    ],
    stack: ['Laravel 12', 'Livewire 4', 'PostgreSQL', 'Tailwind CSS', 'Spatie Permission', 'PHP 8.2'],
    short: 'Multi-tenant client operations platform — projects, tickets, features, billing, files and monitoring, with strict role-based isolation between clients, PMs and developers.',
    body: `
      <div class="g2e reveal" style="align-items:start;">
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE PROBLEM</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">An agency juggling multiple clients needed a single source of truth — projects, support tickets, feature roadmaps, invoices, files and uptime — without leaking one client's data to another, and without standing up a separate app per customer.</p>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Clients, project managers and developers all needed different views of the same system, with an audit trail that could never be quietly edited.</p>
        </div>
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE SOLUTION</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">A logically multi-tenant platform on a single PostgreSQL database: every record carries an <code style="color:var(--cream-200);">organization_id</code> and visibility is enforced model-side via a <code style="color:var(--cream-200);">scopeVisibleTo()</code> contract — no schema-per-tenant sprawl.</p>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Built on Laravel 12 + Livewire 4 with Spatie roles/permissions, polymorphic comments shared across tickets, features, projects and invoices, strict PHP enums for every status, and an append-only global activity log.</p>
        </div>
      </div>
      <div class="callout reveal d1">
        <p><strong style="color:var(--amber-400);">Architecture:</strong> Database queue + file cache (no Redis dependency), local filesystem storage, scheduled monitors running every five minutes, and internal-vs-client visibility enforced through explicit flags rather than guesswork.</p>
      </div>
      <div class="reveal d2" style="margin-top:3rem;">
        <div class="scene-tag" style="margin-bottom:1.5rem;">// inside the platform</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;">
          <img src="assets/projects/meraeatlas/02.png" alt="Atlas role-aware dashboard" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/meraeatlas/03.png" alt="Atlas projects module" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/meraeatlas/05.png" alt="Atlas tickets with strict status flow" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/meraeatlas/06.png" alt="Atlas invoices and billing" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/meraeatlas/07.png" alt="Atlas monitoring" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/meraeatlas/08.png" alt="Atlas global activity log" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
        </div>
      </div>
    `,
    next: { id: 'lmssentinel', title: 'LMS SENTINEL' },
  },

  lmssentinel: {
    label: 'Featured · Control plane · Licensing & billing',
    title: 'LMS Sentinel — Control Plane',
    thumb: 'assets/projects/lmssentinel/01.png',
    thumbFallback: null,
    heroGrad: 'linear-gradient(135deg, #070617 0%, #1a1340 50%, #241a5e 100%)',
    link: 'project-detail.html?p=lmssentinel',
    external: null,
    featured: true,
    stats: [
      { val: 'Ed25519', lbl: 'Signed licenses' },
      { val: 'HMAC', lbl: 'Heartbeat auth' },
      { val: 'Fleet', lbl: 'Multi-instance' },
      { val: 'Auto', lbl: 'Billing + suspend' },
    ],
    stack: ['Laravel 12', 'PostgreSQL', 'Tailwind v4', 'Alpine.js', 'libsodium · Ed25519', 'HMAC-SHA256'],
    short: 'Control plane for a fleet of LMS deployments — provisioning, Ed25519-signed licensing, HMAC heartbeats, live monitoring and automated billing from one operator console.',
    body: `
      <div class="g2e reveal" style="align-items:start;">
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE PROBLEM</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">Selling the same LMS to many institutes creates a fleet problem: who is licensed for what, which instances are still alive, who has paid, and how do you cut off a non-payer — without manually SSH-ing into every box?</p>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Licenses also had to survive offline: an instance shouldn't be able to forge or extend its own entitlements.</p>
        </div>
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE SOLUTION</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">A dedicated control plane that issues <strong>Ed25519-signed licenses</strong> (base64 JSON + detached signature — tamper-evident even offline) and ingests <strong>HMAC-SHA256 signed heartbeats</strong> with a replay window, so each LMS proves its identity on every call.</p>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Operators provision a tenant, pick a plan, and Sentinel hands back the exact <code style="color:var(--cream-200);">.env</code> block — the API key is shown once and stored encrypted. Plans merge with per-instance feature/limit overrides to produce the final license.</p>
        </div>
      </div>
      <div class="callout reveal d1">
        <p><strong style="color:var(--amber-400);">Operations:</strong> Scheduled commands flag instances with no recent heartbeat as offline, mark overdue invoices, and auto-suspend non-payers. A dense, animated operator UI surfaces fleet revenue, alerts and heartbeat volume at a glance.</p>
      </div>
      <div class="reveal d2" style="margin-top:3rem;">
        <div class="scene-tag" style="margin-bottom:1.5rem;">// operator console</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;">
          <img src="assets/projects/lmssentinel/01.png" alt="Sentinel fleet overview" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/lmssentinel/03.png" alt="Sentinel managed instances" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/lmssentinel/02.png" alt="Sentinel tenants" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/lmssentinel/04.png" alt="Sentinel plans and capabilities" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/lmssentinel/05.png" alt="Sentinel billing" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/lmssentinel/07.png" alt="Sentinel audit log" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
        </div>
      </div>
    `,
    next: { id: 'edulms', title: 'EDULMS' },
  },

  edulms: {
    label: 'Featured · White-label LMS · Data-plane node',
    title: 'EduLMS — White-label LMS',
    thumb: 'assets/projects/edulms/01.png',
    thumbFallback: null,
    heroGrad: 'linear-gradient(135deg, #02141a 0%, #073b4a 50%, #0a5566 100%)',
    link: 'project-detail.html?p=edulms',
    external: null,
    featured: true,
    stats: [
      { val: 'White-label', lbl: 'Re-brandable in-app' },
      { val: '4', lbl: 'User roles' },
      { val: 'i18n', lbl: 'English + Sinhala' },
      { val: 'PayHere', lbl: 'Online payments' },
    ],
    stack: ['Laravel 12', 'MySQL', 'Tailwind v4', 'Alpine.js', 'Blade', 'PayHere'],
    short: 'Single-tenant, fully brandable LMS — catalog, commerce, assessments, attendance and queued comms; ships as a licensed data-plane node under the Sentinel control plane.',
    body: `
      <div class="g2e reveal" style="align-items:start;">
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE PROBLEM</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">Every tuition institute wants "their own" LMS — their name, logo, colours and currency — but maintaining a bespoke fork per client is unsustainable. The same codebase had to re-skin itself and toggle features without a redeploy.</p>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">It also needed to behave under a licensing authority: degrade gracefully when a subscription lapses, and only expose capabilities the plan allows.</p>
        </div>
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE SOLUTION</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">A single-tenant LMS that is re-branded entirely from an in-app Super Admin <strong>Settings</strong> panel — name, logo, theme colours, currency, contact info and operational kill switches (sign-in, registrations, payments, maintenance mode).</p>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Catalog & commerce (categories, classes, recordings, tutes, packages, invoices, bank-slip review, PayHere), assessment (papers, answer sheets, marking, auto-ranking, QR attendance) and queued e-mail/SMS/Telegram comms — with one role-aware login for Students, Assessors, Admins and Super Admins. English + Sinhala throughout.</p>
        </div>
      </div>
      <div class="callout reveal d1">
        <p><strong style="color:var(--amber-400);">Ecosystem:</strong> EduLMS is the <em>data-plane</em> node for <strong>LMS Sentinel</strong> — each deployment authenticates with Ed25519 licenses and HMAC heartbeats, and its feature limits are enforced from the control plane. Designed, built and wired end-to-end solo.</p>
      </div>
      <div class="reveal d2" style="margin-top:3rem;">
        <div class="scene-tag" style="margin-bottom:1.5rem;">// the product</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;">
          <img src="assets/projects/edulms/01.png" alt="EduLMS branded landing page" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/edulms/02.png" alt="EduLMS admin dashboard" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/edulms/07.png" alt="EduLMS white-label settings and kill switches" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/edulms/03.png" alt="EduLMS student management" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/edulms/04.png" alt="EduLMS packages catalog" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
          <img src="assets/projects/edulms/06.png" alt="EduLMS invoices" loading="lazy" style="width:100%;border:1px solid rgba(193,127,36,.2);border-radius:6px;" />
        </div>
      </div>
    `,
    next: { id: 'pjbiology', title: 'PJBIOLOGY LMS' },
  },

  pjbiology: {
    label: 'Featured · Client · Solo build',
    title: 'PJBiology LMS',
    thumb: 'assets/projects/pjbiology/01.png',
    thumbFallback: null,
    heroGrad: 'linear-gradient(135deg, #1a0800 0%, #3d1a00 50%, #5c2800 100%)',
    link: 'project-detail.html?p=pjbiology',
    external: null,
    featured: true,
    stats: [
      { val: '5000+', lbl: 'Students registered' },
      { val: '1', lbl: 'Engineer (solo)' },
      { val: 'PROD', lbl: 'Live system' },
      { val: '100%', lbl: 'Lifecycle owned' },
    ],
    stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'AJAX', 'HTML/CSS'],
    short: 'Full Learning Management System for a biology tuition platform — registration, packages, live classes, and admin dashboard. Built and maintained solo.',
    body: `
      <div class="g2e reveal" style="align-items:start;">
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE PROBLEM</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">A biology teacher needed a way to manage course content, student accounts, monthly class packages, and resources — without expensive SaaS platforms or a technical team for every update.</p>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">The client had zero technical background. The system had to be intuitive enough to operate independently, yet robust enough for thousands of active students.</p>
        </div>
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE SOLUTION</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">I architected and built a complete, custom LMS from the ground up — owning every decision from the database schema to deployment and post-launch support.</p>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Student registration, package purchase, content delivery, and admin tooling — all shipped on PHP, MySQL, and Bootstrap with AJAX-driven interfaces.</p>
        </div>
      </div>
      <div class="callout reveal d2">
        <p><strong style="color:var(--amber-400);">Impact:</strong> Over <strong>5,000 students</strong> registered on the platform. Delivered ahead of schedule with ongoing UI and performance improvements.</p>
      </div>
    `,
    next: { id: 'pelicanmall', title: 'PELICANMALL' },
  },

  pelicanmall: {
    label: 'Academic · E-commerce · Full stack',
    title: 'PelicanMall eCommerce',
    thumb: 'assets/projects/pelicanmall/01.png',
    thumbFallback: null,
    heroGrad: 'linear-gradient(135deg, #0d0a1a 0%, #1a1a3d 50%, #0d0028 100%)',
    link: 'project-detail.html?p=pelicanmall',
    external: 'https://pelicantechmall.infinityfreeapp.com/',
    featured: false,
    stats: [
      { val: 'PHP', lbl: 'Full-stack' },
      { val: 'Stripe', lbl: 'Payments' },
      { val: 'REST', lbl: 'Cart & orders' },
      { val: 'Demo', lbl: 'Live mock site' },
    ],
    stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'AJAX', 'Stripe'],
    short: 'Full-stack e-commerce platform for a computer shop — product catalog, cart, orders, and admin dashboard. Built as an academic viva project.',
    body: `
      <div class="g2e reveal" style="align-items:start;">
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE PROBLEM</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">Pelican Software Solutions needed a demonstrable online store — product listing, accounts, cart, and order flows — within a tight one-month academic timeline.</p>
        </div>
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE SOLUTION</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">Built a PHP/MySQL e-commerce app with Bootstrap UI, AJAX for dynamic catalog updates, Stripe integration, and a custom admin panel for inventory and orders.</p>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Optimized for free hosting constraints — efficient queries and lightweight assets.</p>
        </div>
      </div>
      <div class="callout reveal d2">
        <p><strong style="color:var(--amber-400);">Note:</strong> Homepage cards on my older portfolio listed React/Node — the actual stack is <strong>PHP, MySQL, Bootstrap, and Stripe</strong>.</p>
      </div>
    `,
    next: { id: 'rekaira', title: 'REKAIRA' },
  },

  rekaira: {
    label: 'Agency site · Frontend · 2025',
    title: 'Rekaira Agency Website',
    thumb: 'assets/projects/rekaira/01.png',
    thumbFallback: null,
    heroGrad: 'linear-gradient(135deg, #1a0a14 0%, #3d1a2d 50%, #2d0d1a 100%)',
    link: 'project-detail.html?p=rekaira',
    external: null,
    featured: false,
    stats: [
      { val: '100%', lbl: 'Frontend complete' },
      { val: 'Multi', lbl: 'Audience flows' },
      { val: 'HTML', lbl: 'Vanilla stack' },
      { val: 'Live', lbl: 'Public demo' },
    ],
    stack: ['HTML', 'Tailwind CSS', 'JavaScript'],
    short: 'Marketing and development agency site — services, careers, consultations, and project intake. Frontend complete; backend integration in progress.',
    body: `
      <div class="g2e reveal" style="align-items:start;">
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">OVERVIEW</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Rekaira is a digital marketing and custom software agency. I designed and built the complete frontend — unified branding for clients, job seekers, and general visitors.</p>
        </div>
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">HIGHLIGHTS</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Career listings, consultation booking, and project request flows — all with responsive Tailwind layouts and vanilla JS interactivity (no heavy frameworks).</p>
        </div>
      </div>
    `,
    next: { id: 'lqlk', title: 'LQ.LK' },
  },

  lqlk: {
    label: 'Web Team MCG · Event · 2024',
    title: "Lovers' Quarrel 2024 (LQ.lk)",
    thumb: 'assets/projects/lqlk/01.png',
    thumbFallback: null,
    heroGrad: 'linear-gradient(135deg, #0d1a1a 0%, #1a3d3d 50%, #0d2828 100%)',
    link: 'project-detail.html?p=lqlk',
    external: null,
    featured: false,
    stats: [
      { val: '5000+', lbl: 'Event visits' },
      { val: 'Vue', lbl: 'SPA frontend' },
      { val: 'Live', lbl: 'Score updates' },
      { val: 'Team', lbl: 'MCG Web Team' },
    ],
    stack: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'Vue.js'],
    short: 'Event hub for Mahinda College\'s Big Match 2024 — live scorecard, match info, and mobile-first UI. Frontend by me; backend by teammates.',
    body: `
      <div class="g2e reveal" style="align-items:start;">
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">CONTEXT</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Built as part of Web Team MCG for the 2024 Big Match — a high-traffic, short-lived event site serving fans and students with real-time match coverage.</p>
        </div>
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">ROLE</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Led frontend development with Vue.js and Bootstrap. Coordinated with backend developers on API contracts and mobile performance under concurrent load.</p>
        </div>
      </div>
    `,
    next: { id: 'leisureland', title: 'LEISURELAND' },
  },

  leisureland: {
    label: 'Client · Room reservation · 2024',
    title: 'LeisureLand Reservation System',
    thumb: null,
    thumbFallback: null,
    heroGrad: 'linear-gradient(135deg, #0d1a0d 0%, #1a3d1a 50%, #0d2800 100%)',
    link: 'project-detail.html?p=leisureland',
    external: null,
    featured: false,
    stats: [
      { val: 'REST', lbl: 'API architecture' },
      { val: 'UX', lbl: 'Non-tech users' },
      { val: 'PHP', lbl: 'Backend' },
      { val: 'PROD', lbl: 'Deployed' },
    ],
    stack: ['PHP REST', 'MySQL', 'Tailwind CSS', 'JavaScript'],
    short: 'Room reservation system for non-technical staff — mobile-app-like web UI on a clean PHP REST backend.',
    body: `
      <div class="g2e reveal" style="align-items:start;">
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE PROBLEM</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">A hospitality business needed reservations staff could run without training — not another complex admin panel.</p>
        </div>
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">THE SOLUTION</h2>
          <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">PHP REST API with a mobile-first Tailwind frontend. Availability, booking flows, and confirmations designed for minimal cognitive load.</p>
        </div>
      </div>
      <div class="callout reveal d2">
        <p><strong style="color:var(--amber-400);">Screenshots:</strong> Project imagery coming soon — add files to <code style="color:var(--cream-200);">assets/projects/leisureland/</code>.</p>
      </div>
    `,
    next: { id: 'flexgym', title: 'FLEXGYM' },
  },

  flexgym: {
    label: 'GitHub · Java · Gym management',
    title: 'flexGym App',
    thumb: null,
    thumbFallback: null,
    heroGrad: 'linear-gradient(135deg, #1a0a00 0%, #3d2000 50%, #1a1400 100%)',
    link: 'project-detail.html?p=flexgym',
    external: 'https://github.com/RogueChocoholic/flexGym-App',
    featured: false,
    stats: [
      { val: 'Java', lbl: 'Primary language' },
      { val: '2', lbl: 'GitHub stars' },
      { val: 'Mgmt', lbl: 'Gym system' },
      { val: 'OSS', lbl: 'Public repo' },
    ],
    stack: ['Java', 'MySQL', 'OOP', 'Desktop/Web'],
    short: 'Standalone gym management system — member tracking, scheduling, and operations in a self-contained Java application.',
    body: `
      <div class="reveal">
        <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">OVERVIEW</h2>
        <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">A gym management system built in Java as a standalone application. Explores domain modeling, persistence, and practical business workflows for fitness centers.</p>
        <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">Source and documentation on GitHub — screenshots can be added to the repo or <code style="color:var(--cream-200);">assets/projects/flexgym/</code> when ready.</p>
      </div>
    `,
    next: { id: 'amity', title: 'AMITY CHAT' },
  },

  amity: {
    label: 'GitHub · React Native · TypeScript',
    title: 'Amity Chat App',
    thumb: null,
    thumbFallback: null,
    heroGrad: 'linear-gradient(135deg, #0d051a 0%, #2d1a3d 50%, #1a0a2d 100%)',
    link: 'project-detail.html?p=amity',
    external: 'https://github.com/RogueChocoholic/Amity_ChatApp_ReactNative',
    featured: false,
    stats: [
      { val: 'RN', lbl: 'React Native' },
      { val: 'TS', lbl: 'TypeScript' },
      { val: 'Chat', lbl: 'Messaging UI' },
      { val: 'OSS', lbl: 'Public repo' },
    ],
    stack: ['React Native', 'TypeScript', 'JavaScript', 'Mobile'],
    short: 'React Native chat application — mobile messaging patterns, component architecture, and TypeScript in a cross-platform codebase.',
    body: `
      <div class="reveal">
        <h2 style="font-family:var(--font-display);font-size:clamp(2rem,5vw,4rem);color:var(--cream-50);letter-spacing:.02em;line-height:.92;margin-bottom:2rem;">OVERVIEW</h2>
        <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;margin-bottom:1.25rem;">A React Native project exploring real-time chat UX, navigation, and state on mobile. Built with TypeScript for safer component contracts.</p>
        <p style="font-size:1.0625rem;color:var(--cream-300);line-height:1.8;">View the codebase on GitHub. App screenshots can be dropped into <code style="color:var(--cream-200);">assets/projects/amity/</code> when available.</p>
      </div>
    `,
    next: { id: 'meraeatlas', title: 'ATLAS' },
  },
};

/** Thumb URL with fallback gradient if image missing */
function projectThumbStyle(project) {
  const url = project.thumb || project.thumbFallback;
  if (url) {
    return `background-image: url('${url}'), ${project.heroGrad}; background-size: cover; background-position: center;`;
  }
  return `background: ${project.heroGrad};`;
}

/** Ordered list for projects page */
const PROJECT_ORDER = [
  'meraeatlas',
  'lmssentinel',
  'edulms',
  'pjbiology',
  'leisureland',
  'pelicanmall',
  'rekaira',
  'lqlk',
  'flexgym',
  'amity',
];

/** Featured on homepage */
const HOME_FEATURED = ['meraeatlas', 'lmssentinel', 'edulms'];
