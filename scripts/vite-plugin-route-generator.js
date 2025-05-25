import fs from "fs";
import path from "path";

export function vitePluginRouteDefinitions() {
	return {
		name: "vite-plugin-route-definitions",

		async buildStart() {
			await generateRoutes();
		},

		async handleHotUpdate({ file }) {
			if (file.includes("routes.jsx")) {
				await generateRoutes();
			}
		},
	};
}

async function generateRoutes() {
	const routeFilePath = path.resolve("src/routes/routes.jsx");
	const content = fs.readFileSync(routeFilePath, "utf-8");

	// 🧠 Extract lines from "buildRoutes([" to "]);"
	const routeBlockMatch = content.match(
		/const routes = buildRoutes\(\[\s*([\s\S]*?)\]\);/
	);

	if (!routeBlockMatch) {
		console.error("❌ Could not extract routes from routes.jsx");
		return;
	}

	// console.log("🛠️ Generating route definitions...", routeBlockMatch);

	const routeBlock = routeBlockMatch[1];

	// 🧼 Extract each route entry and get name + path string
	const routeEntries = [
		...routeBlock.matchAll(
			/createRoute\(["'`](.*?)["'`],\s*.*?\)[\s\S]*?\.name\(["'`](.*?)["'`]\)/g
		),
	];

	const routes = routeEntries.map(([
		fullRoute, path, name
	]) => {
		console.log('fulling',fullRoute);
		
		return {
			name,
			path,
			params: extractParams(path),
			queryParams: extractQueryParams(fullRoute),
		};
	});

	// ✍️ Write to TypeScript types
	const typeDef = generateTypeDef(routes);
	fs.writeFileSync("src/types/routes.d.ts", typeDef);
	console.log("✅ Route definitions generated.");
}

function extractParams(routePath) {
	return [...routePath.matchAll(/:([\w]+)\??/g)].map((match) => {
		return match[1];
		// return {
		// 	key: match[1],
		// 	optional: routePath.includes(`:${match[1]}?`),
		// };
	});
}

function extractQueryParams(routeText) {
	const queryMatch = routeText.match(/\.queryParams\(\s*\[([^\]]*)\]\s*\)/);
	if (!queryMatch) return [];
	return queryMatch[1]
		.split(",")
		.map((s) => s.trim().replace(/['"`]/g, ""))
		.filter(Boolean);
}

function generateTypeDef(routes) {
	const lines = ["export type RouteDefinitions = {"];
	for (const { name, path, params, queryParams, paramsDef } of routes) {
		const paramType = params.length
			? `{ ${params
					// .map(
					// 	({ key, optional }) =>
					// 		`${key}${optional ? "?" : ""}: string`
					// )
					.join(", ")} }`
			: "{}";

		const queryType = queryParams.length
			? `{ ${queryParams.map((q) => `${q}?: string`).join(", ")} }`
			: "Record<string, string>";

		lines.push(
			`  "${name}": { path: "${path}"; params: ${paramType}; queryParams?: ${queryType} };`
		);
	}
	lines.push("};");
	return lines.join("\n");
}
