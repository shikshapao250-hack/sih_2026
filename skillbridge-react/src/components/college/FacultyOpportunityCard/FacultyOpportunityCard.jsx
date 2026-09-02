import { useState } from "react";
import Button from "../../common/Button/Button";
import "./FacultyOpportunityCard.css";

function FacultyOpportunityCard({ duration, organisation, skills, title, type }) {
  const [isInterested, setIsInterested] = useState(false);

  return (
    <article className="faculty-opportunity-card">
      <p className="faculty-opportunity-card__type">{type}</p>
      <h3>{title}</h3>
      <p className="faculty-opportunity-card__organisation">{organisation}</p>
      <p className="faculty-opportunity-card__duration">{duration}</p>

      <div className="faculty-opportunity-card__skills">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <Button variant="outline" onClick={() => setIsInterested(true)} disabled={isInterested}>
        {isInterested ? "Interest registered ✓" : "Register interest"}
      </Button>
    </article>
  );
}

export default FacultyOpportunityCard;
