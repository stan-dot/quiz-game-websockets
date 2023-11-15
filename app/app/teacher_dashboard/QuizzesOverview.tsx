"use client";

import React from "react";
import { QuizData } from "../types";
import { useQuizzesHook } from "./useQuizzesHook";
import QuizTable from "./QuizTable";

function QuizzesOverview() {
  const quizzes: QuizData[] = useQuizzesHook();
  return (
    <div>
      QuizzesOverview
      <QuizTable quizzes={quizzes} />
    </div>
  );
}

export default QuizzesOverview;
