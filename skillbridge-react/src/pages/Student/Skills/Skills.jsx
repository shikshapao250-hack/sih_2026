import { useMemo, useState, useEffect } from "react";
import { watchAuthState } from "../../../services/authService";

const skillSuggestions = [
  "Node.js",
  "MongoDB",
  "Java",
  "C++",
  "TypeScript",
  "Machine Learning",
  "Data Analysis",
  "Figma",
  "UI/UX",
  "Firebase",
  "AWS",
  "Docker",
];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Skills({ onNavigate }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] =
    useState("");

  const [uid, setUid] =
    useState("");

  const [skillTitle, setSkillTitle] =
    useState("");

  const [skillDescription, setSkillDescription] =
    useState("");

  const [skillCategory, setSkillCategory] =
    useState("Development");

  const [skillLevel, setSkillLevel] =
    useState("Intermediate");

  useEffect(() => {
    const unsubscribe = watchAuthState((user) => {
      setUid(user?.uid || "");
    });

    return () => unsubscribe?.();
  }, []);

  // Fetch skills from backend when uid is set
  useEffect(() => {
    if (!uid) {
      setSkills([]);
      return;
    }

    const fetchSkills = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${API_URL}/skills?uid=${encodeURIComponent(uid)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("[skills] Fetch failed", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [uid]);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) =>
      skill.skillTitle
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [skills, search]);

  const addSkill = async () => {
    const title = skillTitle.trim();

    if (!title) {
      setError("Please enter a skill title.");
      return;
    }

    if (!uid) {
      setError("Please sign in before adding skills.");
      return;
    }

    const alreadyExists = skills.some(
      (skill) =>
        skill.skillTitle.toLowerCase() ===
        title.toLowerCase()
    );

    if (alreadyExists) {
      setSkillTitle("");
      setError("This skill is already in your profile.");
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `${API_URL}/skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            skillTitle: title,
            skillDescription,
            skillCategory,
            skillLevel,
          }),
        }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to add skill");
      }

      const newSkill = await response.json();
      setSkills((current) => [newSkill, ...current]);
      setSkillTitle("");
      setSkillDescription("");
    } catch (err) {
      console.error("[skills] Add failed", err);
      setError(err.message);
    }
  };

  const addSuggestion = async (name) => {
    const exists = skills.some(
      (skill) =>
        skill.skillTitle.toLowerCase() ===
        name.toLowerCase()
    );

    if (exists) return;

    if (!uid) {
      setError("Please sign in before adding skills.");
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `${API_URL}/skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            skillTitle: name,
            skillDescription: "",
            skillCategory: "Development",
            skillLevel: "Beginner",
          }),
        }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to add skill");
      }

      const newSkill = await response.json();
      setSkills((current) => [newSkill, ...current]);
    } catch (err) {
      console.error("[skills] Add suggestion failed", err);
      setError(err.message);
    }
  };

  const removeSkill = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/skills/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete skill");
      }

      setSkills((current) =>
        current.filter(
          (skill) => skill._id !== id
        )
      );
    } catch (err) {
      console.error("[skills] Delete failed", err);
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

          <span className="text-sm font-black text-slate-900">
            My Skills
          </span>

        </div>

      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* HERO */}

        <section className="rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-6 text-white shadow-xl sm:p-9">

          <p className="text-xs font-black uppercase tracking-widest text-indigo-200">
            Professional profile
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Build your skill profile.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
            Add the skills you know and keep your
            profile updated. SkillShala can use this
            information to discover relevant opportunities.
          </p>

        </section>


        {/* ADD SKILL */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div>

            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
              Add a skill
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              What can you do?
            </h2>

          </div>


          <div className="mt-5 space-y-4">

            <div>
              <label className="text-xs font-bold text-slate-600">Skill Title</label>
              <input
                value={skillTitle}
                onChange={(event) =>
                  setSkillTitle(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addSkill();
                  }
                }}
                placeholder="e.g. Machine Learning"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600">Skill Description</label>
              <textarea
                value={skillDescription}
                onChange={(event) =>
                  setSkillDescription(
                    event.target.value
                  )
                }
                placeholder="Describe your skill and experience with it..."
                rows="3"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">

              <div>
                <label className="text-xs font-bold text-slate-600">Category</label>
                <select
                  value={skillCategory}
                  onChange={(event) =>
                    setSkillCategory(
                      event.target.value
                    )
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-bold text-slate-600 outline-none focus:border-indigo-500"
                >
                  <option>
                    Development
                  </option>
                  <option>
                    Programming
                  </option>
                  <option>
                    Database
                  </option>
                  <option>
                    Design
                  </option>
                  <option>
                    Data
                  </option>
                  <option>
                    Tools
                  </option>
                  <option>
                    Business
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">Level</label>
                <select
                  value={skillLevel}
                  onChange={(event) =>
                    setSkillLevel(
                      event.target.value
                    )
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-bold text-slate-600 outline-none focus:border-indigo-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addSkill}
                  className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
                >
                  + Add Skill
                </button>
              </div>

            </div>

          </div>

        </section>


        {/* CONTENT GRID */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">


          {/* MY SKILLS */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Your skills
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  {skills.length} skills added
                </h2>

              </div>

              <div className="relative">

                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs">
                  🔎
                </span>

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-3 text-xs outline-none focus:border-indigo-500 sm:w-40"
                />

              </div>

            </div>


            {/* SKILLS */}

            <div className="mt-6 space-y-3">

              {loading ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                  <p className="text-sm font-bold text-slate-500">
                    Loading skills...
                  </p>
                </div>
              ) : error ? (
                <div className="rounded-2xl border border-dashed border-red-200 bg-red-50 p-8 text-center">
                  <p className="text-sm font-bold text-red-500">
                    Error: {error}
                  </p>
                </div>
              ) : filteredSkills.length > 0 ? (

                filteredSkills.map(
                  (skill) => (

                    <div
                      key={skill._id}
                      className="group flex items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40"
                    >

                      <div className="flex min-w-0 flex-1 flex-col gap-2">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-indigo-600 shadow-sm">
                            {skill.skillTitle
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-black text-slate-800">
                              {skill.skillTitle}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">

                              <span className="text-[10px] font-bold text-slate-400">
                                {skill.skillCategory}
                              </span>

                              <span className="text-[10px] font-bold text-indigo-500">
                                • {skill.skillLevel}
                              </span>

                              {skill.uid && (
                                <span className="text-[10px] font-bold text-slate-300">
                                  • {skill.uid}
                                </span>
                              )}

                            </div>

                            {skill.skillDescription && (
                              <p className="mt-2 text-xs leading-4 text-slate-600">
                                {skill.skillDescription}
                              </p>
                            )}

                          </div>

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeSkill(
                            skill._id
                          )
                        }
                        className="rounded-lg px-2 py-1 text-xs font-black text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                        aria-label={`Remove ${skill.skillTitle}`}
                      >
                        ×
                      </button>

                    </div>

                  )
                )

              ) : (

                <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">

                  <p className="text-sm font-bold text-slate-500">
                    No matching skills.
                  </p>

                </div>

              )}

            </div>

          </section>


          {/* SUGGESTIONS */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
              Skill suggestions
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Add more skills
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              These skills are commonly useful for
              students building technology careers.
            </p>


            <div className="mt-5 flex flex-wrap gap-2">

              {skillSuggestions.map(
                (skill) => {

                  const exists =
                    skills.some(
                      (item) =>
                        item.skillTitle.toLowerCase() ===
                        skill.toLowerCase()
                    );

                  return (
                    <button
                      key={skill}
                      type="button"
                      disabled={exists}
                      onClick={() =>
                        addSuggestion(
                          skill
                        )
                      }
                      className={`rounded-full border px-3 py-2 text-[10px] font-bold transition ${
                        exists
                          ? "cursor-default border-slate-100 bg-slate-50 text-slate-300"
                          : "border-indigo-100 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      {exists
                        ? "✓ "
                        : "+ "}
                      {skill}
                    </button>
                  );
                }
              )}

            </div>


            {/* PROFILE SCORE */}

            <div className="mt-7 rounded-2xl bg-slate-50 p-4">

              <div className="flex items-center justify-between">

                <p className="text-xs font-black text-slate-700">
                  Skill profile strength
                </p>

                <p className="text-sm font-black text-indigo-600">
                  {Math.min(
                    skills.length * 10,
                    100
                  )}%
                </p>

              </div>

              <div className="mt-3 h-2 rounded-full bg-slate-200">

                <div
                  className="h-2 rounded-full bg-indigo-600 transition-all"
                  style={{
                    width: `${Math.min(
                      skills.length * 10,
                      100
                    )}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-[10px] leading-5 text-slate-400">
                Add relevant skills and keep their
                proficiency level accurate.
              </p>

            </div>

          </section>

        </div>


        {/* NEXT STEP */}

        <section className="mt-6 rounded-3xl bg-white border border-slate-200 p-5 shadow-sm sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Build your profile
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-900">
                Skills are just the beginning.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Add projects next so organizations can
                see how you've applied your skills.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate(
                  "student-projects"
                )
              }
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
            >
              Add projects →
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Skills;