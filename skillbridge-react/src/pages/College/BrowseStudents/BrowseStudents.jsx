import { useMemo, useState } from "react";

const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    degree: "B.Tech Computer Science",
    year: "3rd Year",
    skills: ["React", "JavaScript", "Python", "Git"],
    projects: 4,
    location: "New Delhi",
    status: "Available",
  },
  {
    id: 2,
    name: "Ananya Verma",
    degree: "BCA",
    year: "2nd Year",
    skills: ["Python", "SQL", "Machine Learning"],
    projects: 3,
    location: "Noida",
    status: "Available",
  },
  {
    id: 3,
    name: "Rohan Singh",
    degree: "B.Tech Information Technology",
    year: "4th Year",
    skills: ["React", "Node.js", "MongoDB", "Git"],
    projects: 6,
    location: "Gurugram",
    status: "Open to opportunities",
  },
  {
    id: 4,
    name: "Priya Kapoor",
    degree: "B.Des",
    year: "3rd Year",
    skills: ["Figma", "UI Design", "UX Research"],
    projects: 5,
    location: "Delhi",
    status: "Available",
  },
  {
    id: 5,
    name: "Kabir Mehta",
    degree: "B.Tech AI & Data Science",
    year: "4th Year",
    skills: ["Python", "Machine Learning", "SQL", "Power BI"],
    projects: 7,
    location: "Delhi",
    status: "Available",
  },
  {
    id: 6,
    name: "Meera Joshi",
    degree: "BCA",
    year: "3rd Year",
    skills: ["Java", "SQL", "HTML", "CSS"],
    projects: 4,
    location: "Ghaziabad",
    status: "Available",
  },
];

function BrowseStudents({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("All");
  const [year, setYear] = useState("All");

  const skills = [
    "All",
    ...new Set(
      students.flatMap((student) => student.skills)
    ),
  ];

  const years = [
    "All",
    ...new Set(
      students.map((student) => student.year)
    ),
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(query) ||
        student.degree.toLowerCase().includes(query) ||
        student.skills.some((item) =>
          item.toLowerCase().includes(query)
        );

      const matchesSkill =
        skill === "All" ||
        student.skills.includes(skill);

      const matchesYear =
        year === "All" ||
        student.year === year;

      return (
        matchesSearch &&
        matchesSkill &&
        matchesYear
      );
    });
  }, [search, skill, year]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() => onNavigate("college")}
            className="text-sm font-bold text-slate-600 hover:text-indigo-600"
          >
            ← Dashboard
          </button>

          <span className="text-sm font-black text-slate-900">
            Student Directory
          </span>

        </div>

      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* TITLE */}

        <section>

          <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
            College talent directory
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Browse Students
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Explore student profiles, skills and projects
            across the SkillBridge network.
          </p>

        </section>


        {/* SEARCH */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="relative">

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
              🔎
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search students, skills or degree..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />

          </div>


          {/* FILTERS */}

          <div className="mt-4 grid grid-cols-2 gap-3 sm:flex">

            <select
              value={skill}
              onChange={(event) =>
                setSkill(event.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 outline-none focus:border-indigo-500"
            >
              {skills.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(event) =>
                setYear(event.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 outline-none focus:border-indigo-500"
            >
              {years.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

        </section>


        {/* RESULT COUNT */}

        <div className="mt-6 flex items-center justify-between">

          <p className="text-sm font-bold text-slate-700">
            {filteredStudents.length} students
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSkill("All");
              setYear("All");
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            Clear filters
          </button>

        </div>


        {/* STUDENT CARDS */}

        {filteredStudents.length > 0 ? (

          <section className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
              />
            ))}

          </section>

        ) : (

          <section className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              🔎
            </div>

            <h2 className="mt-5 text-lg font-black text-slate-900">
              No students found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

          </section>

        )}

      </main>

    </div>
  );
}


/* ==========================================
   STUDENT CARD
========================================== */

function StudentCard({ student }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* PROFILE */}

      <div className="flex items-start justify-between gap-3">

        <div className="flex min-w-0 gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-base font-black text-white">
            {student.name.charAt(0)}
          </div>

          <div className="min-w-0">

            <h2 className="truncate text-base font-black text-slate-900">
              {student.name}
            </h2>

            <p className="mt-1 text-xs font-semibold text-indigo-600">
              {student.degree}
            </p>

          </div>

        </div>

        <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-700">
          ● Available
        </span>

      </div>


      {/* EDUCATION */}

      <div className="mt-5 rounded-xl bg-slate-50 p-3">

        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Current education
        </p>

        <p className="mt-1 text-xs font-bold text-slate-700">
          {student.year}
        </p>

      </div>


      {/* LOCATION */}

      <p className="mt-4 text-xs font-semibold text-slate-500">
        📍 {student.location}
      </p>


      {/* SKILLS */}

      <div className="mt-5">

        <p className="text-xs font-black text-slate-700">
          Skills
        </p>

        <div className="mt-2 flex flex-wrap gap-2">

          {student.skills.map((item) => (
            <span
              key={item}
              className="rounded-full bg-indigo-50 px-2.5 py-1.5 text-[10px] font-bold text-indigo-700"
            >
              {item}
            </span>
          ))}

        </div>

      </div>


      {/* FOOTER */}

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

        <span className="text-[11px] font-bold text-slate-400">
          📁 {student.projects} projects
        </span>

        <button
          type="button"
          className="rounded-xl bg-indigo-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-indigo-700"
        >
          View profile
        </button>

      </div>

    </article>
  );
}

export default BrowseStudents;