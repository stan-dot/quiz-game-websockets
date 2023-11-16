export type LeaderBoardStatus = {
  quizName:string
  rows:LeaderBoardRow[]
};

export type LeaderBoardRow = {
  studentId: string,
  studenNick:string,
  score:number,
}

export type QuizData = {
  title: string,
  _id:string,
  questions:Question[]
}

export type Question = {
  text: string, 
  answers: string[]
}

export type StudentAnswer = {
  choice: number;
  studentId: string;
  timeMiliseconds: number;
}

export type ClassData = {
  students: Student[],
  cohortId: string,
  quizzesDone_Ids:string[]
}

export type Student = {
  name: string,
  email: string,
  nick:string

}

