export type RouteDefinitions = {
  "/": { path: "/"; params: {}; queryParams?: Record<string, string> };
  "login": { path: "/login"; params: {}; queryParams?: Record<string, string> };
  "dashboard": { path: "/dashboard"; params: {}; queryParams?: Record<string, string> };
  "not-found": { path: "*"; params: {}; queryParams?: Record<string, string> };
};