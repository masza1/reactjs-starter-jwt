import { RouteDefinitions } from "@src/types/routes";
import routeGroups from "./routes";

function joinPaths(...parts) {
	return parts
		.map((part) => part.replace(/^\/+|\/+$/g, "")) // remove leading/trailing slashes
		.filter(Boolean)
		.join("/");
}

function flattenRoutes(routesList, acc = [], parentPath = "", parentName = "") {
	for (const route of routesList) {
		const fullPath = "/" + joinPaths(parentPath, route.path);
		const fullName = [parentName, route.name].filter(Boolean).join(".");

		if (route.name && route.path !== undefined) {
			acc.push({
				name: fullName,
				path: fullPath,
				params: extractParams(fullPath),
				paramDefs: route.paramDefs || {},
				queryParams: route.queryParams || [],
			});
		}

		if (route.children) {
			flattenRoutes(
				route.children,
				acc,
				joinPaths(parentPath, route.path),
				fullName
			);
		}
	}

	return acc;
}

function extractParams(routePath) {
	return [...routePath.matchAll(/:([\w]+)/g)].map((m) => m[1]);
}

export function route<K extends keyof RouteDefinitions>(
	name: K,
	params: RouteDefinitions[K]["params"] = {} as RouteDefinitions[K]["params"],
	queryParams: RouteDefinitions[K]["queryParams"] = {} as RouteDefinitions[K]["queryParams"]
): string {
	const flatRoutes = flattenRoutes(routeGroups);
	// console.log("Available routes:", flatRoutes);

	const found = flatRoutes.find((r) => r.name === name);
	if (!found) throw new Error(`Route "${name}" not found.`);

	let path = found.path;
	// ✅ Runtime validation if you included paramDefs in flattenRoutes
	if (found.paramDefs) {
		for (const [key, allowed] of Object.entries(found.paramDefs)) {
			if (Array.isArray(allowed)) {
				if (!allowed.includes(params[key])) {
					throw new Error(
						`Invalid value "${
							params[key]
						}" for param "${key}". Allowed: ${allowed.join(", ")}`
					);
				}
			} else {
				if (params[key] !== allowed) {
					throw new Error(
						`Param "${key}" must equal "${allowed}", got "${params[key]}"`
					);
				}
			}
		}
	}

	// Replace params in path
	for (const key in params) {
		path = path.replace(`:${key}`, encodeURIComponent(String(params[key])));
	}

	const query = new URLSearchParams(queryParams).toString();
	const pathResolve = query ? `${path}?${query}` : path;
	// console.log(
	// 	`Resolved route: ${name} with params:`,
	// 	params,
	// 	"and queryParams:",
	// 	queryParams,
	// 	"=>",
	// 	pathResolve
	// );

	return pathResolve;
}
