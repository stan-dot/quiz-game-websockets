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

const difficultQuestion2: Question = {
  text: "the second difficult question",
  answers: [
    "ASDFAAAAAAAAAA",
    "BASDEWREAWREWARWA",
    "CWERWEAREWAR",
    "DADFSDAFEWAREWAH",
  ],
  correctAnswer: 2,
};

const quiz4: QuizData = {
  title: "Test4",
  _id: "4",
  questions: [difficultQuestion, difficultQuestion2],
};

export const mockQuizzes: QuizData[] = [quiz4];
