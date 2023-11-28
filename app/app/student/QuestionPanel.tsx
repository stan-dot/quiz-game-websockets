import React from "react";
import { Question } from "../types";
import { StudentSocketFacade } from "./StudentSocketsFacade";

const fourColors: string[] = ["#990000", "#009900", "#000099", "#B0B000"];

function QuestionPanel(
  { question, answerCallback }: {
    question: Question;
    answerCallback: (time: Date, answerNumber: number) => void;
  },
) {
  const startTime = new Date();
  return (
    <div className="w-full">
      QuestionPanel
      <p>
        {question.text}
      </p>
      <div>
        {question.answers.map((a, i) => {
          return (
            <button
              className="w-1/2 h-1/2"
              style={{ backgroundColor: fourColors[i] }}
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
