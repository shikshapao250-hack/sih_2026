function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow-md",

    outline:
      "border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600",

    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${
        variantClasses[variant] || variantClasses.primary
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;