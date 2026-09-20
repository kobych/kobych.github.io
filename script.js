const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');

function resolvedTheme() {
  return root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function syncThemeControl() {
  const dark = resolvedTheme() === 'dark';
  toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  toggle.setAttribute('aria-pressed', String(dark));
  themeColor.setAttribute('content', dark ? '#11130f' : '#f8f9f4');
}

toggle.addEventListener('click', () => {
  const next = resolvedTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
  syncThemeControl();
});

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (!localStorage.getItem('theme')) syncThemeControl();
});

syncThemeControl();
