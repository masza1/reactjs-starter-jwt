import MainLayout from "@src/components/layout/Main.layout";
import authGuard from "../middleware/authGuard";
import { buildRoutes, createGroup, createRoute } from "./routeBuilder";
import Dashboard from "@src/pages/dashboard/Dashboard.page";
import NotFound from "@src/components/layout/NotFound.page";
import { Login } from "@src/pages/auth/login/Login.page";
import { LoginV2 } from "@src/pages/auth/login/LoginV2.page";
import { Navigate } from "react-router-dom";
import guestGuard from "@src/middleware/guestGuard";
import RawatJalan from "@src/pages/rawat-jalan/RawatJalan.page";
import BiayaPerawatan from "@src/pages/perawatan/Perawatan.page";
import BukuBesar from "@src/pages/buku-besar/BukuBesar.page";

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
			prefixPath: "/",
			layout: <MainLayout />,
			middleware: [authGuard],
		},
		[
			createRoute({ path: "/dashboard", element: <Dashboard /> }).name("dashboard"),
			createRoute({ path: "/rawat-jalan", element: <RawatJalan /> }).name("rawat-jalan"),
			createRoute({ path: "/biaya-perawatan", element: <BiayaPerawatan /> }).name("biaya-perawatan"),
			createRoute({ path: "/buku-besar-pensiunan", element: <BukuBesar /> }).name("buku-besar-pensiunan"),
		]
	),

	createRoute({
		path: "*",
		element: <NotFound />,
	}).name("not-found"),
]);
export default routes;
