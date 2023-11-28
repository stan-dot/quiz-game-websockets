import React, { useState } from "react";
import { Question } from "../types";

export type QuizInit = {
  title: string;
  _id: string;
  questions: Question[];
};

type QuizCreationProps = {
  addNewQuiz: (quiz: QuizInit) => void;
};

const QuizCreationComponent: React.FC<QuizCreationProps> = ({ addNewQuiz }) => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { text: "", answers: ["", "", "", ""], correctAnswer: 0 },
  ]);

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newQuestions = questions.map((question, qIndex) => {
      if (index === qIndex) {
        if (field === "text") {
          return { ...question, text: value };
        } else if (field.startsWith("answer")) {
          const answerIndex = parseInt(field.split("_")[1]);
          const newAnswers = question.answers.map((answer, aIndex) => {
            if (aIndex === answerIndex) {
              return value;
            }
            return answer;
          });
          return { ...question, answers: newAnswers };
        } else if (field === "correctAnswer") {
          return { ...question, correctAnswer: parseInt(value) };
        }
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      text: "",
      answers: ["", "", "", ""],
      correctAnswer: 0,
    }]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newQuiz: QuizInit = {
      title: quizTitle,
      _id: Date.now().toString(), // Temporary ID generation logic
      questions,
    };
    addNewQuiz(newQuiz);
    setQuizTitle("");
    setQuestions([{ text: "", answers: ["", "", "", ""], correctAnswer: 0 }]);
  };

  return (
    <form onSubmit={handleSubmit} className="text-black m-2 p-4">
      <div id="titleFieldWrapper" className="m-2 p-2 flex flex-col">
        <label htmlFor="quizTitle">quiz title</label>
        <input
          type="text"
          placeholder="Quiz Title"
          id="quizTitle"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer 1</th>
            <th>Answer 2</th>
            <th>Answer 3</th>
            <th>Answer 4</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) =>
                    handleQuestionChange(index, "text", e.target.value)}
                />
              </td>
              {question.answers.map((answer, aIndex) => (
                <td key={aIndex}>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        `answer_${aIndex}`,
                        e.target.value,
                      )}
                  />
                </td>
              ))}
              <td>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={question.correctAnswer + 1}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "correctAnswer",
                      e.target.value,
                    )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default QuizCreationComponent;
