import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function MyJobs({ user, onNavigate }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadJobs = async () => {
      if (!user?.uid) {
        setJobs([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/jobs?uid=${encodeURIComponent(user.uid)}`
        );
        const responseBody = await response.json();

        if (!response.ok) {
          throw new Error(responseBody.error || "Unable to load your jobs.");
        }

        if (!Array.isArray(responseBody)) {
          throw new Error("The server returned an invalid jobs list.");
        }

        if (isActive) {
          setJobs(responseBody.map(mapJob));
        }
      } catch (requestError) {
        if (isActive) {
          setError(requestError.message || "Unable to load your jobs.");
          setJobs([]);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isActive = false;
    };
  }, [user]);

  const deleteJob = async (jobId) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "DELETE",
      });
      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody.error || "Unable to delete job.");
      }

      setJobs((previous) => previous.filter((job) => job.id !== jobId));
    } catch (requestError) {
      setError(requestError.message || "Unable to delete job.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

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

          <button
            type="button"
            onClick={() =>
              onNavigate(
                "organization-create-job"
              )
            }
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700"
          >
            + Create job
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* TITLE */}

        <section>

          <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
            Organization
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            My jobs
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Manage the jobs and internships published
            by your organization.
          </p>

        </section>


        {/* STATS */}

        <section className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">

          <Stat
            label="Total opportunities"
            value={jobs.length}
          />

          <Stat
            label="Internships"
            value={
              jobs.filter(
                (job) =>
                  job.type === "Internship"
              ).length
            }
          />

          <Stat
            label="Jobs"
            value={
              jobs.filter(
                (job) =>
                  job.type === "Job"
              ).length
            }
          />

        </section>


        {/* JOB LIST */}

        {isLoading ? (

          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-bold text-slate-500">Loading your opportunities...</p>
          </section>

        ) : error ? (

          <section className="mt-7 rounded-3xl border border-red-100 bg-red-50 p-10 text-center">
            <p className="text-sm font-bold text-red-600">{error}</p>
          </section>

        ) : jobs.length > 0 ? (

          <section className="mt-7 space-y-4">

            {jobs.map((job) => (

              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                  {/* JOB INFO */}

                  <div className="flex min-w-0 gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-black text-indigo-600">
                      {job.title
                        ?.charAt(0)
                        ?.toUpperCase() || "J"}
                    </div>

                    <div className="min-w-0">

                      <h2 className="text-base font-black text-slate-900 sm:text-lg">
                        {job.title}
                      </h2>

                      <p className="mt-1 text-sm font-semibold text-indigo-600">
                        {job.organization}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">

                        <Badge>
                          💼 {job.type}
                        </Badge>

                        <Badge>
                          ◉ {job.mode}
                        </Badge>

                        {job.location && (
                          <Badge>
                            📍 {job.location}
                          </Badge>
                        )}

                      </div>

                    </div>

                  </div>


                  {/* STATUS */}

                  <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">
                    ● Active
                  </span>

                </div>


                {/* DESCRIPTION */}

                <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-500">
                  {job.description}
                </p>


                {/* SKILLS */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {job.skills?.map(
                    (skill) => (

                      <span
                        key={skill}
                        className="rounded-full bg-indigo-50 px-3 py-1.5 text-[11px] font-bold text-indigo-700"
                      >
                        {skill}
                      </span>

                    )
                  )}

                </div>


                {/* FOOTER */}

                <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex flex-wrap gap-4 text-xs text-slate-400">

                    <span>
                      📩 {job.applications || 0} applications
                    </span>

                    {job.compensation && (
                      <span>
                        💰 {job.compensation}
                      </span>
                    )}

                    {job.deadline && (
                      <span>
                        📅 Deadline:{" "}
                        {job.deadline}
                      </span>
                    )}

                  </div>


                  <div className="flex gap-2">

                    <button
                      type="button"
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteJob(job.id)
                      }
                      className="rounded-xl border border-red-100 px-4 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </section>

        ) : (

          /* EMPTY STATE */

          <section className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm sm:p-16">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
              💼
            </div>

            <h2 className="mt-5 text-lg font-black text-slate-900">
              No opportunities yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Create your first job or internship to
              start discovering talented students.
            </p>

            <button
              type="button"
              onClick={() =>
                onNavigate(
                  "organization-create-job"
                )
              }
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700"
            >
              + Create your first job
            </button>

          </section>

        )}

      </main>

    </div>
  );
}


function mapJob(job) {
  return {
    ...job,
    id: job._id || job.id,
    type: job.type || job.opportunityType,
    mode: job.mode || job.workMode,
    skills: Array.isArray(job.skills)
      ? job.skills
      : Array.isArray(job.skillsRequired)
        ? job.skillsRequired
        : [],
    deadline: job.deadline || job.applicationDeadline,
  };
}


/* ==========================================
   STAT
========================================== */

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-xs font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-slate-900">
        {value}
      </p>

    </div>
  );
}


/* ==========================================
   BADGE
========================================== */

function Badge({ children }) {
  return (
    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-500">
      {children}
    </span>
  );
}


export default MyJobs;