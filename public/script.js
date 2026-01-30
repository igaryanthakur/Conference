document.addEventListener("DOMContentLoaded", function () {
  // Scroll to Top Functionality
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Function to handle scroll to top button visibility (defensive)
  function handleScrollToTop() {
    if (!scrollToTopBtn) return;
    if ((window.scrollY ?? window.pageYOffset) > 300) {
      scrollToTopBtn.classList.add("show");
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
      scrollToTopBtn.classList.remove("show");
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.visibility = "hidden";
    }
  }

  // Show/hide scroll to top button based on scroll position
  window.addEventListener("scroll", handleScrollToTop, { passive: true });

  // Smooth scroll to top when button is clicked (guarded)
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Initially hide the scroll to top button (CSS .show controls display)
    scrollToTopBtn.classList.remove("show");
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.visibility = "hidden";
    scrollToTopBtn.style.transition = "opacity 0.3s, visibility 0.3s";
  }

  // Smooth scrolling for anchor links (only same-page anchors)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const scrollY = window.scrollY ?? window.pageYOffset;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          // Accessibility: move focus to target when skip link is used
          if (this.classList.contains("skip-link") && href === "#main-content") {
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          }
        }
      }
    });
  });

  // Handle responsive navigation collapse on mobile
  const navbarCollapse = document.getElementById("mainNav");

  function hideNavbarCollapse() {
    if (
      !navbarCollapse ||
      typeof bootstrap === "undefined" ||
      !bootstrap.Collapse
    )
      return;
    const instance =
      bootstrap.Collapse.getInstance(navbarCollapse) ||
      new bootstrap.Collapse(navbarCollapse, { toggle: false });
    instance.hide();
  }

  // Close mobile menu when clicking on a link (defensive)
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) hideNavbarCollapse();
    });
  });

  // Handle window resize for responsive adjustments
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      handleScrollToTop();
      if (
        window.innerWidth >= 992 &&
        navbarCollapse?.classList.contains("show")
      ) {
        hideNavbarCollapse();
      }
    }, 250);
  });

  // Add animation on scroll for statistics (guard for IntersectionObserver)
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

  if (typeof IntersectionObserver !== "undefined") {
    const scrollObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      observerOptions
    );

    document.querySelectorAll(".stat-item").forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      scrollObserver.observe(item);
    });

    document.querySelectorAll(".event-card").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      scrollObserver.observe(card);
    });
  } else {
    // Fallback: reveal elements immediately
    document.querySelectorAll(".stat-item, .event-card").forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });
  }

  // Initialize animations on page load
  window.addEventListener("load", function () {
    // Trigger initial check for elements in viewport
    handleScrollToTop();

    // Small delay to ensure smooth initial render
    setTimeout(() => {
      document.querySelectorAll(".stat-item, .event-card").forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }
      });
    }, 100);
  });
});
/* =========================================================================
   HERO GALLERY JAVASCRIPT - ADD TO END OF YOUR main.js
   Professional auto-rotating gallery functionality
   ========================================================================= */

