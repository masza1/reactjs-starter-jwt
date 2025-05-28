const MuiIcon = ({ icnoName = "", onClick, className = "", ...rest }) => {
	if (!icnoName) {
		return null;
	}

	return (
		<span
			className={`cursor-pointer flex items-center text-mugs-brown dark:text-mugs-blue ${className}`}
			onClick={onClick}
			{...rest}>
			<i className={`material-icons`}>{icnoName}</i>
		</span>
	);
};

export default MuiIcon;
