export const PAGE_PATHS = Object.freeze({
  home: "/home",
  dashboard: "/dashboard",
  dataSource: "/data-source",
  news: "/news",
  about: "/about",
});

export const PAGE_ROUTE_FILES = Object.freeze([
  {
    route: "/",
    file: "Home/Home.html",
  },
  {
    route: PAGE_PATHS.home,
    file: "Home/Home.html",
  },
  {
    route: PAGE_PATHS.dashboard,
    file: "dashboard.html",
  },
  {
    route: PAGE_PATHS.dataSource,
    file: "data-source/data-source.html",
  },
  {
    route: PAGE_PATHS.news,
    file: "News/news.html",
  },
  {
    route: PAGE_PATHS.about,
    file: "About/about.html",
  },
]);
