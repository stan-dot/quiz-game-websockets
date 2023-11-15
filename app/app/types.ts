export type LeaderBoardStatus = {

  quizName:string
  rows:LeaderBoardRow[]
};

export type LeaderBoardRow = {
  studentId: string,
  studenNick:string,
  score:number,
}

// todo many types are downstream from what backend enforces
// todo check how to ensure type safety between go and typescript

export type Quiz = {
  title: string,
  _id:string,
  questions:Question[]
}


export type Question = {
  text: string, 
  answers: string[]
}
