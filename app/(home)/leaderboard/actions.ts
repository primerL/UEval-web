import { createClient } from "@/lib/supabase/authless-server";
import { Tables } from "@/lib/supabase/database.types";

type SourceTable = "leaderboard" | "leaderboard-img" | "leaderboard-txt";
export type LeaderboardEntry = Tables<SourceTable>;

export async function getLeaderboard(source: SourceTable = "leaderboard", retries = 3): Promise<LeaderboardEntry[]> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const client = await createClient();

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      const { data, error } = await client
        .from(source)
        .select("*")
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (error) {
        console.error(`Error fetching leaderboard (attempt ${attempt}/${retries}):`, error);

        if (attempt < retries) {
          console.log(`Retrying in ${attempt * 1000}ms...`);
          await new Promise(resolve => setTimeout(resolve, attempt * 1000));
          continue;
        }
        return [];
      }

      // Sort by Avg descending, with nulls last.
      const sorted = (data || []).sort((a, b) => {
        const scoreA = a.Avg ?? -Infinity;
        const scoreB = b.Avg ?? -Infinity;
        return scoreB - scoreA;
      });

      return sorted;
    } catch (error) {
      console.error(`Timeout or error fetching leaderboard (attempt ${attempt}/${retries}):`, error);

      if (attempt < retries) {
        console.log(`Retrying in ${attempt * 1000}ms...`);
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        continue;
      }
      return [];
    }
  }
  return [];
}
