"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LeaderboardEntry } from "../actions";
import { cpColumns } from "./columns-cp";

// Placeholder until image/text leaderboards are implemented separately.
export const researchColumns: ColumnDef<LeaderboardEntry>[] = cpColumns;
