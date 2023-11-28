"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLeaderboardResults } from "@/hooks/useLeaderboardResults";
import { StudentSocketFacade } from "../student/StudentSocketsFacade";
import { LeaderBoardStatus, Question } from "../types";
import LeaderBoardPanel from "../student/LeaderBoardPanel";
import QuestionPanel from "../student/QuestionPanel";
import WaitForOtherAnswers from "../student/WaitForOtherAnswers";

export type QuizState =
  | "wait for start"
  | "active question"
  | "waiting for others' answers"
  | "leaderboard"
  | "finished";

function ScriptedQuizPanel() {
  const params = useSearchParams();
  const studentId = params.get("student_id") ?? "1";
  const socketUrl = params.get("socket_url") ?? "http://localhost:8000";
  console.log("id , socket: ", studentId, socketUrl);

  const socketFacade = useMemo(() => {
    return new StudentSocketFacade({ socketUrl, studentId });
  }, [socketUrl, studentId]); // Dependencies on which the instance should be recreated

  const [text, setText] = useState<string>("");
  const [quizState, setQuizState] = useState<QuizState>("wait for start");
  const [lastLeaderboard, setLastLeaderboard] = useState<LeaderBoardStatus>();
  const [lastQuestion, setLastQuestion] = useState<Question>();

  let componentToRender;
  switch (quizState) {
    case "wait for start":
      componentToRender = <p>waiting for start</p>;
      break;
    case "active question":
      componentToRender = (
        <QuestionPanel
          question={lastQuestion}
          answerCallback={socketFacade.sendAnswer}
        />
      );
      break;
      // ... other cases
    case "leaderboard":
      componentToRender = lastLeaderboard
        ? (
          <LeaderBoardPanel
            leaderBoard={lastLeaderboard}
            studentId={studentId}
          />
        )
        : <p>no leaderBoard</p>;
      break;
    case "waiting for others' answers":
      componentToRender = <WaitForOtherAnswers />;
      break;
    case "finished":
      componentToRender = lastLeaderboard
        ? (
          <LeaderBoardPanel
            leaderBoard={lastLeaderboard}
            studentId={studentId}
          />
        )
        : <p>no leaderBoard</p>;
      break;
  }

  return (
    <div>
      {componentToRender}
    </div>
  );
}

export default ScriptedQuizPanel;
