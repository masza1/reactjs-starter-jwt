export const formatCurrency = (value, options = {}) => {
	const { locale = "id-ID", currency = "IDR", compact = false } = options;

	if (typeof value === "string") value = parseFloat(value);
	if (isNaN(value)) return "-";

	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		notation: compact ? "compact" : "standard",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value);
};
