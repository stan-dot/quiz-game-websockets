import { LeaderBoardRow, LeaderBoardStatus } from "@/app/types";

const student1: LeaderBoardRow = {
  studentId: "1",
  studenNick: "Alice",
  score: 13
};

const student2: LeaderBoardRow = {
  studentId: "2",
  studenNick: "Bob",
  score: 5
};

const student3: LeaderBoardRow = {
  studentId: "3",
  studenNick: "Carol",
  score: 21
};

const student4: LeaderBoardRow = {
  studentId: "4",
  studenNick: "Erin",
  score: 8
};


const student5: LeaderBoardRow = {
  studentId: "5",
  studenNick: "Frank",
  score: 3
};

export const mockLeaderboard: LeaderBoardStatus = {
  quizName: "Test 4",
  rows: [student1,student2,student3, student4, student5]
};