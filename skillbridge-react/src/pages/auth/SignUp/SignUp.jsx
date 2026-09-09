import { useState } from "react";
import { registerAndSyncUser } from "../../../services/authService";

const roleConfig = {
  student: {
    title: "Create your student profile",
    subtitle:
      "Start building your professional identity and discover opportunities.",
    icon: "🎓",
    roleName: "Student",
  },
};

function SignUp({ onLogin, onNavigate }) {

  const [role] = useState(() => {
    return (
      sessionStorage.getItem(
        "skillbridge_selected_role"
      ) || "student"
    );
  });

  const config =
    roleConfig[role] || roleConfig.student;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    collegeName: "",
    location: "",
    course: "",
    graduationYear: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {

    const { name, value, type, checked } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setError("");
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    // Basic validation
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password
    ) {
      setError(
        "Please complete all required fields."
      );

      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    if (!form.agree) {
      setError(
        "Please accept the terms to continue."
      );

      return;
    }

    setLoading(true);

    try {
      const userData = await registerAndSyncUser(
        form.email,
        form.password,
        form.name,
        role,
        {
          course: form.course,
          graduationYear: form.graduationYear,
          college: form.collegeName,
          location: form.location,
        }
      );
      setLoading(false);
      onLogin(userData);
    } catch (submitError) {
      setLoading(false);
      setError(submitError.message || "Unable to create your account.");
    }
  };


  return (
    <section className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">

        {/* =================================
            LEFT PANEL
        ================================= */}

        <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:block xl:p-14">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />

          <div className="relative">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl backdrop-blur">
              {config.icon}
            </div>

            <p className="mt-10 text-sm font-bold text-indigo-300">
              WELCOME TO SKILLBRIDGE
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight xl:text-5xl">
              Build connections.
              <br />
              Discover opportunities.
              <br />
              Grow together.
            </h2>

            <p className="mt-6 max-w-md leading-7 text-slate-300">
              SkillBridge brings students, organizations
              and colleges together in one professional
              ecosystem.
            </p>


            {/* BENEFITS */}

            <div className="mt-10 space-y-5">

              {[
                "Professional profile",
                "Skills and project showcase",
                "Relevant opportunities",
                "Industry connections",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10 text-sm text-emerald-300">
                    ✓
                  </span>

                  <span className="text-sm font-medium text-slate-300">
                    {item}
                  </span>
                </div>

              ))}

            </div>

          </div>
        </div>


        {/* =================================
            FORM
        ================================= */}

        <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14">

          {/* HEADER */}

          <div className="mb-8">

            <div className="flex items-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                {config.icon}
              </div>

              <div>
                <p className="text-xs font-bold text-indigo-600">
                  SKILLBRIDGE
                </p>

                <p className="text-xs font-medium text-slate-500">
                  {config.roleName} account
                </p>
              </div>

            </div>

            <h1 className="mt-5 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              {config.title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {config.subtitle}
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />
            </div>


            {/* STUDENT */}

            {role === "student" && (
              <>
                <div className="grid gap-5 sm:grid-cols-3">

                  <div>
                    <label
                      htmlFor="course"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Course
                    </label>

                    <input
                      id="course"
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      placeholder="e.g. B.Tech CSE"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="collegeName"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      College
                    </label>

                    <input
                      id="collegeName"
                      name="collegeName"
                      value={form.collegeName}
                      onChange={handleChange}
                      placeholder="Your college name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="graduationYear"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Graduation year
                    </label>

                    <input
                      id="graduationYear"
                      name="graduationYear"
                      type="number"
                      value={form.graduationYear}
                      onChange={handleChange}
                      placeholder="2027"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>

                </div>
              </>
            )}



            {/* LOCATION */}

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="City, State"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />
            </div>


            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />
            </div>


            {/* PASSWORD */}

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                />
              </div>


              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                />
              </div>

            </div>


            {/* TERMS */}

            <label className="flex cursor-pointer items-start gap-3">

              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              <span className="text-xs leading-5 text-slate-500">
                I agree to SkillBridge's terms and understand
                that my profile information may be visible to
                relevant users on the platform.
              </span>

            </label>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating account..."
                : `Create ${config.roleName} account`
              }
            </button>

          </form>


          {/* LOGIN */}

          <div className="mt-7 text-center">

            <span className="text-sm text-slate-500">
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() => onNavigate("login")}
              className="ml-1 text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              Log in
            </button>

          </div>


          {/* CHANGE ROLE */}

          <button
            type="button"
            onClick={() =>
              onNavigate("role-selection")
            }
            className="mt-4 block w-full text-center text-xs font-semibold text-slate-400 transition hover:text-indigo-600"
          >
            ← Choose a different account type
          </button>

        </div>

      </div>

    </section>
  );
}

export default SignUp;