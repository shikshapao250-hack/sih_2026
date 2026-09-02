function Hero({ onNavigate }) {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">

        {/* LEFT */}
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-600" />
            The bridge between talent & opportunity
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-6xl">
            Build your skills.
            <br />

            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Build your future.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            SkillBridge connects students, colleges and organizations
            in one professional ecosystem — helping people discover
            skills, opportunities and meaningful connections.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={() => onNavigate("signup")}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-300"
            >
              Get started
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("discover")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              Explore SkillBridge
            </button>

          </div>

          {/* Trust */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-500 sm:text-sm">
            <span className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              Student focused
            </span>

            <span className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              Career opportunities
            </span>

            <span className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              Skill intelligence
            </span>
          </div>
        </div>

        {/* RIGHT — PLATFORM PREVIEW */}
        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">

          {/* Glow */}
          <div className="absolute inset-8 rounded-[3rem] bg-indigo-200/40 blur-3xl" />

          {/* Main card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/80 sm:p-6">

            {/* Window header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-200" />
                <span className="h-3 w-3 rounded-full bg-slate-200" />
                <span className="h-3 w-3 rounded-full bg-slate-200" />
              </div>

              <span className="text-xs font-bold text-slate-400">
                SkillBridge
              </span>
            </div>

            {/* Profile preview */}
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-5">
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xl font-black text-white shadow-lg">
                  A
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-bold text-slate-900">
                    Alex Sharma
                  </h3>

                  <p className="text-sm text-slate-500">
                    Computer Science Student
                  </p>

                  <p className="mt-1 text-xs font-semibold text-indigo-600">
                    Open to opportunities
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["React", "Python", "SQL", "Git"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xl font-black text-slate-900">
                  08
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Skills
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xl font-black text-slate-900">
                  04
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Projects
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xl font-black text-slate-900">
                  92%
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Profile
                </p>
              </div>

            </div>

            {/* Opportunity */}
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">

              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                  💼
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    Frontend Developer Intern
                  </p>

                  <p className="text-xs text-slate-500">
                    Recommended for you
                  </p>
                </div>
              </div>

              <span className="ml-3 shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-600">
                94% match
              </span>

            </div>
          </div>

          {/* Floating notification */}
          <div className="absolute -bottom-5 -left-2 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block md:-left-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                ✨
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900">
                  New opportunity
                </p>

                <p className="text-xs text-slate-500">
                  Matches your skills
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;