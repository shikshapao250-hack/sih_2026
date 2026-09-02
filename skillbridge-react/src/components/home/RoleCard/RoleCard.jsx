function RoleCard({
  icon,
  title,
  description,
  features,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl transition duration-300 group-hover:scale-105 group-hover:bg-indigo-100">
          {icon}
        </div>

        <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600">
          →
        </span>

      </div>

      <h3 className="mt-6 text-xl font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-5 space-y-2">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 text-sm font-medium text-slate-600"
          >
            <span className="text-emerald-500">✓</span>
            {feature}
          </div>
        ))}
      </div>

    </button>
  );
}

export default RoleCard;