import fs from "fs";
import path from "path";
import parser from "@babel/parser";
import traverseModule from "@babel/traverse";
const traverse = traverseModule.default || traverseModule; // Handle both Babel 6 and 7

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

function extractRouteInfo(node) {
	const route = {
		path: null,
		name: null,
		params: [],
		paramsDef: {},
		queryParams: [],
	};

	let current = node;
	// Traverse down the chain
	while (current?.type === "CallExpression") {
		const callee = current.callee;

		if (callee.type === "Identifier" && callee.name === "createRoute") {
			const [pathArg] = current.arguments;
			if (pathArg?.type === "StringLiteral") {
				route.path = pathArg.value;
				route.params = extractParams(route.path);
			}
		}

		// Handle chained .name(), .params(), .queryParams()
		if (callee.type === "MemberExpression") {
			const method = callee.property.name;
			const [arg] = current.arguments;

			if (method === "name" && arg?.type === "StringLiteral") {
				route.name = arg.value;
			}

			if (method === "params") {
				if (arg.properties) {
					arg.properties.forEach((prop) => {
						const key = prop.key.name || prop.key.value;
						if (
							prop.value &&
							prop.value.type === "ArrayExpression"
						) {
							const value = prop.value.elements.map(
								(e) => e.value
							);
							route.paramsDef[key] = value;
						} else if (key && "value" in prop.value) {
							route.paramsDef[key] = prop.value.value;
						}
					});
				}
			}

			if (method === "queryParams" && arg?.type === "ArrayExpression") {
				route.queryParams = arg.elements.map((e) => e.value);
			}

			// Move to next inner call
			current = callee.object;
		} else {
			break;
		}
	}

	return route;
}

async function generateRoutes() {
	const routeFilePath = path.resolve("src/routes/routes.jsx");
	const content = fs.readFileSync(routeFilePath, "utf-8");

	const ast = parser.parse(content, {
		sourceType: "module",
		plugins: ["jsx"],
	});

	const routes = [];

	// Traverse and find createRoute(...) chains
	traverse(ast, {
		CallExpression(path) {
			const callee = path.get("callee");
			if (
				callee.isIdentifier({ name: "buildRoutes" }) &&
				path.node.arguments.length > 0 &&
				path.node.arguments[0].type === "ArrayExpression"
			) {
				path.node.arguments[0].elements
					.map((el) => {
						if (el.type === "CallExpression") {
							const routeInfo = extractRouteInfo(el);
							// console.log("Extracted route info:", routeInfo);

							if (routeInfo) {
								routes.push(routeInfo);
							}
						}
						return null;
					})
					.filter(Boolean);
			}
		},
	});

	const typeDef = generateTypeDef(routes);
	fs.writeFileSync("src/types/routes.d.ts", typeDef);
	console.log("✅ Route definitions generated.");

	// return routes;
}

function extractParams(routePath) {
	return [...routePath.matchAll(/:([\w]+)\??/g)].map((match) => {
		return match[1];
	});
}

function generateTypeDef(routes) {
	const lines = ["export type RouteDefinitions = {"];
	for (const { name, path, params, queryParams, paramsDef } of routes) {
		const paramType = params.length
			? `{ ${params
					.map((key) => {
						const def = paramsDef[key];
						if (Array.isArray(def)) {
							return `${key}: ${def.map((v) => `"${v}"`).join(" | ")}`;
						} else if (def !== undefined) {
							return `${key}: "${def}"`;
						} else {
							return `${key}: any`;
						}
					})
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
