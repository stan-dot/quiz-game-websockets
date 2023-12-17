import React from "react";
import ScriptedQuizPanel from "./ScriptedQuizPanel";
import { PageHeader } from "../shared-components/PageHeader";
import NewScriptedQuiz from "./NewScriptedQuiz";

function page() {
  // load automated quiz
  // send automatic responses as soon as sockets response
  // click end quiz
  return (
    <div>
      <PageHeader text={"Testing panel"} />
      <NewScriptedQuiz />
      {/* <ScriptedQuizPanel /> */}
    </div>
  );
}

export default page;
