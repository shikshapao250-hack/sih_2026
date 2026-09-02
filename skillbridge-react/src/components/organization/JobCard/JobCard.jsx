
import { useState } from "react";
import Button from "../../common/Button/Button";
import "./JobCard.css";

function JobCard({
  applications,
  deadline,
  location,
  skills,
  status,
  title,
  isSelected,
  onSelect,
}) {

  const [isApplicantsOpen, setIsApplicantsOpen] = useState(false);

  const handleSelect = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <article
  className={`job-card ${
    isSelected ? "job-card--selected" : ""
  }`}
  onClick={handleSelect}
  onKeyDown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  }}
  role="button"
  tabIndex={0}
  aria-pressed={isSelected}
>
      <div className="job-card__topline">
        <span
          className={
            status === "Published"
              ? "job-card__status"
              : "job-card__status job-card__status--draft"
          }
        >
          {status}
        </span>

        <span className="job-card__applications">
          {applications} applicants
        </span>
      </div>

      <p className="job-card__location">
        {location}
      </p>

      <h3>{title}</h3>

      <div className="job-card__skills">
        {skills.map((skill) => (
          <span key={skill}>
            {skill}
          </span>
        ))}
      </div>

      <div className="job-card__footer">
        <span>{deadline}</span>

        <Button
          variant="text"
          onClick={(event) => {
            event.stopPropagation();
            setIsApplicantsOpen((value) => !value);
          }}
        >
          {isApplicantsOpen
            ? "Hide applicants"
            : "View applicants →"}
        </Button>
      </div>

      {isApplicantsOpen && (
        <p className="job-card__message">
          Candidate shortlisting tools are ready
          for this role.
        </p>
      )}

      {isSelected && (
        <div className="job-card__selected-label">
          ✓ Matching candidates
        </div>
      )}
    </article>
  );
}

export default JobCard;

