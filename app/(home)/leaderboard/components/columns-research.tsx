"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LeaderboardResearchEntry } from "../actions";

export const researchColumns: ColumnDef<LeaderboardResearchEntry>[] = [
  {
    id: "rank",
    header: "Rank",
    accessorFn: (row, index) => index + 1,
    cell: ({ row }) => {
      return <span>{row.getValue("rank")}</span>;
    },
  },
  {
    accessorKey: "model_name",
    header: "Model Name",
    cell: ({ row }) => {
      const modelName = row.original.model_name;
      return <span>{modelName || "Unknown"}</span>;
    },
  },
  {
    id: "pass@1",
    header: () => <p className="text-right">Pass@1</p>,
    cell: ({ row }) => {
      const pass1 = row.original["pass@1"];
      return (
        <p className="text-right">
          {pass1 !== null ? (
            <span className="font-bold">{(pass1 * 100).toFixed(1)}%</span>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          )}
        </p>
      );
    },
  },
  {
    id: "score@1",
    header: () => <p className="text-right">Score@1</p>,
    cell: ({ row }) => {
      const score1 = row.original["score@1"];
      return (
        <p className="text-right">
          {score1 !== null ? (
            <span className="font-bold">{(score1 * 100).toFixed(1)}%</span>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          )}
        </p>
      );
    },
  },
  {
    header: "Date",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
];
