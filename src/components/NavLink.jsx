// components/ui/NavLink.tsx
import { NavLink as RouterNavLink } from "react-router-dom";
import clsx from "clsx";

const NavLink = ({ to, children, className = "", ...rest }) => {
	return (
		<RouterNavLink
			to={to}
			className={({ isActive }) =>
				clsx(
					"px-4 py-2 text-sm font-medium rounded-sm transition-colors",
					clsx(
						"px-4 py-2 rounded-md font-medium transition-colors duration-200",
						isActive
							? "bg-brand-brown text-white"
							: "text-brand-brown hover:bg-brand-brown/10 hover:text-brand-brown"
					),
					className
				)
			}
			{...rest}>
			{children}
		</RouterNavLink>
	);
};

export default NavLink;
