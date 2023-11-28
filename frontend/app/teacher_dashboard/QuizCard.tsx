import React from "react";
import { QuizData } from "../types";

function QuizCard({ quiz }: { quiz: QuizData }) {
  return (
    <div>
      <p>{quiz.title}</p>
      <p>Number of questions: {quiz.questions.length}</p>
    </div>
  );
}

export default QuizCard;
