import { useMemo, useState } from "react";

const people = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Frontend Developer",
    type: "Student",
    location: "Delhi NCR",
    skills: ["React", "JavaScript", "Tailwind CSS"],
    initials: "AM",
    description:
      "Building responsive web applications and exploring modern frontend development.",
  },
  {
    id: 2,
    name: "Kanika",
    role: "Data Science Student",
    type: "Student",
    location: "Delhi",
    skills: ["Python", "SQL", "Machine Learning"],
    initials: "PS",
    description:
      "Interested in data analytics, machine learning and solving real-world problems.",
  },
  {
    id: 3,
    name: "TechNova Labs",
    role: "Technology Organization",
    type: "Organization",
    location: "Noida",
    skills: ["Software", "AI", "Web Development"],
    initials: "TN",
    description:
      "A growing technology organization building products with emerging developers.",
  },
  {
    id: 4,
    name: "Delhi Technical College",
    role: "Higher Education Institution",
    type: "College",
    location: "Delhi",
    skills: ["Engineering", "Technology", "Research"],
    initials: "DT",
    description:
      "An institution focused on technical education, student development and industry connections.",
  },
  {
    id: 5,
    name: "Rohan Verma",
    role: "Python Developer",
    type: "Student",
    location: "Ghaziabad",
    skills: ["Python", "Django", "MySQL"],
    initials: "RV",
    description:
      "Developing Python applications and learning backend development.",
  },
  {
    id: 6,
    name: "InnovateX",
    role: "Software Organization",
    type: "Organization",
    location: "Gurugram",
    skills: ["Software", "Cloud", "Development"],
    initials: "IX",
    description:
      "Connecting technology, innovation and talented developers.",
  },
];

