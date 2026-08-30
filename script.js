// MENU BURGER (mobile)
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
  const setMenu = (open) => {
    burger.classList.toggle('open', open);
    navLinks.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  burger.addEventListener('click', () => {
    setMenu(!navLinks.classList.contains('open'));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) setMenu(false);
  });
}

// BOUTON TELECHARGER : RACCOURCI VERS LE BON STORE
// Sur mobile, le bouton de la nav envoie directement sur l'App Store ou le
// Play Store. Sur ordinateur il garde son lien vers telecharger.html.
// TODO: remplacer ces deux URLs par les vraies fiches store une fois l'app publiée.
const APP_STORE_URL = 'https://apps.apple.com/fr/app/bligo/idXXXXXXXXX';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=fr.bligo.app';

function storeUrlForDevice() {
  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS) return APP_STORE_URL;
  if (/Android/.test(ua)) return PLAY_STORE_URL;
  return null;
}

const storeUrl = storeUrlForDevice();
if (storeUrl) {
  document.querySelectorAll('.nav-cta').forEach(cta => {
    cta.href = storeUrl;
    cta.target = '_blank';
    cta.rel = 'noopener';
  });
}

// ACTIVE NAV LINK SELON LA PAGE
const currentPage = (window.location.pathname.split('/').pop() || 'index.html');
document.querySelectorAll('.nav-links a[href]').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});
