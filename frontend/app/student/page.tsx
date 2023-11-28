import React from "react";
import QuizPanel from "./QuizPanel";
import { useSearchParams } from "next/navigation";

function StudentPage() {
  return (
    <div>
      <QuizPanel />
    </div>
  );
}

export default StudentPage;
