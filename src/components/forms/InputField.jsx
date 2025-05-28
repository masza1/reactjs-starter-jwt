import classNames from "classnames";

export default function InputField({
	name,
	label,
	labelPosition = "top", // 'top' or 'left'
	helperText,
	size = "md", // 'sm', 'md', 'lg'
	validation = "default", // 'default', 'error', 'success'
	prepend,
	append,
	className,
	type = "text",
	disabled,
	readOnly,
	register,
	error,
	...props
}) {
	const baseInputStyles =
		"block w-full border rounded-2xl focus:outline-none transition-all duration-150 ease-in-out shadow-md";

	const sizeStyles = {
		sm: "px-2 py-1 text-sm",
		md: "px-3 py-2 text-base",
		lg: "px-4 py-3 text-lg",
	};

	const validationStyles = {
		default:
			"border-mugs-olive dark:border-mugs-gray focus:ring-mugs-blue focus:border-mugs-blue",
		error: "border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500",
		success:
			"border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500",
	};

	const inputClasses = classNames(
		baseInputStyles,
		sizeStyles[size],
		error ? validationStyles.error : validationStyles[validation],
		"bg-light-surface dark:bg-dark-surface text-mugs-slate dark:text-mugs-gray",
		{
			"bg-gray-100 dark:bg-dark-surface/60 cursor-not-allowed":
				disabled || readOnly,
			"pr-10": append,
			"pl-10": prepend,
			"appearance-none": type === "number",
		},
		className
	);

	const containerClasses = classNames("flex", {
		"flex-col gap-1": labelPosition === "top",
		"items-center gap-2": labelPosition === "left",
	});

	const renderInputWithWrapper = () => (
		<div className="relative w-full">
			{prepend && (
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto">
					{prepend}
				</div>
			)}
			<input
				name={name}
				type={type}
				className={inputClasses}
				disabled={disabled}
				readOnly={readOnly}
				{...(name && typeof register === "function"
					? register(name)
					: {})}
				{...props}
			/>
			{append && (
				<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-auto">
					{append}
				</div>
			)}
		</div>
	);

	const renderLabeledInput = () => (
		<div className={containerClasses}>
			<label className="font-medium text-mugs-brown dark:text-mugs-blue min-w-[100px]">
				{label}
			</label>
			{renderInputWithWrapper()}
		</div>
	);

	const renderHelperText = () => {
		if (error?.message) {
			return <p className="text-sm text-red-500">{error.message}</p>;
		}
		if (helperText) {
			return (
				<p className="text-sm text-mugs-olive dark:text-mugs-gray">
					{helperText}
				</p>
			);
		}
		return null;
	};

	return (
		<div className="space-y-1 min-w-[200px]">
			{label ? renderLabeledInput() : renderInputWithWrapper()}
			{renderHelperText()}
		</div>
	);
}
