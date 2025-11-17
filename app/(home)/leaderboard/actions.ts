"use server";

import { createClient } from "@/lib/supabase/authless-server";

export type LeaderboardCPEntry = {
  id: number;
  model_name: string;
  "pass@1": number | null;
  "pass@5": number | null;
  "score@1": number | null;
  "score@5": number | null;
  "avg@5": number | null;
  created_at: string;
};

export async function getCPLeaderboard(): Promise<LeaderboardCPEntry[]> {
  const client = await createClient();

  const { data, error } = await client
    .from("leaderboard-cp")
    .select("*");

  if (error) {
    console.error("Error fetching CP leaderboard:", error);
    return [];
  }

  // Sort in JavaScript instead of using .order() due to @ symbol in column name
  const sorted = (data || []).sort((a, b) => {
    const scoreA = a["score@1"] ?? -Infinity;
    const scoreB = b["score@1"] ?? -Infinity;
    return scoreB - scoreA;
  });

  return sorted;
}
