import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function BrowseStudents({ onNavigate }) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_URL}/students`);

        if (!response.ok) {
          throw new Error("Failed to load students");
        }

        const data = await response.json();
        setStudents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("[students] Fetch failed", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const locations = useMemo(() => {
    const values = students
      .map((student) => student.location)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        student.name?.toLowerCase().includes(searchValue) ||
        student.course?.toLowerCase().includes(searchValue) ||
        student.college?.toLowerCase().includes(searchValue) ||
        student.location?.toLowerCase().includes(searchValue);

      const matchesLocation =
        location === "All" || student.location === location;

      return matchesSearch && matchesLocation;
    });
  }, [students, search, location]);

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
              onNavigate("organization")
            }
            className="text-sm font-bold text-slate-600 transition hover:text-indigo-600"
          >
            ← Dashboard
          </button>

          <span className="text-sm font-black text-slate-900">
            Talent discovery
          </span>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* ===================================
            HERO
        =================================== */}

        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-900 p-6 text-white shadow-xl sm:p-9">

          <p className="text-xs font-black uppercase tracking-widest text-indigo-300">
            Talent discovery
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Discover skilled students.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Search student profiles, explore their skills
            and find potential candidates for your
            opportunities.
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
              placeholder="Search by name, skill, college or education..."
              className="w-full rounded-xl border border-white/20 bg-white px-11 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-white/20"
            />

          </div>

        </section>


        {/* ===================================
            FILTERS
        =================================== */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Student directory
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {filteredStudents.length} students found
              </p>

            </div>


            <div className="sm:flex">
              <select
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 outline-none focus:border-indigo-500"
              >
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All locations" : item}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </section>


        {/* ===================================
            STUDENTS
        =================================== */}

        {loading ? (
          <section className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-sm font-bold text-slate-500">Loading students...</p>
          </section>
        ) : error ? (
          <section className="mt-6 rounded-3xl border border-dashed border-red-300 bg-red-50 p-12 text-center">
            <p className="text-sm font-bold text-red-600">Error: {error}</p>
          </section>
        ) : filteredStudents.length > 0 ? (

          <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredStudents.map(
              (student) => (

                <StudentCard
                  key={student.uid || student._id || student.email}
                  student={student}
                />

              )
            )}

          </section>

        ) : (

          <section className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              🔎
            </div>

            <h2 className="mt-5 text-lg font-black text-slate-900">
              No students found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or change the filters.
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

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-black text-white shadow-md">
            {student.name?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <div>

            <h2 className="text-base font-black text-slate-900">
              {student.name}
            </h2>

            <p className="mt-1 text-xs font-semibold text-indigo-600">
              {student.course || "Student"}
            </p>

          </div>

        </div>

      </div>

      {/* COLLEGE */}
      <div className="mt-5">
        <p className="text-xs font-bold text-slate-400">
          College
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          {student.college || "Not provided"}
        </p>
      </div>

      {/* LOCATION */}
      <p className="mt-3 text-xs font-semibold text-slate-500">
        📍 {student.location || "Location not provided"}
      </p>

      {/* GRADUATION YEAR */}
      <div className="mt-4">
        <p className="text-xs font-bold text-slate-400">
          Graduation Year
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          {student.graduationYear || "Not provided"}
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex gap-3 text-[11px] font-semibold text-slate-400">
          <span>
            {student.email || "No email"}
          </span>
        </div>

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