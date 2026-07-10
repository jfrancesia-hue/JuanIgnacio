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
    audioToggle.setAttribute('aria-label', getLangText('audioPause'));
    const label = audioToggle.querySelector('.audio-label');
    if (label) label.textContent = getLangText('audioPlaying');
  } catch (error) {
    audioToggle.classList.remove('is-playing');
    audioToggle.setAttribute('aria-pressed', 'false');
    const label = audioToggle.querySelector('.audio-label');
    if (label) label.textContent = getLangText('audioListen');
  }
}

function pauseBackgroundAudio() {
  if (!backgroundAudio || !audioToggle) return;
  backgroundAudio.pause();
  audioToggle.classList.remove('is-playing');
  audioToggle.setAttribute('aria-pressed', 'false');
  audioToggle.setAttribute('aria-label', getLangText('audioActivate'));
  const label = audioToggle.querySelector('.audio-label');
  if (label) label.textContent = getLangText('audioMusic');
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


// BILINGUAL SITE COPY 2026-07-10
const I18N_STORAGE_KEY = 'jim-language';
const I18N_COPY = {
  meta: {
    es: {
      lang: 'es',
      title: 'Juan Ignacio Molina — Música andina, folklore argentino y contratación artística',
      description: 'Sitio artístico de Juan Ignacio Molina: compositor e intérprete catamarqueño para festivales, teatros, auditorios, eventos culturales y quenas profesionales.',
      switchLabel: 'Switch language to English'
    },
    en: {
      lang: 'en',
      title: 'Juan Ignacio Molina — Andean music, Argentine folklore and artist booking',
      description: 'Official artistic site of Juan Ignacio Molina: composer and performer from Catamarca for festivals, theaters, auditoriums, cultural events and professional quenas.',
      switchLabel: 'Cambiar idioma a español'
    }
  },
  texts: {
    'Saltar al contenido': 'Skip to content',
    'Música': 'Music',
    'Biografía': 'Biography',
    'Proyecto': 'Project',
    'Escuchar': 'Listen',
    'Ficha técnica': 'Tech sheet',
    'Agenda': 'Schedule',
    'Galería': 'Gallery',
    'Trayectoria': 'Career',
    'Contratación': 'Booking',
    'Menú': 'Menu',
    'Ver dossier': 'View dossier',
    'Compositor e intérprete · Catamarca, Argentina': 'Composer and performer · Catamarca, Argentina',
    'Juan Ignacio Molina': 'Juan Ignacio Molina',
    'Compositor e intérprete con más de 20 años de experiencia en festivales, teatros y auditorios; músico sesionista, director musical y productor dentro del ámbito artístico nacional.': 'Composer and performer with more than 20 years of experience in festivals, theaters and auditoriums; session musician, musical director and producer within Argentina’s national artistic scene.',
    'Contratar presentación': 'Book a performance',
    'Descargar dossier': 'Download dossier',
    'Escuchar obra': 'Listen to the work',
    'Festivales': 'Festivals',
    'Teatros': 'Theaters',
    'Auditorios': 'Auditoriums',
    'Eventos culturales': 'Cultural events',
    'Compositor e intérprete': 'Composer and performer',
    '+20 años de trayectoria': '+20 years of career',
    'Festivales nacionales, giras europeas, producción musical, dirección escénica y una propuesta en vivo con equipo artístico-técnico integral.': 'National festivals, European tours, music production, stage direction and a live proposal with a full artistic and technical team.',
    'Biografía y formación musical.': 'Biography and musical training.',
    'Nacido en Catamarca en 1987, desde los 7 años Juan Ignacio Molina encontró en los instrumentos aerófonos andinos un lenguaje propio. En 2004 fue invitado por Sergio Galleguillo a una grabación en vivo en La Rioja; en 2006 formó un dúo de flauta y guitarra con David Badja, grabó su primer disco y realizó una gira europea por Eslovenia, Francia, Alemania, Bélgica y España.': 'Born in Catamarca in 1987, Juan Ignacio Molina found his own language in Andean wind instruments from the age of seven. In 2004 he was invited by Sergio Galleguillo to a live recording in La Rioja; in 2006 he formed a flute and guitar duo with David Badja, recorded his first album and toured Europe through Slovenia, France, Germany, Belgium and Spain.',
    'Es Licenciado en Flauta y Licenciado en Música Popular por la Universidad Nacional de Cuyo. Fue becado por la UNESP en São Paulo, por el Fondo Nacional de las Artes y por la UNSAM para formarse con el maestro Dino Saluzzi.': 'He holds degrees in Flute and Popular Music from the National University of Cuyo. He received scholarships from UNESP in São Paulo, the National Arts Fund and UNSAM to study with maestro Dino Saluzzi.',
    'El proyecto': 'The project',
    'Folklore argentino, mundo andino y texturas contemporáneas.': 'Argentine folklore, the Andean world and contemporary textures.',
    'La propuesta musical invita a un viaje por el altiplano catamarqueño: clásicos de la música argentina, nuevas versiones de danzas nativas, composiciones propias y una sonoridad potente que integra flautas, vientos originarios, voz y arreglos escénicos.': 'The musical proposal invites audiences on a journey through the highlands of Catamarca: Argentine classics, new versions of native dances, original compositions and a powerful sound that integrates flutes, native winds, voice and stage arrangements.',
    'En vivo, el proyecto puede desplegarse con músicos, asistencia técnica, sonido, iluminación y proyección visual, construyendo una experiencia de escenario inmersiva y profesional.': 'Live, the project can be presented with musicians, technical assistance, sound, lighting and visual projection, creating an immersive and professional stage experience.',
    'años de experiencia': 'years of experience',
    'países en gira europea': 'countries toured in Europe',
    'Consagración Festival del Poncho': 'Festival del Poncho award',
    'personas para formato escénico completo': 'people for the full stage format',
    'Escuchá su música': 'Listen to his music',
    'Antes de contratar, dejá que la obra hable.': 'Before booking, let the music speak.',
    'Una propuesta atravesada por flautas, aerófonos andinos, folklore argentino y nuevas texturas. Material disponible para escuchar y compartir con programadores, productores y equipos culturales.': 'A proposal shaped by flutes, Andean wind instruments, Argentine folklore and new textures. Material ready to listen to and share with programmers, producers and cultural teams.',
    'Escuchar en Spotify': 'Listen on Spotify',
    'Ver canal oficial en YouTube': 'Watch the official YouTube channel',
    'Álbum': 'Album',
    'Formatos de presentación': 'Performance formats',
    'Opciones claras para cada escenario.': 'Clear options for every stage.',
    'Formato solista': 'Solo format',
    'Presentación íntima con flauta, aerófonos andinos, guitarra/charango y voz. Ideal para ciclos culturales, auditorios y eventos especiales.': 'An intimate performance with flute, Andean wind instruments, guitar/charango and voice. Ideal for cultural series, auditoriums and special events.',
    'Dúo o ensamble reducido': 'Duo or reduced ensemble',
    'Mayor riqueza armónica y rítmica, manteniendo una puesta flexible para teatros, salas y programaciones culturales.': 'Greater harmonic and rhythmic richness while keeping a flexible setup for theaters, venues and cultural programs.',
    'Banda completa': 'Full band',
    'Experiencia escénica potente con músicos acompañantes, pensada para festivales, escenarios grandes y eventos con alta convocatoria.': 'A powerful stage experience with accompanying musicians, designed for festivals, large stages and high-attendance events.',
    'Puesta integral': 'Full production',
    'Equipo artístico-técnico con sonido, iluminación, visuales, asistentes y coordinación para propuestas institucionales o festivales.': 'Artistic and technical team with sound, lighting, visuals, assistants and coordination for institutional programs or festivals.',
    'Ideal para programadores': 'Ideal for programmers',
    'Una propuesta lista para escenarios culturales.': 'A proposal ready for cultural stages.',
    'Formato adaptable para escenarios populares, fiestas provinciales y programaciones con identidad argentina y latinoamericana.': 'Adaptable format for popular stages, provincial celebrations and programs with Argentine and Latin American identity.',
    'Teatros y auditorios': 'Theaters and auditoriums',
    'Concierto cuidado, sensible y profesional para salas donde importan la escucha, la narrativa y la presencia escénica.': 'A careful, sensitive and professional concert for venues where listening, narrative and stage presence matter.',
    'Eventos institucionales': 'Institutional events',
    'Propuesta sólida para gobiernos, universidades, embajadas, organismos culturales y celebraciones con raíz territorial.': 'A strong proposal for governments, universities, embassies, cultural organizations and celebrations rooted in territory.',
    'Ciclos culturales': 'Cultural series',
    'Presentación flexible para espacios independientes, museos, centros culturales y encuentros de música de raíz.': 'A flexible performance for independent spaces, museums, cultural centers and roots-music gatherings.',
    'Ficha de contratación': 'Booking sheet',
    'Qué incluye la presentación.': 'What the performance includes.',
    'Una ficha clara para que productores y equipos técnicos entiendan rápido el alcance de la propuesta antes de consultar disponibilidad.': 'A clear sheet so producers and technical teams can quickly understand the scope before checking availability.',
    'Pedir ficha completa': 'Request full sheet',
    'Duración': 'Duration',
    'Set adaptable según programación: concierto breve, show central o propuesta extendida.': 'Adaptable set depending on the program: short concert, main show or extended proposal.',
    'Formatos': 'Formats',
    'Solista, dúo/ensamble reducido, banda completa o puesta integral.': 'Solo, duo/reduced ensemble, full band or full production.',
    'Repertorio': 'Repertoire',
    'Folklore argentino, aerófonos andinos, composiciones propias y música de raíz catamarqueña.': 'Argentine folklore, Andean wind instruments, original compositions and music rooted in Catamarca.',
    'Producción': 'Production',
    'Posibilidad de coordinación artística, sonido, iluminación, visuales y asistencia técnica.': 'Possibility of artistic coordination, sound, lighting, visuals and technical assistance.',
    'Flauta': 'Flute',
    'Aerófonos andinos': 'Andean wind instruments',
    'Charango': 'Charango',
    'Guitarra': 'Guitar',
    'Voz': 'Voice',
    'Dirección musical': 'Musical direction',
    'Producción escénica': 'Stage production',
    'Quenas profesionales': 'Professional quenas',
    'Instrumentos fabricados y seleccionados por Juan Ignacio Molina.': 'Instruments made and selected by Juan Ignacio Molina.',
    'Un espacio pensado para músicos, estudiantes avanzados y amantes de los vientos andinos que buscan una quena confiable, afinada y lista para escenario o estudio.': 'A space for musicians, advanced students and lovers of Andean winds looking for a reliable, tuned quena ready for stage or studio.',
    'Cada instrumento puede ser revisado bajo criterio musical profesional: afinación, respuesta, comodidad, timbre y terminación.': 'Each instrument can be reviewed under professional musical criteria: tuning, response, comfort, timbre and finish.',
    'Consultar quenas disponibles': 'Ask about available quenas',
    'Ver contacto': 'See contact',
    'Versión Bamboo': 'Bamboo version',
    'Sonoridad noble, liviana y expresiva para estudio, ensayo y escenario.': 'Noble, light and expressive sound for studio, rehearsal and stage.',
    'Versión Madera': 'Wood version',
    'Mayor cuerpo tímbrico y presencia para intérpretes que buscan carácter.': 'Greater timbral body and presence for performers seeking character.',
    'Selección Pro': 'Pro selection',
    'Instrumentos revisados por afinación, respuesta y comodidad interpretativa.': 'Instruments reviewed for tuning, response and playing comfort.',
    'Conciertos y próximas presentaciones.': 'Concerts and upcoming performances.',
    'Próximamente': 'Coming soon',
    'Fechas disponibles para programadores y productores culturales.': 'Dates available for cultural programmers and producers.',
    'Este espacio puede actualizarse con conciertos vigentes, próximas presentaciones, festivales, ciclos culturales y actividades especiales.': 'This space can be updated with current concerts, upcoming performances, festivals, cultural series and special activities.',
    'Consultar agenda': 'Ask about schedule',
    'Fecha a confirmar': 'Date to be confirmed',
    'Concierto / presentación': 'Concert / performance',
    'Ciudad · Espacio cultural': 'City · Cultural venue',
    'Festival / ciclo musical': 'Festival / music series',
    'Formato solista, ensamble o banda completa': 'Solo, ensemble or full band format',
    'Agenda abierta': 'Open schedule',
    'Contrataciones 2026': '2026 bookings',
    'Festivales, teatros, auditorios y eventos institucionales': 'Festivals, theaters, auditoriums and institutional events',
    'Escenario, identidad y presencia artística.': 'Stage, identity and artistic presence.',
    'Presentación en vivo': 'Live performance',
    'Retrato artístico': 'Artist portrait',
    'Identidad musical': 'Musical identity',
    'Formación, escenarios y reconocimientos.': 'Training, stages and recognitions.',
    'Premio Estímulo · Mención Especial': 'Stimulus Award · Special Mention',
    'Reconocimiento artístico en Catamarca.': 'Artistic recognition in Catamarca.',
    'Invitación de Sergio Galleguillo': 'Invitation from Sergio Galleguillo',
    'Grabación en vivo con Los Amigos en La Rioja.': 'Live recording with Los Amigos in La Rioja.',
    'Dúo flauta y guitarra': 'Flute and guitar duo',
    'Primer disco y gira europea por Eslovenia, Francia, Alemania, Bélgica y España.': 'First album and European tour through Slovenia, France, Germany, Belgium and Spain.',
    'UNCuyo + UNESP': 'UNCuyo + UNESP',
    'Licenciaturas en Flauta y Música Popular; beca de formación musical en São Paulo, Brasil.': 'Degrees in Flute and Popular Music; music training scholarship in São Paulo, Brazil.',
    'Consagración Fiesta Nacional del Poncho': 'Fiesta Nacional del Poncho award',
    'Reconocimiento central en la escena cultural catamarqueña.': 'A central recognition in Catamarca’s cultural scene.',
    'Dirección musical en Cosquín': 'Musical direction in Cosquín',
    'Dirección y producción musical de la delegación oficial de Catamarca.': 'Musical direction and production for Catamarca’s official delegation.',
    'Disco solista “Sólo”': 'Solo album “Sólo”',
    'Folklore y música andina de Catamarca en formato solista.': 'Folklore and Andean music from Catamarca in solo format.',
    'Beca UNSAM · Dino Saluzzi': 'UNSAM scholarship · Dino Saluzzi',
    'Formación musical con uno de los grandes maestros argentinos.': 'Musical training with one of Argentina’s great masters.',
    'Capacidades artísticas': 'Artistic capabilities',
    'Un músico integral para escenarios exigentes.': 'A complete musician for demanding stages.',
    'Interpretación': 'Performance',
    'Flauta, aerófonos andinos, charango, guitarra y voz.': 'Flute, Andean wind instruments, charango, guitar and voice.',
    'Composición': 'Composition',
    'Obra propia inspirada en Laguna Blanca, la infancia y la raíz andina.': 'Original work inspired by Laguna Blanca, childhood and Andean roots.',
    'Coordinación artística, producción, logística y puesta en escena.': 'Artistic coordination, production, logistics and staging.',
    'Formato escénico': 'Stage format',
    'Presentaciones con músicos, asistentes, sonido, iluminación y visuales.': 'Performances with musicians, assistants, sound, lighting and visuals.',
    'Prensa y validación': 'Press and validation',
    'Credenciales claras para decidir la contratación.': 'Clear credentials to support booking decisions.',
    'Festival del Poncho': 'Festival del Poncho',
    'Consagración 2013 en una de las celebraciones culturales más relevantes del NOA.': '2013 award at one of the most relevant cultural celebrations in Northwest Argentina.',
    'Gira europea': 'European tour',
    'Presentaciones en Eslovenia, Francia, Alemania, Bélgica y España.': 'Performances in Slovenia, France, Germany, Belgium and Spain.',
    'Formación académica': 'Academic training',
    'Licenciado en Flauta y Música Popular por la Universidad Nacional de Cuyo.': 'Degree holder in Flute and Popular Music from the National University of Cuyo.',
    'Experiencia en producción, coordinación escénica y delegaciones oficiales.': 'Experience in production, stage coordination and official delegations.',
    'Cuando estén disponibles, este bloque puede sumar links de prensa, videos oficiales, Spotify y notas periodísticas.': 'When available, this block can include press links, official videos, Spotify and media coverage.',
    'Contratación 2026': '2026 booking',
    'Festivales, teatros, auditorios y eventos institucionales.': 'Festivals, theaters, auditoriums and institutional events.',
    'Escribir por WhatsApp': 'Message on WhatsApp',
    'Contrataciones · festivales · teatros · auditorios': 'Bookings · festivals · theaters · auditoriums',
    'Contrataciones y presentaciones artísticas.': 'Bookings and artistic performances.',
    'Formato solista o presentación ampliada con equipo artístico-técnico. Ideal para festivales, ciclos culturales, teatros, eventos institucionales y propuestas de música argentina/latinoamericana.': 'Solo format or expanded performance with an artistic and technical team. Ideal for festivals, cultural series, theaters, institutional events and Argentine/Latin American music programs.',
    'Ver contactos': 'View contacts',
    'Llamar': 'Call',
    'Contacto directo': 'Direct contact',
    'Dossier PDF': 'PDF dossier',
    'Ver / descargar': 'View / download',
    'Los datos de contacto se despliegan solo cuando el visitante los necesita.': 'Contact details open only when the visitor needs them.',
    'Contratar': 'Book',
    'Catamarca · Argentina · 3834017942': 'Catamarca · Argentina · 3834017942',
    'Dossier artístico': 'Artistic dossier'
  },
  attrs: {
    'Inicio Juan Ignacio Molina': 'Juan Ignacio Molina home',
    'Activar música de fondo': 'Play background music',
    'Pausar música de fondo': 'Pause background music',
    'Resumen artístico': 'Artistic summary',
    'Perfil artístico resumido': 'Brief artistic profile',
    'Atajo de contratación': 'Booking shortcut',
    'Portadas de álbumes de Juan Ignacio Molina': 'Juan Ignacio Molina album covers',
    'Juan Ignacio Molina en presentación en vivo': 'Juan Ignacio Molina performing live',
    'Retrato de Juan Ignacio Molina con instrumento': 'Portrait of Juan Ignacio Molina with instrument',
    'Juan Ignacio Molina con instrumento': 'Juan Ignacio Molina with instrument',
    'Biografía del dossier': 'Dossier biography',
    'Dirección musical del dossier': 'Dossier musical direction',
    'Portada del álbum TAKU de Juan Ignacio Molina': 'TAKU album cover by Juan Ignacio Molina',
    'Logo Juan Ignacio Molina': 'Juan Ignacio Molina logo'
  },
  ui: {
    es: { audioPause: 'Pausar música de fondo', audioPlaying: 'Sonando', audioListen: 'Escuchar', audioActivate: 'Activar música de fondo', audioMusic: 'Música' },
    en: { audioPause: 'Pause background music', audioPlaying: 'Playing', audioListen: 'Listen', audioActivate: 'Play background music', audioMusic: 'Music' }
  }
};
const I18N_REVERSE = Object.fromEntries(Object.entries(I18N_COPY.texts).map(([es, en]) => [en, es]));
const I18N_ATTR_REVERSE = Object.fromEntries(Object.entries(I18N_COPY.attrs).map(([es, en]) => [en, es]));

function getCurrentLang(){ return localStorage.getItem(I18N_STORAGE_KEY) === 'en' ? 'en' : 'es'; }
function getLangText(key){ const lang = getCurrentLang(); return (I18N_COPY.ui[lang] && I18N_COPY.ui[lang][key]) || (I18N_COPY.ui.es && I18N_COPY.ui.es[key]) || ''; }
function translateValue(value, lang){
  const clean = String(value || '').trim();
  if(!clean) return value;
  if(lang === 'en') return I18N_COPY.texts[clean] || value;
  return I18N_REVERSE[clean] || value;
}
function translateAttrValue(value, lang){
  const clean = String(value || '').trim();
  if(!clean) return value;
  if(lang === 'en') return I18N_COPY.attrs[clean] || I18N_COPY.texts[clean] || value;
  return I18N_ATTR_REVERSE[clean] || I18N_REVERSE[clean] || value;
}
function replaceKeepingSpace(value, translated){
  const leading = String(value).match(/^\s*/)[0];
  const trailing = String(value).match(/\s*$/)[0];
  return leading + translated + trailing;
}
function updateBookingLinks(lang){
  const esMsg = 'Hola Juan Ignacio, quiero consultar por una presentación artística';
  const enMsg = 'Hello Juan Ignacio, I would like to ask about booking an artistic performance';
  const esMsg2026 = 'Hola Juan Ignacio, quiero consultar por contratación 2026';
  const enMsg2026 = 'Hello Juan Ignacio, I would like to ask about 2026 bookings';
  document.querySelectorAll('a[href*="wa.me/5493834017942"]').forEach((link) => {
    const current = decodeURIComponent(link.getAttribute('href') || '');
    const msg = current.includes('2026') ? (lang === 'en' ? enMsg2026 : esMsg2026) : (lang === 'en' ? enMsg : esMsg);
    link.href = 'https://wa.me/5493834017942?text=' + encodeURIComponent(msg);
  });
}
function applyLanguage(lang){
  const target = lang === 'en' ? 'en' : 'es';
  localStorage.setItem(I18N_STORAGE_KEY, target);
  document.documentElement.lang = I18N_COPY.meta[target].lang;
  document.title = I18N_COPY.meta[target].title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if(metaDescription) metaDescription.setAttribute('content', I18N_COPY.meta[target].description);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if(ogTitle) ogTitle.setAttribute('content', target === 'en' ? 'Juan Ignacio Molina — Composer and performer' : 'Juan Ignacio Molina — Compositor e intérprete');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if(ogDescription) ogDescription.setAttribute('content', target === 'en' ? 'Argentine folklore, Andean wind instruments and music rooted in Catamarca for cultural and institutional stages.' : 'Folklore argentino, aerófonos andinos y música de raíz catamarqueña para escenarios culturales e institucionales.');

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node){
      const parent = node.parentElement;
      if(!parent || ['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      const text = node.nodeValue.trim();
      if(!text) return NodeFilter.FILTER_REJECT;
      if(target === 'en' && I18N_COPY.texts[text]) return NodeFilter.FILTER_ACCEPT;
      if(target === 'es' && I18N_REVERSE[text]) return NodeFilter.FILTER_ACCEPT;
      return NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const translated = translateValue(node.nodeValue, target);
    if(translated !== node.nodeValue) node.nodeValue = replaceKeepingSpace(node.nodeValue, translated);
  });
  document.querySelectorAll('[aria-label], img[alt], [title]').forEach((el) => {
    ['aria-label','alt','title'].forEach((attr) => {
      if(!el.hasAttribute(attr)) return;
      const translated = translateAttrValue(el.getAttribute(attr), target);
      el.setAttribute(attr, translated);
    });
  });
  document.querySelectorAll('[data-lang-toggle]').forEach((button) => {
    button.setAttribute('aria-pressed', String(target === 'en'));
    button.setAttribute('aria-label', I18N_COPY.meta[target].switchLabel);
  });
  if(audioToggle){
    audioToggle.setAttribute('aria-label', backgroundAudio && !backgroundAudio.paused ? getLangText('audioPause') : getLangText('audioActivate'));
    const label = audioToggle.querySelector('.audio-label');
    if(label) label.textContent = backgroundAudio && !backgroundAudio.paused ? getLangText('audioPlaying') : getLangText('audioMusic');
  }
  updateBookingLinks(target);
}

document.querySelectorAll('[data-lang-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    applyLanguage(getCurrentLang() === 'en' ? 'es' : 'en');
  });
});
applyLanguage(getCurrentLang());
