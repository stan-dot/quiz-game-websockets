import React from "react";
import { Question } from "../types";
import { StudentSocketFacade } from "./StudentSocketsFacade";

function QuestionPanel(
  { question, answerCallback }: {
    question: Question;
    answerCallback: (time: Date, answerNumber: number) => void;
  },
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
              onClick={() => answerCallback(startTime, i)}
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
