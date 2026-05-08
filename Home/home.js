import { fetchAllNews } from "/shared/services/newsService.js";

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1200,
};

let allNewsItems = [];
let previousCardsPerSlide = 0;

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getCardsPerSlide() {
  if (window.innerWidth < BREAKPOINTS.mobile) {
    return 1;
  }

  if (window.innerWidth < BREAKPOINTS.tablet) {
    return 2;
  }

  return 3;
}

function buildImageMarkup(article) {
  if (!article.imageUrl) {
    return `
      <div style="width: 100%; height: 250px; display: flex; align-items: center; justify-content: center; background-color: var(--card-bg); color: var(--text-primary); font-family: 'Lora', serif;">
        Travel News
      </div>
    `;
  }

  return `
    <div style="width: 100%; height: 250px; overflow: hidden;">
      <img src="${escapeHtml(article.imageUrl)}" alt="${escapeHtml(article.title)}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
  `;
}

function renderNewsCarousel() {
  const carouselContent = document.getElementById("carousel-content");

  if (!carouselContent) {
    return;
  }

  if (allNewsItems.length === 0) {
    carouselContent.innerHTML =
      "<div class='carousel-item active'><div class='container-fluid'><p class='text-center p-5'>No news available.</p></div></div>";
    return;
  }

  const cardsPerSlide = getCardsPerSlide();
  previousCardsPerSlide = cardsPerSlide;
  carouselContent.innerHTML = "";

  for (let index = 0; index < allNewsItems.length; index += cardsPerSlide) {
    const slideItems = allNewsItems.slice(index, index + cardsPerSlide);
    const slide = document.createElement("div");
    slide.className = `carousel-item${index === 0 ? " active" : ""}`;

    slide.innerHTML = `
      <div class="container-fluid">
        <div class="news-card-row">
          ${slideItems
            .map(
              (news) => `
                <div class="news-card-col">
                  <div class="card h-100">
                    ${buildImageMarkup(news)}
                    <div class="card-body d-flex flex-column" style="padding: 10px; height: 80px; overflow: hidden;">
                      <p class="card-title" style="font-size: 18px; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; font-family:'Lora', serif;">
                        ${escapeHtml(news.title)}
                      </p>
                    </div>
                    <div class="card-footer">
                      <p><a href="/news?category=${encodeURIComponent(
                        news.category
                      )}&title=${encodeURIComponent(news.title)}" class="btn" style="background-color:var(--carolicon); font-family: 'Lora', serif;">Read More</a></p>
                    </div>
                  </div>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;

    carouselContent.appendChild(slide);
  }

  const carouselElement = document.getElementById("news-carousel");
  if (carouselElement) {
    bootstrap.Carousel.getOrCreateInstance(carouselElement, {
      interval: 3000,
      wrap: true,
    });
  }
}

async function initializeHomeNews() {
  try {
    allNewsItems = await fetchAllNews();
    renderNewsCarousel();
  } catch (error) {
    console.error("Unable to load homepage news:", error);
    const carouselContent = document.getElementById("carousel-content");

    if (carouselContent) {
      carouselContent.innerHTML =
        "<div class='carousel-item active'><div class='container-fluid'><p class='text-center p-5'>News is temporarily unavailable.</p></div></div>";
    }
  }
}

window.addEventListener("resize", () => {
  if (allNewsItems.length === 0) {
    return;
  }

  const cardsPerSlide = getCardsPerSlide();

  if (cardsPerSlide !== previousCardsPerSlide) {
    renderNewsCarousel();
  }
});

document.addEventListener("DOMContentLoaded", initializeHomeNews);
