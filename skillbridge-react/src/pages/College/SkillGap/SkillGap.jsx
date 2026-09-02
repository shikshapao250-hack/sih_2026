import { useMemo, useState } from "react";

const industrySkills = [
  { name: "React", demand: 92 },
  { name: "JavaScript", demand: 88 },
  { name: "Python", demand: 86 },
  { name: "SQL", demand: 82 },
  { name: "Git", demand: 78 },
  { name: "Node.js", demand: 74 },
  { name: "Machine Learning", demand: 70 },
  { name: "Cloud", demand: 66 },
];

const studentSkills = {
  React: 72,
  JavaScript: 68,
  Python: 58,
  SQL: 44,
  Git: 51,
  "Node.js": 34,
  "Machine Learning": 28,
  Cloud: 20,
};

function SkillGap({ onNavigate }) {
  const [selectedSkill, setSelectedSkill] =
    useState(null);

  const analysis = useMemo(() => {
    return industrySkills.map((skill) => {
      const studentLevel =
        studentSkills[skill.name] || 0;

      const gap = Math.max(
        skill.demand - studentLevel,
        0
      );

      return {
        ...skill,
        studentLevel,
        gap,
      };
    });
  }, []);

  const strongSkills = analysis.filter(
    (skill) => skill.gap <= 20
  );

  const mediumGaps = analysis.filter(
    (skill) =>
      skill.gap > 20 &&
      skill.gap <= 40
  );

  const criticalGaps = analysis.filter(
    (skill) => skill.gap > 40
  );

  const averageGap = Math.round(
    analysis.reduce(
      (total, skill) =>
        total + skill.gap,
      0
    ) / analysis.length
  );

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
              onNavigate("college")
            }
            className="text-sm font-bold text-slate-600 transition hover:text-indigo-600"
          >
            ← Dashboard
          </button>

          <div className="flex items-center gap-2">

            <span className="hidden text-sm font-black text-slate-900 sm:block">
              Skill Intelligence
            </span>

            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-black text-indigo-600">
              AI Preview
            </span>

          </div>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* ===================================
            HERO
        =================================== */}

        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-6 text-white shadow-xl sm:p-9">

          <div className="max-w-3xl">

            <p className="text-xs font-black uppercase tracking-widest text-indigo-300">
              College intelligence
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Understand your skill gap.
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Compare your students' current skills
              with the skills organizations are demanding
              in today's job market.
            </p>

          </div>


          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={() =>
                onNavigate(
                  "college-students"
                )
              }
              className="rounded-xl bg-white px-5 py-3 text-sm font-black text-indigo-700 transition hover:bg-indigo-50"
            >
              View student data
            </button>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 700,
                  behavior: "smooth",
                })
              }
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              View analysis ↓
            </button>

          </div>

        </section>


        {/* ===================================
            OVERVIEW STATS
        =================================== */}

        <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <Stat
            label="Skills analyzed"
            value={analysis.length}
            icon="🧠"
          />

          <Stat
            label="Strong skills"
            value={strongSkills.length}
            icon="✓"
          />

          <Stat
            label="Skill gaps"
            value={
              mediumGaps.length +
              criticalGaps.length
            }
            icon="📊"
          />

          <Stat
            label="Average gap"
            value={`${averageGap}%`}
            icon="⚡"
          />

        </section>


        {/* ===================================
            ANALYSIS
        =================================== */}

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">


          {/* SKILL GRAPH */}

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Skill comparison
                </p>

                <h2 className="mt-2 text-xl font-black text-slate-900">
                  Industry demand vs student capability
                </h2>

              </div>

              <p className="text-xs font-semibold text-slate-400">
                0 — 100%
              </p>

            </div>


            {/* LEGEND */}

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">

              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                Industry demand
              </span>

              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                Student capability
              </span>

            </div>


            {/* BARS */}

            <div className="mt-7 space-y-6">

              {analysis.map((skill) => (

                <button
                  type="button"
                  key={skill.name}
                  onClick={() =>
                    setSelectedSkill(
                      skill.name
                    )
                  }
                  className="block w-full text-left"
                >

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-xs font-black text-slate-700 sm:text-sm">
                      {skill.name}
                    </span>

                    <span className="text-[11px] font-bold text-slate-400">
                      Gap {skill.gap}%
                    </span>

                  </div>


                  {/* INDUSTRY */}

                  <div className="relative h-2.5 rounded-full bg-slate-100">

                    <div
                      className="absolute left-0 top-0 h-2.5 rounded-full bg-indigo-600 transition-all"
                      style={{
                        width: `${skill.demand}%`,
                      }}
                    />

                  </div>


                  {/* STUDENTS */}

                  <div className="relative mt-1 h-2.5 rounded-full bg-slate-100">

                    <div
                      className="absolute left-0 top-0 h-2.5 rounded-full bg-slate-300 transition-all"
                      style={{
                        width: `${skill.studentLevel}%`,
                      }}
                    />

                  </div>

                </button>

              ))}

            </div>

          </div>


          {/* GAP SUMMARY */}

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
              Gap summary
            </p>

            <h2 className="mt-2 text-xl font-black text-slate-900">
              Where should the college focus?
            </h2>


            <div className="mt-6 space-y-4">

              <GapCard
                title="Strong"
                count={strongSkills.length}
                description="Students are relatively aligned with industry demand."
                icon="✓"
              />

              <GapCard
                title="Developing"
                count={mediumGaps.length}
                description="Additional training could improve readiness."
                icon="↗"
              />

              <GapCard
                title="Critical"
                count={criticalGaps.length}
                description="These skills need significant attention."
                icon="!"
              />

            </div>


            {/* SELECTED */}

            {selectedSkill && (

              <div className="mt-6 rounded-2xl bg-indigo-50 p-4">

                <p className="text-xs font-black text-indigo-700">
                  Selected skill
                </p>

                <p className="mt-1 text-lg font-black text-slate-900">
                  {selectedSkill}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Industry demand:{" "}
                  {
                    analysis.find(
                      (item) =>
                        item.name ===
                        selectedSkill
                    )?.demand
                  }
                  %
                </p>

              </div>

            )}

          </div>

        </section>


        {/* ===================================
            PRIORITY SKILLS
        =================================== */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div>

            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
              Priority development areas
            </p>

            <h2 className="mt-2 text-xl font-black text-slate-900">
              Skills that need attention
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              These are the areas where the difference
              between industry demand and current student
              capability is highest.
            </p>

          </div>


          <div className="mt-6 grid gap-4 md:grid-cols-2">

            {[...analysis]
              .sort(
                (a, b) =>
                  b.gap - a.gap
              )
              .slice(0, 4)
              .map((skill, index) => (

                <div
                  key={skill.name}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-black text-indigo-600 shadow-sm">
                        {index + 1}
                      </span>

                      <span className="text-sm font-black text-slate-800">
                        {skill.name}
                      </span>

                    </div>

                    <span className="text-xs font-black text-red-500">
                      -{skill.gap}%
                    </span>

                  </div>


                  <div className="mt-4 h-2 rounded-full bg-slate-200">

                    <div
                      className="h-2 rounded-full bg-indigo-500"
                      style={{
                        width: `${skill.studentLevel}%`,
                      }}
                    />

                  </div>

                  <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">

                    <span>
                      Student: {skill.studentLevel}%
                    </span>

                    <span>
                      Demand: {skill.demand}%
                    </span>

                  </div>

                </div>

              ))}

          </div>

        </section>


        {/* ===================================
            RECOMMENDATIONS
        =================================== */}

        <section className="mt-6 rounded-3xl bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">

              <p className="text-xs font-black uppercase tracking-widest text-indigo-200">
                Recommended action
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Build targeted learning programs.
              </h2>

              <p className="mt-3 text-sm leading-6 text-indigo-100">
                Use the identified gaps to prioritize
                workshops, courses, projects and
                industry partnerships around the skills
                students need most.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate(
                  "college-students"
                )
              }
              className="w-full rounded-xl bg-white px-5 py-3 text-sm font-black text-indigo-700 transition hover:bg-indigo-50 sm:w-auto"
            >
              Explore students →
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}


/* ==========================================
   STAT
========================================== */

function Stat({
  label,
  value,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-semibold text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-black text-slate-900">
            {value}
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-sm">
          {icon}
        </div>

      </div>

    </div>
  );
}


/* ==========================================
   GAP CARD
========================================== */

function GapCard({
  title,
  count,
  description,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-indigo-600 shadow-sm">
          {icon}
        </div>

        <div>

          <p className="text-sm font-black text-slate-800">
            {title}
          </p>

          <p className="text-xs font-bold text-indigo-600">
            {count} skills
          </p>

        </div>

      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        {description}
      </p>

    </div>
  );
}


export default SkillGap;