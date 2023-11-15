import { Quiz } from "@/app/types";
import { redirect } from "next/navigation";
import React from "react";
import QuizCard from "../../QuizCard";

export async function getServerSideProps() {
  // todo fetch from Mongo and with the right type
  const { initialData } = await fetch(
    "http://localhost:8000/handler-initial-data",
  ).then((x) => x.json());
  return {
    props: {
      data: initialData ?? null,
    },
  };
}

function QuizPage({ data }: { data: Quiz }) {
  return (
    <div>
      <button
        onClick={() => {
          redirect("/teacher_dashboard");
        }}
      >
        go back
      </button>
      <QuizCard quiz={data} />
    </div>
  );
}

export default QuizPage;
