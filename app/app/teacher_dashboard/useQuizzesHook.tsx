import { useEffect, useState } from "react";
import { Quiz } from "../types";

export function useQuizzesHook() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  useEffect(() => {
    // todo here Mongo call

  },[])
  return quizzes;
}
