import React from "react";
import { QuizState } from "./QuizPanel";
import WaitForStartScreen from "./WaitForStartScreen";
import QuestionPanel from "./QuestionPanel";

// todo maybe that's easier inside the panel
function StateSwitch({ state }: { state: QuizState }) {
  switch (state) {
    case ("wait for start"):
      return <WaitForStartScreen />;
    case ("active question"):
      return (
        <QuestionPanel
          question={{
            text: "",
            answers: [],
          }}
          facade={undefined}
        />
      );
  }

  return <div>StateSwitch</div>;
}

export default StateSwitch;
