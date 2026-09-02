function CollegeDashboard({
  user,
  onNavigate,
  onLogout,
}) {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}

          <button
            type="button"
            onClick={() =>
              onNavigate("college")
            }
            className="flex items-center gap-2.5"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-black text-white shadow-md shadow-indigo-200">
              S
            </div>

            <span className="hidden text-lg font-black tracking-tight text-slate-900 sm:block">
              Skill<span className="text-indigo-600">
                Bridge
              </span>
            </span>

          </button>


          {/* PROFILE */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-xs font-black text-slate-800">
                {user?.name || "College"}
              </p>

              <p className="text-[10px] font-semibold text-slate-400">
                College
              </p>

            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-black text-indigo-600">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "C"}
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 hover:text-red-500"
            >
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* =====================================
          LAYOUT
      ===================================== */}

      <div className="mx-auto flex max-w-7xl">


        {/* ===================================
            SIDEBAR
        =================================== */}

        <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white lg:block">

          <div className="sticky top-16 p-4">

            <nav className="space-y-1">

              <SidebarItem
                icon="▦"
                label="Dashboard"
                active
                onClick={() =>
                  onNavigate("college")
                }
              />

              <SidebarItem
                icon="👥"
                label="Browse students"
                onClick={() =>
                  onNavigate(
                    "college-students"
                  )
                }
              />

              <SidebarItem
                icon="🏫"
                label="Browse colleges"
                onClick={() =>
                  onNavigate(
                    "college-directory"
                  )
                }
              />

              <SidebarItem
                icon="📊"
                label="Skill gap analysis"
                onClick={() =>
                  onNavigate(
                    "college-skill-gap"
                  )
                }
              />

            </nav>


            {/* AI CARD */}

            <div className="mt-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-4">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                ✨
              </div>

              <p className="mt-3 text-xs font-black text-indigo-900">
                AI Skill Intelligence
              </p>

              <p className="mt-2 text-[11px] leading-5 text-indigo-700">
                Identify the skills your students need
                to become industry-ready.
              </p>

              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    "college-skill-gap"
                  )
                }
                className="mt-4 w-full rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
              >
                Analyze skills
              </button>

            </div>

          </div>

        </aside>


        {/* ===================================
            MAIN
        =================================== */}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">


          {/* =================================
              HERO
          ================================= */}

          <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-700 to-indigo-900 p-6 text-white shadow-xl shadow-indigo-100 sm:p-9">

            <div className="max-w-3xl">

              <p className="text-xs font-black uppercase tracking-widest text-indigo-200">
                College workspace
              </p>

              <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                Build an industry-ready student community.
              </h1>

              <p className="mt-3 text-sm leading-6 text-indigo-100 sm:text-base">
                Explore your students, compare talent
                across colleges and understand the skills
                demanded by industry.
              </p>

            </div>


            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    "college-students"
                  )
                }
                className="rounded-xl bg-white px-5 py-3 text-sm font-black text-indigo-700 transition hover:bg-indigo-50"
              >
                Browse students
              </button>

              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    "college-skill-gap"
                  )
                }
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Analyze skill gap →
              </button>

            </div>

          </section>


          {/* =================================
              STATS
          ================================= */}

          <section className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">

            <Stat
              icon="👨‍🎓"
              value="0"
              label="Students"
            />

            <Stat
              icon="💡"
              value="0"
              label="Skills tracked"
            />

            <Stat
              icon="🏫"
              value="0"
              label="Colleges"
            />

            <Stat
              icon="📈"
              value="0"
              label="Skill gaps"
            />

          </section>


          {/* =================================
              FEATURE CARDS
          ================================= */}

          <section className="mt-6 grid gap-5 lg:grid-cols-3">

            <FeatureCard
              icon="👥"
              title="Browse students"
              description="Explore student profiles, skills, education and projects."
              button="View students"
              onClick={() =>
                onNavigate(
                  "college-students"
                )
              }
            />

            <FeatureCard
              icon="🏫"
              title="Browse colleges"
              description="Discover institutions and compare their student talent."
              button="Explore colleges"
              onClick={() =>
                onNavigate(
                  "college-directory"
                )
              }
            />

            <FeatureCard
              icon="🧠"
              title="Analyze skill gaps"
              description="Use skill data to understand where students need development."
              button="Start analysis"
              onClick={() =>
                onNavigate(
                  "college-skill-gap"
                )
              }
            />

          </section>


          {/* =================================
              INSIGHT
          ================================= */}

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Skill intelligence
                </p>

                <h2 className="mt-2 text-lg font-black text-slate-900">
                  Turn student data into actionable insights.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  SkillBridge will help colleges understand
                  which technical and professional skills
                  are strong, missing or increasingly
                  demanded by organizations.
                </p>

              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                📊
              </div>

            </div>

          </section>

        </main>

      </div>


      {/* =====================================
          MOBILE NAV
      ===================================== */}

      <div className="sticky bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur-xl lg:hidden">

        <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">

          <MobileNav
            icon="▦"
            label="Home"
            onClick={() =>
              onNavigate("college")
            }
          />

          <MobileNav
            icon="👥"
            label="Students"
            onClick={() =>
              onNavigate(
                "college-students"
              )
            }
          />

          <MobileNav
            icon="🏫"
            label="Colleges"
            onClick={() =>
              onNavigate(
                "college-directory"
              )
            }
          />

          <MobileNav
            icon="📊"
            label="Skills"
            onClick={() =>
              onNavigate(
                "college-skill-gap"
              )
            }
          />

        </div>

      </div>

    </div>
  );
}


/* ==========================================
   SIDEBAR ITEM
========================================== */

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >

      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
        {icon}
      </span>

      {label}

    </button>
  );
}


/* ==========================================
   STAT
========================================== */

function Stat({
  icon,
  value,
  label,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-semibold text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-black text-slate-900">
            {value}
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-lg">
          {icon}
        </div>

      </div>

    </div>
  );
}


/* ==========================================
   FEATURE CARD
========================================== */

function FeatureCard({
  icon,
  title,
  description,
  button,
  onClick,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
        {icon}
      </div>

      <h2 className="mt-5 text-base font-black text-slate-900">
        {title}
      </h2>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-600"
      >
        {button} →
      </button>

    </div>
  );
}


/* ==========================================
   MOBILE NAV
========================================== */

function MobileNav({
  icon,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-bold text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
    >

      <span className="text-base">
        {icon}
      </span>

      {label}

    </button>
  );
}


export default CollegeDashboard;