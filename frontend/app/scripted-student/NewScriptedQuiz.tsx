"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  StudentSocketFacade,
  StudentSocketFacadeConstructionProps,
} from "../student/StudentSocketsFacade";
import { LeaderBoardStatus } from "@prisma/client";
import WaitForStartScreen from "../student/WaitForStartScreen";

// NOTE - for testing purposes
const s: StudentSocketFacadeConstructionProps = {
  socketUrl: "",
  studentId: "1",
  quizId: "4",
};

// todo state must flow deterministically from the sockets, it is useless to keep another variable just for that
function NewScriptedQuiz() {
  let facade = useRef<StudentSocketFacade | undefined>();
  useEffect(() => {
    facade.current = new StudentSocketFacade(s);
    return () => {
      facade.current && facade.current.closeConnection();
    };
  }, []);

  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardStatus>();

  const quizState = "wait for start";
  let componentToRender;
  switch (quizState) {
    case "wait for start":
      componentToRender = <WaitForStartScreen />;
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

export default NewScriptedQuiz;
