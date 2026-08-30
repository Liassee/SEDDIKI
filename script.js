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

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initReveal();
});
