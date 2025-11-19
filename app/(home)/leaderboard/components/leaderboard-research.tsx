"use client";

import { LeaderboardEntry } from "../actions";
import { researchColumns } from "./columns-research";
import { DataTable } from "./data-table";

export function LeaderboardResearch({
  rows,
  className,
}: {
  rows: LeaderboardEntry[];
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
