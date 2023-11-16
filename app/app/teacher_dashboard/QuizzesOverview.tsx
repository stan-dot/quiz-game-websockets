"use client";

import React, { useState } from "react";
import { QuizData } from "../types";
import { useQuizzesHook } from "./useQuizzesHook";
import QuizTable from "./QuizTable";
import { Modal } from "./Modal";
import QuizCreationComponent from "./QuizCreationComponent";

function QuizzesOverview() {
  const quizzes: QuizData[] = useQuizzesHook();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (quiz: QuizData) => {
    handleCloseModal();
    addNewQuiz(quiz);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Create New Quiz</button>
      <Modal isOpen={isModalOpen} close={handleCloseModal}>
        <QuizCreationComponent addNewQuiz={handleSubmit} />
      </Modal>

      <QuizTable quizzes={quizzes} />
    </div>
  );
}

export default QuizzesOverview;

function addNewQuiz(quiz: QuizData) {
  // todo must use Mongo db connector here. or a facade
  throw new Error("Function not implemented.");
}
