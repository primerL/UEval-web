"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LeaderboardCPEntry } from "../actions";

export const cpColumns: ColumnDef<LeaderboardCPEntry>[] = [
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
    id: "pass@5",
    header: () => <p className="text-right">Pass@5</p>,
    cell: ({ row }) => {
      const pass5 = row.original["pass@5"];
      return (
        <p className="text-right">
          {pass5 !== null ? (
            <span className="font-bold">{(pass5 * 100).toFixed(1)}%</span>
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
    id: "score@5",
    header: () => <p className="text-right">Score@5</p>,
    cell: ({ row }) => {
      const score5 = row.original["score@5"];
      return (
        <p className="text-right">
          {score5 !== null ? (
            <span className="font-bold">{(score5 * 100).toFixed(1)}%</span>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          )}
        </p>
      );
    },
  },
  {
    id: "avg@5",
    header: () => <p className="text-right">Avg@5</p>,
    cell: ({ row }) => {
      const avg5 = row.original["avg@5"];
      return (
        <p className="text-right">
          {avg5 !== null ? (
            <span className="font-bold">{(avg5 * 100).toFixed(1)}%</span>
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
