import React from "react";
import Link from "next/link";
import QuizzesOverview from "./QuizzesOverview";

function page() {
  return (
    <div>
      <QuizzesOverview />
      <Link href="/teacher_dashboard">See classes</Link>
    </div>
  );
}

export default page;
