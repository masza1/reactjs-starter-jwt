// components/ui/Link.tsx
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";

const variantColors = {
	brown: "text-brand-brown hover:-translate-y-1 hover:text-accent",
	info: "text-info hover:-translate-y-1 hover:text-accent",
	danger: "text-danger hover:-translate-y-1 hover:text-accent",
	warning: "text-warning hover:-translate-y-1 hover:text-accent",
	success: "text-success hover:-translate-y-1 hover:text-accent",
};

const Link = ({ to, children, variant = "brown" }) => {
	return (
		<RouterLink
			to={to}
			className={clsx(
				"font-normal duration-200 transition-all",
				variantColors[variant]
			)}>
			{children}
		</RouterLink>
	);
};

export default Link;
