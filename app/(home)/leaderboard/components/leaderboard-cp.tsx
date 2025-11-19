"use client";

import { LeaderboardEntry } from "../actions";
import { cpColumns } from "./columns-cp";
import { DataTable } from "./data-table";

export function LeaderboardCP({
  rows,
  className,
}: {
  rows: LeaderboardEntry[];
  className?: string;
}) {
  return (
    <DataTable
      columns={cpColumns}
      data={rows}
      className={className}
    />
  );
}
