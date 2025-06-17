import plugin from "tailwindcss/plugin";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				asu: "#fff",
			},
			// flexBasis({ theme }) {
			// 	const spacing = theme("spacing");
			// 	const size = theme("flexBasis");

			// 	// Filter percentage sizes and generate custom flex-basis values
			// 	const percentageSizes = Object.keys(size).filter((key) => key.includes("/"));

			// 	// Map over percentage sizes and spacing to generate CSS custom properties
			// 	const flexBasisValues = percentageSizes.flatMap((sizeKey) =>
			// 		Object.entries(spacing).map(([spacingKey, spacingValue]) => {
			// 			const [numerator, denominator] = sizeKey.split("/").map(Number);
			// 			const calcValue = `calc((100% - ${denominator - 1} * ${spacingValue}) / ${denominator} * ${numerator})`;
			// 			return [`${sizeKey}-calc-${spacingKey}`, calcValue];
			// 		})
			// 	);
			// 	return Object.fromEntries(flexBasisValues);
			// },
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			const spacing = theme("spacing");

			// Fraction strings like "1/2", "2/3", etc.
			const fractions = [];
			for (let denom = 2; denom <= 12; denom++) {
				for (let num = 1; num <= denom; num++) {
					fractions.push(`${num}/${denom}`);
				}
			}

			const values = {};

			for (const [gapKey, gapValue] of Object.entries(spacing)) {
				for (const fraction of fractions) {
					const [num, denom] = fraction.split("/").map(Number);

					const key = `${gapKey}-${fraction}`; // e.g. "4-1/3"
					const calc = `calc((100% - ${denom - 1} * ${gapValue}) / ${denom} * ${num})`;

					values[key] = calc;
				}
			}

			matchUtilities(
				{
					"basis-gap": (value) => ({
						flexBasis: value,
					}),
				},
				{ values }
			);
		}),
	],
};
