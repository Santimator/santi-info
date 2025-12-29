// Menu toggle
(() => {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.querySelector('.nav-panel');
  if (!nav || !toggle || !panel) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', open);
    panel.setAttribute('aria-hidden', !open);
    nav.classList.toggle('is-open', open);
  };

  setOpen(false);
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
})();

// Dark mode toggle with localStorage persistence
(() => {
  const STORAGE_KEY = 'theme-preference';
  const MODES = { LIGHT: 'light', DARK: 'dark', SYSTEM: 'system' };
  const ICONS = { LIGHT: '☀️', DARK: '🌙', SYSTEM: '🌗' };

  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-toggle-icon');
  
  if (!themeToggle || !themeIcon) return;

  // Get current mode from localStorage or default to system
  function getCurrentMode() {
    return localStorage.getItem(STORAGE_KEY) || MODES.SYSTEM;
  }

  // Apply mode to body element
  function applyMode(mode) {
    document.body.classList.remove('force-light', 'force-dark');
    
    if (mode === MODES.LIGHT) {
      document.body.classList.add('force-light');
    } else if (mode === MODES.DARK) {
      document.body.classList.add('force-dark');
    }
    // SYSTEM mode = no class, CSS @media query handles it
  }

  // Update icon based on current mode
  function updateIcon(mode) {
    const icon = ICONS[mode.toUpperCase()] || ICONS.SYSTEM;
    themeIcon.textContent = icon;
    themeToggle.setAttribute('aria-label', `Theme: ${mode} (click to toggle)`);
  }

  // Get next mode in cycle: system → light → dark → system
  function getNextMode(current) {
    if (current === MODES.SYSTEM) return MODES.LIGHT;
    if (current === MODES.LIGHT) return MODES.DARK;
    return MODES.SYSTEM;
  }

  // Toggle between modes
  function toggleMode() {
    const current = getCurrentMode();
    const next = getNextMode(current);
    
    localStorage.setItem(STORAGE_KEY, next);
    applyMode(next);
    updateIcon(next);
  }

  // Listen for system preference changes (when in system mode)
  function handleSystemChange(e) {
    const current = getCurrentMode();
    if (current === MODES.SYSTEM) {
      // Force re-render by toggling a dummy class
      document.body.classList.toggle('_dummy');
    }
  }

  // Initialize on page load
  function init() {
    const mode = getCurrentMode();
    applyMode(mode);
    updateIcon(mode);
    
    themeToggle.addEventListener('click', toggleMode);
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemChange);
    }
  }

  init();
})();
