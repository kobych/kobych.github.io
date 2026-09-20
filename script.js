const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const languageToggle = document.querySelector('.lang-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
let currentLanguage = 'ru';

const translations = {
  ru: {
    fullName: 'Александр Зиновьев', firstName: 'Александр', lastName: 'Зиновьев',
    skip: 'Перейти к содержимому', availability: 'Открыт к предложениям · Android',
    heroText: 'Разрабатываю надёжные нативные Android-приложения на Kotlin, Jetpack Compose и современной архитектуре.',
    viewResume: 'Открыть резюме', viewGitHub: 'Открыть GitHub', email: 'Почта',
    selectedWork: 'Избранные работы', androidProjects: 'Android-проекты', allRepositories: 'Все репозитории',
    sanitlyDescription: 'Спроектированное и разработанное с нуля приложение для целей, задач и отслеживания эмоционального состояния с аналитикой, дневником и фоновым таймером.',
    muloDescription: 'Активно развиваемый Android-проект с современным Kotlin-стеком и вниманием к качеству кода.',
    supermedDescription: 'Клиент-серверная медицинская система с Android-приложением пациента, desktop-клиентами и backend.',
    viewOnGitHub: 'Открыть на GitHub', profile: 'Профиль', about: 'Обо мне',
    aboutText: 'Android-разработчик с фокусом на архитектуру, современный нативный UI и поддерживаемый, тестируемый код. Готов приносить пользу продуктовой команде и развиваться на реальных инженерных задачах.',
    leetcodePractice: 'Практика на LeetCode', algorithms: 'Алгоритмы и структуры данных', toolkit: 'Инструменты',
    contact: 'Контакты', openToRoles: 'Открыт к Android-вакансиям', contactText: 'Для предложений о работе, технического общения или интервью:',
    emailMe: 'Написать', downloadResume: 'Скачать резюме', resume: 'Резюме',
    metaDescription: 'Android-разработчик Alexander Zinoviev. Kotlin, Jetpack Compose, современные подходы к архитектуре, проекты и резюме.',
    socialDescription: 'Android-разработчик в поиске работы. Kotlin, Jetpack Compose, проекты и резюме.'
  },
  en: {
    fullName: 'Alexander Zinoviev', firstName: 'Alexander', lastName: 'Zinoviev',
    skip: 'Skip to content', availability: 'Available for hire · Android roles',
    heroText: 'Android developer building reliable native apps with Kotlin, Jetpack Compose, and modern architecture.',
    viewResume: 'View resume', viewGitHub: 'View GitHub', email: 'Email',
    selectedWork: 'Selected work', androidProjects: 'Android projects', allRepositories: 'All repositories',
    sanitlyDescription: 'Designed and built from the ground up: a goal, task, and emotional-state tracker with analytics, a reflection diary, and a reliable background timer.',
    muloDescription: 'An actively developed Android project exploring a clean, modern Kotlin stack and disciplined code quality.',
    supermedDescription: 'A client-server medical system with an Android patient app, desktop clients, and backend.',
    viewOnGitHub: 'View on GitHub', profile: 'Profile', about: 'About',
    aboutText: 'Android developer focused on architecture, modern native UI, and maintainable, testable code. Ready to contribute to a product team and grow through real engineering challenges.',
    leetcodePractice: 'LeetCode practice', algorithms: 'Algorithms & data structures', toolkit: 'Toolkit',
    contact: 'Contact', openToRoles: 'Open to Android roles', contactText: 'For job opportunities, technical conversations, or an interview:',
    emailMe: 'Email me', downloadResume: 'Download resume', resume: 'Resume',
    metaDescription: 'Android Developer focused on Kotlin, Jetpack Compose and modern Android development. Projects, GitHub and resume.',
    socialDescription: 'Android Developer open to work. Kotlin, Jetpack Compose, projects and resume.'
  }
};

function applyLanguage(language) {
  currentLanguage = language;
  const copy = translations[language];
  root.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelector('meta[name="description"]').content = copy.metaDescription;
  document.querySelector('meta[property="og:description"]').content = copy.socialDescription;
  document.querySelector('meta[name="twitter:description"]').content = copy.socialDescription;
  document.querySelector('meta[property="og:locale"]').content = language === 'ru' ? 'ru_RU' : 'en_US';
  languageToggle.textContent = language === 'ru' ? 'EN' : 'RU';
  languageToggle.setAttribute('aria-label', language === 'ru' ? 'Switch to English' : 'Переключить на русский');
  syncThemeControl();
}

function resolvedTheme() {
  return root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function syncThemeControl() {
  const dark = resolvedTheme() === 'dark';
  const label = currentLanguage === 'ru'
    ? `Переключить на ${dark ? 'светлую' : 'тёмную'} тему`
    : `Switch to ${dark ? 'light' : 'dark'} theme`;
  toggle.setAttribute('aria-label', label);
  toggle.setAttribute('aria-pressed', String(dark));
  themeColor.setAttribute('content', dark ? '#11130f' : '#f8f9f4');
}

toggle.addEventListener('click', () => {
  const next = resolvedTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme-v2', next);
  syncThemeControl();
});

languageToggle.addEventListener('click', () => {
  applyLanguage(currentLanguage === 'ru' ? 'en' : 'ru');
});

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (!localStorage.getItem('theme-v2')) {
    root.dataset.theme = event.matches ? 'dark' : 'light';
    syncThemeControl();
  }
});

applyLanguage('ru');
