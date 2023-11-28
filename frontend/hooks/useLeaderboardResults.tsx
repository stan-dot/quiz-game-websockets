import { LeaderBoardStatus } from "@/app/types";
import { mockLeaderboard } from "@/data/mockLeaderboard";


// todo fix this
export function useLeaderboardResults(quizId: string):LeaderBoardStatus | undefined {
  return mockLeaderboard;
}
