import React from "react";
import { LeaderBoardStatus } from "../types";

function LeaderBoardPanel(
  { leaderBoard, studentId }: {
    leaderBoard: LeaderBoardStatus;
    studentId: string;
  },
) {
  return (
    <div>
      LeaderBoardPanel
      <div>
        <h3>{leaderBoard.quizName}</h3>
        <ol>
          {leaderBoard.rows.map((r, i) => {
            return (
              <li key={`student-row-${i}`}>
                {r.studentId === studentId && <p>you</p>}
                <p>
                  {r.studenNick} .... {r.score}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default LeaderBoardPanel;
