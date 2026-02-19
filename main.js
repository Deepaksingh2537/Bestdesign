document.addEventListener("DOMContentLoaded", () => {
  // ===== Gallery (3D rotate) =====
  const imageContainerEl = document.querySelector(".image-container");
  const prevEl = document.getElementById("prev");
  const nextEl = document.getElementById("next");

  let x = 0;
  let timer;

  function updateGallery() {
    if (!imageContainerEl) return; // guard if gallery not on this page
    imageContainerEl.style.transform = `perspective(1000px) rotateY(${x}deg)`;
    timer = setTimeout(() => {
      x -= 45;
      updateGallery();
    }, 3000);
  }

  if (prevEl) {
    prevEl.addEventListener("click", () => {
      x += 45;
      clearTimeout(timer);
      updateGallery();
    });
  }
  if (nextEl) {
    nextEl.addEventListener("click", () => {
      x -= 45;
      clearTimeout(timer);
      updateGallery();
    });
  }

  // kick off only if container exists
  if (imageContainerEl) updateGallery();

  // ===== Bootstrap dropdowns (safe if Bootstrap isn't loaded) =====
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  if (window.bootstrap && dropdownToggles.length) {
    [...dropdownToggles].forEach((el) => new bootstrap.Dropdown(el));
  }

  // ===== Stars + Shooting stars =====
  const starsContainer = document.getElementById("stars");
  if (starsContainer) {
    const starCount = 150;
    const bigStarCount = 5;
    const shootingStarCount = 2;

    // Small stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2 + 0.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
      starsContainer.appendChild(star);
    }

    // Big bright stars
    for (let i = 0; i < bigStarCount; i++) {
      const bigStar = document.createElement("div");
      bigStar.className = "big-star";
      const size = Math.random() * 5 + 3;
      bigStar.style.width = `${size}px`;
      bigStar.style.height = `${size}px`;
      bigStar.style.left = `${Math.random() * 100}%`;
      bigStar.style.top = `${Math.random() * 100}%`;
      bigStar.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
      starsContainer.appendChild(bigStar);
    }

    // Shooting stars
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      shootingStar.style.left = `${Math.random() * 20}%`;
      shootingStar.style.top = `${Math.random() * 100}%`;
      shootingStar.style.animationDelay = `${(Math.random() * 10).toFixed(2)}s`;
      starsContainer.appendChild(shootingStar);
    }
  }

  // ===== Rain =====
  const rainContainer = document.getElementById("rain");
  if (rainContainer) {
    const dropCount = 120; // tweak for density/perf
    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement("div");
      drop.className = "raindrop";
      drop.style.left = `${Math.random() * 100}%`;
      // negative delay so some drops are mid-fall on load
      drop.style.animationDelay = `${(-Math.random() * 2).toFixed(2)}s`;
      // vary speed a bit
      drop.style.animationDuration = `${(0.9 + Math.random() * 0.9).toFixed(2)}s`;
      rainContainer.appendChild(drop);
    }
  }

  // ===== Scroll to top button =====
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTopBtn) {
    const toggleBtn = () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    };
    window.addEventListener("scroll", toggleBtn, { passive: true });
    toggleBtn();

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});


(() => {
  'use strict';
  const style = document.createElement('style'); style.id = 'anti-inspect-style'; style.textContent = `*{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}input,textarea,[contenteditable="true"],[data-allow-copy="true"]{-webkit-user-select:text!important;-moz-user-select:text!important;-ms-user-select:text!important;user-select:text!important}img,a,*{-webkit-user-drag:none}`; document.head.appendChild(style);
  const blockEvent = e => { e.preventDefault(); e.stopPropagation() };
  document.addEventListener('contextmenu', blockEvent, { capture: true });
  document.addEventListener('dragstart', blockEvent, { capture: true });
  ['copy', 'cut', 'paste'].forEach(type => { document.addEventListener(type, e => { const allow = e.target.closest?.('[data-allow-copy="true"], input, textarea, [contenteditable="true"]'); if (!allow) blockEvent(e) }, { capture: true }) });
  const blockedCombos = e => { const k = (e.key || '').toUpperCase(); if (k === 'F12') return true; if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(k)) return true; if (e.ctrlKey && ['U', 'S', 'P'].includes(k)) return true; if (e.metaKey && e.shiftKey && ['I', 'J', 'C'].includes(k)) return true; if (e.metaKey && ['U', 'S', 'P'].includes(k)) return true; return false };
  document.addEventListener('keydown', e => { if (blockedCombos(e)) { blockEvent(e); try { document.activeElement?.blur?.() } catch { } } if ((e.ctrlKey || e.metaKey) && (e.key || '').toUpperCase() === 'A') { const allow = document.activeElement?.closest?.('[data-allow-copy="true"], input, textarea, [contenteditable="true"]'); if (!allow) blockEvent(e) } }, { capture: true });
  const showLockOverlay = (() => {
    let shown = false; return () => {
      if (shown) return; shown = true; const overlay = document.createElement('div');
      document.documentElement.appendChild(overlay)
    }
  })();
  const suspectBySize = () => { const t = 160, w = Math.abs(window.outerWidth - window.innerWidth), h = Math.abs(window.outerHeight - window.innerHeight); return w > t || h > t };
  let last = performance.now();
  const suspectByTiming = () => { const n = performance.now(), d = n - last; last = n; return d > 500 };
  setInterval(() => { if (suspectBySize() || suspectByTiming()) showLockOverlay() }, 300);
  window.addEventListener('resize', () => { if (suspectBySize()) showLockOverlay() }, { passive: true });
  const noop = () => { };['log', 'debug', 'info', 'warn', 'error', 'table', 'dir'].forEach(m => { try { console[m] = noop } catch { } });
  new MutationObserver(() => { }).observe(document.documentElement, { childList: true, subtree: true });
})();