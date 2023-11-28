"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLeaderboardResults } from "@/hooks/useLeaderboardResults";
import {
  SocketCallbackOptions,
  StudentSocketFacade,
} from "../student/StudentSocketsFacade";
import { LeaderBoardStatus, Question } from "../types";
import LeaderBoardPanel from "../student/LeaderBoardPanel";
import QuestionPanel from "../student/QuestionPanel";
import WaitForOtherAnswers from "../student/WaitForOtherAnswers";
import WaitForStartScreen from "../student/WaitForStartScreen";
import { useQuiz } from "@/hooks/useQuizById";
import { mockQuizzes } from "@/data/mockQuizzes";

type QuizState =
  | "wait for start"
  | "active question"
  | "waiting for others' answers"
  | "leaderboard"
  | "finished";

const defaultLeaderboard: LeaderBoardStatus = {
  quizName: "Loading results...",
  rows: [],
};

const defaultQuestion: Question = {
  text: "Waiting for the question...",
  answers: [],
  correctAnswer: 0,
};

function ScriptedQuizPanel() {
  // todo hardcoded bits
  const studentId = "1";
  const socketUrl = "http://localhost:8000";
  const quizId = "4";
  console.log("id , socket: ", studentId, socketUrl);
  const testingState: QuizState = "active question";
  const [quizState, setQuizState] = useState<QuizState>(testingState);
  const [lastLeaderboard, setLastLeaderboard] = useState<LeaderBoardStatus>(
    defaultLeaderboard,
  );
  const [lastQuestion, setLastQuestion] = useState<Question>(
    mockQuizzes[0].questions[0],
  );

  // todo this is temporary
  const quiz = useQuiz(quizId);
  const socketFacade = useMemo(() => {
    const callbacks: SocketCallbackOptions = {
      onNewQuiz: function (): void {
        setQuizState("wait for start");
        // todo another thing
        setLastQuestion(quiz ? quiz.questions[0] : defaultQuestion);
      },
      onLeaderBoard: (l) => {
        setLastLeaderboard(l);
        setQuizState("leaderboard");
      },
      onNewQuestion: (q) => {
        setLastQuestion(q);
        const date = new Date();
        // todo this is the only are added forced bit
        socketFacade.sendAnswer(date, 0);
        setQuizState("active question");
      },
      onCorrectAnswer: function (): void {
        throw new Error("Function not implemented.");
      },
      onFinish: function (l: LeaderBoardStatus): void {
        alert("end of the quiz");
        setQuizState("finished");
        setLastLeaderboard(l);
      },
    };
    return new StudentSocketFacade({ socketUrl, studentId, quizId, callbacks });
  }, []); // Dependencies on which the instance should be recreated. got this should never recreate

  let componentToRender;
  switch (quizState) {
    case "wait for start":
      componentToRender = <WaitForStartScreen />;
      break;
    case "active question":
      componentToRender = (
        <QuestionPanel
          question={lastQuestion}
          answerCallback={(t, a) => {
            socketFacade.sendAnswer(t, a);
            setQuizState("waiting for others' answers");
          }}
        />
      );
      break;
    case "leaderboard":
      componentToRender = (
        <LeaderBoardPanel
          leaderBoard={lastLeaderboard}
          studentId={studentId}
        />
      );
      break;
    case "waiting for others' answers":
      // todo possibly that's just an addition over the QuestionPanel
      componentToRender = <WaitForOtherAnswers />;
      break;
    case "finished":
      componentToRender = (
        <LeaderBoardPanel
          leaderBoard={lastLeaderboard}
          studentId={studentId}
          final
        />
      );
      break;
    default:
      componentToRender = <p>Error</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">{quizState}</h2>
      {componentToRender}
    </div>
  );
}

export default ScriptedQuizPanel;
