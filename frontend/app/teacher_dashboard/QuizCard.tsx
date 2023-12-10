import { Prisma, Quiz } from "@prisma/client";
import React from "react";

function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div>
      <p>{quiz.Title}</p>
      <p>Number of questions: {quiz.Questions.length}</p>
      #questionsDisplay.m-2.p-2
    </div>
  );
}

export default QuizCard;
