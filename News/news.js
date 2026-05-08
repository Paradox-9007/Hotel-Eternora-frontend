// ─── RSS Feed Endpoints ──────────────────────────────────────────────────────
const RSS_FEEDS = {
  travelassociationnews:
    "http://feeds.feedburner.com/travelandtourworld/travelassociationnews",

  traveltechnologynews:
    "http://feeds.feedburner.com/travelandtourworld/traveltechnologynews",

  traveltrendsandfocus:
    "http://feeds.feedburner.com/travelandtourworld/traveltrendsandfocus",
};

// ─── State ───────────────────────────────────────────────────────────────────
let allNewsItems = [];
let visibleNewsItems = [];

// ─── Utilities ───────────────────────────────────────────────────────────────
function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(value) {
  if (!value) return "Unknown Date";

  const date = new Date(value);

  if (isNaN(date)) return value;

  return `${date.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  })} (Bangkok Time, GMT+7)`;
}

// ─── Clean HTML Tags ─────────────────────────────────────────────────────────
function stripHtml(html = "") {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}

// ─── Fetch Single RSS Feed ───────────────────────────────────────────────────
async function fetchRSSFeed(url, category) {
  try {
    // rss2json used to bypass CORS restrictions
    const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      url
    )}`;

    const response = await fetch(rssToJsonUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    return (data.items || []).map((item) => ({
      title: item.title || "Untitled",

      description: stripHtml(item.description || "").slice(0, 250),

      image:
        item.thumbnail ||
        item.enclosure?.link ||
        "",

      url: item.link,
      link: item.link,

      published: item.pubDate,
      publishedAt: item.pubDate,

      author: item.author || "Travel & Tour World",

      category,
    }));
  } catch (error) {
    console.error(`Failed to fetch ${category}:`, error);
    return [];
  }
}

// ─── Fetch All News ──────────────────────────────────────────────────────────
async function fetchAllNews() {
  try {
    const [
      travelAssociations,
      travelTechnology,
      travelTrends,
    ] = await Promise.all([
      fetchRSSFeed(
        RSS_FEEDS.travelassociationnews,
        "travelassociationnews"
      ),

      fetchRSSFeed(
        RSS_FEEDS.traveltechnologynews,
        "traveltechnologynews"
      ),

      fetchRSSFeed(
        RSS_FEEDS.traveltrendsandfocus,
        "traveltrendsandfocus"
      ),
    ]);

    const merged = [
      ...travelAssociations,
      ...travelTechnology,
      ...travelTrends,
    ];

    merged.sort(
      (a, b) =>
        new Date(b.published || b.publishedAt) -
        new Date(a.published || a.publishedAt)
    );

    return merged;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw error;
  }
}

// ─── Rendering ───────────────────────────────────────────────────────────────
function renderNews(category = "all") {
  const newsContainer = document.getElementById("news-container");

  if (!newsContainer) return;

  visibleNewsItems =
    category === "all"
      ? allNewsItems
      : allNewsItems.filter(
          (item) => item.category === category
        );

  if (visibleNewsItems.length === 0) {
    newsContainer.innerHTML = `
      <p class="text-center">No news available.</p>
    `;
    return;
  }

  newsContainer.innerHTML = visibleNewsItems
    .map((news, index) => {
      const image = news.image || "";
      const published =
        news.published || news.publishedAt || "";

      return `
        <div
          class="news-card"
          data-title="${escapeHtml(news.title)}"
        >
          <div class="news-item">

        <div class="news-image-wrap">
          ${
            image
              ? `
                <img
                  src="${escapeHtml(image)}"
                  alt="${escapeHtml(news.title)}"
                  class="news-image"
                  loading="lazy"
                />
              `
              : `
                <div class="news-image-placeholder">
                  ${
                    news.category === "travelassociationnews"
                      ? "Travel Association News"
                      : news.category === "traveltechnologynews"
                      ? "Travel Technology News"
                      : news.category === "traveltrendsandfocus"
                      ? "Travel Trends and Focus"
                      : "Travel News"
                  }
                </div>
              `
          }
        </div>

            <div class="news-text">

              <h3
                class="news-title"
                style="font-family:'Lora',serif;"
              >
                ${escapeHtml(news.title)}
              </h3>

              <p
                class="news-date"
                style="font-family:'Lora',serif;"
              >
                ${escapeHtml(
                  news.author || "Travel & Tour World"
                )}
                |
                ${escapeHtml(formatDate(published))}
              </p>

              <p style="font-family:'Lora',serif;">
                ${escapeHtml(news.description || "")}
              </p>

              <button
                class="read-more-btn"
                data-index="${index}"
                style="font-family:'Lora',serif;"
              >
                Read More
              </button>

              <div
                class="news-content"
                id="content-${index}"
                style="display:none; font-family:'Lora',serif;"
              >

                <p>
                  Full article available on source website.
                </p>

                <p style="margin-top:12px;">
                  <a
                    href="${escapeHtml(
                      news.url || news.link || "#"
                    )}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open original article ↗
                  </a>
                </p>

              </div>

            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

// ─── Highlight Selected Article ──────────────────────────────────────────────
function highlightSelectedArticle(title) {
  if (!title) return;

  document
    .querySelectorAll(".news-card")
    .forEach((card) => {
      if (card.dataset.title !== title) return;

      card.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      card.style.backgroundColor = "gray";

      setTimeout(() => {
        card.style.transition =
          "background-color 0.5s ease";

        card.style.backgroundColor = "";
      }, 1500);
    });
}

// ─── Initialize ──────────────────────────────────────────────────────────────
async function initializeNewsPage() {
  const params = new URLSearchParams(
    window.location.search
  );

  const selectedCategory =
    params.get("category") || "all";

  const selectedTitle = params.get("title");

  const categorySelect =
    document.getElementById("category");

  const newsContainer =
    document.getElementById("news-container");

  if (newsContainer) {
    newsContainer.innerHTML = `
      <p class="text-center">Loading news…</p>
    `;
  }

  try {
    allNewsItems = await fetchAllNews();

    if (categorySelect) {
      categorySelect.value = selectedCategory;

      categorySelect.addEventListener(
        "change",
        () => {
          renderNews(categorySelect.value);
        }
      );
    }

    renderNews(selectedCategory);

    highlightSelectedArticle(selectedTitle);
  } catch (error) {
    console.error(
      "News page initialization failed:",
      error
    );

    if (newsContainer) {
      newsContainer.innerHTML = `
        <div class="text-center">
          <p>News is temporarily unavailable.</p>

          <button
            class="read-more-btn"
            onclick="location.reload()"
          >
            Retry
          </button>
        </div>
      `;
    }
  }
}

// ─── Read More Toggle ────────────────────────────────────────────────────────
document.addEventListener("click", (event) => {
  const button =
    event.target.closest(".read-more-btn");

  if (!button) return;

  const index = button.dataset.index;

  if (index === undefined) return;

  const content =
    document.getElementById(`content-${index}`);

  if (!content) return;

  const isVisible =
    content.style.display === "block";

  content.style.display = isVisible
    ? "none"
    : "block";

  button.textContent = isVisible
    ? "Read More"
    : "Show Less";
});

// ─── Start ───────────────────────────────────────────────────────────────────
document.addEventListener(
  "DOMContentLoaded",
  initializeNewsPage
);