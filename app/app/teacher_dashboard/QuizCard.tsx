import React from "react";
import { Quiz } from "../types";

function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div>
      <p>{quiz.title}</p>
      <p>Number of questions: {quiz.questions.length}</p>
    </div>
  );
}

export default QuizCard;
