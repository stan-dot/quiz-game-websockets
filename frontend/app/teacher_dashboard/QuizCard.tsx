import React from "react";
import { QuizData } from "../types";

function QuizCard({ quiz }: { quiz: QuizData }) {
  return (
    <div>
      <p>{quiz.title}</p>
      <p>Number of questions: {quiz.questions.length}</p>
      #questionsDisplay.m-2.p-2
    </div>
  );
}

export default QuizCard;
