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

// FORMULAIRE DE CONTACT : ENVOI EN AJAX (reste sur bligo.fr, pas de redirection Formspree)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const statusSuccess = document.getElementById('contact-status-success');
  const statusError = document.getElementById('contact-status-error');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusSuccess.hidden = true;
    statusError.hidden = true;
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        contactForm.hidden = true;
        statusSuccess.hidden = false;
        contactForm.reset();
      } else {
        statusError.hidden = false;
        submitBtn.disabled = false;
      }
    } catch (err) {
      statusError.hidden = false;
      submitBtn.disabled = false;
    }
  });
}

// ACTIVE NAV LINK SELON LA PAGE
const currentPage = (window.location.pathname.split('/').pop() || 'index.html');
document.querySelectorAll('.nav-links a[href]').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});
