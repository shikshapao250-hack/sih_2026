
import { useEffect, useState } from "react";
import { watchAuthState } from "../../../services/authService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const emptyProject = {
  title: "",
  description: "",
  technologies: "",
  status: "Completed",
  github: "",
  demo: "",
};

function normalizeProject(project) {
  return {
    id: project._id || project.id,
    title: project.projectTitle || project.title || "",
    description: project.projectDescription || project.description || "",
    technologies: Array.isArray(project.technologies)
      ? project.technologies
      : String(project.technologies || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
    status: project.status || "Completed",
    github: project.githubLink || project.github || "",
    demo: project.demolink || project.demo || "",
  };
}

function Projects({ onNavigate }) {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = watchAuthState((user) => {
      setUid(user?.uid || "");
    });

    return () => unsubscribe?.();
  }, []);

  useEffect(() => {
    if (!uid) {
      setProjects([]);
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/projects?uid=${encodeURIComponent(uid)}`
        );

        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const data = await response.json();
        setProjects(Array.isArray(data) ? data.map(normalizeProject) : []);
      } catch (err) {
        console.error("[projects] Fetch failed", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [uid]);

  const openAddForm = () => {
    setForm(emptyProject);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      status: project.status,
      github: project.github,
      demo: project.demo,
    });

    setEditingId(project.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyProject);
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveProject = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError("Project title and description are required.");
      return;
    }

    if (!uid) {
      setError("Sign in before saving a project.");
      return;
    }

    const technologies = form.technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      uid,
      projectTitle: form.title.trim(),
      projectDescription: form.description.trim(),
      githubLink: form.github.trim(),
      demolink: form.demo.trim(),
      technologies,
      status: form.status,
    };

    try {
      setError("");
      const endpoint = editingId
        ? `${API_URL}/projects/${editingId}`
        : `${API_URL}/projects`;

      const response = await fetch(endpoint, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Unable to save project");
      }

      const saved = await response.json();
      const normalized = normalizeProject(saved);

      if (editingId) {
        setProjects((current) =>
          current.map((project) =>
            project.id === editingId ? normalized : project
          )
        );
      } else {
        setProjects((current) => [normalized, ...current]);
      }

      closeForm();
    } catch (err) {
      console.error("[projects] Save failed", err);
      setError(err.message);
    }
  };

  const deleteProject = async (id) => {
    try {
      setError("");
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects((current) =>
        current.filter((project) => project.id !== id)
      );
    } catch (err) {
      console.error("[projects] Delete failed", err);
      setError(err.message);
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
              onNavigate("student")
            }
            className="text-sm font-bold text-slate-600 transition hover:text-indigo-600"
          >
            ← Dashboard
          </button>

          <button
            type="button"
            onClick={openAddForm}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-indigo-700"
          >
            + Add project
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* HERO */}

        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-6 text-white shadow-xl sm:p-9">

          <p className="text-xs font-black uppercase tracking-widest text-indigo-300">
            Professional portfolio
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Show what you can build.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Projects give organizations real evidence of
            your technical skills, problem-solving ability
            and experience.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-lg font-black">
                {projects.length}
              </p>

              <p className="text-[10px] font-bold text-slate-300">
                Projects
              </p>
            </div>

            <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-lg font-black">
                {new Set(
                  projects.flatMap(
                    (project) =>
                      project.technologies
                  )
                ).size}
              </p>

              <p className="text-[10px] font-bold text-slate-300">
                Technologies
              </p>
            </div>

          </div>

        </section>


        {/* PROJECT GRID */}

        <section className="mt-6">

          <div className="mb-5">

            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
              My work
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Projects
            </h2>

          </div>


          {projects.length > 0 ? (

            <div className="grid gap-5 md:grid-cols-2">

              {projects.map((project) => (

                <article
                  key={project.id}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
                >

                  {/* TOP */}

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-black text-white shadow-md shadow-indigo-100">
                        {project.title
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate text-base font-black text-slate-900">
                          {project.title}
                        </h3>

                        <span
                          className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[9px] font-black ${
                            project.status ===
                            "Completed"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {project.status}
                        </span>

                      </div>

                    </div>


                    {/* MENU */}

                    <div className="flex gap-1">

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(project)
                        }
                        className="rounded-lg px-2 py-1 text-xs font-bold text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteProject(
                            project.id
                          )
                        }
                        className="rounded-lg px-2 py-1 text-xs font-bold text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      >
                        Delete
                      </button>

                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="mt-5 text-sm leading-6 text-slate-500">
                    {project.description}
                  </p>


                  {/* TECHNOLOGIES */}

                  <div className="mt-5 flex flex-wrap gap-2">

                    {project.technologies.map(
                      (technology) => (

                        <span
                          key={technology}
                          className="rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-bold text-indigo-700"
                        >
                          {technology}
                        </span>

                      )
                    )}

                  </div>


                  {/* LINKS */}

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4">

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-indigo-600 px-3 py-2 text-xs font-black text-white transition hover:bg-indigo-700"
                      >
                        Live demo ↗
                      </a>
                    )}

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                🚀
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-900">
                Your portfolio is empty
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Add your first project and start showing
                organizations what you can build.
              </p>

              <button
                type="button"
                onClick={openAddForm}
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white"
              >
                + Add your first project
              </button>

            </div>

          )}

        </section>


        {/* NEXT STEP */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Keep building
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-900">
                Complete your academic profile.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Add your education details next so
                organizations and colleges can understand
                your academic background.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate(
                  "student-education"
                )
              }
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
            >
              Add education →
            </button>

          </div>

        </section>

      </main>


      {/* ==========================================
          ADD / EDIT MODAL
      ========================================== */}

      {showForm && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">

          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-7">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Portfolio
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  {editingId
                    ? "Edit project"
                    : "Add project"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm font-black text-slate-500"
              >
                ×
              </button>

            </div>


            <div className="mt-6 space-y-4">

              <FormField label="Project name">
                <input
                  value={form.title}
                  onChange={(event) =>
                    updateForm(
                      "title",
                      event.target.value
                    )
                  }
                  placeholder="e.g. SkillShala"
                  className={inputClass}
                />
              </FormField>


              <FormField label="Description">
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateForm(
                      "description",
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="What did you build? What problem does it solve?"
                  className={`${inputClass} resize-none`}
                />
              </FormField>


              <FormField label="Technologies">

                <input
                  value={form.technologies}
                  onChange={(event) =>
                    updateForm(
                      "technologies",
                      event.target.value
                    )
                  }
                  placeholder="React, Python, MySQL"
                  className={inputClass}
                />

                <p className="mt-1 text-[10px] text-slate-400">
                  Separate technologies with commas.
                </p>

              </FormField>


              <FormField label="Status">

                <select
                  value={form.status}
                  onChange={(event) =>
                    updateForm(
                      "status",
                      event.target.value
                    )
                  }
                  className={inputClass}
                >
                  <option>Completed</option>
                  <option>In Progress</option>
                </select>

              </FormField>


              <FormField label="GitHub URL">

                <input
                  type="url"
                  value={form.github}
                  onChange={(event) =>
                    updateForm(
                      "github",
                      event.target.value
                    )
                  }
                  placeholder="https://github.com/..."
                  className={inputClass}
                />

              </FormField>


              <FormField label="Live demo URL">

                <input
                  type="url"
                  value={form.demo}
                  onChange={(event) =>
                    updateForm(
                      "demo",
                      event.target.value
                    )
                  }
                  placeholder="https://..."
                  className={inputClass}
                />

              </FormField>

            </div>


            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveProject}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
              >
                {editingId
                  ? "Save changes"
                  : "Add project"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* ==========================================
   FORM HELPERS
========================================== */

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50";

function FormField({
  label,
  children,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-black text-slate-700">
        {label}
      </span>

      {children}

    </label>
  );
}

export default Projects;