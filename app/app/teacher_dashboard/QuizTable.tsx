import React from "react";
import { QuizData } from "../types";
import { redirect } from "next/navigation";

function QuizTable({ quizzes }: { quizzes: QuizData[] }) {
  const total = quizzes.reduce(
    (p: number, c: QuizData) => p + c.questions.length,
    0,
  );
  return (
    <div>
      <h3>
        QuizTable
      </h3>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>number of questions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((q, t) => {
            return (
              <tr
                key={q._id}
                onClick={() => {
                  redirect(`/teacher_dashboard/quizzes/${q._id}`);
                }}
              >
                <td>{q.title}</td>
                <td>{q.questions.length}</td>
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
