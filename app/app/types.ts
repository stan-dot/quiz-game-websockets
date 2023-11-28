// QUIZ TYPES
export type QuizData = {
  title: string;
  _id: string;
  questions: Question[];
};

export type Question = {
  text: string;
  answers: string[];
  correctNumber: number;
};

export type StudentAnswer = {
  quiz_id: string;
  choice: number;
  student_id: string;
  time_miliseconds: number;
};

export type LeaderBoardStatus = {
  quizName: string;
  rows: LeaderBoardRow[];
};

export type LeaderBoardRow = {
  studentId: string;
  studenNick: string;
  score: number;
};

// managing types
export type ClassData = {
  students: Student[];
  cohortId: string;
  quizzesDone_Ids: string[];
};

export type Student = {
  name: string;
  email: string;
  nick: string;
  student_id: string;
};
