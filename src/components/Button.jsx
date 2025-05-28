// components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

const sizeClasses = {
	sm: "px-3 py-1 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-5 py-3 text-lg",
};

const colorClasses = {
	primary: "bg-brand-primary text-white hover:bg-blue-600",
	danger: "bg-red-600 text-white hover:bg-red-700",
	info: "bg-mugs-blue text-white hover:bg-blue-500",
	warning: "bg-yellow-400 text-black hover:bg-yellow-500",
	secondary: "bg-brand-secondary text-white hover:bg-olive-700",
};

export const Button = ({
	children,
	size = "md",
	variant = "primary",
	disabled = false,
	active = false,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				"rounded font-semibold transition-colors duration-200",
				sizeClasses[size],
				colorClasses[variant],
				{
					"opacity-50 cursor-not-allowed": disabled,
					"ring-2 ring-offset-1 ring-offset-white ring-brand-primary":
						active,
				}
			)}>
			{children}
		</button>
	);
};
