// Initialize GTranslate settings
function loadGTranslate() {
  // Create GTranslate wrapper if not exists
  let wrapper = document.querySelector(".gtranslate_wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "gtranslate_wrapper";
    wrapper.style.display = "none"; // Initially hide the wrapper
    document.body.appendChild(wrapper);
  } else {
    wrapper.style.display = "none"; // Ensure wrapper is hidden on initialization
  }

  // Initialize GTranslate settings
  window.gtranslateSettings = {
    default_language: "en",
    languages: ["en", "my", "ms", "id", "zh-TW", "th"],
    wrapper_selector: ".gtranslate_wrapper",
    switcher_horizontal_position: "right",
    switcher_vertical_position: "top",
    float_switcher_open_direction: "bottom",
    alt_flags: { en: "usa" },
  };

  // Load GTranslate script
  const script = document.createElement("script");
  script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
  script.defer = true;
  document.body.appendChild(script);
}

// Load the navbar and initialize features
fetch("../NavBar/Nav.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;
    loadGTranslate();
    initNavbarFeatures(); // Initialize the navbar features once it's loaded
    loadTheme(); // Apply the stored theme when the navbar is loaded
    // Wait for GTranslate scripts to load
    setTimeout(() => {
      initNavbarFeatures(); // Init logic after GTranslate is ready
    }, 1500);
  });

// Toggle translate widget visibility
window.toggleTranslate = function () {
  const wrapper = document.querySelector(".gtranslate_wrapper");
  if (wrapper) {
    if (wrapper.style.display === "none") {
      wrapper.style.display = "block";
      window.isTranslateOpen = true;
    } else {
      wrapper.style.display = "none";
      window.isTranslateOpen = false;
    }
  }
};

// Close translate widget when clicking outside
// document.addEventListener("click", function (event) {
//   const widget = document.getElementById("translateWidget");
//   const languageButton = event.target.closest(".nav-link");

//   if (widget && !widget.contains(event.target) && !languageButton && window.isTranslateOpen) {
//     widget.style.display = "none";
//     window.isTranslateOpen = false;
//   }
// });

document.addEventListener("click", function (event) {
  const wrapper = document.querySelector(".gtranslate_wrapper");
  const languageButton = event.target.closest('[onclick="toggleTranslate()"]');

  if (wrapper && 
      !wrapper.contains(event.target) && 
      !languageButton && 
      wrapper.style.display === "block") {
    wrapper.style.display = "none";
    window.isTranslateOpen = false;
  }
});



function initNavbarFeatures() {
  // 🌍 Language switching
  window.switchLanguage = function (lang) {
    if (typeof GTranslate !== "undefined") {
      GTranslate.translate(lang);
      localStorage.setItem("selectedLanguage", lang);
      // Close the translate widget after selection
      document.getElementById("translateWidget").style.display = "none";
      window.isTranslateOpen = false;
    }
  };

  // Apply previously saved language
  const savedLang = localStorage.getItem("selectedLanguage");
  if (savedLang && typeof GTranslate !== "undefined") {
    GTranslate.translate(savedLang);
  }

  // 🌗 Theme toggle (sun/moon icon)
  window.toggleTheme = function () {
    const sun = document.getElementById("sunIcon");
    const moon = document.getElementById("moonIcon");

    // Toggle dark mode class
    document.body.classList.toggle("dark-mode");

    // Toggle icon visibility based on current theme state
    const isDarkMode = document.body.classList.contains("dark-mode");
    sun.style.display = isDarkMode ? "inline" : "none";
    moon.style.display = isDarkMode ? "none" : "inline";
  };
}

function initNavbarFeatures() {
  // 🌗 Theme toggle (sun/moon icon)
  window.toggleTheme = function () {
    const sun = document.getElementById("sunIcon");
    const moon = document.getElementById("moonIcon");

    // Toggle dark mode class
    document.body.classList.toggle("dark-mode");

    // Toggle icon visibility and save theme in localStorage
    const isDarkMode = document.body.classList.contains("dark-mode");
    sun.style.display = isDarkMode ? "inline" : "none";  // Show sun in dark mode
    moon.style.display = isDarkMode ? "none" : "inline"; // Show moon in light mode

    // Save the current theme to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };
}

// Load the theme from localStorage on page load
function loadTheme() {
  const storedTheme = localStorage.getItem("theme");
  const sun = document.getElementById("sunIcon");
  const moon = document.getElementById("moonIcon");

  if (storedTheme === "dark") {
    document.body.classList.add("dark-mode");
    sun.style.display = "inline";  // Show sun in dark mode
    moon.style.display = "none";   // Hide moon in dark mode
  } else {
    document.body.classList.remove("dark-mode");
    sun.style.display = "none";    // Hide sun in light mode
    moon.style.display = "inline"; // Show moon in light mode
  }
}
// Handle mobile menu
document.addEventListener('click', function(event) {
  // Skip for Home.html page
  if (window.location.href.includes('Home.html')) {
    return;
  }
  
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');
  
  // Close menu only if clicking outside navbar and menu is open
  if (!event.target.closest('.navbar') && 
      navbarCollapse && 
      navbarCollapse.classList.contains('show')) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
    bsCollapse.hide();
  }
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.navbar-nav .nav-item .btn').forEach(link => {
  link.addEventListener('click', () => {
    // Skip for Home.html page
    if (window.location.href.includes('Home.html')) {
      return;
    }
    
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  });
});

// // Handle mobile menu
// document.addEventListener('click', function(event) {
//   const navbarCollapse = document.querySelector('.navbar-collapse');
//   const navbarToggler = document.querySelector('.navbar-toggler');
  
//   // Close menu only if clicking outside navbar and menu is open
//   if (!event.target.closest('.navbar') && 
//       navbarCollapse && 
//       navbarCollapse.classList.contains('show')) {
//     const bsCollapse = new bootstrap.Collapse(navbarCollapse);
//     bsCollapse.hide();
//   }
// });

// // Close mobile menu when clicking nav links
// document.querySelectorAll('.navbar-nav .nav-item .btn').forEach(link => {
//   link.addEventListener('click', () => {
//     const navbarCollapse = document.querySelector('.navbar-collapse');
//     if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
//       const bsCollapse = new bootstrap.Collapse(navbarCollapse);
//       bsCollapse.hide();
//     }
//   });
// });