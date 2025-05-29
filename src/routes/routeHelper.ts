import { RouteDefinitions } from "@src/types/routes";
import routeGroups from "./routes";

interface JoinPaths {
	(...parts: string[]): string;
}

const joinPaths: JoinPaths = (...parts: string[]): string => {
	return parts
		.map((part) => part.replace(/^\/+|\/+$/g, "")) // remove leading/trailing slashes
		.filter(Boolean)
		.join("/");
};

interface FlattenedRoute {
	name: string;
	path: string;
	index: boolean;
	params: string[];
	paramDefs: Record<string, any>;
	queryParams: string[];
}

interface RouteGroup {
	name?: string;
	path?: string;
	index?: boolean;
	paramDefs?: Record<string, any>;
	queryParams?: string[];
	children?: RouteGroup[];
}

function flattenRoutes(
	routesList: RouteGroup[],
	acc: FlattenedRoute[] = [],
	parentPath: string = "",
	parentName: string = ""
): FlattenedRoute[] {
	for (const route of routesList) {
		const fullPath = "/" + joinPaths(parentPath, route.path ?? "");
		const fullName = [parentName, route.name].filter(Boolean).join(".");
		// console.log(`Flattening route: ${route.index} ${fullName} at ${fullPath}`);
		
		if (route.name && (route.path !== undefined || route.index)) {
			// console.log(`Flattening route: ${route.index ? "Index" : "Named"} ${fullName} at ${fullPath}`);
			
			acc.push({
				name: fullName,
				path: fullPath,
				index: route.index || false,
				params: extractParams(fullPath),
				paramDefs: route.paramDefs || {},
				queryParams: route.queryParams || [],
			});
		}

		if (route.children) {
			flattenRoutes(
				route.children,
				acc,
				joinPaths(parentPath, route.path ?? ""),
				fullName
			);
		}
	}

	return acc;
}

function extractParams(routePath: string): string[] {
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

	for (const key in params) {
		path = path.replace(`:${key}`, encodeURIComponent(String(params[key])));
	}

	const query = new URLSearchParams(queryParams).toString();
	const pathResolve = query ? `${path}?${query}` : path;
	return pathResolve;
}
