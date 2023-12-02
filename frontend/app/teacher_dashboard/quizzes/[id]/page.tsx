import { QuizData } from "@/app/types";
import Link from "next/link";
import QuizCard from "../../QuizCard";

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
