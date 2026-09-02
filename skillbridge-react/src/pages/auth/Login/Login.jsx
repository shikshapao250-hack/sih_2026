import { useState } from "react";

const roles = [
  {
    id: "student",
    icon: "🎓",
    name: "Student",
  },
  {
    id: "organization",
    icon: "🏢",
    name: "Organization",
  },
  {
    id: "college",
    icon: "🏫",
    name: "College",
  },
];

function Login({ onLogin, onNavigate }) {
  const [role, setRole] = useState(() => {
    return (
      sessionStorage.getItem(
        "skillbridge_selected_role"
      ) || "student"
    );
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);

    sessionStorage.setItem(
      "skillbridge_selected_role",
      selectedRole
    );

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    setLoading(true);

    /*
      TEMPORARY LOGIN

      Firebase authentication will replace
      this section later.
    */

    const savedUser = localStorage.getItem(
      "skillbridge_user"
    );

    let userData = null;

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        if (
          parsedUser.email?.toLowerCase() ===
            email.trim().toLowerCase() &&
          parsedUser.role === role
        ) {
          userData = parsedUser;
        }
      } catch {
        userData = null;
      }
    }

    /*
      For development, allow login even when
      a Firebase backend isn't connected yet.
    */

    if (!userData) {
      userData = {
        id: Date.now(),
        name:
          role === "student"
            ? "Student User"
            : role === "organization"
              ? "Organization User"
              : "College User",

        email: email.trim(),
        role,
      };
    }

    setTimeout(() => {
      setLoading(false);
      onLogin(userData);
    }, 600);
  };

  const selectedRole =
    roles.find((item) => item.id === role) ||
    roles[0];

  return (
    <section className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">

        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:block xl:p-14">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />

          <div className="relative">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl backdrop-blur">
              {selectedRole.icon}
            </div>

            <p className="mt-10 text-sm font-bold tracking-wide text-indigo-300">
              WELCOME BACK
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight xl:text-5xl">
              Your skills.
              <br />
              Your network.
              <br />
              Your future.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">
              Continue your SkillBridge journey and
              connect with the right people and
              opportunities.
            </p>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                  ✓
                </span>

                <span className="text-sm text-slate-300">
                  Build your professional identity
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                  ✓
                </span>

                <span className="text-sm text-slate-300">
                  Discover meaningful opportunities
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                  ✓
                </span>

                <span className="text-sm text-slate-300">
                  Connect with the right ecosystem
                </span>
              </div>

            </div>

          </div>
        </div>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14">

          {/* MOBILE BRAND */}

          <div className="flex items-center gap-3 lg:hidden">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
              {selectedRole.icon}
            </div>

            <div>
              <p className="text-xs font-black text-indigo-600">
                SKILLBRIDGE
              </p>

              <p className="text-xs text-slate-500">
                {selectedRole.name} login
              </p>
            </div>

          </div>


          {/* HEADER */}

          <div className="mt-5">

            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Log in to continue to your SkillBridge
              account.
            </p>

          </div>


          {/* ROLE SELECTOR */}

          <div className="mt-7">

            <p className="mb-3 text-sm font-bold text-slate-700">
              Continue as
            </p>

            <div className="grid grid-cols-3 gap-2">

              {roles.map((item) => {

                const active =
                  role === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      handleRoleChange(item.id)
                    }
                    className={`rounded-xl border px-2 py-3 text-center transition ${
                      active
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:bg-slate-50"
                    }`}
                  >

                    <div className="text-xl">
                      {item.icon}
                    </div>

                    <div className="mt-1 text-[11px] font-bold sm:text-xs">
                      {item.name}
                    </div>

                  </button>
                );

              })}

            </div>

          </div>


          {/* ERROR */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Email address
              </label>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />

            </div>


            {/* PASSWORD */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="login-password"
                  className="text-sm font-bold text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>

              </div>

              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Logging in..."
                : `Log in as ${selectedRole.name}`}
            </button>

          </form>


          {/* SIGNUP */}

          <div className="mt-7 text-center">

            <span className="text-sm text-slate-500">
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={() =>
                onNavigate("role-selection")
              }
              className="ml-1 text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              Create one
            </button>

          </div>


          {/* HOME */}

          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="mt-5 block w-full text-center text-xs font-semibold text-slate-400 transition hover:text-indigo-600"
          >
            ← Back to SkillBridge
          </button>

        </div>

      </div>

    </section>
  );
}

export default Login;