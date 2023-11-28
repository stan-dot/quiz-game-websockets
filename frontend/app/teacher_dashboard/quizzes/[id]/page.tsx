import { QuizData } from "@/app/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import QuizCard from "../../QuizCard";

// export async function getServerSideProps() {
//   // todo fetch from Mongo and with the right type
//   const { initialData } = await fetch(
//     "http://localhost:8000/handler-initial-data",
//   ).then((x) => x.json());
//   return {
//     props: {
//       data: initialData ?? null,
//     },
//   };
// }

function QuizPage({ data }: { data: QuizData }) {
  console.log("data: ", data);
  return (
    <div>
    <Link href={"/teacher_dashboard"}>
        go back
    </Link>
      <QuizCard quiz={data} />
    </div>
  );
}

export default QuizPage;
