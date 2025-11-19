import { createClient } from "@/lib/supabase/authless-server";
import { Tables } from "@/lib/supabase/database.types";

export type LeaderboardEntry = Tables<"leaderboard">;

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const client = await createClient();

  const { data, error } = await client
    .from("leaderboard")
    .select("*");

  if (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }

  // Sort by Avg descending, with nulls last.
  const sorted = (data || []).sort((a, b) => {
    const scoreA = a.Avg ?? -Infinity;
    const scoreB = b.Avg ?? -Infinity;
    return scoreB - scoreA;
  });

  return sorted;
}
