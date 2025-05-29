import fs from "fs";
import path from "path";
import parser from "@babel/parser";
import traverseModule from "@babel/traverse";

const traverse = traverseModule.default || traverseModule;

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

function extractParams(routePath) {
	return [...routePath.matchAll(/:([\w]+)\??/g)].map((match) => match[1]);
}

// ✅ Walks up the chain and collects all config
function extractRouteInfo(node) {
	const route = {
		path: null,
		name: null,
		params: [],
		paramsDef: {},
		queryParams: [],
	};

	function walk(n) {
		if (!n || n.type !== "CallExpression") return;

		const callee = n.callee;

		if (callee.type === "MemberExpression") {
			const method = callee.property.name;
			const [arg] = n.arguments;

			if (method === "name" && arg?.type === "StringLiteral") {
				route.name = arg.value;
			}

			if (method === "params" && arg?.type === "ObjectExpression") {
				arg.properties.forEach((prop) => {
					const key = prop.key.name || prop.key.value;
					if (prop.value.type === "ArrayExpression") {
						route.paramsDef[key] = prop.value.elements.map(
							(el) => el.value
						);
					} else if (prop.value.type === "StringLiteral") {
						route.paramsDef[key] = prop.value.value;
					}
				});
			}

			if (method === "queryParams" && arg?.type === "ArrayExpression") {
				route.queryParams = arg.elements.map((el) => el.value);
			}

			if (callee.object.type === "CallExpression") {
				walk(callee.object);
			}
		} else if (
			callee.type === "Identifier" &&
			callee.name === "createRoute"
		) {
			const [routeObjArg] = n.arguments;
			let pathArg = null;
			if (routeObjArg && routeObjArg.type === "ObjectExpression") {
				const pathProp = routeObjArg.properties.find(
					(prop) =>
						(prop.key.name || prop.key.value) === "path" &&
						prop.value.type === "StringLiteral"
				);
				if (pathProp) {
					pathArg = pathProp.value;
				}
			}
			if (pathArg?.type === "StringLiteral") {
				route.path = pathArg.value;
				route.params = extractParams(route.path);
			}
		}
	}

	walk(node);

	return route;
}

// ✅ Main generator
async function generateRoutes() {
	const routeFilePath = path.resolve("src/routes/routes.jsx");
	const content = fs.readFileSync(routeFilePath, "utf-8");

	const ast = parser.parse(content, {
		sourceType: "module",
		plugins: ["jsx"],
	});

	const routes = [];

	// Recursive handler
	function processRouteExpression(
		expr,
		parent = { prefixPath: "", prefixName: "" }
	) {
		if (expr.type !== "CallExpression") return;

		const callee = expr.callee;

		// ✅ createRoute
		if (
			(callee.type === "Identifier" && callee.name === "createRoute") ||
			(callee.type === "MemberExpression" &&
				callee.object &&
				callee.object.type === "CallExpression")
		) {
			const info = extractRouteInfo(expr);
			if (!info.name && !info.path) {
				console.warn(
					`⚠️ Skipping route without .name() or path: ${info.path}`
				);
				return;
			}

			info.path = path.posix.join(parent.prefixPath, info.path || "");

			if (!info.name) {
				info.name = info.path;
			} else {
				info.name = parent.prefixName
					? `${parent.prefixName}.${info.name}`
					: info.name;
			}

			routes.push(info);
			return;
		}

		// ✅ createGroup({ ... }, [ ... ])
		if (callee.type === "Identifier" && callee.name === "createGroup") {
			const [optionsArg, childrenArg] = expr.arguments;
			if (
				optionsArg?.type === "ObjectExpression" &&
				childrenArg?.type === "ArrayExpression"
			) {
				let prefixPath = "";
				let prefixName = "";

				optionsArg.properties.forEach((prop) => {
					const key = prop.key.name || prop.key.value;
					if (
						key === "prefixPath" &&
						prop.value.type === "StringLiteral"
					) {
						prefixPath = prop.value.value;
					}
					if (
						key === "prefixName" &&
						prop.value.type === "StringLiteral"
					) {
						prefixName = prop.value.value;
					}
				});

				childrenArg.elements.forEach((child) => {
					if (child.type === "CallExpression") {
						processRouteExpression(child, {
							prefixPath,
							prefixName,
						});
					} else if (
						child.type === "MemberExpression" &&
						child.object?.type === "CallExpression"
					) {
						processRouteExpression(child.object, {
							prefixPath,
							prefixName,
						});
					}
				});
			}
		}
	}

	// ✅ Look for buildRoutes([...])
	traverse(ast, {
		CallExpression(path) {
			const callee = path.get("callee");
			if (
				callee.isIdentifier({ name: "buildRoutes" }) &&
				path.node.arguments.length > 0 &&
				path.node.arguments[0].type === "ArrayExpression"
			) {
				path.node.arguments[0].elements.forEach((el) => {
					processRouteExpression(el);
				});
			}
		},
	});

	// ✅ Write output
	const typeDef = generateTypeDef(routes);
	fs.writeFileSync("src/types/routes.d.ts", typeDef);
	console.log("✅ Route definitions generated.");
}

// ✅ Generate .d.ts
function generateTypeDef(routes) {
	const lines = ["export type RouteDefinitions = {"];
	for (const { name, path, params, queryParams, paramsDef } of routes) {
		const paramType = params.length
			? `{ ${params
					.map((key) => {
						const def = paramsDef[key];
						if (Array.isArray(def)) {
							return `${key}: ${def
								.map((v) => `"${v}"`)
								.join(" | ")}`;
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
