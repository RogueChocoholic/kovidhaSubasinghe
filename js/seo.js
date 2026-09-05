/* Dynamic meta tag updates (project detail pages) */
'use strict';

function setMetaName(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(property, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * @param {{ title: string, description: string, path?: string, image?: string }} opts
 */
function applyPageSEO(opts) {
  const origin = typeof SITE !== 'undefined' ? SITE.origin : '';
  const title = opts.title;
  const description = opts.description;
  const url = opts.path && origin ? `${origin}${opts.path}` : '';
  const image = opts.image && origin
    ? (opts.image.startsWith('http') ? opts.image : `${origin}${opts.image.startsWith('/') ? opts.image : '/' + opts.image}`)
    : (typeof SITE !== 'undefined' ? absoluteAsset(SITE.ogImage) : '');

  document.title = title;
  setMetaName('title', title);
  setMetaName('description', description);
  setMetaProperty('og:title', title);
  setMetaProperty('og:description', description);
  setMetaName('twitter:title', title);
  setMetaName('twitter:description', description);
  if (url) {
    setMetaProperty('og:url', url);
    setMetaName('twitter:url', url);
    setCanonical(url);
  }
  if (image) {
    setMetaProperty('og:image', image);
    setMetaName('twitter:image', image);
  }
}
