// ============================================================
// TAB SWITCHING — no page reload, fade transition
// ============================================================
function initTabs() {
  const buttons = document.querySelectorAll('[data-tab-btn]');
  const panels = document.querySelectorAll('[data-tab-panel]');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab-btn');

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-tab-panel') === target);
      });

      // update URL hash without jumping, so the view is shareable/refreshable
      history.replaceState(null, '', '#' + target);

      // re-run reveal check for the newly shown panel
      requestAnimationFrame(revealCheck);
    });
  });

  // open the tab matching the URL hash on load, if present
  const initial = window.location.hash.replace('#', '');
  const match = document.querySelector(`[data-tab-btn="${initial}"]`);
  if (match) match.click();
}

// ============================================================
// SCROLL REVEAL — IntersectionObserver, staggered
// ============================================================
let revealObserver;

function initReveal() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.setProperty('--d', (i % 4) * 0.08 + 's');
    revealObserver.observe(el);
  });
}

// re-check elements inside a panel that just became visible
// (IntersectionObserver misses elements that were display:none on load)
function revealCheck() {
  document.querySelectorAll('.panel.active .reveal:not(.is-visible)').forEach(el => {
    revealObserver.observe(el);
  });
}

// ============================================================
// I18N — FR / EN bilingual content, no reload, localStorage persisted
// ============================================================
const I18N = {
  fr: {
    'nav.id': 'DOSSIER N°<b>ILIAS-2026</b> / TERRAIN',
    'nav.tab.interventions': 'INTERVENTIONS',
    'nav.tab.cv': 'CV',

    'hero.eyebrow': "À l'écoute",
    'hero.role': 'Field Service Engineer — Systèmes Critiques',
    'hero.meta.zone': `ZONE D'INTERVENTION<span>Domicile · France entière · International</span>`,
    'hero.meta.spec': `SPÉCIALITÉ<span>Interventions <abbr class="tech-abbr" tabindex="0" title="Machine de Serrage/Desserrage des Goujons">MSDG*</abbr> sur cuves de réacteurs et <abbr class="tech-abbr" tabindex="0" title="Machine de Nettoyage des Goujons de Cuve">MNGC*</abbr></span>`,
    'hero.meta.lang': 'LANGUES<span>FR · EN · DE</span>',

    'sec01.title': "Journal d'intervention",

    'log1.title': 'Intervention internationale — Framatome',
    'log1.body': `Mission internationale — Sizewell B, Royaume-Uni. Déploiement sur le site nucléaire de Sizewell B pour assurer la maintenance, la préparation et l'exploitation d'une <abbr class="tech-abbr" tabindex="0" title="Machine de Serrage/Desserrage des Goujons">MSDG*</abbr> spécifique au site. Après une première intervention consacrée à la maintenance et à la préparation de la machine avant l'ouverture du réacteur, je suis revenu à deux reprises pour les opérations d'ouverture puis de fermeture de cuve. Les opérations étaient organisées en deux équipes postées, avec la responsabilité de conduire l'une des deux équipes sur mon shift. Coordination des opérations dans un environnement nucléaire britannique, en collaboration avec les équipes EDF Energy et Framatome, dans le respect des procédures, exigences de sécurité et contrôles techniques du site.`,
    'log1.tag1': 'UK Nuclear Site',
    'log1.tag2': 'Coordination internationale',
    'log1.tag3': 'Anglais opérationnel',
    'log1.tag4': 'Field Team Lead',

    'log2.title': 'Intervention internationale — Allemagne',
    'log2.body': `Participation à l'assemblage, à l'adaptation et aux activités de préparation d'une <abbr class="tech-abbr" tabindex="0" title="Machine de Serrage/Desserrage des Goujons">MSDG*</abbr> destinée à la centrale nucléaire de Rooppur au Bangladesh. Réalisée à Krefeld, en Allemagne, cette mission s'inscrivait dans la préparation de la machine pour son premier déploiement et sa mise en service sur site. Elle comprenait notamment des opérations d'assemblage de précision, de vérification technique et d'adaptation de l'équipement.`,
    'log2.tag1': 'MSDG',
    'log2.tag2': 'Allemand professionnel',
    'log2.tag3': 'Conception/Assemblage',

    'log3.title': 'Intervention sur cuve de réacteur',
    'log3.body': `Gestion et réalisation d'opérations d'ouverture et de fermeture de cuves de réacteurs à l'aide de la <abbr class="tech-abbr" tabindex="0" title="Machine de Serrage/Desserrage des Goujons">MSDG*</abbr>. Pilotage de la machine depuis son pupitre de commande et coordination des différentes phases de l'opération. Lors de l'ouverture, la MSDG* est déployée afin de détensionner les goujons permettant la dépose du couvercle de cuve. Après les opérations de maintenance ou de rechargement du combustible, la machine est remise en place afin de tensionner les goujons selon les paramètres définis, permettant le serrage du couvercle de cuve.`,
    'log3.tag1': 'Diagnostic terrain',
    'log3.tag2': 'Sûreté nucléaire',

    'log4.date': '<b>FR</b>MNGC',
    'log4.title': 'Assistance & exploitation — MNGC',
    'log4.body': `Maintenance, pilotage et assistance aux opérations sur <abbr class="tech-abbr" tabindex="0" title="Machine de Nettoyage des Goujons de Cuve">MNGC*</abbr>. Formation des opérateurs au pilotage de la machine, assistance sur site lors des opérations et diagnostic en cas de panne.`,
    'log4.tag1': 'Maintenance',
    'log4.tag2': 'Formation des opérateurs',
    'log4.tag3': 'Support Terrain',
    'log4.tag4': 'Diagnostic',

    'sec02.title': "Zone d'opération",
    'globe.hud.view': 'Vue de déploiement',
    'globe.hud.status': 'Rotation active',
    'globe.aria.canvas': "Globe interactif des zones d'intervention",
    'globe.aria.controls': 'Contrôles du globe',
    'globe.btn.zoomin': 'Zoomer',
    'globe.btn.zoomout': 'Dézoomer',
    'globe.btn.toggle': 'Suspendre ou reprendre la rotation',
    'globe.btn.home': 'Recentrer sur le domicile',
    'globe.btn.world': 'Vue globale',
    'ops.summary.label': 'BASE DE DÉPART',
    'ops.summary.value': 'Domicile',
    'ops.summary.desc': 'Zone de départ vers les différentes interventions.',
    'ops.detail.title': 'Domicile',
    'ops.detail.small': 'FR · Domicile',
    'ops.aria.list': "Sites d'intervention",

    'sec03.title': 'Matrice de compétences',
    'matrix1.h4': 'Terrain / Hardware',
    'matrix1.li1': `Interventions <abbr class="tech-abbr" tabindex="0" title="Machine de Serrage/Desserrage des Goujons">MSDG*</abbr> — sur cuves de réacteur`,
    'matrix1.li2': 'Diagnostic et dépannage électromécanique',
    'matrix1.li3': `Assistance technique <abbr class="tech-abbr" tabindex="0" title="Machine de Nettoyage des Goujons de Cuve">MNGC*</abbr>`,
    'matrix1.li4': 'Procédures de sûreté nucléaire',
    'matrix2.h4': 'IT / Systèmes',
    'matrix2.li1': 'Administration Windows Server &amp; Active Directory',
    'matrix2.li2': 'Linux / Debian',
    'matrix2.li3': 'Réseaux',
    'matrix2.li4': 'Diagnostic de connectivité',
    'matrix2.li5': 'Scripting PowerShell',
    'matrix2.li6': 'PostgreSQL',
    'matrix3.h4': 'Certifications',

    'contact.h2': 'Disponible pour un échange',
    'contact.email': 'EMAIL<span>seddiki.ilias45@gmail.com</span>',
    'contact.phone': 'TÉLÉPHONE<span>+33 6 03 21 75 99</span>',

    'cv.hero.eyebrow': 'Curriculum Vitae',
    'cv.hero.role': 'Field Service Engineer — Systèmes Critiques · seddiki.ilias45@gmail.com · +33 6 03 21 75 99',

    'cv.profile.title': 'Profil',
    'cv.profile.body': `Field Service Engineer spécialisé dans les interventions sur cuves de réacteur nucléaire (équipements <abbr class="tech-abbr" tabindex="0" title="Machine de Serrage/Desserrage des Goujons">MSDG*</abbr>/<abbr class="tech-abbr" tabindex="0" title="Machine de Nettoyage des Goujons de Cuve">MNGC*</abbr>), avec une expérience internationale (Royaume-Uni, Allemagne). Parcours atypique — passage par l'IT et l'administration systèmes avant une spécialisation élec/terrain en environnement nucléaire haute exigence. Trilingue FR/EN/DE.`,

    'cv.experience.title': 'Expérience',
    'xp1.role': "Field Service Engineer (Responsable d'Intervention)",
    'xp1.date': 'Octobre 2025-En cours',
    'xp1.org': 'Siempelkamp MSDG',
    'xp1.li1': `Interventions sur cuves de réacteur nucléaire avec <abbr class="tech-abbr" tabindex="0" title="Machine de Serrage/Desserrage des Goujons">MSDG*</abbr>`,
    'xp1.li2': 'Missions internationales — Sizewell B (Royaume-Uni), Krefeld (Allemagne)',
    'xp1.li3': "Rédaction de dossier de suivi d'intervention et de dossier de réalisation de travaux",
    'xp1.li4': `Maintenance, pilotage et assistance aux opérations sur <abbr class="tech-abbr" tabindex="0" title="Machine de Nettoyage des Goujons de Cuve">MNGC*</abbr>. Formation des opérateurs au pilotage de la machine, assistance sur site lors des opérations et diagnostic en cas de panne.`,

    'xp2.role': 'Technicien de maintenance',
    'xp2.date': 'Octobre 2024-Octobre 2025',
    'xp2.li1': "Maintenance terrain sur machine de chargement : diagnostic, remise en service et méthode d'intervention",
    'xp2.li2': "Maintenance des éclairages de fond de piscine, de l'outil de transfert du combustible entre le batiment réacteur et combustible. Maintenace des divers chateaux de plombs (TN12-MX8-DMK).",

    'xp3.role': 'Administrateur Systèmes & Réseaux',
    'xp3.date': 'Avril 2024-Juillet 2024',
    'xp3.li1': "Administration et maintenance d'environnements Windows et Linux.",
    'xp3.li2': 'Maintenance et diagnostic d\'infrastructures réseau.',
    'xp3.li3': 'Support utilisateurs, diagnostic et résolution d\'incidents techniques.',
    'xp3.li4': "Déploiement et gestion d'environnements virtualisés.",

    'cv.education.title': 'Formation',
    'edu1': 'Titre Professionnel — TSSR (Technicien supérieur systèmes et réseaux)',
    'edu2': 'BUT GEII — Université de Toulon–La Garde',
    'edu3': 'Baccalauréat Général — Section Européenne (Anglais/Maths)',

    'cv.certs.title': 'Certifications',
    'cv.certs.item1': '<b>Sûreté nucléaire</b>SCN-CSQ · RP',
    'cv.certs.item2': '<b>Habilitations</b>HEV · TEV',
    'cv.certs.item3': '<b>Levage</b>CACES R484',
    'cv.certs.item4': '<b>Qualification métier</b>CQPM TMI',

    'cv.langs.title': 'Langues',
    'cv.langs.fr': '<b>Français</b>Natif',
    'cv.langs.en': '<b>Anglais</b>Bilingue',
    'cv.langs.de': '<b>Allemand</b>Professionnel confirmé',

    'cv.it.title': 'Compétences IT',
    'cv.it.systems': '<b>Systèmes</b>Windows Server, Active Directory, Linux/Debian',
    'cv.it.network': '<b>Réseaux</b>VLAN, diagnostic connectivité',
    'cv.it.script': '<b>Scripting</b>PowerShell',
    'cv.it.db': '<b>Bases de données</b>PostgreSQL (sauvegardes automatisées)',

    'footer.updated': 'MIS À JOUR AOÛT 2026'
  },

  en: {
    'nav.id': 'CASE FILE N°<b>ILIAS-2026</b> / FIELD OPS',
    'nav.tab.interventions': 'FIELD LOG',
    'nav.tab.cv': 'RESUME',

    'hero.eyebrow': 'Open to opportunities',
    'hero.role': 'Field Service Engineer — Critical Systems',
    'hero.meta.zone': `COVERAGE AREA<span>Home base · Nationwide (France) · International</span>`,
    'hero.meta.spec': `SPECIALTY<span>Reactor vessel operations — <abbr class="tech-abbr" tabindex="0" title="Multi Stud Tension Machine">MST*</abbr> and <abbr class="tech-abbr" tabindex="0" title="Stud Cleaning Machine">SCM*</abbr></span>`,
    'hero.meta.lang': 'LANGUAGES<span>FR · EN · DE</span>',

    'sec01.title': 'Field Log',

    'log1.title': 'International Assignment — Framatome',
    'log1.body': `International mission — Sizewell B, United Kingdom. Deployed to the Sizewell B nuclear site to support maintenance, preparation and operation of a site-specific <abbr class="tech-abbr" tabindex="0" title="Multi Stud Tension Machine">MST*</abbr>. Following an initial assignment focused on maintenance and preparing the machine ahead of reactor opening, I returned twice for the vessel opening and closing operations. Work was organized across two shifts, and I was responsible for leading one of the two teams during my shift. Operations were coordinated within a UK nuclear environment, working alongside EDF Energy and Framatome teams, in line with the site's procedures, safety requirements and technical checks.`,
    'log1.tag1': 'UK Nuclear Site',
    'log1.tag2': 'International Coordination',
    'log1.tag3': 'Operational English',
    'log1.tag4': 'Field Team Lead',

    'log2.title': 'International Assignment — Germany',
    'log2.body': `Contributed to the assembly, adaptation and preparation of an <abbr class="tech-abbr" tabindex="0" title="Multi Stud Tension Machine">MST*</abbr> machine intended for the Rooppur nuclear power plant in Bangladesh. Carried out in Krefeld, Germany, this assignment supported preparing the machine for its first deployment and commissioning on site. It included precision assembly work, technical verification and equipment adaptation.`,
    'log2.tag1': 'MST',
    'log2.tag2': 'Professional German',
    'log2.tag3': 'Design/Assembly',

    'log3.title': 'Reactor Vessel Operations',
    'log3.body': `Managed and carried out reactor vessel opening and closing operations using the <abbr class="tech-abbr" tabindex="0" title="Multi Stud Tension Machine">MST*</abbr>. Operated the machine from its control console and coordinated the various phases of the operation. During opening, the MST* is deployed to release stud tension, allowing removal of the vessel head. After maintenance or refueling operations, the machine is repositioned to tension the studs to the defined parameters, securing the vessel head.`,
    'log3.tag1': 'Field Diagnostics',
    'log3.tag2': 'Nuclear Safety',

    'log4.date': '<b>FR</b>SCM*',
    'log4.title': 'Support & Operation — SCM*',
    'log4.body': `Maintenance, operation and field support of the <abbr class="tech-abbr" tabindex="0" title="Stud Cleaning Machine">SCM*</abbr> (Stud Cleaning Machine). Training of operators in machine operation, on-site assistance during operations and troubleshooting in the event of a failure.`,
    'log4.tag1': 'Maintenance',
    'log4.tag2': 'Operator Training',
    'log4.tag3': 'Field Support',
    'log4.tag4': 'Troubleshooting',

    'sec02.title': 'Operating Area',
    'globe.hud.view': 'Deployment view',
    'globe.hud.status': 'Rotation active',
    'globe.aria.canvas': 'Interactive globe of intervention sites',
    'globe.aria.controls': 'Globe controls',
    'globe.btn.zoomin': 'Zoom in',
    'globe.btn.zoomout': 'Zoom out',
    'globe.btn.toggle': 'Pause or resume rotation',
    'globe.btn.home': 'Recenter on home base',
    'globe.btn.world': 'Global view',
    'ops.summary.label': 'HOME BASE',
    'ops.summary.value': 'Home',
    'ops.summary.desc': 'Starting point for the various assignments.',
    'ops.detail.title': 'Home',
    'ops.detail.small': 'FR · Home',
    'ops.aria.list': 'Intervention sites',

    'sec03.title': 'Skills Matrix',
    'matrix1.h4': 'Field / Hardware',
    'matrix1.li1': `Reactor vessel operations — <abbr class="tech-abbr" tabindex="0" title="Multi Stud Tension Machine">MST*</abbr>`,
    'matrix1.li2': 'Electromechanical troubleshooting',
    'matrix1.li3': `<abbr class="tech-abbr" tabindex="0" title="Stud Cleaning Machine">SCM*</abbr> technical support`,
    'matrix1.li4': 'Nuclear safety procedures',
    'matrix2.h4': 'IT / Systems',
    'matrix2.li1': 'Windows Server &amp; Active Directory',
    'matrix2.li2': 'Linux / Debian',
    'matrix2.li3': 'Networking',
    'matrix2.li4': 'Connectivity troubleshooting',
    'matrix2.li5': 'PowerShell scripting',
    'matrix2.li6': 'PostgreSQL',
    'matrix3.h4': 'Certifications',

    'contact.h2': 'Open to a conversation',
    'contact.email': 'EMAIL<span>seddiki.ilias45@gmail.com</span>',
    'contact.phone': 'PHONE<span>+33 6 03 21 75 99</span>',

    'cv.hero.eyebrow': 'Resume',
    'cv.hero.role': 'Field Service Engineer — Critical Systems · seddiki.ilias45@gmail.com · +33 6 03 21 75 99',

    'cv.profile.title': 'Profile',
    'cv.profile.body': `Field Service Engineer specializing in nuclear reactor vessel interventions (<abbr class="tech-abbr" tabindex="0" title="Multi Stud Tension Machine">MST*</abbr>/<abbr class="tech-abbr" tabindex="0" title="Stud Cleaning Machine">SCM*</abbr> equipment), with international experience (United Kingdom, Germany). Non-traditional background — prior experience in IT and systems administration before specializing in electromechanical fieldwork within a high-demand nuclear environment. Trilingual FR/EN/DE.`,

    'cv.experience.title': 'Experience',
    'xp1.role': 'Field Service Engineer (Intervention Lead)',
    'xp1.date': 'October 2025–Present',
    'xp1.org': 'Siempelkamp MST',
    'xp1.li1': `Reactor vessel interventions using the <abbr class="tech-abbr" tabindex="0" title="Multi Stud Tension Machine">MST*</abbr>`,
    'xp1.li2': 'International assignments — Sizewell B (United Kingdom), Krefeld (Germany)',
    'xp1.li3': 'Preparation of intervention tracking reports and work completion documentation',
    'xp1.li4': `Maintenance, operation and field support of the <abbr class="tech-abbr" tabindex="0" title="Stud Cleaning Machine">SCM*</abbr>. Training of operators in machine operation, on-site assistance during operations and troubleshooting in the event of a failure.`,

    'xp2.role': 'Maintenance Technician',
    'xp2.date': 'October 2024–October 2025',
    'xp2.li1': 'Field maintenance on loading machinery: diagnostics, return to service and intervention methodology',
    'xp2.li2': 'Maintenance of spent fuel pool floor lighting and the fuel transfer tool between the reactor and fuel buildings. Maintenance of various lead shielding casks (TN12-MX8-DMK).',

    'xp3.role': 'Systems & Network Administrator',
    'xp3.date': 'April 2024–July 2024',
    'xp3.li1': 'Administration and maintenance of Windows and Linux environments.',
    'xp3.li2': 'Network infrastructure maintenance and troubleshooting.',
    'xp3.li3': 'User support, technical troubleshooting and incident resolution.',
    'xp3.li4': 'Deployment and management of virtualized environments.',

    'cv.education.title': 'Education',
    'edu1': 'Professional Certification — TSSR (Senior Systems & Network Technician)',
    'edu2': 'BUT GEII (Electrical & Industrial Computing) — Université de Toulon–La Garde',
    'edu3': 'General Baccalaureate — European Section (English/Maths)',

    'cv.certs.title': 'Certifications',
    'cv.certs.item1': '<b>Nuclear Safety</b>SCN-CSQ · RP',
    'cv.certs.item2': '<b>Clearances</b>HEV · TEV',
    'cv.certs.item3': '<b>Lifting</b>CACES R484',
    'cv.certs.item4': '<b>Trade Qualification</b>CQPM TMI',

    'cv.langs.title': 'Languages',
    'cv.langs.fr': '<b>French</b>Native',
    'cv.langs.en': '<b>English</b>Bilingual',
    'cv.langs.de': '<b>German</b>Professional working proficiency',

    'cv.it.title': 'IT Skills',
    'cv.it.systems': '<b>Systems</b>Windows Server, Active Directory, Linux/Debian',
    'cv.it.network': '<b>Networking</b>VLAN, connectivity troubleshooting',
    'cv.it.script': '<b>Scripting</b>PowerShell',
    'cv.it.db': '<b>Databases</b>PostgreSQL (automated backups)',

    'footer.updated': 'UPDATED AUGUST 2026'
  }
};

const LANG_STORAGE_KEY = 'site-lang';

function applyLanguage(lang) {
  if (!I18N[lang]) return;

  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang][key] !== undefined) {
      el.innerHTML = I18N[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key && I18N[lang][key] !== undefined) {
        el.setAttribute(attr, I18N[lang][key]);
      }
    });
  });

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
  });

  try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) { /* storage unavailable, ignore */ }

  // newly-swapped text may include elements that need reveal re-checking
  requestAnimationFrame(revealCheck);
}

function initLangSwitcher() {
  let saved = 'fr';
  try {
    saved = localStorage.getItem(LANG_STORAGE_KEY) || 'fr';
  } catch (e) { /* storage unavailable, default to fr */ }

  applyLanguage(saved);

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.getAttribute('data-lang-btn'));
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initReveal();
  initLangSwitcher();
});
