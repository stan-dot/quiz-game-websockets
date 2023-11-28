import { io, Socket } from "socket.io-client";
import { LeaderBoardStatus, Question, QuizData, StudentAnswer } from "../types";

interface ServerToClientEvents {
  quiz: (m: QuizData) => void;
  new_question: (q: Question) => void;
  leaderboard_update: (l: LeaderBoardStatus) => void;
  correctAnswer: (a: { index: number }) => void;
}

interface ClientToServerEvents {
  participationPing: () => void;
  answer: (a: StudentAnswer) => void;
}

type StudentSocketFacadeConstructionProps = {
  socketUrl: string;
  studentId: string;
  callbacks?: {
    onNewQuiz: () => void;
    onLeaderBoard: () => void;
    onNewQuestion: () => void;
    onCorrectAnswer: () => void;
  };
};

export class StudentSocketFacade {
  private socketClient: Socket<ServerToClientEvents, ClientToServerEvents>;
  private studentId: string;

  constructor(
    { socketUrl, studentId }: StudentSocketFacadeConstructionProps,
  ) {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      socketUrl,
    );
    socket.on("quiz", (m) => {
      console.log("quiz: ", m);
    });
    socket.on("leaderboard_update", (l) => {
      console.log("leaderboard: ", l);
    });

    socket.on("new_question", (q) => {
      console.log("new q: ", q);
    });

    this.socketClient = socket;
    this.studentId = studentId;
  }

  /**
   *  closing must be handled in the component
   */
  public closeConnection() {
    this.socketClient.close();
  }

  sendAnswer(startTime: Date, choice: number): void {
    const sentTime = new Date();
    const timeDiff = getTimeDiff(startTime, sentTime);

    const answer: StudentAnswer = {
      choice,
      student_id: this.studentId,
      time_miliseconds: timeDiff,
    };

    this.socketClient.emit("answer", answer);
  }
}

function getTimeDiff(start: Date, end: Date): number {
  return end.getTime() - start.getTime();
}
