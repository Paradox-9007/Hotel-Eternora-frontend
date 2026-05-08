import { NEWS_CATEGORY_CONFIG, NEWS_CATEGORY_KEYS } from "../config/newsCategories.js";

const NEWS_API_BASE_URL = "https://api.thenewsapi.com/v1/news/all";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
}

function normalizeCreator(creator, sourceId) {
  if (Array.isArray(creator) && creator.length > 0) {
    return creator.join(", ");
  }

  if (typeof creator === "string" && creator.trim()) {
    return creator.trim();
  }

  if (typeof sourceId === "string" && sourceId.trim()) {
    return sourceId.trim();
  }

  return "Unknown Source";
}

function normalizeNewsItem(item, category) {
  return {
    articleId: item.uuid ?? `${category}-${item.url ?? item.title ?? Math.random()}`,
    category,
    title: item.title ?? "Untitled Article",
    link: item.url ?? "#",
    author: normalizeCreator(item.source, item.source),
    description: item.description ?? item.snippet ?? "",
    content: item.description ?? item.snippet ?? "",
    imageUrl: item.image_url ?? "",
    publishedAt: item.published_at ?? null,
    sourceId: item.source ?? "",
    sourceUrl: item.url ?? "",
  };
}

async function handleNewsRequest(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const category = req.params?.category ?? req.query?.category;

  if (!category || !NEWS_CATEGORY_CONFIG[category]) {
    res.status(400).json({
      error: "Unknown news category",
      categories: NEWS_CATEGORY_KEYS,
    });
    return;
  }

  if (!process.env.NEWS_API_KEY) {
    res.status(500).json({ error: "NEWS_API_KEY is not configured" });
    return;
  }

  try {
    const searchParams = new URLSearchParams({
      api_token: process.env.NEWS_API_KEY,
      ...NEWS_CATEGORY_CONFIG[category].params,
    });

    const response = await fetch(`${NEWS_API_BASE_URL}?${searchParams.toString()}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      res.status(response.status).json({ error });
      return;
    }

    const payload = await response.json();
    const results = Array.isArray(payload?.data)
      ? payload.data.map((item) => normalizeNewsItem(item, category))
      : [];

    res.status(200).json({
      success: true,
      category,
      label: NEWS_CATEGORY_CONFIG[category].label,
      totalResults: payload?.meta?.found ?? results.length,
      nextPage: payload?.meta?.page ? payload.meta.page + 1 : null,
      results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { handleNewsRequest };
