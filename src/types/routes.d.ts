export type RouteDefinitions = {
  "dashboard": { path: "/"; params: {}; queryParams?: Record<string, string> };
  "login": { path: "/login"; params: {}; queryParams?: { role?: string, t?: string } };
  "admin.dashboard": { path: "/admin/"; params: {}; queryParams?: Record<string, string> };
  "admin.users": { path: "/admin/users"; params: {}; queryParams?: Record<string, string> };
  "admin.settings": { path: "/admin/settings"; params: {}; queryParams?: Record<string, string> };
  "users.dashboard": { path: "/user/"; params: {}; queryParams?: Record<string, string> };
  "users.profile": { path: "/user/profile"; params: {}; queryParams?: Record<string, string> };
  "users.settings": { path: "/user/settings"; params: {}; queryParams?: Record<string, string> };
  "not-found": { path: "*"; params: {}; queryParams?: Record<string, string> };
};