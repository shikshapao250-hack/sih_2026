import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Opportunities({ onNavigate }) {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [mode, setMode] = useState("All");
  const [saved, setSaved] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_URL}/jobs`);

        if (!response.ok) {
          throw new Error("Failed to load opportunities");
        }

        const data = await response.json();
        setOpportunities(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("[jobs] Fetch failed", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const filteredOpportunities = useMemo(() => {
    const query = search.toLowerCase().trim();

    return opportunities.filter((item) => {
      const skills = Array.isArray(item.skillsRequired)
        ? item.skillsRequired
        : Array.isArray(item.skills)
          ? item.skills
          : [];

      const matchesSearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.organization?.toLowerCase().includes(query) ||
        skills.some((skill) => String(skill).toLowerCase().includes(query));

      const matchesType =
        type === "All" || item.opportunityType === type || item.type === type;

      const matchesMode =
        mode === "All" || item.workMode === mode || item.mode === mode;

      return matchesSearch && matchesType && matchesMode;
    });
  }, [opportunities, search, type, mode]);

  const toggleSaved = (id) => {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() =>
              onNavigate("student")
            }
            className="text-sm font-bold text-slate-600 transition hover:text-indigo-600"
          >
            ← Dashboard
          </button>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() =>
                onNavigate("student-profile")
              }
              className="hidden rounded-xl px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 sm:block"
            >
              My profile
            </button>

            <span className="text-sm font-black text-slate-900">
              Opportunities
            </span>

          </div>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* HERO */}

        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-6 text-white shadow-xl sm:p-9">

          <div className="max-w-3xl">

            <p className="text-xs font-black uppercase tracking-widest text-indigo-300">
              Career discovery
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Find opportunities that fit you.
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Explore jobs and internships matched with
              your skills, education and projects.
            </p>

          </div>


          {/* SEARCH */}

          <div className="mt-7 flex flex-col gap-3 lg:flex-row">

            <div className="relative flex-1">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔎
              </span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search jobs, skills or organizations..."
                className="w-full rounded-2xl border border-white/10 bg-white px-11 py-4 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-indigo-300"
              />

            </div>

            <button
              type="button"
              className="rounded-2xl bg-indigo-500 px-6 py-4 text-sm font-black text-white transition hover:bg-indigo-400"
            >
              Search opportunities
            </button>

          </div>

        </section>


        {/* =====================================
            FILTERS
        ===================================== */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-wrap gap-2">

              {["All", "Internship", "Job"].map(
                (option) => (

                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setType(option)
                    }
                    className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${
                      type === option
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    {option}
                  </button>

                )
              )}

            </div>


            <div className="flex items-center gap-2">

              <span className="text-xs font-bold text-slate-400">
                Work mode
              </span>

              <select
                value={mode}
                onChange={(event) =>
                  setMode(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 outline-none focus:border-indigo-400"
              >
                <option>All</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>

            </div>

          </div>

        </section>


        {/* =====================================
            CONTENT GRID
        ===================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">

          {/* OPPORTUNITIES */}

          <section>

            <div className="mb-5 flex items-end justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Recommended for you
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  {filteredOpportunities.length} opportunities
                </h2>

              </div>

              <button
                type="button"
                className="hidden text-xs font-bold text-slate-400 hover:text-indigo-600 sm:block"
              >
                Sort: Best match
              </button>

            </div>


            <div className="space-y-4">

              {loading ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                  <p className="text-sm font-bold text-slate-500">Loading opportunities...</p>
                </div>
              ) : error ? (
                <div className="rounded-3xl border border-dashed border-red-300 bg-red-50 p-12 text-center">
                  <p className="text-sm font-bold text-red-600">Error: {error}</p>
                </div>
              ) : filteredOpportunities.map((opportunity) => {
                const skills = Array.isArray(opportunity.skillsRequired)
                  ? opportunity.skillsRequired
                  : Array.isArray(opportunity.skills)
                    ? opportunity.skills
                    : [];

                const typeValue = opportunity.opportunityType || opportunity.type || "Opportunity";
                const modeValue = opportunity.workMode || opportunity.mode || "Remote";
                const logo = (opportunity.organization || opportunity.title || "S")
                  .split(/\s+/)
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                return (
                  <article
                    key={opportunity._id || opportunity.id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-6"
                  >

                    {/* TOP */}

                    <div className="flex gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-black text-white">
                        {logo}
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <h3 className="text-base font-black text-slate-900">
                              {opportunity.title}
                            </h3>

                            <p className="mt-1 text-xs font-bold text-slate-500">
                              {opportunity.organization}
                            </p>

                          </div>

                          <button
                            type="button"
                            onClick={() => toggleSaved(opportunity._id || opportunity.id)}
                            className={`shrink-0 rounded-xl p-2 text-lg transition ${
                              saved.includes(opportunity._id || opportunity.id)
                                ? "bg-indigo-50 text-indigo-600"
                                : "bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                            }`}
                            aria-label="Save opportunity"
                          >
                            {saved.includes(opportunity._id || opportunity.id) ? "★" : "☆"}
                          </button>

                        </div>

                        {/* META */}

                        <div className="mt-3 flex flex-wrap gap-2">

                          <Meta text={typeValue} />
                          <Meta text={modeValue} />
                          <Meta text={opportunity.location} />
                          <Meta text={opportunity.experience || opportunity.type || "Experience"} />

                        </div>

                      </div>

                    </div>

                    {/* MATCH */}

                    <div className="mt-5 rounded-2xl bg-indigo-50 p-4">

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-[10px] font-black uppercase tracking-wider text-indigo-500">
                            SkillShala match
                          </p>

                          <p className="mt-1 text-xs font-bold text-indigo-900">
                            Strong match for your profile
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="text-2xl font-black text-indigo-600">
                            {Math.min(96, Math.max(72, skills.length * 23))}%
                          </p>

                        </div>

                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">

                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{
                            width: `${Math.min(96, Math.max(72, skills.length * 23))}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* DESCRIPTION */}

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      {opportunity.description}
                    </p>

                    {/* SKILLS */}

                    <div className="mt-4 flex flex-wrap gap-2">

                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}

                    </div>

                    {/* FOOTER */}

                    <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <p className="text-xs font-black text-slate-800">
                          {opportunity.compensation || opportunity.stipend || "Compensation not provided"}
                        </p>

                        <p className="mt-1 text-[10px] font-bold text-slate-400">
                          Posted {new Date(opportunity.createdAt).toLocaleDateString() || "Recently"}
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedOpportunity(opportunity)}
                        className="rounded-xl bg-indigo-600 px-5 py-3 text-xs font-black text-white transition hover:bg-indigo-700"
                      >
                        View opportunity →
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>


            {filteredOpportunities.length ===
              0 && (

              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

                <div className="text-3xl">
                  🔎
                </div>

                <h3 className="mt-4 text-lg font-black text-slate-900">
                  No opportunities found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try another keyword or change your
                  filters.
                </p>

              </div>

            )}

          </section>


          {/* SIDEBAR */}

          <aside className="space-y-5">

            {/* PROFILE MATCH */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Profile strength
              </p>

              <div className="mt-4 flex items-end justify-between">

                <div>

                  <p className="text-3xl font-black text-slate-900">
                    82%
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Good progress
                  </p>

                </div>

                <span className="text-2xl">
                  📈
                </span>

              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{
                    width: "82%",
                  }}
                />

              </div>

              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    "student-profile"
                  )
                }
                className="mt-4 w-full rounded-xl bg-slate-100 px-4 py-3 text-xs font-black text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                Improve profile
              </button>

            </div>


            {/* SAVED */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Saved
                </p>

                <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-black text-indigo-600">
                  {saved.length}
                </span>

              </div>

              <p className="mt-3 text-sm font-bold text-slate-700">
                Keep interesting opportunities here.
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Save jobs and internships to review them
                later.
              </p>

            </div>


            {/* TIP */}

            <div className="rounded-3xl bg-indigo-600 p-5 text-white shadow-lg shadow-indigo-100">

              <p className="text-xs font-black uppercase tracking-wider text-indigo-200">
                Career tip
              </p>

              <p className="mt-3 text-sm font-bold leading-6">
                A complete profile helps SkillShala find
                better opportunities for you.
              </p>

              <button
                type="button"
                onClick={() =>
                  onNavigate("student-skills")
                }
                className="mt-4 text-xs font-black text-white underline underline-offset-4"
              >
                Review your skills →
              </button>

            </div>

          </aside>

        </div>

      </main>


      {/* =====================================
          OPPORTUNITY MODAL
      ===================================== */}

      {selectedOpportunity && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 backdrop-blur-sm sm:items-center sm:p-4">

          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-8">

            <div className="flex items-start justify-between gap-4">

              <div className="flex gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-black text-white">
                  {(selectedOpportunity.organization || selectedOpportunity.title || "S")
                    .split(/\s+/)
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div>

                  <h2 className="text-xl font-black text-slate-900">
                    {selectedOpportunity.title}
                  </h2>

                  <p className="mt-1 text-sm font-bold text-indigo-600">
                    {selectedOpportunity.organization}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-black text-slate-500"
              >
                ×
              </button>

            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              <Info label="Type" value={selectedOpportunity.opportunityType || selectedOpportunity.type || "Opportunity"} />
              <Info label="Work mode" value={selectedOpportunity.workMode || selectedOpportunity.mode || "Remote"} />
              <Info label="Location" value={selectedOpportunity.location} />
              <Info label="Experience" value={selectedOpportunity.experience || "Not specified"} />

            </div>

            <div className="mt-6 rounded-2xl bg-indigo-50 p-5">

              <p className="text-xs font-black uppercase tracking-wider text-indigo-500">
                Match score
              </p>

              <p className="mt-2 text-3xl font-black text-indigo-600">
                {Math.min(96, Math.max(72, (selectedOpportunity.skillsRequired?.length || selectedOpportunity.skills?.length || 1) * 23))}%
              </p>

              <p className="mt-1 text-xs text-indigo-700">
                Based on your current profile and skills.
              </p>

            </div>

            <div className="mt-6">

              <h3 className="text-sm font-black text-slate-900">
                About the opportunity
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {selectedOpportunity.description}
              </p>

            </div>

            <div className="mt-6">

              <h3 className="text-sm font-black text-slate-900">
                Skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">

                {(Array.isArray(selectedOpportunity.skillsRequired)
                  ? selectedOpportunity.skillsRequired
                  : Array.isArray(selectedOpportunity.skills)
                    ? selectedOpportunity.skills
                    : []).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => toggleSaved(selectedOpportunity._id || selectedOpportunity.id)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-black text-slate-600"
              >
                {saved.includes(selectedOpportunity._id || selectedOpportunity.id) ? "★ Saved" : "☆ Save opportunity"}
              </button>

              <button
                type="button"
                className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-black text-white transition hover:bg-indigo-700"
              >
                Apply / Continue →
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* ==========================================
   SMALL COMPONENTS
========================================== */

function Meta({ text }) {
  return (
    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold text-slate-500">
      {text}
    </span>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">

      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-black text-slate-800">
        {value}
      </p>

    </div>
  );
}

export default Opportunities;