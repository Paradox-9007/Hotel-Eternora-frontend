import { NEWS_CATEGORY_CONFIG, NEWS_CATEGORY_KEYS } from "../config/newsCategories.js";

const newsCache = new Map();

function sortByPublishedDate(items) {
  return [...items].sort((left, right) => {
    const leftTime = left.publishedAt ? new Date(left.publishedAt).getTime() : 0;
    const rightTime = right.publishedAt
      ? new Date(right.publishedAt).getTime()
      : 0;

    return rightTime - leftTime;
  });
}

async function fetchNewsCategory(category) {
  if (!NEWS_CATEGORY_CONFIG[category]) {
    throw new Error(`Unknown news category "${category}"`);
  }

  if (!newsCache.has(category)) {
    newsCache.set(
      category,
      fetch(`/api/news/${category}`, {
        cache: "no-store",
      }).then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Unable to load ${category} news (${response.status}): ${errorText}`
          );
        }

        const payload = await response.json();
        return Array.isArray(payload?.results) ? payload.results : [];
      })
    );
  }

  return newsCache.get(category);
}

async function fetchAllNews() {
  const groupedNews = await Promise.all(
    NEWS_CATEGORY_KEYS.map((category) => fetchNewsCategory(category))
  );

  return sortByPublishedDate(groupedNews.flat());
}

function clearNewsCache(category = null) {
  if (category) {
    newsCache.delete(category);
    return;
  }

  newsCache.clear();
}

export {
  NEWS_CATEGORY_CONFIG,
  NEWS_CATEGORY_KEYS,
  clearNewsCache,
  fetchAllNews,
  fetchNewsCategory,
};
