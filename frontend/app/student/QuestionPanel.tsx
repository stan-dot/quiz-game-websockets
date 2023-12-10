import React from "react";
import { StudentSocketFacade } from "./StudentSocketsFacade";
import Image from "next/image";
import { Question } from "@prisma/client";

const defaultImageUrl = "/placeholder-image-square.jpg";
const fourColors: string[] = ["#990000", "#009900", "#000099", "#B0B000"];

function QuestionPanel(
  { question, answerCallback }: {
    question: Question;
    answerCallback: (time: Date, answerNumber: number) => void;
  },
) {
  const startTime = new Date();
  return (
    <div className=" flex flex-col">
      QuestionPanel
      <div id="image">
        <Image
          src={question.imageUrl ?? defaultImageUrl}
          alt={"Question image"}
          height={200}
          width={200}
        />
      </div>
      <p className="font-bold">
        {question.Text}
      </p>
      <div className="w-full h-full grid grid-cols-2">
        {question.Answers.map((a, i) => {
          return (
            <button
              className="w-[50vw] h-[50vh] m-0"
              style={{ backgroundColor: fourColors[i] }}
              key={i}
              onClick={() => answerCallback(startTime, i)}
            >
              {a}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionPanel;
