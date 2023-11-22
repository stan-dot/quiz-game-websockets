import { Question, QuizData } from "@/app/types";

const difficultQuestion: Question = {
  text: "difficult question",
  answers: ['a', 'b', 'c', 'd'],
  correctNumber: 0
}

const quiz4: QuizData = {
  title: "Test4",
  _id: "4",
  questions: [difficultQuestion]
}

export const quizzes:QuizData[] = [quiz4]
