"use client";
import React from "react";
import { TeacherSocketFacade } from "../TeacherSocketsFacade";
import { Quiz } from "@prisma/client";

type QuizStateTeacherEnd = {
  data: Quiz;
  currentQuestion: number;
  studentAnswerStatus: { studentId: string; done: boolean }[];
  // todo that must cooperate with the backend server
};

// so it looks that if individual student lookups arent' that important, a list is better fair enough
const exampleState: QuizStateTeacherEnd = {
  data: {
    Title: "",
    id: "",
  },
  currentQuestion: 0,
  studentAnswerStatus: [],
};

function MonitorQuiz() {
  const socketFacade = new TeacherSocketFacade("http://localhost:8000", "4");

  return (
    <div>
      MonitorQuiz
      <div id="progressBar">
        {exampleState.currentQuestion} out of{" "}
        {/* {exampleState.data.questions.length} */}
      </div>
      <div id="studentTimingTable">
        <div>
          total students = {exampleState.studentAnswerStatus.length}
        </div>
        <div>
          done students ={" "}
          {exampleState.studentAnswerStatus.filter((a) => a.done).length}
        </div>
      </div>
      <div id="controlPanel">
        <button
          onClick={() => {
            socketFacade.nextQuestion();
          }}
        >
          next question
        </button>
      </div>
    </div>
  );
}

export default MonitorQuiz;
