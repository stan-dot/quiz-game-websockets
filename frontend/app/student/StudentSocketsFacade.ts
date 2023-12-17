import { Prisma } from "@prisma/client";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  quiz: (m: Prisma.ModelName) => void;
  new_question: (q: Question) => void;
  leaderboard_update: (l: LeaderBoardStatus) => void;
  correctAnswer: (a: { index: number }) => void;
  finish: (l: LeaderBoardStatus) => void;
  // todo more events - new player joined event
}

interface ClientToServerEvents {
  participationPing: () => void;
  answer: (a: StudentAnswer) => void;
}

export type SocketCallbackOptions = {
  onNewQuiz: () => void;
  onLeaderBoard: (l: LeaderBoardStatus) => void;
  onNewQuestion: (q: Question) => void;
  onCorrectAnswer: () => void;
  onFinish: (l: LeaderBoardStatus) => void;
};

export type StudentSocketFacadeConstructionProps = {
  socketUrl: string;
  studentId: string;
  quizId: string;
  callbacks?: SocketCallbackOptions;
};

export class StudentSocketFacade {
  private socketClient: Socket<ServerToClientEvents, ClientToServerEvents>;
  private studentId: string;
  private quizId: string;

  constructor(
    { socketUrl, studentId, quizId }: StudentSocketFacadeConstructionProps,
  ) {
    this.quizId = quizId;
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
