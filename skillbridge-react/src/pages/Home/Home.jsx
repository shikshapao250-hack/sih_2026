import Hero from "../../components/home/Hero/Hero";
import RoleCard from "../../components/home/RoleCard/RoleCard";
import FeatureCard from "../../components/home/FeatureCard/FeatureCard";
import HowItWorks from "../../components/home/HowItWorks/HowItWorks";

function Home({ onNavigate }) {
  return (
    <div className="overflow-hidden">

      {/* HERO */}
      <Hero onNavigate={onNavigate} />

      {/* PLATFORM STATS */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ["10K+", "Students"],
            ["500+", "Organizations"],
            ["100+", "Colleges"],
            ["1K+", "Opportunities"],
          ].map(([number, label]) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-black text-slate-900 sm:text-3xl">
                {number}
              </p>

              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ROLES */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold text-indigo-600">
              ONE PLATFORM
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Built for everyone shaping the future
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              Whether you're building your career, discovering talent,
              or helping students become industry-ready, SkillBridge
              brings everyone together.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <RoleCard
              icon="🎓"
              title="Students"
              description="Build a professional identity and discover opportunities matched to your skills."
              features={[
                "Professional profile",
                "Skills & projects",
                "Job recommendations",
              ]}
              onClick={() => onNavigate("signup")}
            />

            <RoleCard
              icon="🏢"
              title="Organizations"
              description="Discover promising students and create jobs and internship opportunities."
              features={[
                "Create jobs",
                "Browse students",
                "Find relevant talent",
              ]}
              onClick={() => onNavigate("signup")}
            />

            <RoleCard
              icon="🏫"
              title="Colleges"
              description="Understand student capabilities and identify the skills needed for industry."
              features={[
                "Browse students",
                "Explore colleges",
                "AI skill-gap analysis",
              ]}
              onClick={() => onNavigate("signup")}
            />

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 max-w-2xl">
            <span className="text-sm font-bold text-indigo-600">
              HOW IT WORKS
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              From skills to opportunities
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              SkillBridge turns your skills and goals into meaningful
              connections and opportunities.
            </p>
          </div>

          <HowItWorks />

        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold text-indigo-600">
              WHY SKILLBRIDGE
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Everything connected in one place
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <FeatureCard
              icon="👤"
              title="Professional Profiles"
              description="Create a profile that showcases your education, skills, projects and achievements."
            />

            <FeatureCard
              icon="💼"
              title="Opportunities"
              description="Discover jobs and internships based on your skills and interests."
            />

            <FeatureCard
              icon="🧠"
              title="Skill Intelligence"
              description="Understand which skills you have and where your biggest skill gaps are."
            />

            <FeatureCard
              icon="🤝"
              title="Meaningful Connections"
              description="Bring students, colleges and organizations into one professional ecosystem."
            />

          </div>
        </div>
      </section>

      {/* AI SKILL GAP */}
      <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          <div>
            <span className="text-sm font-bold text-indigo-300">
              FOR COLLEGES
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Turn skill data into actionable insight.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              SkillBridge can help colleges understand what students
              know today, what organizations are looking for, and
              where the biggest skill gaps exist.
            </p>

            <button
              type="button"
              onClick={() => onNavigate("signup")}
              className="mt-8 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-indigo-50"
            >
              Explore SkillBridge
            </button>
          </div>

          {/* Skill visualization */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-7">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">
                  Skill Gap Overview
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Computer Science • 2026
                </p>
              </div>

              <span className="rounded-lg bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
                AI Insight
              </span>
            </div>

            <div className="mt-8 space-y-5">

              {[
                ["Python", 88],
                ["SQL", 76],
                ["React", 64],
                ["Cloud", 42],
                ["AI / ML", 35],
              ].map(([skill, value]) => (
                <div key={skill}>
                  <div className="mb-2 flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">
                      {skill}
                    </span>

                    <span className="text-white">
                      {value}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}

            </div>

            <div className="mt-8 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
              <p className="text-sm font-bold text-indigo-200">
                Recommended focus
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-300">
                Cloud computing and AI/ML show the largest opportunity
                for improving industry readiness.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-6 py-14 text-center text-white shadow-2xl shadow-indigo-200 sm:px-10">

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Your next opportunity could start here.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
            Build your profile, discover opportunities and connect
            with the people and organizations that can help you grow.
          </p>

          <button
            type="button"
            onClick={() => onNavigate("signup")}
            className="mt-8 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
          >
            Join SkillBridge →
          </button>

        </div>
      </section>

    </div>
  );
}

export default Home;