"use client";
import { useEffect, useMemo, useState } from "react";
import { StudentSocketFacade } from "./StudentSocketsFacade";
import { useSearchParams } from "next/navigation";
import StateSwitch from "./StateSwitch";
import WaitForStartScreen from "./WaitForStartScreen";
import QuestionPanel from "./QuestionPanel";

export type QuizState =
  | "wait for start"
  | "active question"
  | "waiting for others' answers"
  | "leaderboard"
  | "finished";

function QuizPanel(
  // { socketUrl, studentId }: { socketUrl: string; studentId: string },
) {
  const params = useSearchParams();
  const studentId = params.get("student_id") ?? "1";
  const socketUrl = params.get("socket_url") ?? "http://localhost:8000";
  console.log("id , socket: ", studentId, socketUrl);
  const facade = new StudentSocketFacade(socketUrl, studentId); // yeah do it herre but in the use hook

  const socketFacade = useMemo(() => {
    return new StudentSocketFacade(socketUrl, studentId);
  }, [socketUrl, studentId]); // Dependencies on which the instance should be recreated

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [text, setText] = useState<string>("");
  const [quizState, setQuizState] = useState<QuizState>("wait for start");

  useEffect(() => {
    fetch("http://localhost:8000/handler").then((x) => x.json()).then((x) =>
      setText(x)
    ).catch((e) => {
      console.error(" failed to fetch: ", e);
    });
    return () => {
      ws?.close(); // NOTE important to close
    };
  }, [ws]);

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:8000/socket");
    newWs.onerror = (err) => console.error(err);
    newWs.onopen = () => setWs(newWs);
    newWs.onmessage = (msg) => setText(JSON.parse(msg.data));
    return () => {
      // newWs.close() // this was causing issues
    };
  }, []);

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
          facade={undefined}
        />
      );
      break;
      // ... other cases
  }

  return (
    <div>
      <h2>
        QuizPanel
      </h2>

      <h2>
        TextEditor
      </h2>
      <textarea
        onChange={(e) => {
          ws !== null && ws.send(JSON.stringify({
            "title": "Test document",
            "body": e.target.value,
          }));
        }}
        value={text}
      />
    </div>
  );
}

export default QuizPanel;
