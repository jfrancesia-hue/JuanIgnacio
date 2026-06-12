const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));

const glow = document.getElementById('cursorGlow');
const progress = document.getElementById('scrollProgress');
const nav = document.querySelector('.nav');
const parallaxItems = document.querySelectorAll('.stage-photo, .dossier-stack img, .pdf-mosaic img');
let px = innerWidth / 2;
let py = innerHeight / 2;
let tx = px;
let ty = py;

window.addEventListener('pointermove', (event) => {
  tx = event.clientX;
  ty = event.clientY;
});

function updateScrollEffects() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const ratio = max > 0 ? scrollY / max : 0;
  if (progress) progress.style.width = `${ratio * 100}%`;
  if (nav) nav.classList.toggle('scrolled', scrollY > 70);
  parallaxItems.forEach((el, index) => {
    const speed = (index % 2 ? -1 : 1) * 0.035;
    el.style.translate = `0 ${scrollY * speed}px`;
  });
}

window.addEventListener('scroll', updateScrollEffects, { passive: true });
updateScrollEffects();

function loop() {
  px += (tx - px) * 0.08;
  py += (ty - py) * 0.08;
  if (glow) glow.style.transform = `translate(${px - 170}px, ${py - 170}px)`;
  requestAnimationFrame(loop);
}
loop();

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });
}

const contactToggle = document.querySelector('.contact-toggle');
const contactOptions = document.getElementById('contactOptions');
if (contactToggle && contactOptions) {
  contactToggle.addEventListener('click', () => {
    const isOpen = contactToggle.getAttribute('aria-expanded') === 'true';
    contactToggle.setAttribute('aria-expanded', String(!isOpen));
    contactOptions.hidden = isOpen;
  });
}

document.querySelectorAll('.tilt, .hero-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-3px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});


const backgroundAudio = document.getElementById('backgroundAudio');
const audioToggle = document.getElementById('audioToggle');
let audioRequested = false;

async function playBackgroundAudio() {
  if (!backgroundAudio || !audioToggle) return;
  audioRequested = true;
  backgroundAudio.volume = 0.28;
  try {
    await backgroundAudio.play();
    audioToggle.classList.add('is-playing');
    audioToggle.setAttribute('aria-pressed', 'true');
    audioToggle.setAttribute('aria-label', 'Pausar música de fondo');
    const label = audioToggle.querySelector('.audio-label');
    if (label) label.textContent = 'Sonando';
  } catch (error) {
    audioToggle.classList.remove('is-playing');
    audioToggle.setAttribute('aria-pressed', 'false');
    const label = audioToggle.querySelector('.audio-label');
    if (label) label.textContent = 'Escuchar';
  }
}

function pauseBackgroundAudio() {
  if (!backgroundAudio || !audioToggle) return;
  backgroundAudio.pause();
  audioToggle.classList.remove('is-playing');
  audioToggle.setAttribute('aria-pressed', 'false');
  audioToggle.setAttribute('aria-label', 'Activar música de fondo');
  const label = audioToggle.querySelector('.audio-label');
  if (label) label.textContent = 'Música';
}

if (backgroundAudio && audioToggle) {
  audioToggle.addEventListener('click', () => {
    if (backgroundAudio.paused) playBackgroundAudio();
    else pauseBackgroundAudio();
  });

  // Browsers usually block autoplay with sound. Try once, then retry on first visitor interaction.
  playBackgroundAudio();
  const unlockAudio = () => {
    if (!audioRequested || backgroundAudio.paused) playBackgroundAudio();
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  };
  window.addEventListener('pointerdown', unlockAudio, { once: true });
  window.addEventListener('keydown', unlockAudio, { once: true });
}