// Wrap in DOMContentLoaded to ensure DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  
  // ========================================
  // HERO GALLERY CONFIGURATION
  // ========================================
  
  const heroGallery = {
    slides: document.querySelectorAll(".hero-gallery-slide"),
    dots: document.querySelectorAll(".hero-gallery-dot"),
    prevBtn: document.querySelector(".hero-gallery-prev"),
    nextBtn: document.querySelector(".hero-gallery-next"),
    wrapper: document.querySelector(".hero-gallery-wrapper"),
    currentIndex: 0,
    autoPlayInterval: null,
    autoPlayDelay: 5000, // 5 seconds - professional pacing
    isTransitioning: false,
  };

  // Exit gracefully if gallery elements not found
  if (
    !heroGallery.slides.length ||
    !heroGallery.dots.length ||
    !heroGallery.prevBtn ||
    !heroGallery.nextBtn ||
    !heroGallery.wrapper
  ) {
    // Gallery not on this page - exit silently
    return;
  }

  // ========================================
  // CORE GALLERY FUNCTIONS
  // ========================================

  /**
   * Show specific slide with professional transition
   * @param {number} index - Slide index to display
   */
  function showSlide(index) {
    // Prevent rapid transitions
    if (heroGallery.isTransitioning) return;

    // Handle index wrapping
    if (index < 0) {
      index = heroGallery.slides.length - 1;
    } else if (index >= heroGallery.slides.length) {
      index = 0;
    }

    // Lock transitions
    heroGallery.isTransitioning = true;

    // Remove active states
    heroGallery.slides[heroGallery.currentIndex].classList.remove("active");
    heroGallery.dots[heroGallery.currentIndex].classList.remove("active");

    // Update index
    heroGallery.currentIndex = index;

    // Add active states
    heroGallery.slides[heroGallery.currentIndex].classList.add("active");
    heroGallery.dots[heroGallery.currentIndex].classList.add("active");

    // Unlock after transition completes (matches CSS duration)
    setTimeout(() => {
      heroGallery.isTransitioning = false;
    }, 1200);

    // Reset auto-play timer
    resetAutoPlay();
  }

  /**
   * Navigate to next slide
   */
  function nextSlide() {
    showSlide(heroGallery.currentIndex + 1);
  }

  /**
   * Navigate to previous slide
   */
  function prevSlide() {
    showSlide(heroGallery.currentIndex - 1);
  }

  // ========================================
  // AUTO-PLAY CONTROL
  // ========================================

  /**
   * Start automatic slideshow
   */
  function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval
    heroGallery.autoPlayInterval = setInterval(
      nextSlide,
      heroGallery.autoPlayDelay
    );
  }

  /**
   * Stop automatic slideshow
   */
  function stopAutoPlay() {
    if (heroGallery.autoPlayInterval) {
      clearInterval(heroGallery.autoPlayInterval);
      heroGallery.autoPlayInterval = null;
    }
  }

  /**
   * Reset auto-play timer (restart countdown)
   */
  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  /**
   * Pause and resume after user interaction
   */
  function pauseAndResume() {
    stopAutoPlay();
    // Resume after 10 seconds of inactivity (professional UX)
    setTimeout(startAutoPlay, 10000);
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================

  // Navigation Buttons
  heroGallery.nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    nextSlide();
    pauseAndResume();
  });

  heroGallery.prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    prevSlide();
    pauseAndResume();
  });

  // Progress Dots
  heroGallery.dots.forEach((dot, index) => {
    dot.addEventListener("click", function (e) {
      e.preventDefault();
      showSlide(index);
      pauseAndResume();
    });
  });

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================

  document.addEventListener("keydown", function (e) {
    if (!heroGallery.wrapper) return;

    // Check if gallery is visible in viewport
    const rect = heroGallery.wrapper.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
        pauseAndResume();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
        pauseAndResume();
      }
    }
  });

  // ========================================
  // HOVER BEHAVIOR (Desktop Only)
  // ========================================

  // Pause on hover for desktop users (professional UX)
  if (window.matchMedia("(min-width: 768px)").matches) {
    heroGallery.wrapper.addEventListener("mouseenter", function () {
      stopAutoPlay();
    });

    heroGallery.wrapper.addEventListener("mouseleave", function () {
      startAutoPlay();
    });
  }

  // ========================================
  // VISIBILITY CHANGE (Performance)
  // ========================================

  // Pause when tab is hidden (saves battery & performance)
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  // ========================================
  // TOUCH/SWIPE SUPPORT (Mobile)
  // ========================================

  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  heroGallery.wrapper.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true }
  );

  heroGallery.wrapper.addEventListener(
    "touchend",
    function (e) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    },
    { passive: true }
  );

  /**
   * Handle swipe gestures
   */
  function handleSwipe() {
    const swipeThreshold = 50;
    const horizontalDiff = touchStartX - touchEndX;
    const verticalDiff = Math.abs(touchStartY - touchEndY);

    // Only trigger if horizontal swipe is dominant (not vertical scroll)
    if (
      Math.abs(horizontalDiff) > swipeThreshold &&
      verticalDiff < swipeThreshold
    ) {
      if (horizontalDiff > 0) {
        // Swiped left - next slide
        nextSlide();
      } else {
        // Swiped right - previous slide
        prevSlide();
      }
      pauseAndResume();
    }
  }

  // ========================================
  // IMAGE PRELOADING (Performance)
  // ========================================

  /**
   * Preload next image for smoother transitions
   */
  function preloadNextImage() {
    const nextIndex =
      (heroGallery.currentIndex + 1) % heroGallery.slides.length;
    const nextSlide = heroGallery.slides[nextIndex];
    const nextImg = nextSlide?.querySelector(".hero-gallery-img");

    if (nextImg && nextImg.src) {
      const img = new Image();
      img.src = nextImg.src;
    }
  }

  // Preload periodically
  preloadNextImage();
  setInterval(preloadNextImage, heroGallery.autoPlayDelay);

  // ========================================
  // INITIALIZE GALLERY
  // ========================================

  // Start auto-play
  startAutoPlay();

  // ========================================
  // END OF HERO GALLERY SCRIPT
  // ========================================
});
/* ===================================
   CONFERENCE TABS JAVASCRIPT
   Add this to the END of your script.js file
   =================================== */

document.addEventListener("DOMContentLoaded", function () {
  
  // Get all tab buttons and tab panes
  const tabButtons = document.querySelectorAll('.conference-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  // Exit if no tabs found (not on this page)
  if (!tabButtons.length || !tabPanes.length) return;

  // Function to switch tabs
  function switchTab(targetTab) {
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Remove active class from all tab panes
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Add active class to clicked button
    const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
    
    // Show corresponding tab content
    const activePane = document.getElementById(`${targetTab}-tab`);
    if (activePane) {
      activePane.classList.add('active');
    }

    // Smooth scroll to tabs section (optional)
    const highlightsSection = document.getElementById('highlights');
    if (highlightsSection && window.scrollY > highlightsSection.offsetTop) {
      highlightsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Add click event listeners to all tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Optional: Support keyboard navigation
  tabButtons.forEach((button, index) => {
    button.addEventListener('keydown', function(e) {
      let newIndex = index;

      // Arrow right or down - next tab
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (index + 1) % tabButtons.length;
      }
      
      // Arrow left or up - previous tab
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      }

      // Switch to new tab and focus
      if (newIndex !== index) {
        const newButton = tabButtons[newIndex];
        const targetTab = newButton.getAttribute('data-tab');
        switchTab(targetTab);
        newButton.focus();
      }
    });
  });

  // Optional: URL hash support (e.g., #pre-conference)
  function checkUrlHash() {
    const hash = window.location.hash.substring(1); // Remove #
    if (hash === 'pre-conference' || hash === 'conference') {
      switchTab(hash);
    }
  }

  // Check on page load
  checkUrlHash();

  // Check when hash changes
  window.addEventListener('hashchange', checkUrlHash);
});