import { LeaderBoardStatus } from "@prisma/client";
import React from "react";

type LeaderBoardPanelProps = {
  leaderBoard: LeaderBoardStatus;
  studentId: string;
  final?: boolean;
};

function LeaderBoardPanel(
  { leaderBoard, studentId, final }: LeaderBoardPanelProps,
) {
  return (
    <div>
      LeaderBoardPanel
      <div>
        <h3>{final ?? "FINAL! "}{leaderBoard.QuizName}</h3>
        <ol>
          {leaderBoard.QuizName.map((r, i) => {
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
