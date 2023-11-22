import { QuizData } from '@/app/types';
import { quizzes } from '@/data/mockQuizzes';

export function useQuiz(id:string):QuizData | undefined {
  return quizzes.find(q => q._id === id);
}
