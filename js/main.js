// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Menu toggle
  (() => {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    const panel = document.querySelector('.nav-panel');
    if (!nav || !toggle || !panel) return;

    const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const setOpen = (open, returnFocus) => {
      toggle.setAttribute('aria-expanded', open);
      panel.setAttribute('aria-hidden', !open);
      panel.toggleAttribute('hidden', !open);
      nav.classList.toggle('is-open', open);
      if (!open && returnFocus) {
        toggle.focus();
      }
    };

    setOpen(false, false);
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true', false));
    document.addEventListener('click', (event) => {
      if (toggle.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target)) {
        setOpen(false, false);
      }
    });
    document.addEventListener('keydown', (event) => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (!isOpen) return;

      if (event.key === 'Escape') {
        setOpen(false, true);
        return;
      }

      // Focus trap: keep Tab cycling within the open nav panel
      if (event.key === 'Tab') {
        const focusable = Array.from(panel.querySelectorAll(FOCUSABLE));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    });
  })();

  // Dark mode toggle with localStorage persistence (2 states: light/dark)
  // Safari-safe implementation using HTML data attributes
  // Handles both nav and footer theme toggles
  (() => {
    const STORAGE_KEY = 'theme-preference';
    const ICONS = { light: '☀️', dark: '🌙' };

    const themeToggles = document.querySelectorAll('.theme-toggle-nav, .theme-toggle-footer');
    const themeIcons = document.querySelectorAll('.theme-toggle-icon');
    
    if (themeToggles.length === 0) {
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

    // Update all icons based on current mode
    function updateIcons(mode) {
      // Show the NEXT mode icon (what you'll switch to)
      const nextMode = mode === 'light' ? 'dark' : 'light';
      themeIcons.forEach(icon => {
        icon.textContent = ICONS[nextMode] || ICONS.dark;
      });
      themeToggles.forEach(toggle => {
        toggle.setAttribute('aria-label', `Switch to ${nextMode} mode`);
      });
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
      updateIcons(next);
    }

    // Initialize
    function init() {
      const mode = getCurrentMode();
      applyMode(mode);
      updateIcons(mode);
      
      themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleMode);
      });
    }

    init();
  })();

  // Flip cards for astrology (keyboard-friendly)
  (() => {
    const flipCards = document.querySelectorAll('.flip-card');

    if (flipCards.length === 0) {
      return;
    }

    flipCards.forEach(card => {
      const toggleFlip = () => {
        card.classList.toggle('flipped');
        card.setAttribute('aria-pressed', card.classList.contains('flipped'));
      };

      card.addEventListener('click', toggleFlip);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleFlip();
        }
      });
    });
  })();

});
