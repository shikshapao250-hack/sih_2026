import Button from "../../common/Button/Button";
import "./PortfolioCard.css";

function PortfolioCard({
  completed,
  nextTask,
  verifiedSkills,
  onUpdate,
}) {
  return (
    <article className="portfolio-card">

      <p className="portfolio-card__eyebrow">
        DIGITAL PORTFOLIO
      </p>

      <div className="portfolio-card__score">
        <strong>{completed}%</strong>
        <span>complete</span>
      </div>

      <p className="portfolio-card__detail">
        {verifiedSkills} verified skills are ready
        to share with recruiters.
      </p>

      <div className="portfolio-card__next-task">
        <span>Next task</span>

        <strong>
          {nextTask}
        </strong>
      </div>

      <Button
        variant="outline"
        onClick={onUpdate}
      >
        Update portfolio
      </Button>

    </article>
  );
}

export default PortfolioCard;