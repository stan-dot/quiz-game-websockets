import React from "react";
import QuizPanel from "./QuizPanel";
import { StudentSocketFacade } from "./StudentSocketsFacade";

// todo must read the query as ID, from the params
function page() {
  const studentId = "1";
const socketUrl = "http://localhost:3000";
  return (
    <div>
      <h3>
        Student
      </h3>
      <QuizPanel />
    </div>
  );
}

export default page;
