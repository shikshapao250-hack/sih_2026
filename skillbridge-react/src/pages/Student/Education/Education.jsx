import { useState } from "react";

const initialEducation = [
  {
    id: 1,
    institution: "SkillBridge University",
    degree: "B.Tech — Computer Science",
    year: "2024 - 2028",
    score: "8.4 CGPA",
    description:
      "Focused on software development, databases, data structures and modern web technologies.",
    current: true,
  },
  {
    id: 2,
    institution: "Delhi Public School",
    degree: "Class XII — Science",
    year: "2022 - 2024",
    score: "88%",
    description:
      "Studied Physics, Chemistry, Mathematics and Computer Science.",
    current: false,
  },
];

const emptyEducation = {
  institution: "",
  degree: "",
  year: "",
  score: "",
  description: "",
  current: false,
};

function Education({ onNavigate }) {
  const [education, setEducation] =
    useState(initialEducation);

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState(emptyEducation);

  const openAddForm = () => {
    setForm(emptyEducation);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setForm({
      institution: item.institution,
      degree: item.degree,
      year: item.year,
      score: item.score,
      description: item.description,
      current: item.current,
    });

    setEditingId(item.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyEducation);
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveEducation = () => {
    if (
      !form.institution.trim() ||
      !form.degree.trim()
    ) {
      return;
    }

    const data = {
      ...form,
      institution:
        form.institution.trim(),
      degree: form.degree.trim(),
      year: form.year.trim(),
      score: form.score.trim(),
      description:
        form.description.trim(),
    };

    if (editingId) {
      setEducation((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...data,
              }
            : item
        )
      );
    } else {
      setEducation((current) => [
        {
          id: Date.now(),
          ...data,
        },
        ...current,
      ]);
    }

    closeForm();
  };

  const deleteEducation = (id) => {
    setEducation((current) =>
      current.filter(
        (item) => item.id !== id
      )
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

          <button
            type="button"
            onClick={openAddForm}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-indigo-700"
          >
            + Add education
          </button>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* HERO */}

        <section className="rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-6 text-white shadow-xl sm:p-9">

          <p className="text-xs font-black uppercase tracking-widest text-indigo-200">
            Academic profile
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Your academic journey.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
            Keep your education information updated so
            colleges and organizations can understand your
            academic background.
          </p>

          <div className="mt-6 grid max-w-lg grid-cols-2 gap-3">

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

              <p className="text-2xl font-black">
                {education.length}
              </p>

              <p className="mt-1 text-[10px] font-bold text-indigo-200">
                Education records
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

              <p className="text-2xl font-black">
                {education.filter(
                  (item) => item.current
                ).length}
              </p>

              <p className="mt-1 text-[10px] font-bold text-indigo-200">
                Current
              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            TIMELINE
        ===================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="mb-7">

            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
              Education
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Academic history
            </h2>

          </div>


          {education.length > 0 ? (

            <div className="relative">

              {/* TIMELINE LINE */}

              <div className="absolute bottom-5 left-[19px] top-5 w-px bg-slate-200" />


              <div className="space-y-8">

                {education.map((item) => (

                  <article
                    key={item.id}
                    className="relative flex gap-4"
                  >

                    {/* TIMELINE DOT */}

                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-4 border-white bg-indigo-100 text-sm shadow-sm">
                      🎓
                    </div>


                    {/* CARD */}

                    <div className="min-w-0 flex-1 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="text-base font-black text-slate-900">
                              {item.institution}
                            </h3>

                            {item.current && (
                              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black text-emerald-600">
                                Current
                              </span>
                            )}

                          </div>

                          <p className="mt-1 text-sm font-bold text-indigo-600">
                            {item.degree}
                          </p>

                        </div>


                        <div className="flex items-center gap-2">

                          <span className="rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-500 shadow-sm">
                            {item.year}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              openEditForm(item)
                            }
                            className="rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteEducation(
                                item.id
                              )
                            }
                            className="rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-400 hover:bg-red-50 hover:text-red-500"
                          >
                            Delete
                          </button>

                        </div>

                      </div>


                      {/* SCORE */}

                      {item.score && (
                        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm">

                          <span className="text-xs">
                            📈
                          </span>

                          <span className="text-xs font-black text-slate-700">
                            {item.score}
                          </span>

                        </div>
                      )}


                      {/* DESCRIPTION */}

                      {item.description && (
                        <p className="mt-4 text-xs leading-6 text-slate-500">
                          {item.description}
                        </p>
                      )}

                    </div>

                  </article>

                ))}

              </div>

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                🎓
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-900">
                No education added
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add your school, college or university.
              </p>

              <button
                type="button"
                onClick={openAddForm}
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white"
              >
                + Add education
              </button>

            </div>

          )}

        </section>


        {/* =====================================
            PROFILE TIP
        ===================================== */}

        <section className="mt-6 rounded-3xl border border-indigo-100 bg-indigo-50 p-5 sm:p-7">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              💡
            </div>

            <div>

              <p className="text-sm font-black text-indigo-900">
                Profile tip
              </p>

              <p className="mt-1 text-xs leading-6 text-indigo-700">
                Keep your academic details accurate.
                Organizations may use your education,
                skills and projects together when evaluating
                your profile.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            NEXT STEP
        ===================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Almost there
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-900">
                Add your resume.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Upload a resume so organizations can get
                a more complete view of your experience.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate(
                  "student-resume"
                )
              }
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
            >
              Manage resume →
            </button>

          </div>

        </section>

      </main>


      {/* =====================================
          MODAL
      ===================================== */}

      {showForm && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">

          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-7">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Academic record
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  {editingId
                    ? "Edit education"
                    : "Add education"}
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

              <Field label="Institution">

                <input
                  value={form.institution}
                  onChange={(event) =>
                    updateForm(
                      "institution",
                      event.target.value
                    )
                  }
                  placeholder="College / University / School"
                  className={inputClass}
                />

              </Field>


              <Field label="Degree / qualification">

                <input
                  value={form.degree}
                  onChange={(event) =>
                    updateForm(
                      "degree",
                      event.target.value
                    )
                  }
                  placeholder="B.Tech — Computer Science"
                  className={inputClass}
                />

              </Field>


              <div className="grid gap-4 sm:grid-cols-2">

                <Field label="Year">

                  <input
                    value={form.year}
                    onChange={(event) =>
                      updateForm(
                        "year",
                        event.target.value
                      )
                    }
                    placeholder="2024 - 2028"
                    className={inputClass}
                  />

                </Field>


                <Field label="Score">

                  <input
                    value={form.score}
                    onChange={(event) =>
                      updateForm(
                        "score",
                        event.target.value
                      )
                    }
                    placeholder="8.4 CGPA / 88%"
                    className={inputClass}
                  />

                </Field>

              </div>


              <Field label="Description">

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateForm(
                      "description",
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Subjects, achievements, activities..."
                  className={`${inputClass} resize-none`}
                />

              </Field>


              <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">

                <input
                  type="checkbox"
                  checked={form.current}
                  onChange={(event) =>
                    updateForm(
                      "current",
                      event.target.checked
                    )
                  }
                  className="h-4 w-4 accent-indigo-600"
                />

                <span className="text-xs font-bold text-slate-700">
                  This is my current education
                </span>

              </label>

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
                onClick={saveEducation}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
              >
                {editingId
                  ? "Save changes"
                  : "Add education"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* ==========================================
   FORM COMPONENTS
========================================== */

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50";

function Field({
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

export default Education;