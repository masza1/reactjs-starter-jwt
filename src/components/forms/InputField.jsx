import clsx from "clsx";

export default function InputField({
	name,
	label,
	labelPosition = "top", // 'top' or 'left'
	labelColor = "text-brand-brown dark:text-brand-blue",
	labelClassName = "",
	wrapperClassName = "",
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
	const baseInputStyles = "block w-full border rounded-2xl focus:outline-hidden transition-all duration-150 ease-in-out shadow-md";

	const sizeStyles = {
		sm: "px-2 py-1 text-sm",
		md: "px-3 py-2 text-base",
		lg: "px-4 py-3 text-lg",
	};

	const validationStyles = {
		default: "border-brand-olive dark:border-brand-gray focus:ring-brand-blue focus:border-brand-blue",
		error: "border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500",
		success: "border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500",
	};

	const inputClasses = clsx(
		baseInputStyles,
		sizeStyles[size],
		error ? validationStyles.error : validationStyles[validation],
		"bg-light-surface dark:bg-dark-surface text-brand-slate dark:text-brand-gray",
		{
			"bg-gray-100 dark:bg-dark-surface/60 cursor-not-allowed": disabled || readOnly,
			"pr-10": append,
			"pl-10": prepend,
			"appearance-none": type === "number",
		},
		className
	);

	const containerClasses = clsx("flex", {
		"flex-col gap-1": labelPosition === "top",
		"items-center gap-2": labelPosition === "left",
	});

	const renderInputWithWrapper = () => (
		<div className="relative w-full">
			{prepend && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto">{prepend}</div>}
			<input
				name={name}
				type={type}
				className={inputClasses}
				disabled={disabled}
				readOnly={readOnly}
				{...(name && typeof register === "function" ? register(name) : {})}
				{...props}
			/>
			{append && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-auto">{append}</div>}
		</div>
	);

	const renderLabeledInput = () => (
		<div className={containerClasses}>
			<label className={`font-medium ${labelColor} min-w-[100px] w-fit ${labelClassName}`}>{label}</label>
			{renderInputWithWrapper()}
		</div>
	);

	const renderHelperText = () => {
		if (error?.message) {
			return <p className="text-sm text-red-500">{error.message}</p>;
		}
		if (helperText) {
			return <p className="text-sm text-brand-olive dark:text-brand-gray">{helperText}</p>;
		}
		return null;
	};

	return (
		<div className={`space-y-1 min-w-[200px] ${wrapperClassName}`}>
			{label ? renderLabeledInput() : renderInputWithWrapper()}
			{renderHelperText()}
		</div>
	);
}
