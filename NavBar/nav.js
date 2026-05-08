const HOME_PATHS = new Set(["/", "/home", "/Home/Home.html"]);

function normalizePath(pathname) {
  if (!pathname) {
    return "/";
  }

  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

function isHomePath() {
  return HOME_PATHS.has(normalizePath(window.location.pathname));
}

function loadGTranslate() {
  let wrapper = document.querySelector(".gtranslate_wrapper");

  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "gtranslate_wrapper";
    document.body.appendChild(wrapper);
  }

  wrapper.style.display = "none";

  window.gtranslateSettings = {
    default_language: "en",
    languages: ["en", "my", "ms", "id", "zh-TW", "th"],
    wrapper_selector: ".gtranslate_wrapper",
    switcher_horizontal_position: "right",
    switcher_vertical_position: "top",
    float_switcher_open_direction: "bottom",
    alt_flags: { en: "usa" },
  };

  if (!document.querySelector('script[data-gtranslate-script="true"]')) {
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    script.dataset.gtranslateScript = "true";
    document.body.appendChild(script);
  }
}

function loadTheme() {
  const storedTheme = localStorage.getItem("theme");
  const sun = document.getElementById("sunIcon");
  const moon = document.getElementById("moonIcon");

  if (!sun || !moon) {
    return;
  }

  if (storedTheme === "dark") {
    document.body.classList.add("dark-mode");
    sun.style.display = "inline";
    moon.style.display = "none";
    return;
  }

  document.body.classList.remove("dark-mode");
  sun.style.display = "none";
  moon.style.display = "inline";
}

function closeMobileMenu() {
  const navbarCollapse = document.querySelector(".navbar-collapse.show");

  if (window.innerWidth >= 992 || !navbarCollapse) {
    return;
  }

  bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
}

function bindNavbarEvents() {
  const navbar = document.querySelector(".navbar");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (!navbar || !navbarCollapse) {
    return;
  }

  navbarCollapse.addEventListener("shown.bs.collapse", () => {
    navbar.classList.add("show-nav");
  });

  navbarCollapse.addEventListener("hidden.bs.collapse", () => {
    if (isHomePath()) {
      navbar.classList.remove("show-nav");
      return;
    }

    navbar.classList.add("show-nav");
  });

  document.querySelectorAll(".navbar-nav .nav-item .btn").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });
}

function initNavbarFeatures() {
  window.toggleTranslate = function toggleTranslate() {
    const wrapper = document.querySelector(".gtranslate_wrapper");

    if (!wrapper) {
      return;
    }

    const isOpen = wrapper.style.display === "block";
    wrapper.style.display = isOpen ? "none" : "block";
    window.isTranslateOpen = !isOpen;
  };

  window.toggleTheme = function toggleTheme() {
    const sun = document.getElementById("sunIcon");
    const moon = document.getElementById("moonIcon");

    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");

    if (sun && moon) {
      sun.style.display = isDarkMode ? "inline" : "none";
      moon.style.display = isDarkMode ? "none" : "inline";
    }

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };
}

fetch("/NavBar/Nav.html")
  .then((response) => response.text())
  .then((data) => {
    const placeholder = document.getElementById("navbar-placeholder");

    if (!placeholder) {
      return;
    }

    placeholder.innerHTML = data;
    loadGTranslate();
    initNavbarFeatures();
    loadTheme();
    bindNavbarEvents();
  })
  .catch((error) => {
    console.error("Unable to load navbar:", error);
  });

document.addEventListener("click", (event) => {
  const wrapper = document.querySelector(".gtranslate_wrapper");
  const languageButton = event.target.closest('[onclick="toggleTranslate()"]');

  if (
    wrapper &&
    !wrapper.contains(event.target) &&
    !languageButton &&
    wrapper.style.display === "block"
  ) {
    wrapper.style.display = "none";
    window.isTranslateOpen = false;
  }

  if (isHomePath()) {
    return;
  }

  if (!event.target.closest(".navbar")) {
    closeMobileMenu();
  }
});
