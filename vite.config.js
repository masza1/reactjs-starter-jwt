import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
// import { vitePluginRouteDefinitions } from "./scripts/vite-plugin-route-generator";
import { vitePluginRouteDefinitions } from "./scripts/vite-plugin-route-generator-v3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
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
		},
	},
	server: {
		port: 3000, // Port for the development server
		cors: true, // Enable CORS
	},
});
