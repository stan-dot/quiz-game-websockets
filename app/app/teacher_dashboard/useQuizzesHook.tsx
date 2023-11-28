import { useEffect, useState } from "react";
import { QuizData } from "../types";
import { mockQuizzes } from "@/data/mockQuizzes";

export function useQuizzesHook() {
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  useEffect(() => {
    setQuizzes(mockQuizzes);
  }, []);
  return quizzes;
}
