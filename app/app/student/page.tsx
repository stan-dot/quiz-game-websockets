import React from "react";
import QuizPanel from "./QuizPanel";
import { useSearchParams } from "next/navigation";

// todo must read the query as ID, from the params
// https://nextjs.org/docs/app/api-reference/functions/use-search-params

// use this guideline on the backend
// url?student_id=2
function StudentPage() {
  const params = useSearchParams();
  console.log("params: ", params);
  if (!params.has("student_id") || !params.has("socket_url")) {
    return <p>error</p>;
  }
  const studentId = params.get("student_id") ?? "1";
  const socketUrl = params.get("socket_url") ?? "http://localhost:3000";
  return (
    <div>
      <h3>
        Student
      </h3>
      <QuizPanel socketUrl={socketUrl} studentId={studentId} />
    </div>
  );
}

export default StudentPage;
