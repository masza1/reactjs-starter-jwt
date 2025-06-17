const MuiIcon = ({ iconName = "", outlined = false, onClick, className = "", ...rest }) => {
	if (!iconName) {
		return null;
	}

	return (
		<span
			className={`${onClick ? "cursor-pointer" : ""} flex items-center text-brand-brown dark:text-brand-blue ${className}
				${outlined ? "material-symbols-outlined" : "material-icons"}`}
			onClick={onClick}
			{...rest}>
			{iconName}
		</span>
	);
};

export default MuiIcon;
