// AppRouter.jsx
import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import routeGroups from "./routes";

function applyMiddleware(route, user) {
	// console.log("Applying middleware for", route.path, route.middleware);
	if (route.middleware) {
		for (const guard of route.middleware) {
			// console.log(guard, "Guard Middleware");

			const result = guard({ user });
			if (result) return result;
		}
	}
	return route.element;
}

function renderRoutes(routes, user) {
	return routes.map((route) => {
		const children = route.children ? renderRoutes(route.children, user) : undefined;
        // console.log(route, "Route Details");
        
		const base = {
            name: route.name,
            path: route?.path,
			element: applyMiddleware(route, user),
			children,
		};
		// console.log("Base Route:", base);

		if (route.index) {
			return {
				...base,
				index: true,
			};
		} else {
			return {
				...route,
				...base,
			};
		}
	});
}

export default function AppRouter() {
	const user = useSelector((state) => state.auth.user);
	const routes = renderRoutes(routeGroups, user);
	console.log("Rendered Routes:", routes);
	// useRoutes([
	//     {}
	// ])
	return useRoutes(routes);
}
