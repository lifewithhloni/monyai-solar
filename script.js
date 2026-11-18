const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !expanded);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const motionTargets = document.querySelectorAll(
  '.section-head, .benefit-card, .service-card, .about-inner, .steps article, .difference-inner > div, .project-note, .contact-intro, .quote-form'
);
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  motionTargets.forEach((element) => element.classList.add('reveal'));
  document.body.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  motionTargets.forEach((element) => revealObserver.observe(element));
}

const form = document.querySelector('#quote-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = [
    'Hello MONYAI SOLAR SERVICES, I would like to request a quotation.',
    '',
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Email: ${data.get('email')}`,
    `Property type: ${data.get('property')}`,
    `Service required: ${data.get('service')}`,
    `Location: ${data.get('location') || 'Not provided'}`,
    `Project details: ${data.get('message') || 'Not provided'}`,
  ].join('\n');
  document.querySelector('#form-status').textContent = 'Your email app is opening with your enquiry ready to send.';
  window.location.href = `mailto:monyaithabo123@gmail.com?subject=${encodeURIComponent('Solar quotation request')}&body=${encodeURIComponent(body)}`;
});
