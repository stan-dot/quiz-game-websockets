import React from "react";
import QuizPanel from "./QuizPanel";
import { useSearchParams } from "next/navigation";

function StudentPage() {
  return (
    <div>
      <h3>
        Student
      </h3>
      <QuizPanel />
    </div>
  );
}

export default StudentPage;
