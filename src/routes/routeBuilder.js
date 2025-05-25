function buildRoute(config) {
	if (config.children) {
		config.children = config.children.map((r) =>
			typeof r.build === "function" ? r.build() : r
		);
	}
	return config;
}

export function createRoute(path, element) {
	let config = {
		path,
		element,
		middleware: [],
		queryParams: [],
		paramDefs: {}, // e.g., { appType: ['admin', 'user']
		name: null,
	};

	const builder = {
		name(name) {
			config.name = name;
			return proxy;
		},
		middleware(mw) {
			if (
				!Array.isArray(mw) ||
				!mw.every((fn) => typeof fn === "function")
			) {
				throw new Error("Middleware must be an array of functions");
			}
			config.middleware.push(...mw);
			return proxy;
		},
		children(children) {
			config.children = children.map((c) =>
				typeof c.build === "function" ? c.build() : c
			);
			return proxy;
		},
		params(definition) {
			config.paramDefs = definition; // e.g., { appType: ['admin', 'user'] }
			return proxy;
		},
		queryParams(keys) {
			config.queryParams = keys;
			return proxy;
		},
		build() {
			return buildRoute(config);
		},
	};

	const proxy = new Proxy(builder, {
		get(target, prop, receiver) {
			if (prop === Symbol.toPrimitive || prop === "then")
				return undefined;
			if (prop === "build") return target.build;
			if (prop in target) return Reflect.get(target, prop, receiver);
			if (prop in config) return buildRoute(config)[prop];
			return undefined;
		},
		ownKeys() {
			return Reflect.ownKeys(config);
		},
		getOwnPropertyDescriptor(target, prop) {
			if (prop in config) {
				return Object.getOwnPropertyDescriptor(config, prop);
			}
			return undefined;
		},
	});

	return proxy;
}

export function createGroup(
	{
		prefixPath = "",
		prefixName,
		layout,
		middleware = [],
		mergeMiddleware = true,
	},
	routes = []
) {
	const builtChildren = routes.map((r) => {
		const built = typeof r.build === "function" ? r.build() : r;

		// Ensure relative path
		if (built.path && built.path.startsWith("/") && built.path !== "*") {
			built.path = built.path.slice(1);
		}

		return {
			...built,
			middleware: mergeMiddleware
				? [...(middleware || []), ...(built.middleware || [])]
				: built.middleware ?? middleware, // use child or fallback to group
		};
	});

	return {
		path: prefixPath,
		name: prefixName,
		element: layout,
		children: builtChildren,
	};
}

export function buildRoutes(routes) {
	return routes.map((r) => (typeof r.build === "function" ? r.build() : r));
}
