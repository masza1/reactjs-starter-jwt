const SpinnerComponent = ({
  color = "primary",
  width = "w-6",
  className = "",
}) => {
  const enumColor = {
    primary: "text-primary",
    secondary: "text-secondary",
    danger: "text-danger",
    success: "text-success",
    warning: "text-warning",
    grey: "text-grey",
    info: "text-info",
    white: "text-white",
  };
  return (
    <div
      className={`flex text-sm max-w-full items-center justify-center ${className}`}
    >
      <svg
        className={`animate-spin ${enumColor[color]} ${width}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default SpinnerComponent;
