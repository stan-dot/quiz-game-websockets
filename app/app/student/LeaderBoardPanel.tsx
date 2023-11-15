import React from "react";
import { LeaderBoardStatus } from "../types";

// todo consider adding quiz name
function LeaderBoardPanel(
  { leaderBoard, studentId }: {
    leaderBoard: LeaderBoardStatus;
    studentId: string;
  },
) {
  return <div>
    LeaderBoardPanel
    <div>
      <ol>

        {leaderBoard.rows.map((r, i) => {
          return <li key={i}>

      </li>
    })}
    </ol>
    </div>

  </div>;
}

export default LeaderBoardPanel;
