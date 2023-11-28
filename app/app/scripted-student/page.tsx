import React from "react";
import ScriptedQuizPanel from "./ScriptedQuizPanel";

function page() {
  // load automated quiz
  // send automatic responses as soon as sockets response
  // click end quiz
  return (
    <div>
      <h2 className="text-4xl font-bold">
        Testing panel
      </h2>
      <ScriptedQuizPanel />
    </div>
  );
}

export default page;
