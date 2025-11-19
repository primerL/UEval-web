"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LeaderboardEntry } from "../actions";

const formatScore = (value: number | null) =>
  value !== null ? value.toFixed(1) : null;

export const cpColumns: ColumnDef<LeaderboardEntry>[] = [
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
    id: "Avg",
    header: () => <p className="text-right">Avg</p>,
    cell: ({ row }) => {
      const value = formatScore(row.original.Avg);
      return (
        <p className="text-right">
          {value !== null ? (
            <span className="font-bold">{value}</span>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          )}
        </p>
      );
    },
  },
  ...(["Art", "Diagram", "Exercise", "Life", "Paper", "Space", "Tech", "Textbook"] as const).map(
    (field): ColumnDef<LeaderboardEntry> => ({
      id: field,
      header: () => <p className="text-right">{field}</p>,
      cell: ({ row }) => {
        const value = formatScore(row.original[field]);
        return (
          <p className="text-right">
            {value !== null ? (
              <span>{value}</span>
            ) : (
              <span className="text-muted-foreground">N/A</span>
            )}
          </p>
        );
      },
    }),
  ),
  {
    header: "Date",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
];
