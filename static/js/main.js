// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
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

  // Dark mode toggle with localStorage persistence (2 states: light/dark)
  (() => {
    const STORAGE_KEY = 'theme-preference';
    const ICONS = { light: '☀️', dark: '🌙' };

    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle-icon');
    
    if (!themeToggle || !themeIcon) {
      return;
    }

    // Get system preference
    function getSystemPreference() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Get current mode from localStorage or system preference
    function getCurrentMode() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      return getSystemPreference();
    }

    // Apply mode to body element
    function applyMode(mode) {
      document.body.classList.remove('force-light', 'force-dark');
      
      if (mode === 'light') {
        document.body.classList.add('force-light');
      } else {
        document.body.classList.add('force-dark');
      }
    }

    // Update icon based on current mode
    function updateIcon(mode) {
      themeIcon.textContent = ICONS[mode] || ICONS.light;
      themeToggle.setAttribute('aria-label', `Current: ${mode} mode (click to toggle)`);
    }

    // Toggle between light and dark
    function toggleMode() {
      const current = getCurrentMode();
      const next = current === 'light' ? 'dark' : 'light';
      
      localStorage.setItem(STORAGE_KEY, next);
      applyMode(next);
      updateIcon(next);
    }

    // Initialize
    function init() {
      const mode = getCurrentMode();
      applyMode(mode);
      updateIcon(mode);
      
      themeToggle.addEventListener('click', toggleMode);
    }

    init();
  })();
  
});
