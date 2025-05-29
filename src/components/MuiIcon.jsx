const MuiIcon = ({ icnoName = "", onClick, className = "", ...rest }) => {
	if (!icnoName) {
		return null;
	}

	return (
		<span
			className={`cursor-pointer flex items-center text-brand-brown dark:text-brand-blue ${className}`}
			onClick={onClick}
			{...rest}>
			<i className={`material-icons`}>{icnoName}</i>
		</span>
	);
};

export default MuiIcon;
