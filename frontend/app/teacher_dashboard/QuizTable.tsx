import React from "react";
import { redirect } from "next/navigation";
import { PageHeader } from "../shared-components/PageHeader";
import Link from "next/link";
import { Quiz } from "@prisma/client";

function QuizTable({ quizzes }: { quizzes: Quiz[] }) {
  const total = quizzes.reduce(
    (p: number, c) => p + c.questions.length,
    0,
  );

  return (
    <div>
      <PageHeader text={"Quizzes table"} />
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>number of questions</th>
            <th>Go To quiz</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((q, t) => {
            return (
              <tr
                key={q._id}
              >
                <td>{q.title}</td>
                <td>{q.questions.length}</td>
                <td>
                  <Link href={`/teacher_dashboard/quizzes/${q._id}`}>
                    Go to quiz
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>TOTAL questions</td>
            <td>
              {total}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default QuizTable;
