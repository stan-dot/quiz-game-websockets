import { useEffect, useState } from "react";
import { QuizData } from "../types";

export function useQuizzesHook() {
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  useEffect(() => {
  }, []);
  return quizzes;
}
