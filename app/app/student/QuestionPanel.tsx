import React from "react";
import { Question } from "../types";
import { StudentSocketFacade } from "./StudentSocketsFacade";

// todo ask where to initialize that global object for the session
function QuestionPanel(
  { question, facade }: { question: Question; facade: StudentSocketFacade },
) {
  return (
    <div>
      QuestionPanel
      <p>
        {question.text}
      </p>
      <div>
        {question.answers.map((a, i) => {
          return (
            <button key={i} onClick={() => facade.sendAnswer(i)}>
              {a}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionPanel;
