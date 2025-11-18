"use client";

import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useWindowWidth } from "@react-hook/window-size";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { LeaderboardCPEntry, LeaderboardResearchEntry } from "../leaderboard/actions";

const chartConfig = {
  score: {
    label: "Score@1",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface LeaderboardChartProps extends React.ComponentProps<"div"> {
  data: LeaderboardCPEntry[] | LeaderboardResearchEntry[];
  title?: string;
  version?: string;
}

export function LeaderboardChart({
  className,
  data,
  title = "Algorithmic",
  version = "1.0",
  ...props
}: LeaderboardChartProps) {
  const refinedData = [...data]
    .filter((entry) => entry["score@1"] !== null)
    .sort((a, b) => (b["score@1"] || 0) - (a["score@1"] || 0))
    .slice(0, 10);

  const width = useWindowWidth();

  return (
    <Card
      className={cn(
        "rounded-none border-x-0 shadow-none sm:mx-0 sm:border-x",
        className,
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="font-mono text-sm">{title}</p>
        <Link
          href={`/leaderboard/${title}/${version}`}
          className={cn(
            buttonVariants({
              variant: "link",
              size: "default",
              className:
                "text-muted-foreground hover:text-foreground -my-2 hidden rounded-none font-mono font-normal sm:inline-flex",
            }),
          )}
        >
          view full leaderboard
          <ExternalLink className="size-4" />
        </Link>
      </CardHeader>
      <Separator />
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[400px] min-h-[400px] w-full sm:h-[500px]"
        >
          <BarChart
            accessibilityLayer
            data={refinedData}
            layout="vertical"
            margin={{
              right: width > 640 ? 0 : 48,
              left: width > 640 ? 0 : -20,
            }}
          >
            <ChartTooltip
              content={
                <ChartTooltipContent className="rounded-none font-mono" />
              }
            />
            <Bar dataKey="score@1" radius={0} fill="var(--color-score)">
              <LabelList
                position={width > 768 ? "insideLeft" : "right"}
                offset={width > 768 ? 8 : width > 640 ? 42 : 12}
                className={cn(
                  "fill-background font-mono",
                  width < 768 && "fill-foreground",
                )}
                fontSize={12}
                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
              />
            </Bar>
            <YAxis
              type="category"
              className="font-mono"
              dataKey="model_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={200}
            />
            <XAxis
              type="number"
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              tickLine={false}
              axisLine={false}
              hide
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
