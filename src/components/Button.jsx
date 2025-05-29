// components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

const sizeClasses = {
	sm: "px-3 py-1 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-5 py-3 text-lg",
};

const baseOutlineClasses = `button-outline`;

const colorOutlineClasses = {
	brown: `border border-brand-brown text-brand-brown hover:text-white 
        before:bg-brand-brown hover:before:bg-brand-brown before:h-full`,
	slate: `border border-brand-slate text-brand-slate hover:text-white 
        before:bg-brand-slate hover:before:bg-brand-slate before:h-full`,
	blue: `border border-brand-blue text-brand-blue hover:text-white 
        before:bg-brand-blue hover:before:bg-brand-blue before:h-full`,
	gray: `border border-brand-gray text-brand-gray hover:text-white 
        before:bg-brand-gray hover:before:bg-brand-gray before:h-full`,
	olive: `border border-brand-olive text-brand-olive hover:text-white 
        before:bg-brand-olive hover:before:bg-brand-olive before:h-full`,
	danger: `border border-danger text-danger hover:text-white 
        before:bg-danger hover:before:bg-danger before:h-full`,
	warning: `border border-warning text-warning hover:text-white 
        before:bg-warning hover:before:bg-warning before:h-full`,
	info: `border border-info text-info hover:text-white 
        before:bg-info hover:before:bg-info before:h-full`,
	success: `border border-success text-success hover:text-white 
        before:bg-success hover:before:bg-success before:h-full`,
};

const colorSolidClasses = {
    brown: `bg-brand-brown text-white hover:bg-brand-brown/90`,
    slate: `bg-brand-slate text-white hover:bg-brand-slate/90`,
    blue: `bg-brand-blue text-white hover:bg-brand-blue/90`,
    gray: `bg-brand-gray text-white hover:bg-brand-gray/90`,
    olive: `bg-brand-olive text-white hover:bg-brand-olive/90`,
    danger: `bg-danger text-white hover:bg-danger/90`,
    warning: `bg-warning text-white hover:bg-warning/90`,
    info: `bg-info text-white hover:bg-info/90`,
    success: `bg-success text-white hover:bg-success/90`,
};

const Button = ({
	children,
	size = "md",
	variant = "brown",
	disabled = false,
	active = false,
	isOutline = true,
	onClick,
	className = "",
	...rest
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				"relative overflow-hidden rounded-full font-semibold transition-all duration-300 ease-in-out",
				sizeClasses[size],
				isOutline
					? `${baseOutlineClasses} ${colorOutlineClasses[variant]}`
					: `${colorSolidClasses[variant]}`,
				{
					"opacity-50 cursor-not-allowed": disabled,
					"ring-2 ring-offset-1 ring-offset-white ring-brand-blue":
						active,
				},
				className
			)}
			{...rest}>
			<span className="relative z-10">{children}</span>
		</button>
	);
};

export default Button;