// components/ui/Badge.tsx
import clsx from "clsx";

const badgeSizes = {
	sm: "text-xs px-2 py-0.5",
	md: "text-sm px-3 py-1",
};

const badgeColors = {
	brown: `border border-brand-brown text-brand-brown`,
	slate: `border border-brand-slate text-brand-slate`,
	blue: `border border-brand-blue text-brand-blue`,
	gray: `border border-brand-gray text-brand-gray`,
	olive: `border border-brand-olive text-brand-olive`,
	danger: `border border-danger text-danger`,
	warning: `border border-warning text-warning`,
	info: `border border-info text-info`,
	success: `border border-success text-success`,
};

const Badge = ({ children, variant = "primary", size = "md", ...rest }) => {
	return (
		<span
			className={clsx(
				"inline-block border rounded-full font-medium",
				badgeSizes[size],
				badgeColors[variant]
			)}
			{...rest}>
			{children}
		</span>
	);
};

export default Badge;
