import { useMemo } from "react";

function Dashboard({
  user,
  onNavigate,
  onLogout,
}) {
  const firstName = useMemo(() => {
    return (
      user?.name?.split(" ")[0] ||
      "Student"
    );
  }, [user]);

  const skills = user?.skills || [];
  const projects = user?.projects || [];
  const education = user?.education || [];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================
          TOP BAR
      ===================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* BRAND */}

          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-base font-black text-white shadow-md">
              S
            </div>

            <span className="hidden text-lg font-extrabold tracking-tight text-slate-900 sm:block">
              Skill<span className="text-indigo-600">
                Bridge
              </span>
            </span>
          </button>


          {/* RIGHT */}

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() =>
                onNavigate("opportunities")
              }
              className="hidden rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600 sm:block"
            >
              Opportunities
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-black text-indigo-600"
            >
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "S"}
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:text-sm"
            >
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ===================================
            WELCOME
        =================================== */}

        <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8 lg:p-10">

          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative">

            <p className="text-sm font-semibold text-indigo-300">
              STUDENT DASHBOARD
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              Good to see you, {firstName} 👋
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Build your professional identity,
              showcase your skills and discover
              opportunities that match your potential.
            </p>


            {/* ACTIONS */}

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() =>
                  onNavigate("student-profile")
                }
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
              >
                Complete profile
              </button>

              <button
                type="button"
                onClick={() =>
                  onNavigate("opportunities")
                }
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore opportunities
              </button>

            </div>

          </div>

        </section>


        {/* ===================================
            PROFILE COMPLETION
        =================================== */}

        <section className="mt-6 grid gap-5 lg:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-bold text-slate-900">
                  Profile strength
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  A complete profile helps organizations
                  understand your potential.
                </p>

              </div>

              <span className="text-lg font-black text-indigo-600">
                40%
              </span>

            </div>


            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: "40%" }}
              />

            </div>


            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <ProfileCheck
                label="Basic information"
                complete
              />

              <ProfileCheck
                label="Add skills"
                complete={skills.length > 0}
              />

              <ProfileCheck
                label="Add projects"
                complete={projects.length > 0}
              />

              <ProfileCheck
                label="Add education"
                complete={education.length > 0}
              />

            </div>

          </div>


          {/* QUICK CARD */}

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">

            <p className="text-sm font-black text-indigo-900">
              Make your profile stand out
            </p>

            <p className="mt-2 text-xs leading-5 text-indigo-700">
              Add your skills and projects so organizations
              can better understand what you can do.
            </p>

            <button
              type="button"
              onClick={() =>
                onNavigate("student-profile")
              }
              className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Improve profile →
            </button>

          </div>

        </section>


        {/* ===================================
            STATISTICS
        =================================== */}

        <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <StatCard
            number={skills.length}
            label="Skills"
            icon="✦"
          />

          <StatCard
            number={projects.length}
            label="Projects"
            icon="◈"
          />

          <StatCard
            number={education.length}
            label="Education"
            icon="🎓"
          />

          <StatCard
            number="12"
            label="Recommended"
            icon="🚀"
          />

        </section>


        {/* ===================================
            CONTENT
        =================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* =================================
              SKILLS
          ================================= */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-black text-slate-900">
                  Your skills
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Skills organizations can discover.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  onNavigate("student-skills")
                }
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                Manage →
              </button>

            </div>


            {skills.length > 0 ? (

              <div className="mt-5 flex flex-wrap gap-2">

                {skills.map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            ) : (

              <EmptyState
                icon="✦"
                title="No skills added yet"
                description="Add the skills you know to improve your profile."
                button="Add skills"
                onClick={() =>
                  onNavigate("student-skills")
                }
              />

            )}

          </section>


          {/* =================================
              PROFILE
          ================================= */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-black text-indigo-600">
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "S"}
              </div>

              <div className="min-w-0">

                <h2 className="truncate font-black text-slate-900">
                  {user?.name || "Student"}
                </h2>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {user?.course ||
                    "Add your course"}
                </p>

              </div>

            </div>


            <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">

              <InfoRow
                label="Location"
                value={
                  user?.location ||
                  "Not added"
                }
              />

              <InfoRow
                label="Graduation"
                value={
                  user?.graduationYear ||
                  "Not added"
                }
              />

              <InfoRow
                label="Email"
                value={
                  user?.email ||
                  "Not added"
                }
              />

            </div>


            <button
              type="button"
              onClick={() =>
                onNavigate("student-profile")
              }
              className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              View profile
            </button>

          </section>

        </div>


        {/* ===================================
            PROJECTS + OPPORTUNITIES
        =================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* PROJECTS */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-black text-slate-900">
                  Projects
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Show what you've built.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  onNavigate("student-projects")
                }
                className="text-xs font-bold text-indigo-600"
              >
                View all →
              </button>

            </div>


            {projects.length > 0 ? (

              <div className="mt-5 space-y-3">

                {projects
                  .slice(0, 3)
                  .map((project, index) => (

                    <div
                      key={index}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <p className="text-sm font-bold text-slate-900">
                        {project.name ||
                          `Project ${index + 1}`}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {project.description ||
                          "Project description"}
                      </p>
                    </div>

                  ))}

              </div>

            ) : (

              <EmptyState
                icon="◈"
                title="Showcase your work"
                description="Add projects to demonstrate your practical skills."
                button="Add project"
                onClick={() =>
                  onNavigate("student-projects")
                }
              />

            )}

          </section>


          {/* OPPORTUNITIES */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-black text-slate-900">
                  Recommended for you
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Opportunities based on your skills.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  onNavigate("opportunities")
                }
                className="text-xs font-bold text-indigo-600"
              >
                Explore →
              </button>

            </div>


            <div className="mt-5 space-y-3">

              <Opportunity
                title="Frontend Development Intern"
                company="Tech Startup"
                type="Internship"
              />

              <Opportunity
                title="React Developer Intern"
                company="Digital Labs"
                type="Internship"
              />

              <Opportunity
                title="Junior Web Developer"
                company="Innovation Hub"
                type="Job"
              />

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}


/* ==========================================
   COMPONENTS
========================================== */

function ProfileCheck({
  label,
  complete,
}) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">

      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
          complete
            ? "bg-emerald-50 text-emerald-600"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {complete ? "✓" : "○"}
      </span>

      {label}

    </div>
  );
}


function StatCard({
  number,
  label,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

      <div className="flex items-center justify-between">

        <span className="text-lg">
          {icon}
        </span>

        <span className="text-2xl font-black text-slate-900">
          {number}
        </span>

      </div>

      <p className="mt-2 text-xs font-semibold text-slate-500">
        {label}
      </p>

    </div>
  );
}


function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-xs font-semibold text-slate-400">
        {label}
      </span>

      <span className="max-w-[65%] truncate text-right text-xs font-bold text-slate-700">
        {value}
      </span>

    </div>
  );
}


function EmptyState({
  icon,
  title,
  description,
  button,
  onClick,
}) {
  return (
    <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">

      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
        {icon}
      </div>

      <p className="mt-3 text-sm font-bold text-slate-800">
        {title}
      </p>

      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-4 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-700"
      >
        {button}
      </button>

    </div>
  );
}


function Opportunity({
  title,
  company,
  type,
}) {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-black text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600">
        {company.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-sm font-bold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {company}
        </p>

      </div>

      <span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 sm:block">
        {type}
      </span>

    </div>
  );
}


export default Dashboard;