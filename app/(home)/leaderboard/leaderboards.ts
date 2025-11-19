export type LeaderboardMeta = {
  name: string;
  version: string;
  description: string;
  dataSource: "leaderboard" | "leaderboard-img" | "leaderboard-txt";
  type: "cp";
};

export const leaderboards: LeaderboardMeta[] = [
  {
    name: "Full-Leaderboard",
    version: "1.0",
    description:
      "The full leaderboard for UEval, covering all domains and tasks.",
    dataSource: "leaderboard",
    type: "cp",
  },
  {
    name: "Image",
    version: "1.0",
    description:
      "Leaderboard for UEval image generation evaluation.",
    dataSource: "leaderboard-img",
    type: "cp",
  },
  {
    name: "Text",
    version: "1.0",
    description:
      "Leaderboard for UEval text generation evaluation.",
    dataSource: "leaderboard-txt",
    type: "cp",
  },
];
