/* Site-wide URLs for SEO — update origin when deploying to a new domain */
'use strict';

const SITE = {
  origin: 'https://kovidha-subasinghe.vercel.app',
  name: 'Kovidha Subasinghe',
  tagline: 'Intern Software Engineer · Software Engineering Undergraduate',
  email: 'kovidhasubasinghe@gmail.com',
  locale: 'en_LK',
  ogImage: '/assets/img/hero.png',
  sameAs: [
    'https://github.com/RogueChocoholic',
    'https://www.linkedin.com/in/kovidha-subasinghe/',
    'https://www.behance.net/kovidhasubasinghe',
    'https://x.com/devChocoholic',
  ],
  keywords:
    'Kovidha Subasinghe, kovidha, RogueChocoholic, software engineer, intern, portfolio, web developer, PHP, Python, Java, automation, LMS, PJBiology, Sri Lanka, Galle, Birmingham City University, Java Institute, Innobot Health, projects, resume, CV',
};

function siteUrl(path = '') {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.origin}${p}`;
}

function absoluteAsset(path) {
  return siteUrl(path.startsWith('/') ? path : `/${path}`);
}
