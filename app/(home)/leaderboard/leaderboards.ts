export type LeaderboardMeta = {
  name: string;
  version: string;
  description: string;
  dataSource: "harbor" | "static" | "leaderboard-img" | "leaderboard-txt";
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
  {
    name: "Image",
    version: "1.0",
    description:
      "Leaderboard for UEval image generation evaluation.",
    dataSource: "static",
    type: "cp",
  },
  {
    name: "Text",
    version: "1.0",
    description:
      "Leaderboard for UEval text generation evaluation.",
    dataSource: "static",
    type: "cp",
  },
];
