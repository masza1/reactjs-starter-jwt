import { ReactNode, ReactElement, ComponentType } from "react";
import { RouteObject } from "react-router-dom";

// 🔐 Optional middleware function type
export type MiddlewareFn = (context: { user?: any }) => ReactNode | null;

// 📦 Full Extended Route Config including custom props + full RouteObject API
export type ExtendedRouteConfig = RouteObject & {
	name?: string | null;
	paramDefs?: Record<string, any[] | string>;
	queryParams?: string[];
	middleware?: MiddlewareFn[];
	children?: ExtendedRouteConfig[];
};

// 🧰 Builder interface for chaining
interface RouteBuilder {
	name(name: string): RouteBuilderProxy;
	middleware(mw: MiddlewareFn[]): RouteBuilderProxy;
	// children(children: (ExtendedRouteConfig | RouteBuilderProxy)[]): RouteBuilderProxy;
	params(definition: Record<string, any[] | string>): RouteBuilderProxy;
	queryParams(keys: string[]): RouteBuilderProxy;
	build(): ExtendedRouteConfig;
}

// 🔁 Type for Builder & Config combo
type RouteBuilderProxy = RouteBuilder & ExtendedRouteConfig;

// 🛠️ Build the final route object
function buildRoute(config: ExtendedRouteConfig): ExtendedRouteConfig {
	if (config.children) {
		config.children = config.children.map((r) => (typeof (r as any).build === "function" ? (r as any).build() : r));
	}
	// console.log("Building route:", config);

	return config;
}

// 🚀 Create route using a full object like RouteObject
export function createRoute(configInput: Partial<ExtendedRouteConfig>): RouteBuilderProxy {
	if (configInput.path && configInput.index) {
		throw new Error("Path routes cannot be index routes. Use `createRoute` instead.");
	}
	if (!configInput.element) {
		throw new Error("Route must have an `element` defined.");
	}
	const config: ExtendedRouteConfig = {
		path: configInput.path,
		id: configInput.id,
		index: true,
		caseSensitive: configInput.caseSensitive,
		loader: configInput.loader,
		action: configInput.action,
		hasErrorBoundary: configInput.hasErrorBoundary,
		shouldRevalidate: configInput.shouldRevalidate,
		handle: configInput.handle,
		errorElement: configInput.errorElement,
		hydrateFallbackElement: configInput.hydrateFallbackElement,
		Component: configInput.Component,
		HydrateFallback: configInput.HydrateFallback,
		ErrorBoundary: configInput.ErrorBoundary,
		lazy: configInput.lazy,
		element: typeof configInput.element === "function" ? (configInput.element as () => ReactElement)() : configInput.element,
		name: null,
		middleware: [],
		queryParams: [],
		paramDefs: {},
		// children?: [],
	};

	const builder: RouteBuilder = {
		name(name: string) {
			config.name = name;
			return proxy;
		},
		middleware(mw: MiddlewareFn[]) {
			if (!Array.isArray(mw) || !mw.every((fn) => typeof fn === "function")) {
				throw new Error("Middleware must be an array of functions");
			}
			config.middleware!.push(...mw);
			return proxy;
		},
		params(definition) {
			config.paramDefs = definition;
			return proxy;
		},
		queryParams(keys) {
			config.queryParams = keys;
			return proxy;
		},
		build() {
			// console.log("Building route with config:", config);

			return buildRoute(config);
		},
	};

	const proxy = new Proxy(builder as RouteBuilderProxy, {
		get(target, prop, receiver) {
			if (prop === Symbol.toPrimitive || prop === "then") return undefined;
			if (prop === "build") return target.build;
			if (prop in target) return Reflect.get(target, prop, receiver);
			if (prop in config) return buildRoute(config)[prop as keyof ExtendedRouteConfig];
			return undefined;
		},
		ownKeys() {
			return Reflect.ownKeys(config);
		},
		getOwnPropertyDescriptor(_, prop) {
			if (prop in config) {
				return Object.getOwnPropertyDescriptor(config, prop);
			}
			return undefined;
		},
	});

	return proxy;
}

// 📁 createGroup remains unchanged but uses ExtendedRouteConfig
export function createGroup(
	options: {
		prefixPath?: string;
		prefixName?: string;
		layout: ReactElement;
		middleware?: MiddlewareFn[];
		mergeMiddleware?: boolean;
	},
	routes: (ExtendedRouteConfig | RouteBuilderProxy)[]
): ExtendedRouteConfig {
	const { prefixPath = "", prefixName, layout, middleware = [], mergeMiddleware = true } = options;

	const builtChildren = routes.map((r) => {
		const built = typeof (r as any).build === "function" ? (r as any).build() : r;

		if (built.path && built.path.startsWith("/") && built.path !== "*") {
			built.path = built.path.slice(1);
		}

		return {
			...built,
			middleware: mergeMiddleware ? [...(middleware || []), ...(built.middleware || [])] : built.middleware ?? middleware,
		};
	});

	return {
		path: prefixPath,
		name: prefixName,
		element: layout,
		middleware,
		children: builtChildren,
	};
}

// 🔁 Final build utility
export function buildRoutes(routes: (ExtendedRouteConfig | RouteBuilderProxy)[]): ExtendedRouteConfig[] {
	return routes.map((r) => (typeof (r as any).build === "function" ? (r as any).build() : r));
}
