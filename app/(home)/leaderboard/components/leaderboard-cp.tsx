"use client";

import { LeaderboardCPEntry } from "../actions";
import { cpColumns } from "./columns-cp";
import { DataTable } from "./data-table";

export function LeaderboardCP({
  rows,
  className,
}: {
  rows: LeaderboardCPEntry[];
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