function Discover({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const filteredPeople = useMemo(() => {
    const query = search.toLowerCase().trim();

    return people.filter((person) => {
      const matchesSearch =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.role.toLowerCase().includes(query) ||
        person.location.toLowerCase().includes(query) ||
        person.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );

      const matchesCategory =
        category === "All" ||
        person.type === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

          <div className="max-w-3xl">

            <span className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-indigo-300">
              Discover SkillBridge
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover people,
              <span className="text-indigo-400">
                {" "}skills and opportunities.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Explore students, organizations and colleges
              across the SkillBridge ecosystem.
            </p>

          </div>


          {/* SEARCH */}

          <div className="mt-8 max-w-4xl">

            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="relative flex-1">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔎
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search students, organizations, skills..."
                  className="w-full rounded-2xl border border-white/10 bg-white px-11 py-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-300"
                />

              </div>

              <button
                type="button"
                className="rounded-2xl bg-indigo-600 px-7 py-4 text-sm font-black text-white transition hover:bg-indigo-500"
              >
                Search
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          CATEGORY FILTER
      ========================================== */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <div className="flex flex-wrap gap-2">

            {[
              "All",
              "Student",
              "Organization",
              "College",
            ].map((item) => (

              <button
                key={item}
                type="button"
                onClick={() =>
                  setCategory(item)
                }
                className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${
                  category === item
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

          <p className="text-xs font-bold text-slate-400">
            {filteredPeople.length} results
          </p>

        </div>

      </section>


      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

          {/* ======================================
              RESULTS
          ====================================== */}

          <section>

            <div className="mb-5">

              <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
                Explore the ecosystem
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900">
                {category === "All"
                  ? "People and organizations"
                  : `${category}s`}
              </h2>

            </div>


            {filteredPeople.length > 0 ? (

              <div className="grid gap-4 sm:grid-cols-2">

                {filteredPeople.map((person) => (

                  <article
                    key={person.id}
                    className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* HEADER */}

                    <div className="flex items-start gap-4">

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-black text-white shadow-lg shadow-indigo-100">
                        {person.initials}
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-2">

                          <div className="min-w-0">

                            <h3 className="truncate text-sm font-black text-slate-900">
                              {person.name}
                            </h3>

                            <p className="mt-1 text-xs font-bold text-indigo-600">
                              {person.role}
                            </p>

                          </div>

                          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[9px] font-black text-slate-500">
                            {person.type}
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* LOCATION */}

                    <div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-400">
                      <span>📍</span>
                      {person.location}
                    </div>


                    {/* DESCRIPTION */}

                    <p className="mt-4 text-xs leading-5 text-slate-500">
                      {person.description}
                    </p>


                    {/* SKILLS */}

                    <div className="mt-5 flex flex-wrap gap-2">

                      {person.skills.map((skill) => (

                        <span
                          key={skill}
                          className="rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-bold text-indigo-700"
                        >
                          {skill}
                        </span>

                      ))}

                    </div>


                    {/* ACTION */}

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPerson(person)
                      }
                      className="mt-6 w-full rounded-xl bg-slate-100 px-4 py-3 text-xs font-black text-slate-700 transition group-hover:bg-indigo-600 group-hover:text-white"
                    >
                      View profile →
                    </button>

                  </article>

                ))}

              </div>

            ) : (

              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

                <div className="text-4xl">
                  🔎
                </div>

                <h3 className="mt-4 text-lg font-black text-slate-900">
                  Nothing found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try searching for another skill,
                  organization or student.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-black text-white"
                >
                  Clear filters
                </button>

              </div>

            )}

          </section>


          {/* ======================================
              SIDEBAR
          ====================================== */}

          <aside className="space-y-5">

            {/* JOIN CARD */}

            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-100">

              <p className="text-xs font-black uppercase tracking-widest text-indigo-200">
                Join SkillBridge
              </p>

              <h3 className="mt-3 text-xl font-black">
                Put your skills on the map.
              </h3>

              <p className="mt-3 text-xs leading-5 text-indigo-100">
                Create your profile and connect with
                students, colleges and organizations.
              </p>

              <button
                type="button"
                onClick={() =>
                  onNavigate("signup")
                }
                className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-xs font-black text-indigo-700 transition hover:bg-indigo-50"
              >
                Create profile →
              </button>

            </div>


            {/* DISCOVERY STATS */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
                SkillBridge network
              </p>

              <div className="mt-5 space-y-4">

                <Stat
                  value="10K+"
                  label="Student profiles"
                />

                <Stat
                  value="500+"
                  label="Organizations"
                />

                <Stat
                  value="100+"
                  label="Colleges"
                />

              </div>

            </div>


            {/* QUICK LINKS */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
                Explore
              </p>

              <div className="mt-4 space-y-2">

                <QuickLink
                  icon="💼"
                  label="Opportunities"
                  onClick={() =>
                    onNavigate(
                      "student-opportunities"
                    )
                  }
                />

                <QuickLink
                  icon="🎓"
                  label="Students"
                  onClick={() =>
                    setCategory("Student")
                  }
                />

                <QuickLink
                  icon="🏢"
                  label="Organizations"
                  onClick={() =>
                    setCategory("Organization")
                  }
                />

                <QuickLink
                  icon="🏫"
                  label="Colleges"
                  onClick={() =>
                    setCategory("College")
                  }
                />

              </div>

            </div>

          </aside>

        </div>

      </main>


      {/* ==========================================
          PROFILE MODAL
      ========================================== */}

      {selectedPerson && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 backdrop-blur-sm sm:items-center sm:p-4">

          <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-8">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-black text-white">
                  {selectedPerson.initials}
                </div>

                <div>

                  <h2 className="text-lg font-black text-slate-900">
                    {selectedPerson.name}
                  </h2>

                  <p className="mt-1 text-xs font-bold text-indigo-600">
                    {selectedPerson.role}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedPerson(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-lg font-black text-slate-500"
              >
                ×
              </button>

            </div>


            <div className="mt-6 rounded-2xl bg-slate-50 p-4">

              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Location
              </p>

              <p className="mt-1 text-sm font-black text-slate-800">
                📍 {selectedPerson.location}
              </p>

            </div>


            <div className="mt-6">

              <h3 className="text-sm font-black text-slate-900">
                About
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {selectedPerson.description}
              </p>

            </div>


            <div className="mt-6">

              <h3 className="text-sm font-black text-slate-900">
                Skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">

                {selectedPerson.skills.map(
                  (skill) => (

                    <span
                      key={skill}
                      className="rounded-full bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </div>


            <button
              type="button"
              onClick={() =>
                setSelectedPerson(null)
              }
              className="mt-7 w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-xs font-black text-white transition hover:bg-indigo-700"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


/* ==========================================
   SMALL COMPONENTS
========================================== */

function Stat({ value, label }) {
  return (
    <div className="flex items-center justify-between">

      <p className="text-xl font-black text-slate-900">
        {value}
      </p>

      <p className="text-xs font-bold text-slate-400">
        {label}
      </p>

    </div>
  );
}


function QuickLink({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-black text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}


export default Discover;