"use client";

import { LeaderboardResearchEntry } from "../actions";
import { researchColumns } from "./columns-research";
import { DataTable } from "./data-table";

export function LeaderboardResearch({
  rows,
  className,
}: {
  rows: LeaderboardResearchEntry[];
  className?: string;
}) {
  return (
    <DataTable
      columns={researchColumns}
      data={rows}
      className={className}
    />
  );
}
