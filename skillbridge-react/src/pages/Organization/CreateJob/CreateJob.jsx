import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function CreateJob({ user, onNavigate }) {
  const [form, setForm] = useState({
    title: "",
    type: "Internship",
    mode: "Remote",
    location: "",
    description: "",
    skills: "",
    compensation: "",
    deadline: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.skills
    ) {
      setMessage(
        "Please complete all required fields."
      );
      return;
    }

    if (!user?.uid) {
      setMessage("Please sign in before publishing an opportunity.");
      return;
    }

    const skills = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    const job = {
      uid: user.uid,
      title: form.title.trim(),
      description: form.description.trim(),
      opportunityType: form.type,
      workMode: form.mode,
      type: form.type,
      mode: form.mode,
      location: form.location.trim(),
      skillsRequired: skills,
      skills,
      compensation: form.compensation.trim(),
      applicationDeadline: form.deadline,
      deadline: form.deadline,
      organization: user.name || "Organization",
    };

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      let responseBody;
      try {
        responseBody = await response.json();
      } catch {
        responseBody = {};
      }

      if (!response.ok) {
        throw new Error(responseBody.error || "Unable to publish opportunity.");
      }

      setMessage("Opportunity published successfully.");
      setForm({
        title: "",
        type: "Internship",
        mode: "Remote",
        location: "",
        description: "",
        skills: "",
        compensation: "",
        deadline: "",
      });
    } catch (error) {
      setMessage(error.message || "Unable to publish opportunity.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() =>
              onNavigate("organization")
            }
            className="text-sm font-bold text-slate-600 hover:text-indigo-600"
          >
            ← Dashboard
          </button>

          <span className="text-sm font-black text-slate-900">
            Create opportunity
          </span>

        </div>

      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-4xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* TITLE */}

        <section>

          <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
            Organization
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Create a job or internship
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Share an opportunity and connect with
            students who have the right skills.
          </p>

        </section>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          {/* BASIC DETAILS */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-lg font-black text-slate-900">
              Basic information
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Tell students what you're offering.
            </p>


            <div className="mt-6 grid gap-5">

              <Input
                label="Job title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer Intern"
                required
              />


              <div className="grid gap-5 sm:grid-cols-2">

                <Select
                  label="Opportunity type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  options={[
                    "Internship",
                    "Job",
                  ]}
                />

                <Select
                  label="Work mode"
                  name="mode"
                  value={form.mode}
                  onChange={handleChange}
                  options={[
                    "Remote",
                    "Hybrid",
                    "On-site",
                  ]}
                />

              </div>


              <Input
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. New Delhi"
              />

            </div>

          </section>


          {/* DESCRIPTION */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-lg font-black text-slate-900">
              Opportunity details
            </h2>

            <div className="mt-6 space-y-5">

              <div>

                <label className="text-xs font-black text-slate-700">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe the role, responsibilities and what the student will learn..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  required
                />

              </div>


              <Input
                label="Required skills"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="React, JavaScript, Git"
                required
              />

              <p className="-mt-3 text-[11px] text-slate-400">
                Separate skills using commas.
              </p>

            </div>

          </section>


          {/* COMPENSATION */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-lg font-black text-slate-900">
              Compensation & deadline
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              <Input
                label="Salary / stipend"
                name="compensation"
                value={form.compensation}
                onChange={handleChange}
                placeholder="e.g. ₹15,000 / month"
              />

              <Input
                label="Application deadline"
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
              />

            </div>

          </section>


          {/* MESSAGE */}

          {message && (

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700">
              {message}
            </div>

          )}


          {/* ACTIONS */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() =>
                onNavigate("organization")
              }
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              {isSubmitting ? "Publishing..." : "Publish opportunity →"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}


/* ==========================================
   INPUT
========================================== */

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div>

      <label className="text-xs font-black text-slate-700">
        {label}
        {required && " *"}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
      />

    </div>
  );
}


/* ==========================================
   SELECT
========================================== */

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="text-xs font-black text-slate-700">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
      >

        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}


export default CreateJob;