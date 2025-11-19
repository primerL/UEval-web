export type LeaderboardMeta = {
  name: string;
  version: string;
  description: string;
  dataSource: "harbor" | "static";
  type: "cp";
};

export const leaderboards: LeaderboardMeta[] = [
  {
    name: "Full-Leaderboard",
    version: "1.0",
    description:
      "The full leaderboard for UEval, covering all domains and tasks.",
    dataSource: "static",
    type: "cp",
  },
];
