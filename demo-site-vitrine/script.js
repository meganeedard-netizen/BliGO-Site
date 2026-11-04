// Menu mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }));
}

// Horaires : jour en cours + « Ouvert / Fermé » en direct
// Format attendu : « 9h - 12h30 / 14h - 18h » ou « Fermé »
const toMinutes = t => {
  const m = t.trim().match(/^(\d{1,2})h(\d{2})?$/);
  return m ? Number(m[1]) * 60 + Number(m[2] || 0) : null;
};
const rows = document.querySelectorAll('.hours:not(.prices) tr');
const status = document.querySelector('.status');
if (rows.length === 7) {
  const now = new Date();
  const dayIndex = (now.getDay() + 6) % 7; // lundi = 0
  const row = rows[dayIndex];
  row.classList.add('today');
  const hours = row.dataset.heures || '';
  const minutes = now.getHours() * 60 + now.getMinutes();
  const slots = hours.split('/').map(s => s.split('-').map(toMinutes)).filter(s => s.length === 2 && s[0] !== null && s[1] !== null);
  const current = slots.find(([a, b]) => minutes >= a && minutes < b);
  if (status) {
    const label = status.querySelector('span');
    if (current) {
      status.classList.add('open');
      const end = current[1];
      label.textContent = `Ouvert maintenant, jusqu'à ${Math.floor(end / 60)}h${String(end % 60).padStart(2, '0').replace(/^00$/, '')}`;
    } else {
      const next = slots.find(([a]) => a > minutes);
      label.textContent = next ? `Fermé pour le moment, ouverture à ${Math.floor(next[0] / 60)}h${String(next[0] % 60).padStart(2, '0').replace(/^00$/, '')}` : 'Fermé pour aujourd\'hui';
    }
    status.hidden = false;
  }
}
