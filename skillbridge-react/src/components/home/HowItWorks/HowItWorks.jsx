const steps = [
  {
    number: "01",
    title: "Build your profile",
    description:
      "Showcase your education, skills, projects and experience in one professional profile.",
    icon: "👤",
  },
  {
    number: "02",
    title: "Discover connections",
    description:
      "Find students, colleges, organizations and opportunities that match your goals.",
    icon: "🔎",
  },
  {
    number: "03",
    title: "Grow your career",
    description:
      "Use skill insights and relevant opportunities to move closer to your career goals.",
    icon: "🚀",
  },
];

function HowItWorks() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((step) => (
        <div
          key={step.number}
          className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-indigo-600">
              {step.number}
            </span>

            <span className="text-2xl">
              {step.icon}
            </span>
          </div>

          <h3 className="mt-6 text-lg font-black text-slate-900">
            {step.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HowItWorks;