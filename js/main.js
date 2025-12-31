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
  // Safari-safe implementation using HTML data attributes
  (() => {
    const STORAGE_KEY = 'theme-preference';
    const ICONS = { light: '☀️', dark: '🌙' };

    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle-icon');
    
    if (!themeToggle || !themeIcon) {
      return;
    }

    // Get system preference (with Safari fallback)
    function getSystemPreference() {
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (e) {
        return 'light'; // Fallback for older browsers
      }
    }

    // Get current mode from localStorage or system preference
    function getCurrentMode() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') {
          return saved;
        }
      } catch (e) {
        // localStorage unavailable (Safari Private Browsing, etc.)
        console.warn('localStorage unavailable:', e);
      }
      return getSystemPreference();
    }

    // Apply mode to HTML element (Safari-compatible)
    function applyMode(mode) {
      document.documentElement.setAttribute('data-theme-mode', mode);
      // Force Safari to recalculate styles immediately
      void document.documentElement.offsetHeight;
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
      
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        console.warn('Cannot persist theme preference:', e);
      }
      
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
