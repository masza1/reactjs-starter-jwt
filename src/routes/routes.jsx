import MainLayout from "@src/components/layout/Main.layout";
import authGuard from "../middleware/authGuard";
import { buildRoutes, createGroup, createRoute } from "./routeBuilder";
import Dashboard from "@src/pages/dashboard/Dashboard.page";
import NotFound from "@src/components/layout/NotFound.page";
import { Login } from "@src/pages/auth/Login.page";

const routes = buildRoutes([
	createRoute("/", <Dashboard />).name("dashboard"),
	// .middleware([authGuard])
	createRoute("/login", <Login />)
		.queryParams(["role", "t"])
		.name("login"),

	createGroup(
		{
			prefixPath: "/admin",
			prefixName: "admin",
			layout: <MainLayout />,
			middleware: [authGuard],
		},
		[
			createRoute("/", <Dashboard />).name("dashboard"),
			createRoute("/users", <Dashboard />).name("users"),
			createRoute("/settings", <Dashboard />).name("settings"),
		]
	),
	createGroup(
		{
			prefixPath: "/user",
			prefixName: "users",
			layout: <MainLayout />,
			middleware: [authGuard],
		},
		[
			createRoute("/", <Dashboard />).name("dashboard"),
			createRoute("/profile", <Dashboard />).name("profile"),
			createRoute("/settings", <Dashboard />).name("settings"),
		]
	),

	createRoute("*", <NotFound />).name("not-found"),
]);
export default routes;
