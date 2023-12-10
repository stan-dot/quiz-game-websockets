import { useEffect, useState } from "react";

export function useQuizzesHook() {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const qs = prisma?.quiz.findMany();
    setQuizzes(qs);
  }, []);
  return quizzes;
}
