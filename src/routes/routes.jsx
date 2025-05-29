import MainLayout from "@src/components/layout/Main.layout";
import authGuard from "../middleware/authGuard";
import { buildRoutes, createGroup, createRoute } from "./routeBuilder";
import Dashboard from "@src/pages/dashboard/Dashboard.page";
import NotFound from "@src/components/layout/NotFound.page";
import { Login } from "@src/pages/auth/login/Login.page";
import { LoginV2 } from "@src/pages/auth/login/LoginV2.page";
import { Navigate } from "react-router-dom";
import guestGuard from "@src/middleware/guestGuard";

const routes = buildRoutes([
	createRoute({
		path: "/",
		element: <Navigate to="/login" replace />,
	}),
	createRoute({
		path: "/login",
		element: <LoginV2 />,
	})
	.middleware([guestGuard])
	.name("login"),

	createGroup(
		{
			prefixPath: "/dashboard",
			layout: <MainLayout />,
			middleware: [authGuard],
		},
		[
			createRoute({ element: <Dashboard />, index: true }).name("dashboard"),
			// createRoute({ path: "/rekap-biaya-kesehatan", element: <Dashboard /> }).name("users"),
		]
	),

	createRoute({
		path: "*",
		element: <NotFound />,
	}).name("not-found"),
]);
export default routes;
