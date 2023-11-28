import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const texts: string[] = [
  "Compiling your genius... Please wait.",
  "Running your code through the cloud... of suspense!",
  "404: Other players' answers not found... yet!",
  "Debugging the leaderboard... Stay tuned!",
  "Your answer is in a loop waiting for the rest. Or is it a recursion?",
  "Applying CSS to the scoreboard. It’s about to look stylish!",
  "Pushing your answers to the repository... Merge conflicts may occur!",
  "Deploying next set of questions to the server. Expect downtime of... just kidding!",
  "Allocating memory for some spectacular scores...",
  "Your answers are scaling up our database. Hang tight!",
];

function WaitPanel() {
  const r = Math.floor(Math.random() * texts.length);
  return (
    <div>
      <ClipLoader
        color={"#fefefe"}
        loading={true}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div>
        <p>{texts[r]}</p>
      </div>
    </div>
  );
}

export default WaitPanel;
