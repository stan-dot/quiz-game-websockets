import React from "react";
import ScriptedQuizPanel from "./ScriptedQuizPanel";
import { PageHeader } from "../shared-components/PageHeader";

function page() {
  // load automated quiz
  // send automatic responses as soon as sockets response
  // click end quiz
  return (
    <div>
      <PageHeader text={"Testing panel"} />
      <ScriptedQuizPanel />
    </div>
  );
}

export default page;
