import { useState } from "react";

function Navbar({
  onHome,
  onLogin,
  onSignUp,
  onDiscover,
  onOpportunities,
  onAbout,
  onNavigate,
  user,
  onLogout,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (callback) => {
    closeMobileMenu();

    if (callback) {
      callback();
    }
  };

  const goToDashboard = () => {
    if (!user) return;

    if (user.role === "student") {
      onNavigate("student");
    } else if (user.role === "organization") {
      onNavigate("organization");
    } else if (user.role === "college") {
      onNavigate("college");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <button
          type="button"
          onClick={() => handleNavigation(onHome)}
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 text-sm font-black text-white shadow-lg shadow-indigo-200 transition duration-300 group-hover:scale-105">
            S
          </div>

          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Skill<span className="text-indigo-600">Shala</span>
          </span>
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-1 lg:flex">
          <button
            type="button"
            onClick={onHome}
            className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            Home
          </button>

          <button
            type="button"
            onClick={onDiscover}
            className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            Discover
          </button>

          <button
            type="button"
            onClick={onOpportunities}
            className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            Jobs & Internships
          </button>

          <button
            type="button"
            onClick={onAbout}
            className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            About
          </button>
        </nav>

        {/* DESKTOP RIGHT SIDE */}
        <div className="hidden items-center gap-2 sm:flex">

          {/* PLATFORM STATUS */}
          <div className="mr-2 hidden items-center gap-2 text-xs font-semibold text-slate-500 xl:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Platform live
          </div>

          {user ? (
            <>
              {/* PROFILE */}
              <button
                type="button"
                onClick={goToDashboard}
                className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 md:flex"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-black text-indigo-600">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </span>

                <span className="max-w-28 truncate">
                  {user.name || "Profile"}
                </span>
              </button>

              {/* LOGOUT */}
              <button
                type="button"
                onClick={onLogout}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <button
                type="button"
                onClick={onLogin}
                className="rounded-xl px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Log in
              </button>

              {/* SIGN UP */}
              <button
                type="button"
                onClick={onSignUp}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-indigo-300"
              >
                Get started
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 sm:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 sm:hidden ${
          mobileMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">

          <button
            type="button"
            onClick={() => handleNavigation(onHome)}
            className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleNavigation(onDiscover)}
            className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            Discover
          </button>

          <button
            type="button"
            onClick={() => handleNavigation(onOpportunities)}
            className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            Jobs & Internships
          </button>

          <button
            type="button"
            onClick={() => handleNavigation(onAbout)}
            className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            About
          </button>

          <div className="my-3 border-t border-slate-100" />

          {user ? (
            <>
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  goToDashboard();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-black text-indigo-600">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </span>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {user.name || "Profile"}
                  </p>

                  <p className="text-xs capitalize text-slate-500">
                    {user.role}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  onLogout();
                }}
                className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleNavigation(onLogin)}
                className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Log in
              </button>

              <button
                type="button"
                onClick={() => handleNavigation(onSignUp)}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Get started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;