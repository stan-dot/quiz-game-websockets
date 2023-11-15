import React from "react";
import { Question } from "../types";
import { StudentSocketFacade } from "./StudentSocketsFacade";

// todo ask where to initialize that global object for the session
// todo the faster answered the better points - record the time between received and sent
function QuestionPanel(
  { question, facade }: { question: Question; facade: StudentSocketFacade },
) {
  const startTime = new Date();
  return (
    <div>
      QuestionPanel
      <p>
        {question.text}
      </p>
      <div>
        {question.answers.map((a, i) => {
          return (
            <button
              key={i}
              onClick={() => facade.sendAnswer(startTime, i)}
            >
              {a}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionPanel;
