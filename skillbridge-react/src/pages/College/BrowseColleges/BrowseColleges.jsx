import { useMemo, useState } from "react";

const colleges = [
  {
    id: 1,
    name: "Delhi Technical University",
    location: "New Delhi",
    type: "University",
    students: 1240,
    skills: ["Computer Science", "AI", "Data Science"],
    programs: 18,
    industryConnections: 42,
  },
  {
    id: 2,
    name: "Indraprastha College",
    location: "New Delhi",
    type: "College",
    students: 860,
    skills: ["Computer Applications", "Business", "Design"],
    programs: 12,
    industryConnections: 27,
  },
  {
    id: 3,
    name: "Delhi Institute of Technology",
    location: "Gurugram",
    type: "Institute",
    students: 970,
    skills: ["IT", "Cloud", "Cybersecurity"],
    programs: 15,
    industryConnections: 35,
  },
  {
    id: 4,
    name: "School of Design",
    location: "Delhi",
    type: "College",
    students: 620,
    skills: ["UI Design", "UX", "Product Design"],
    programs: 9,
    industryConnections: 21,
  },
  {
    id: 5,
    name: "National Institute of Technology",
    location: "Delhi",
    type: "Institute",
    students: 1560,
    skills: ["Engineering", "AI", "Robotics"],
    programs: 24,
    industryConnections: 58,
  },
  {
    id: 6,
    name: "Metro College of Technology",
    location: "Ghaziabad",
    type: "College",
    students: 740,
    skills: ["Web Development", "Python", "Database"],
    programs: 11,
    industryConnections: 19,
  },
];

function BrowseColleges({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const filteredColleges = useMemo(() => {
    const query = search.toLowerCase();

    return colleges.filter((college) => {
      const matchesSearch =
        college.name
          .toLowerCase()
          .includes(query) ||
        college.location
          .toLowerCase()
          .includes(query) ||
        college.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );

      const matchesType =
        type === "All" ||
        college.type === type;

      return matchesSearch && matchesType;
    });
  }, [search, type]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() =>
              onNavigate("college")
            }
            className="text-sm font-bold text-slate-600 transition hover:text-indigo-600"
          >
            ← Dashboard
          </button>

          <span className="text-sm font-black text-slate-900">
            College Directory
          </span>

        </div>

      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* HERO */}

        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-900 p-6 text-white shadow-xl sm:p-9">

          <p className="text-xs font-black uppercase tracking-widest text-indigo-300">
            College network
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Explore colleges.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Discover institutions, academic programs,
            student communities and areas of expertise
            across the SkillBridge network.
          </p>


          {/* SEARCH */}

          <div className="relative mt-7">

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
              🔎
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search colleges, locations or specializations..."
              className="w-full rounded-xl border border-white/20 bg-white px-11 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-white/20"
            />

          </div>

        </section>


        {/* FILTER BAR */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Directory
              </p>

              <p className="mt-1 text-sm font-bold text-slate-700">
                {filteredColleges.length} institutions
              </p>

            </div>


            <div className="flex gap-2">

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 outline-none focus:border-indigo-500"
              >

                <option value="All">
                  All institutions
                </option>

                <option value="University">
                  Universities
                </option>

                <option value="College">
                  Colleges
                </option>

                <option value="Institute">
                  Institutes
                </option>

              </select>


              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setType("All");
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-50"
              >
                Reset
              </button>

            </div>

          </div>

        </section>


        {/* COLLEGE GRID */}

        {filteredColleges.length > 0 ? (

          <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredColleges.map((college) => (

              <CollegeCard
                key={college.id}
                college={college}
              />

            ))}

          </section>

        ) : (

          <section className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              🏫
            </div>

            <h2 className="mt-5 text-lg font-black text-slate-900">
              No colleges found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or reset the filters.
            </p>

          </section>

        )}

      </main>

    </div>
  );
}


/* ==========================================
   COLLEGE CARD
========================================== */

function CollegeCard({ college }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">

      {/* TOP */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-xl font-black text-white shadow-md">
          🏫
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-black text-indigo-700">
          {college.type}
        </span>

      </div>


      {/* NAME */}

      <h2 className="mt-5 text-lg font-black leading-6 text-slate-900">
        {college.name}
      </h2>

      <p className="mt-2 text-xs font-semibold text-slate-500">
        📍 {college.location}
      </p>


      {/* SPECIALIZATIONS */}

      <div className="mt-5">

        <p className="text-xs font-black text-slate-700">
          Areas of expertise
        </p>

        <div className="mt-2 flex flex-wrap gap-2">

          {college.skills.map((skill) => (

            <span
              key={skill}
              className="rounded-full bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold text-slate-600"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>


      {/* STATS */}

      <div className="mt-6 grid grid-cols-3 divide-x divide-slate-100 rounded-xl bg-slate-50 py-3">

        <Stat
          value={college.students}
          label="Students"
        />

        <Stat
          value={college.programs}
          label="Programs"
        />

        <Stat
          value={college.industryConnections}
          label="Industry links"
        />

      </div>


      {/* BUTTON */}

      <button
        type="button"
        className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
      >
        View college →
      </button>

    </article>
  );
}


/* ==========================================
   STAT
========================================== */

function Stat({ value, label }) {
  return (
    <div className="text-center">

      <p className="text-sm font-black text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-[9px] font-bold text-slate-400">
        {label}
      </p>

    </div>
  );
}

export default BrowseColleges;