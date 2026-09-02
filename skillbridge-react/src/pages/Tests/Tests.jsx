import { useState } from "react";

import Button from "../../components/common/Button/Button";

import "./Tests.css";

function Tests({ onGoBack }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const tests = {
    Python: [
      {
        question: "Which keyword is used to define a function in Python?",
        options: ["func", "define", "def", "function"],
        answer: "def",
      },
      {
        question: "Which symbol is used for comments in Python?",
        options: ["//", "#", "/*", "<!--"],
        answer: "#",
      },
      {
        question: "Which data type stores multiple ordered values?",
        options: ["List", "Integer", "Boolean", "None"],
        answer: "List",
      },
      {
        question: "What does len() return?",
        options: [
          "Object type",
          "Object length",
          "Last item",
          "Random number",
        ],
        answer: "Object length",
      },
      {
        question: "Which keyword creates a class?",
        options: ["object", "class", "struct", "new"],
        answer: "class",
      },
    ],

    SQL: [
      {
        question: "Which command retrieves data from a database?",
        options: ["GET", "SELECT", "FETCH", "READ"],
        answer: "SELECT",
      },
      {
        question: "Which clause filters records?",
        options: ["WHERE", "FILTER", "SEARCH", "CHECK"],
        answer: "WHERE",
      },
      {
        question: "Which command adds a new record?",
        options: ["ADD", "INSERT", "CREATE", "APPEND"],
        answer: "INSERT",
      },
      {
        question: "Which function calculates an average?",
        options: ["AVG()", "MEAN()", "AVERAGE()", "MID()"],
        answer: "AVG()",
      },
      {
        question: "Which keyword sorts query results?",
        options: [
          "SORT BY",
          "ORDER BY",
          "GROUP BY",
          "ARRANGE",
        ],
        answer: "ORDER BY",
      },
    ],

    "Data Analysis": [
      {
        question: "Which Python library is commonly used for data analysis?",
        options: ["Pandas", "React", "Express", "Jest"],
        answer: "Pandas",
      },
      {
        question: "What is data cleaning?",
        options: [
          "Removing incorrect data",
          "Creating a website",
          "Installing software",
          "Designing graphics",
        ],
        answer: "Removing incorrect data",
      },
      {
        question: "Which chart is useful for showing trends over time?",
        options: [
          "Line chart",
          "Pie chart",
          "Icon",
          "Table",
        ],
        answer: "Line chart",
      },
      {
        question: "What does mean represent?",
        options: [
          "Average value",
          "Largest value",
          "Smallest value",
          "First value",
        ],
        answer: "Average value",
      },
      {
        question: "What is an outlier?",
        options: [
          "An unusual data point",
          "A column name",
          "A database",
          "A formula",
        ],
        answer: "An unusual data point",
      },
    ],

    Excel: [
      {
        question: "Which symbol starts a formula in Excel?",
        options: ["#", "=", "@", "$"],
        answer: "=",
      },
      {
        question: "Which function adds numbers?",
        options: ["SUM()", "ADD()", "TOTAL()", "PLUS()"],
        answer: "SUM()",
      },
      {
        question: "What is a cell?",
        options: [
          "Intersection of row and column",
          "Worksheet",
          "Chart",
          "Workbook",
        ],
        answer: "Intersection of row and column",
      },
      {
        question: "Which feature helps filter data?",
        options: ["Filter", "Paint", "Zoom", "Print"],
        answer: "Filter",
      },
      {
        question: "Which function finds the average?",
        options: ["AVG()", "AVERAGE()", "MEAN()", "MID()"],
        answer: "AVERAGE()",
      },
    ],
  };

  const skills = Object.keys(tests);

  const startTest = (skill) => {
    setSelectedSkill(skill);
    setAnswers({});
    setResult(null);
  };

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: answer,
    }));
  };

  const submitTest = (event) => {
    event.preventDefault();

    const questions = tests[selectedSkill];

    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions.");
      return;
    }

    let correct = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correct++;
      }
    });

    const percentage = Math.round(
      (correct / questions.length) * 100
    );

    let level;
    let suggestions;

    if (percentage >= 80) {
      level = "Advanced";

      suggestions = [
        `Try advanced ${selectedSkill} projects.`,
        `Practice real-world ${selectedSkill} problems.`,
        "Add your projects to your portfolio.",
      ];
    } else if (percentage >= 60) {
      level = "Intermediate";

      suggestions = [
        `Practice intermediate ${selectedSkill} problems.`,
        `Build a practical ${selectedSkill} project.`,
        "Review the questions you answered incorrectly.",
      ];
    } else if (percentage >= 40) {
      level = "Developing";

      suggestions = [
        `Review ${selectedSkill} fundamentals.`,
        "Practice regularly with small exercises.",
        `Build a beginner ${selectedSkill} project.`,
      ];
    } else {
      level = "Beginner";

      suggestions = [
        `Start with ${selectedSkill} fundamentals.`,
        "Practice basic concepts every day.",
        `Follow a structured ${selectedSkill} learning path.`,
      ];
    }

    setResult({
      correct,
      total: questions.length,
      percentage,
      level,
      suggestions,
    });
  };

  const resetTest = () => {
    setSelectedSkill(null);
    setAnswers({});
    setResult(null);
  };

  return (
    <main className="tests-page">

      {/* HEADER */}

      <section className="tests-header">

        <div>
          <p className="tests-eyebrow">
            SKILLBRIDGE • AI ASSESSMENT
          </p>

          <h1>
            Test your skills.
          </h1>

          <p>
            Take skill assessments and discover
            where you stand.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={onGoBack}
        >
          ← Dashboard
        </Button>

      </section>


      {/* RESULT */}

      {result && (

        <section className="test-result">

          <p className="tests-eyebrow">
            ASSESSMENT COMPLETE
          </p>

          <h2>
            {selectedSkill} Test Result
          </h2>

          <div className="result-score">
            {result.percentage}%
          </div>

          <h3>
            {result.level}
          </h3>

          <p>
            You answered{" "}
            <strong>
              {result.correct}
            </strong>{" "}
            out of{" "}
            <strong>
              {result.total}
            </strong>{" "}
            questions correctly.
          </p>


          <div className="suggestions">

            <h3>
              🤖 AI Improvement Suggestions
            </h3>

            <ul>
              {result.suggestions.map(
                (suggestion) => (
                  <li key={suggestion}>
                    {suggestion}
                  </li>
                )
              )}
            </ul>

          </div>


          <Button onClick={resetTest}>
            Take another test
          </Button>

        </section>

      )}


      {/* QUESTIONS */}

      {!result && selectedSkill && (

        <section className="test-container">

          <div className="test-top">

            <div>

              <p className="tests-eyebrow">
                CURRENT TEST
              </p>

              <h2>
                {selectedSkill}
              </h2>

            </div>

            <Button
              variant="outline"
              onClick={resetTest}
            >
              Cancel
            </Button>

          </div>


          <form onSubmit={submitTest}>

            {tests[selectedSkill].map(
              (question, index) => (

                <div
                  className="test-question"
                  key={question.question}
                >

                  <h3>
                    {index + 1}.{" "}
                    {question.question}
                  </h3>


                  <div className="test-options">

                    {question.options.map(
                      (option) => (

                        <label
                          key={option}
                          className={
                            answers[index] === option
                              ? "selected"
                              : ""
                          }
                        >

                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={
                              answers[index] === option
                            }
                            onChange={() =>
                              handleAnswer(
                                index,
                                option
                              )
                            }
                          />

                          <span>
                            {option}
                          </span>

                        </label>

                      )
                    )}

                  </div>

                </div>

              )
            )}


            <Button type="submit">
              Submit Test →
            </Button>

          </form>

        </section>

      )}


      {/* SKILL SELECTION */}

      {!selectedSkill && !result && (

        <section className="test-selection">

          <div className="test-selection__heading">

            <p className="tests-eyebrow">
              CHOOSE A SKILL
            </p>

            <h2>
              Which skill do you want to test?
            </h2>

            <p>
              Your future AI system can automatically
              select the right test based on your
              profile and previous performance.
            </p>

          </div>


          <div className="test-grid">

            {skills.map((skill) => (

              <button
                className="test-card"
                key={skill}
                onClick={() =>
                  startTest(skill)
                }
                type="button"
              >

                <span className="test-card__icon">
                  ✦
                </span>

                <h3>
                  {skill}
                </h3>

                <p>
                  5 questions · Skill assessment
                </p>

                <span className="test-card__arrow">
                  Start test →
                </span>

              </button>

            ))}

          </div>

        </section>

      )}

    </main>
  );
}

export default Tests;