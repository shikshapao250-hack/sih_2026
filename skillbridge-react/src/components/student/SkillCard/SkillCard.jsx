import Button from "../../common/Button/Button";
import "./SkillCard.css";

function SkillCard({
  name,
  level = "Not assessed",
  progress = 0,
  status = "not-assessed",
  onTakeAssessment,
}) {
  const percentage = Math.max(
    0,
    Math.min(100, Number(progress) || 0)
  );

  const getStatusText = () => {
    if (status === "verified") {
      return "Verified";
    }

    if (status === "developing") {
      return "Developing";
    }

    return "Not assessed";
  };

  const statusText = getStatusText();

  const statusClass =
    status === "verified"
      ? "skill-card__level--verified"
      : status === "developing"
      ? "skill-card__level--developing"
      : "skill-card__level--pending";

  return (
    <article className="skill-card">
      <div className="skill-card__topline">
        <div>
          <h3>{name}</h3>

          <span className="skill-card__level-text">
            {level}
          </span>
        </div>

        <span
          className={`skill-card__level ${statusClass}`}
        >
          {statusText}
        </span>
      </div>

      <div
        className="skill-card__track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`${name}: ${percentage}%`}
      >
        <span
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="skill-card__bottom">
        <span>Assessment score</span>

        <strong>
          {status === "not-assessed"
            ? "Not tested"
            : `${percentage}%`}
        </strong>
      </div>

      {onTakeAssessment && (
        <Button
          variant="outline"
          onClick={() => onTakeAssessment(name)}
        >
          {status === "not-assessed"
            ? "Take assessment →"
            : "Retake assessment →"}
        </Button>
      )}
    </article>
  );
}

export default SkillCard;