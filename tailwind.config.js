/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class", // Enable dark mode support
	theme: {
		extend: {
			colors: {
				mugs: {
					brown: "#844D36",
					slate: "#474853",
					blue: "#86B3D1",
					gray: "#AAA0A0",
					olive: "#8E8268",
				},
				brand: {
					primary: "#86B3D1", // Using blue as the brand accent
					secondary: "#8E8268", // Olive as accent
				},
				light: {
					background: "#ffffff",
					surface: "#f8f8f8",
					text: "#1e1e1e",
					border: "#e2e2e2",
				},
				dark: {
					background: "#1e1e1e",
					surface: "#2a2a2a",
					text: "#f0f0f0",
					border: "#3a3a3a",
				},
			},
		},
	},
	plugins: [],
};
