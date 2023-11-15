"use client";
import { QuizData } from "@/app/types";
import React from "react";
import { TeacherSocketFacade } from "../TeacherSocketsFacade";

// todo ask chat about the best way to handle downstream state - whether in the smaller component or higher up
type QuizStateTeacherEnd = {
  data: QuizData;
  currentQuestion: number;
  answeredStatus: {
    [studentId: string]: boolean;
  };
};

const exampleState: QuizStateTeacherEnd = {
  data: {
    title: "",
    _id: "",
    questions: [],
  },
  currentQuestion: 0,
  answeredStatus: {},
};

// todo ask chat if dictionary or list better here
function MonitorQuiz({ socketFacade }: { socketFacade: TeacherSocketFacade }) {
  // todo these must change very dynamically
  const statuses = Object.getOwnPropertyNames(exampleState.answeredStatus);
  const doneIdsArray = statuses.filter((id) => exampleState.answeredStatus[id]);
  return (
    <div>
      MonitorQuiz
      <div id="progressBar">
        {exampleState.currentQuestion} out of{" "}
        {exampleState.data.questions.length}
      </div>
      <div id="studentTimingTable">
        <div>
          total students = {statuses.length}
        </div>
        <div>
          done students = {doneIdsArray.length}
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
