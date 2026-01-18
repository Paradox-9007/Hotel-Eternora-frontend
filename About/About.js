document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const MOBILE_BREAKPOINT = 768;

  function handleResize() {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      sidebar.style.transform = "translateX(-100%)";
    } else {
      sidebar.style.transform = "translateX(0)";
    }
  }

  // Initial check on load
  handleResize();

  // Listen for window resize events
  window.addEventListener("resize", handleResize);

  // Add smooth scrolling for sidebar navigation
  const sidebarItems = document.querySelectorAll(".sidebar li");
  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate offset to account for fixed navbar
        const navbarHeight = 56; // Height of the fixed navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Handle mobile sidebar
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          sidebar.style.transform = "translateX(-100%)";
        }
      }
    });
  });

  // Optional: Add toggle functionality for mobile menu button if needed
  const toggleButton = document.querySelector(".mobile-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        const currentTransform = sidebar.style.transform;
        sidebar.style.transform =
          currentTransform === "translateX(0)"
            ? "translateX(-100%)"
            : "translateX(0)";
      }
    });
  }
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .sidebar li.active {
        background-color: var(--bg-secondary);
        font-weight: bold;
        color: var(--accent-color, #72a65b); /* Uses your theme accent color or defaults to green */
      }
    </style>
  `);
});
