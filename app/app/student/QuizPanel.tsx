"use client";
import { useEffect, useState } from "react";
import { StudentSocketFacade } from "./StudentSocketFacade";

// todo check web dev simplified for different ways to do this
// todo ask chat how to do that best in terms of this component
export type QuizState =
  | "wait for start" // todo add waiting for the right socket messsage saying that start
  | "active question"
  | "waiting for others' answers"
  | "leaderboard"
  | "finished";

// todo setup the socket. maybe inside hooks would be better
function QuizPanel(
  { socketUrl, studentId }: { socketUrl: string; studentId: string },
) {
  // todo should either memoize or do it in the page component
  const facade = new StudentSocketFacade(socketUrl, studentId);

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [text, setText] = useState<string>("");
  // todo possibly have this in a context, so that context consumers can move easily towards it. OTOH all triggers of this will be either locally (optimistic updates) or due to socket changes
  const [quizState, setQuizState] = useState<QuizState>("wait for start");

  useEffect(() => {
    fetch("http://localhost:8000/handler").then((x) => x.json()).then((x) =>
      setText(x)
    ).catch((e) => {
      console.error(" failed to fetch: ", e);
    });
  }, []);

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:8000/socket");
    newWs.onerror = (err) => console.error(err);
    newWs.onopen = () => setWs(newWs);
    newWs.onmessage = (msg) => setText(JSON.parse(msg.data));
    return () => {
      // newWs.close()
      // todo this was causing issues
    };
  }, []);

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
