export type RouteDefinitions = {
  "/": { path: "/"; params: {}; queryParams?: Record<string, string> };
  "login": { path: "/login"; params: {}; queryParams?: Record<string, string> };
  "dashboard": { path: "/dashboard"; params: {}; queryParams?: Record<string, string> };
  "rawat-jalan": { path: "/rawat-jalan"; params: {}; queryParams?: Record<string, string> };
  "biaya-perawatan": { path: "/biaya-perawatan"; params: {}; queryParams?: Record<string, string> };
  "buku-besar-pensiunan": { path: "/buku-besar-pensiunan"; params: {}; queryParams?: Record<string, string> };
  "not-found": { path: "*"; params: {}; queryParams?: Record<string, string> };
};