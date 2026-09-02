import "./PublicHome.css";

function PublicHome({
  onStudentLogin,
  onOrganizationLogin,
  onCollegeLogin,
}) {
  return (
    <main className="public-home">
      {/* HERO */}
      <section className="public-home__hero">
        <div className="public-home__hero-content">
          <span className="public-home__badge">
            SKILLBRIDGE • CAREER ECOSYSTEM
          </span>

          <h1>
            Connect skills with
            <span> real opportunities.</span>
          </h1>

          <p>
            SkillBridge connects students, colleges and
            organizations through skills, opportunities,
            career insights and intelligent skill-gap analysis.
          </p>

          <div className="public-home__actions">
            <button
              className="public-home__primary"
              onClick={onStudentLogin}
            >
              Join as Student →
            </button>

            <button
              className="public-home__secondary"
              onClick={onOrganizationLogin}
            >
              For Organizations
            </button>
          </div>
        </div>

        {/* HERO CARD */}
        <div className="public-home__visual">
          <div className="career-card">
            <div className="career-card__top">
              <div className="career-card__avatar">
                S
              </div>

              <div>
                <strong>Student Skill Profile</strong>
                <span>Career readiness</span>
              </div>

              <b>86%</b>
            </div>

            <div className="career-card__progress">
              <span style={{ width: "86%" }} />
            </div>

            <div className="career-card__skills">
              <span>React</span>
              <span>JavaScript</span>
              <span>Firebase</span>
              <span>UI/UX</span>
            </div>

            <div className="career-card__match">
              <div>
                <small>ROLE MATCH</small>
                <strong>Frontend Developer</strong>
              </div>

              <span>94%</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / STATS */}
      <section className="public-home__stats">
        <div>
          <strong>10K+</strong>
          <span>Students</span>
        </div>

        <div>
          <strong>250+</strong>
          <span>Organizations</span>
        </div>

        <div>
          <strong>50+</strong>
          <span>Colleges</span>
        </div>

        <div>
          <strong>1K+</strong>
          <span>Opportunities</span>
        </div>
      </section>

      {/* PUBLIC FEED */}
      <section className="public-home__feed">
        <div className="public-home__section-heading">
          <div>
            <span>DISCOVER</span>
            <h2>What's happening in the ecosystem?</h2>
          </div>

          <p>
            Explore stories, opportunities and industry
            requirements without creating an account.
          </p>
        </div>

        <div className="public-home__grid">
          {/* STORY */}
          <article className="feed-card feed-card--large">
            <div className="feed-card__header">
              <div className="feed-avatar">A</div>

              <div>
                <strong>Student Achievement</strong>
                <span>2 hours ago</span>
              </div>
            </div>

            <h3>
              From learning React to building a real-world
              project.
            </h3>

            <p>
              Students can showcase their projects,
              achievements and skills while building a
              professional profile.
            </p>

            <div className="feed-card__tags">
              <span>React</span>
              <span>Projects</span>
              <span>Career</span>
            </div>
          </article>

          {/* INDUSTRY */}
          <article className="feed-card">
            <div className="feed-card__label">
              INDUSTRY INSIGHT
            </div>

            <h3>
              Most requested skills this month
            </h3>

            <div className="skill-bars">
              <div>
                <span>React</span>
                <i style={{ width: "88%" }} />
              </div>

              <div>
                <span>JavaScript</span>
                <i style={{ width: "78%" }} />
              </div>

              <div>
                <span>Python</span>
                <i style={{ width: "68%" }} />
              </div>

              <div>
                <span>Cloud</span>
                <i style={{ width: "55%" }} />
              </div>
            </div>
          </article>

          {/* OPPORTUNITY */}
          <article className="feed-card">
            <div className="feed-card__label">
              OPPORTUNITY
            </div>

            <h3>
              Frontend Developer Intern
            </h3>

            <p>
              Looking for students with React,
              JavaScript and modern UI development skills.
            </p>

            <button
              onClick={onOrganizationLogin}
              className="feed-card__link"
            >
              Explore opportunities →
            </button>
          </article>
        </div>
      </section>

      {/* ROLE SECTION */}
      <section className="public-home__roles">
        <div className="public-home__section-heading">
          <div>
            <span>ONE ECOSYSTEM</span>
            <h2>Built for every side of the career journey.</h2>
          </div>
        </div>

        <div className="role-cards">
          <button onClick={onStudentLogin}>
            <span>01</span>
            <h3>Students</h3>
            <p>
              Build your profile, assess your skills,
              discover gaps and find relevant opportunities.
            </p>
            <b>Explore Student Portal →</b>
          </button>

          <button onClick={onCollegeLogin}>
            <span>02</span>
            <h3>Colleges</h3>
            <p>
              Understand student skill levels and identify
              gaps based on industry requirements.
            </p>
            <b>Explore College Portal →</b>
          </button>

          <button onClick={onOrganizationLogin}>
            <span>03</span>
            <h3>Organizations</h3>
            <p>
              Find students whose skills and profiles match
              your organization's requirements.
            </p>
            <b>Explore Organization Portal →</b>
          </button>
        </div>
      </section>
    </main>
  );
}

export default PublicHome;