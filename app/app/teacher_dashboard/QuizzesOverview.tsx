"use client";

import React from "react";
import { Quiz } from "../types";
import { useQuizzesHook } from "./useQuizzesHook";
import QuizTable from "./QuizTable";

function QuizzesOverview() {
  const quizzes: Quiz[] = useQuizzesHook();
  return (
    <div>
      QuizzesOverview
      <QuizTable quizzes={quizzes} />
    </div>
  );
}

export default QuizzesOverview;
