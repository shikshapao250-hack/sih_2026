
import { useState } from "react";
import Button from "../../common/Button/Button";
import "./CandidateCard.css";

function CandidateCard({
  course,
  match,
  name,
  skills,
  skillGaps = [],
  matchedSkills = [],
  recommendation = "",
}) {
  const [isShortlisted, setIsShortlisted] = useState(false);

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <article className="candidate-card">
      {/* PROFILE */}
      <div className="candidate-card__profile">
        <span className="candidate-card__avatar">
          {initials}
        </span>

        <div>
          <h3>{name}</h3>
          <p>{course}</p>
        </div>

        <span className="candidate-card__match">
          {match}% match
        </span>
      </div>

      {/* CANDIDATE SKILLS */}
      <div className="candidate-card__skills">
        {skills.map((skill) => {
          const isMatched = matchedSkills.some(
            (matchedSkill) =>
              matchedSkill.toLowerCase() ===
              skill.toLowerCase()
          );

          return (
            <span
              key={skill}
              className={
                isMatched
                  ? "candidate-card__skill candidate-card__skill--matched"
                  : "candidate-card__skill"
              }
            >
              {isMatched ? "✓ " : ""}
              {skill}
            </span>
          );
        })}
      </div>

      {/* INTELLIGENCE PANEL */}
      <div className="candidate-card__intelligence">
        <div className="candidate-card__intelligence-header">
          <span>SKILL ANALYSIS</span>
          <strong>{match}%</strong>
        </div>

        {/* MATCH PROGRESS */}
        <div
          className="candidate-card__progress"
          aria-label={`${match}% skill match`}
        >
          <span
            style={{
              width: `${match}%`,
            }}
          />
        </div>

        {/* MATCHED SKILLS */}
        {matchedSkills.length > 0 && (
          <div className="candidate-card__matched">
            <span className="candidate-card__matched-label">
              Matched skills
            </span>

            <div>
              {matchedSkills.map((skill) => (
                <span
                  className="candidate-card__matched-skill"
                  key={skill}
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* SKILL GAPS */}
        {skillGaps.length > 0 ? (
          <div className="candidate-card__gaps">
            <span className="candidate-card__gap-label">
              Skill gaps
            </span>

            <div>
              {skillGaps.map((gap) => (
                <span
                  className="candidate-card__gap"
                  key={gap}
                >
                  {gap}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="candidate-card__perfect">
            ✓ All required skills matched
          </p>
        )}

        {/* RECOMMENDATION */}
        {recommendation && (
          <div className="candidate-card__recommendation">
            <span>RECOMMENDATION</span>
            <p>{recommendation}</p>
          </div>
        )}
      </div>

      {/* ACTION */}
      <Button
        className="candidate-card__button"
        variant={
          isShortlisted
            ? "outline"
            : "primary"
        }
        onClick={() =>
          setIsShortlisted(true)
        }
        disabled={isShortlisted}
      >
        {isShortlisted
          ? "Shortlisted ✓"
          : "Shortlist candidate"}
      </Button>
    </article>
  );
}

export default CandidateCard;