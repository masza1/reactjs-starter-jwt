import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
// import { vitePluginRouteDefinitions } from "./scripts/vite-plugin-route-generator";
import { vitePluginRouteDefinitions } from "./scripts/vite-plugin-route-generator-v3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// eslint-disable-next-line no-undef
	const env = loadEnv(mode, process.cwd(), "");

	return {
		// base: "/ykka/frontend/", // Base path for the application
		base: env.VITE_BASENAME || "/", // Use environment variable for base path
		plugins: [react(), vitePluginRouteDefinitions()],
		resolve: {
			mainFields: [],
			alias: {
				"@root": path.resolve(__dirname, "./"),
				"@public": path.resolve(__dirname, "./public"),
				"@src": path.resolve(__dirname, "./src"),
				"@components": path.resolve(__dirname, "./src/components"),
				"@utils": path.resolve(__dirname, "./src/utils"),
				// Allow moment.js to be used as an ESM module
				axios: path.resolve(__dirname, "./node_modules/axios/dist/browser/axios.cjs"),
			},
		},
		server: {
			port: 3000, // Port for the development server
			cors: true, // Enable CORS
			// host: "php82.test"
		},
	};
});
