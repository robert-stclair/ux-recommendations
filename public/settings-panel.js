console.log('settings-panel.js loaded');

// Toggle settings panel with tilde key (~)
document.addEventListener('keydown', function(e) {
  if (e.key === '`' || e.key === '~') {
    e.preventDefault();
    const overlay = document.getElementById('settingsOverlay');
    overlay.classList.toggle('visible');
  }
});

// Close button
document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.getElementById('settingsClose');
  const overlay = document.getElementById('settingsOverlay');
  const smartGuideToggle = document.getElementById('smartGuideToggle');

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      overlay.classList.remove('visible');
    });
  }

  // Close when clicking outside the panel
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.classList.remove('visible');
    }
  });

  // Load saved setting from localStorage (default to true if not set)
  const savedSetting = localStorage.getItem('smartGuideEnabled');
  const smartGuideEnabled = savedSetting === null ? true : savedSetting === 'true';

  // Set default if not already saved
  if (savedSetting === null) {
    localStorage.setItem('smartGuideEnabled', 'true');
  }

  if (smartGuideToggle) {
    smartGuideToggle.checked = smartGuideEnabled;
  }

  // Save setting when changed
  if (smartGuideToggle) {
    smartGuideToggle.addEventListener('change', function() {
      localStorage.setItem('smartGuideEnabled', this.checked);
      // Reload with query parameter
      const url = new URL(window.location);
      url.searchParams.set('smartGuide', this.checked);
      window.location.href = url.toString();
    });
  }

  // Set query parameter on initial load based on localStorage
  const currentSmartGuide = new URLSearchParams(window.location.search).get('smartGuide');
  if (currentSmartGuide === null && smartGuideEnabled) {
    const url = new URL(window.location);
    url.searchParams.set('smartGuide', 'true');
    window.history.replaceState({}, '', url.toString());
  }
});
