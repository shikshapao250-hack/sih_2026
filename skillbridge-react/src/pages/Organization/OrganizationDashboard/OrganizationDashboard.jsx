function OrganizationDashboard({
  user,
  onNavigate,
  onLogout,
}) {
  const stats = [
    {
      label: "Active jobs",
      value: "0",
      icon: "💼",
    },
    {
      label: "Applications",
      value: "0",
      icon: "📩",
    },
    {
      label: "Students viewed",
      value: "0",
      icon: "👥",
    },
    {
      label: "Shortlisted",
      value: "0",
      icon: "⭐",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================
          TOP NAVIGATION
      ===================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}

          <button
            type="button"
            onClick={() =>
              onNavigate("organization")
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


          {/* RIGHT */}

          <div className="flex items-center gap-2 sm:gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-xs font-black text-slate-800">
                {user?.name ||
                  "Organization"}
              </p>

              <p className="text-[10px] font-semibold capitalize text-slate-400">
                Organization
              </p>

            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-black text-indigo-600">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "O"}
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
                  onNavigate("organization")
                }
              />

              <SidebarItem
                icon="＋"
                label="Create job"
                onClick={() =>
                  onNavigate(
                    "organization-create-job"
                  )
                }
              />

              <SidebarItem
                icon="💼"
                label="My jobs"
                onClick={() =>
                  onNavigate(
                    "organization-jobs"
                  )
                }
              />

              <SidebarItem
                icon="👥"
                label="Browse students"
                onClick={() =>
                  onNavigate(
                    "organization-students"
                  )
                }
              />

            </nav>


            {/* HELP CARD */}

            <div className="mt-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-4">

              <p className="text-xs font-black text-indigo-900">
                Find the right talent
              </p>

              <p className="mt-2 text-[11px] leading-5 text-indigo-700">
                Create opportunities and discover
                students whose skills match your needs.
              </p>

              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    "organization-create-job"
                  )
                }
                className="mt-4 w-full rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
              >
                Create a job
              </button>

            </div>

          </div>

        </aside>


        {/* ===================================
            MAIN CONTENT
        =================================== */}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* WELCOME */}

          <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-900 p-6 text-white shadow-xl sm:p-8">

            <p className="text-xs font-black uppercase tracking-widest text-indigo-300">
              Organization workspace
            </p>

            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              Welcome back,{" "}
              {user?.name || "there"}.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Build your talent pipeline, publish
              opportunities and discover skilled students
              through SkillBridge.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    "organization-create-job"
                  )
                }
                className="rounded-xl bg-white px-5 py-3 text-sm font-black text-indigo-700 transition hover:bg-indigo-50"
              >
                + Create a job
              </button>

              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    "organization-students"
                  )
                }
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Browse students →
              </button>

            </div>

          </section>


          {/* =================================
              STATS
          ================================= */}

          <section className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">

            {stats.map((stat) => (

              <StatCard
                key={stat.label}
                {...stat}
              />

            ))}

          </section>


          {/* =================================
              QUICK ACTIONS
          ================================= */}

          <section className="mt-6 grid gap-5 lg:grid-cols-3">

            <ActionCard
              icon="💼"
              title="Create a job"
              description="Publish a job or internship and reach relevant students."
              button="Create job"
              onClick={() =>
                onNavigate(
                  "organization-create-job"
                )
              }
            />

            <ActionCard
              icon="👥"
              title="Browse students"
              description="Explore student profiles, skills and projects."
              button="Find talent"
              onClick={() =>
                onNavigate(
                  "organization-students"
                )
              }
            />

            <ActionCard
              icon="📊"
              title="Manage jobs"
              description="Review your published opportunities and applications."
              button="View jobs"
              onClick={() =>
                onNavigate(
                  "organization-jobs"
                )
              }
            />

          </section>


          {/* =================================
              EMPTY STATE
          ================================= */}

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

              <div>

                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Getting started
                </p>

                <h2 className="mt-2 text-lg font-black text-slate-900">
                  Your organization workspace is ready.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Start by creating your first opportunity
                  or browse students to discover potential
                  candidates.
                </p>

              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                🚀
              </div>

            </div>

          </section>

        </main>

      </div>


      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      <div className="sticky bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur-xl lg:hidden">

        <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">

          <MobileNav
            icon="▦"
            label="Home"
            onClick={() =>
              onNavigate("organization")
            }
          />

          <MobileNav
            icon="＋"
            label="Create"
            onClick={() =>
              onNavigate(
                "organization-create-job"
              )
            }
          />

          <MobileNav
            icon="💼"
            label="Jobs"
            onClick={() =>
              onNavigate(
                "organization-jobs"
              )
            }
          />

          <MobileNav
            icon="👥"
            label="Students"
            onClick={() =>
              onNavigate(
                "organization-students"
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
   STAT CARD
========================================== */

function StatCard({
  label,
  value,
  icon,
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
   ACTION CARD
========================================== */

function ActionCard({
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


export default OrganizationDashboard;