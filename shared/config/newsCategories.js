export const NEWS_CATEGORY_CONFIG = Object.freeze({
  traveltrendsandfocus: {
    label: "Travel Trends",
    params: {
      search: "travel trends",
    },
  },
  traveltechnologynews: {
    label: "Hotel Technology",
    params: {
      search: "hotel technology",
    },
  },
  travelassociationnews: {
    label: "Travel Associations",
    params: {
      search: "WTTC OR UNWTO",
    },
  },
});

export const NEWS_CATEGORY_KEYS = Object.freeze(
  Object.keys(NEWS_CATEGORY_CONFIG)
);
