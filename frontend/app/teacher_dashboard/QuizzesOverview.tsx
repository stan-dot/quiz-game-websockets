"use client";
import React, { useState } from "react";
import { useQuizzesHook } from "../../hooks/useQuizzesHook";
import QuizTable from "./QuizTable";
import { Modal } from "../shared-components/Modal";
import QuizCreationComponent from "./QuizCreationComponent";
import { addNewQuiz } from "../../lib/addNewQuiz";
import { Prisma } from "@prisma/client";

function QuizzesOverview() {
  const quizzes = useQuizzesHook();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (quiz) => {
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
