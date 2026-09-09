const roles = [
  {
    id: "student",
    icon: "🎓",
    title: "I'm a Student",
    description:
      "Build your professional profile, showcase your skills and projects, and discover jobs and internships.",
    features: [
      "Create your profile",
      "Showcase skills & projects",
      "Find jobs & internships",
    ],
  },
];

function RoleSelection({ onNavigate }) {

  const selectRole = (role) => {
    // Store the selected role temporarily.
    sessionStorage.setItem(
      "skillbridge_selected_role",
      role
    );

    onNavigate("signup");
  };

  return (
    <section className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">

          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 sm:text-sm">
            JOIN SKILLBRIDGE
          </span>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            How will you use SkillBridge?
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            Choose your role to get a personalized experience
            designed around your goals.
          </p>

        </div>


        {/* ROLE CARDS */}
        <div className="mt-10 grid gap-5 md:grid-cols-1 lg:mt-14">

          {roles.map((role) => (

            <button
              key={role.id}
              type="button"
              onClick={() => selectRole(role.id)}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 sm:p-7"
            >

              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

              {/* ICON */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl transition duration-300 group-hover:scale-105 group-hover:bg-indigo-100">
                {role.icon}
              </div>


              {/* TITLE */}
              <h2 className="relative mt-6 text-xl font-black text-slate-900">
                {role.title}
              </h2>


              {/* DESCRIPTION */}
              <p className="relative mt-3 text-sm leading-6 text-slate-500">
                {role.description}
              </p>


              {/* FEATURES */}
              <div className="relative mt-6 space-y-3">

                {role.features.map((feature) => (

                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-black text-emerald-600">
                      ✓
                    </span>

                    {feature}
                  </div>

                ))}

              </div>


              {/* ACTION */}
              <div className="relative mt-7 flex items-center justify-between border-t border-slate-100 pt-5">

                <span className="text-sm font-bold text-indigo-600">
                  Continue
                </span>

                <span className="text-lg text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-indigo-600">
                  →
                </span>

              </div>

            </button>

          ))}

        </div>


        {/* LOGIN */}
        <div className="mt-10 text-center">

          <p className="text-sm text-slate-500">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="mt-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
          >
            Log in instead →
          </button>

        </div>

      </div>

    </section>
  );
}

export default RoleSelection;