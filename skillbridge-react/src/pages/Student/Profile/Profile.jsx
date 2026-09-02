import { useState } from "react";

function Profile({ user, onNavigate }) {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || "Student Name",
    headline:
      "Computer Science Student | Developer | Problem Solver",
    location: "New Delhi, India",
    college: "SkillBridge University",
    degree: "B.Tech Computer Science",
    year: "3rd Year",
    about:
      "Passionate student interested in technology, software development and building real-world projects.",
    email: user?.email || "student@example.com",
  });

  const updateProfile = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() => onNavigate("student")}
            className="text-sm font-bold text-slate-600 transition hover:text-indigo-600"
          >
            ← Dashboard
          </button>

          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-indigo-700"
          >
            {editing ? "Save profile" : "Edit profile"}
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-5xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* PROFILE HERO */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* COVER */}

          <div className="h-32 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 sm:h-44" />

          {/* PROFILE INFO */}

          <div className="px-5 pb-6 sm:px-8">

            <div className="-mt-12 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end">

              {/* AVATAR */}

              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-indigo-500 to-violet-500 text-3xl font-black text-white shadow-lg sm:h-32 sm:w-32 sm:text-4xl">
                {profile.name.charAt(0).toUpperCase()}
              </div>


              {/* NAME */}

              <div className="min-w-0 flex-1">

                {editing ? (

                  <input
                    value={profile.name}
                    onChange={(event) =>
                      updateProfile(
                        "name",
                        event.target.value
                      )
                    }
                    className="w-full max-w-md rounded-xl border border-slate-200 px-3 py-2 text-xl font-black outline-none focus:border-indigo-500"
                  />

                ) : (

                  <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    {profile.name}
                  </h1>

                )}

                <p className="mt-1 text-sm font-semibold text-indigo-600">
                  {profile.headline}
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-400">
                  📍 {profile.location}
                </p>

              </div>

            </div>


            {/* QUICK STATS */}

            <div className="mt-7 grid grid-cols-3 divide-x divide-slate-100 rounded-2xl bg-slate-50 py-4">

              <QuickStat
                value="8"
                label="Skills"
              />

              <QuickStat
                value="5"
                label="Projects"
              />

              <QuickStat
                value="12"
                label="Connections"
              />

            </div>

          </div>

        </section>


        {/* CONTENT */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">


          {/* ABOUT */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  About
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  About me
                </h2>

              </div>

            </div>


            {editing ? (

              <textarea
                value={profile.about}
                onChange={(event) =>
                  updateProfile(
                    "about",
                    event.target.value
                  )
                }
                rows={5}
                className="mt-5 w-full resize-none rounded-xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-indigo-500"
              />

            ) : (

              <p className="mt-5 text-sm leading-7 text-slate-600">
                {profile.about}
              </p>

            )}

          </section>


          {/* EDUCATION */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
              Education
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Academic journey
            </h2>


            <div className="mt-5 rounded-2xl bg-slate-50 p-4">

              <div className="flex gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                  🎓
                </div>

                <div>

                  <p className="text-sm font-black text-slate-800">
                    {profile.college}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-indigo-600">
                    {profile.degree}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {profile.year}
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* CONTACT */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">

            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
              Contact
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Contact information
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <InfoItem
                icon="✉"
                label="Email"
                value={profile.email}
              />

              <InfoItem
                icon="📍"
                label="Location"
                value={profile.location}
              />

            </div>

          </section>


          {/* PROFILE COMPLETION */}

          <section className="rounded-3xl bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-100 lg:col-span-2">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-widest text-indigo-200">
                  Profile strength
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Your profile is 72% complete
                </h2>

                <p className="mt-2 max-w-xl text-xs leading-5 text-indigo-100">
                  Add your skills, projects and resume to
                  improve your visibility to organizations.
                </p>

              </div>

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/20 text-xl font-black">
                72%
              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}


/* ==========================================
   QUICK STAT
========================================== */

function QuickStat({ value, label }) {
  return (
    <div className="text-center">

      <p className="text-lg font-black text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

    </div>
  );
}


/* ==========================================
   INFO ITEM
========================================== */

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-bold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}

export default Profile;