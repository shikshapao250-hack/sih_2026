
import { useState } from "react";
import Button from "../../common/Button/Button";
import "./OpportunityCard.css";

function OpportunityCard({
  company,
  deadline,
  location,
  match = 0,
  skills = [],
  title,
}) {
  const [hasApplied, setHasApplied] = useState(false);

  const getMatchClass = () => {
    if (match >= 80) return "high";
    if (match >= 50) return "medium";
    return "low";
  };

  return (
    <article className="opportunity-card">
      <div className="opportunity-card__topline">
        <span
          className="opportunity-card__company-mark"
          aria-hidden="true"
        >
          {company?.charAt(0)}
        </span>

        <span
          className={`opportunity-card__match opportunity-card__match--${getMatchClass()}`}
        >
          {match}% match
        </span>
      </div>

      <p className="opportunity-card__location">
        {location}
      </p>

      <h3>{title}</h3>

      <p className="opportunity-card__company">
        {company}
      </p>

      <div
        className="opportunity-card__skills"
        aria-label="Required skills"
      >
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="opportunity-card__footer">
        <span>{deadline}</span>

        <Button
          variant="text"
          onClick={() => setHasApplied(true)}
          disabled={hasApplied}
        >
          {hasApplied
            ? "Applied ✓"
            : "Apply now →"}
        </Button>
      </div>
    </article>
  );
}

export default OpportunityCard;
