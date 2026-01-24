document.addEventListener("DOMContentLoaded", function () {
  // Scroll to Top Functionality
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Function to handle scroll to top button visibility (defensive)
  function handleScrollToTop() {
    if (!scrollToTopBtn) return;
    if ((window.scrollY ?? window.pageYOffset) > 300) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
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

    // Initially hide the scroll to top button
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
