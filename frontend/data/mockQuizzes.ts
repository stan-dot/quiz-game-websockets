import { Question, QuizData } from "@/app/types";

const difficultQuestion: Question = {
  text: "difficult question",
  answers: [
    "asdfaaaaaaaaaa",
    "basdewreawrewarwa",
    "cwerwearewar",
    "dadfsdafewarewah",
  ],
  correctAnswer: 0,
};

const quiz4: QuizData = {
  title: "Test4",
  _id: "4",
  questions: [difficultQuestion],
};

export const mockQuizzes: QuizData[] = [quiz4];