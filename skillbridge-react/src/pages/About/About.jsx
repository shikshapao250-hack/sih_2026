function About({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

          <div className="max-w-3xl">

            <span className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-indigo-300">
              About SkillBridge
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Connecting skills with
              <span className="text-indigo-400">
                {" "}opportunity.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              SkillBridge is a career ecosystem designed to
              connect students, organizations and colleges
              through skills, projects, education and
              meaningful opportunities.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => onNavigate("signup")}
                className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-indigo-500"
              >
                Get started →
              </button>

              <button
                type="button"
                onClick={() => onNavigate("discover")}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/10"
              >
                Explore SkillBridge
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          PLATFORM PURPOSE
      ========================================== */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">

          <div>

            <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
              Why SkillBridge?
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Skills should open doors.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
              Students often have skills and projects but
              struggle to find the right opportunities.
              Organizations need skilled talent, while
              colleges need better visibility into the skills
              their students are developing.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              SkillBridge brings these three sides together
              in one platform.
            </p>

          </div>


          <div className="grid gap-4 sm:grid-cols-3">

            <InfoCard
              icon="🎓"
              title="Students"
              text="Build profiles, showcase skills and discover opportunities."
            />

            <InfoCard
              icon="🏢"
              title="Organizations"
              text="Create jobs and discover students based on skills."
            />

            <InfoCard
              icon="🏫"
              title="Colleges"
              text="Understand student skills and identify skill gaps."
            />

          </div>

        </div>

      </section>


      {/* ==========================================
          HOW IT WORKS
      ========================================== */}

      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="max-w-2xl">

            <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900">
              One ecosystem. Three connected sides.
            </h2>

          </div>


          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <StepCard
              number="01"
              title="Build your profile"
              text="Students add education, skills, projects and an optional resume."
            />

            <StepCard
              number="02"
              title="Discover the right people"
              text="Organizations find students and students discover relevant opportunities."
            />

            <StepCard
              number="03"
              title="Bridge the skill gap"
              text="Colleges can analyze skills and identify areas where students need development."
            />

          </div>

        </div>

      </section>


      {/* ==========================================
          VALUES
      ========================================== */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <ValueCard
            icon="🎯"
            title="Skills first"
            text="Focus on what people can actually build and contribute."
          />

          <ValueCard
            icon="🤝"
            title="Connected"
            text="Bring students, organizations and colleges together."
          />

          <ValueCard
            icon="📊"
            title="Data driven"
            text="Use meaningful skill information to make better decisions."
          />

          <ValueCard
            icon="🚀"
            title="Opportunity"
            text="Turn skills and potential into real career opportunities."
          />

        </div>

      </section>


      {/* ==========================================
          CTA
      ========================================== */}

      <section className="mx-4 mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 sm:mx-6 lg:mx-auto lg:max-w-7xl">

        <div className="px-6 py-12 text-center sm:px-10 sm:py-16">

          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Ready to build your bridge?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
            Create your SkillBridge profile and start
            connecting skills with opportunities.
          </p>

          <button
            type="button"
            onClick={() => onNavigate("signup")}
            className="mt-7 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-indigo-700 transition hover:bg-indigo-50"
          >
            Create your account →
          </button>

        </div>

      </section>

    </div>
  );
}


/* ==========================================
   COMPONENTS
========================================== */

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {text}
      </p>

    </div>
  );
}


function StepCard({ number, title, text }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

      <span className="text-xs font-black text-indigo-600">
        {number}
      </span>

      <h3 className="mt-4 text-lg font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}


function ValueCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">

      <div className="text-2xl">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {text}
      </p>

    </div>
  );
}


export default About;
