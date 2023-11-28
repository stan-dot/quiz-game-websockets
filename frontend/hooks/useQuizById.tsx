import { QuizData } from "@/app/types";
import { mockQuizzes } from "@/data/mockQuizzes";

export function useQuiz(id: string): QuizData | undefined {
  return mockQuizzes.find((q) => q._id === id);
}
