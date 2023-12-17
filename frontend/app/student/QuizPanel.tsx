"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import LeaderBoardPanel from "./LeaderBoardPanel";
import QuestionPanel from "./QuestionPanel";
import { StudentSocketFacade } from "./StudentSocketsFacade";
import WaitForStartScreen from "./WaitForStartScreen";
import WaitForOtherAnswers from "./WaitForOtherAnswers";

export type QuizState =
  | "wait for start"
  | "active question"
  | "waiting for others' answers"
  | "leaderboard"
  | "finished";

function QuizPanel() {
  const params = useSearchParams();
  const studentId = params.get("student_id") ?? "1";
  const socketUrl = params.get("socket_url") ?? "http://localhost:8000";
  console.log("id , socket: ", studentId, socketUrl);
  const facade = new StudentSocketFacade({ socketUrl, studentId }); // yeah do it herre but in the use hook

  const socketFacade = useMemo(() => {
    return new StudentSocketFacade({ socketUrl, studentId });
  }, [socketUrl, studentId]); // Dependencies on which the instance should be recreated

  const [text, setText] = useState<string>("");
  const [quizState, setQuizState] = useState<QuizState>("wait for start");
  const leaderBoard = useLeaderboardResults("4");

  if (!params.has("student_id") || !params.has("socket_url")) {
    return <p>error</p>;
  }

  let componentToRender;
  switch (quizState) {
    case "wait for start":
      componentToRender = <WaitForStartScreen />;
      break;
    case "active question":
      componentToRender = (
        <QuestionPanel
          question={{
            text: "",
            answers: [],
          }}
          facade={socketFacade}
        />
      );
      break;
      // ... other cases
    case "leaderboard":
      componentToRender = leaderBoard
        ? <LeaderBoardPanel leaderBoard={leaderBoard} studentId={studentId} />
        : <p>no leaderBoard</p>;
      break;
    case "waiting for others' answers":
      componentToRender = <WaitForOtherAnswers />;
      break;
    case "finished":
      componentToRender = leaderBoard
        ? <LeaderBoardPanel leaderBoard={leaderBoard} studentId={"4"} />
        : <p>no leaderBoard</p>;
      break;
  }

  return (
    <div>
      <h2>
        QuizPanel
      </h2>
      <div>
        {componentToRender}
      </div>
    </div>
  );
}

export default QuizPanel;
