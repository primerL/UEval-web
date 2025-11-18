import { CanaryString } from "@/components/canary-string";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/authless-server";
import { cn } from "@/lib/utils";
import { ChevronDown, Terminal } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Callout } from "./components/callout";
import { LeaderboardChart } from "./components/leaderboard-chart";
import { getCPLeaderboard, getResearchLeaderboard } from "./leaderboard/actions";
import { TaskGrid } from "./registry/[name]/[version]/components/task-grid";

const getTasks = async () => {
  const supabase = await createClient();
  const { data: tasks, error } = await supabase
    .from("task")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    throw new Error(error.message);
  }

  // console.log("Tasks fetched successfully:", tasks);
  return tasks;
};

export default async function Tasks() {
  const tasks = await getTasks();
  const cpLeaderboard = await getCPLeaderboard();
  const researchLeaderboard = await getResearchLeaderboard();

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6">
      <div className="flex w-full max-w-7xl flex-1 flex-col items-center">
        <div className="flex flex-col justify-center gap-16 sm:pt-24 sm:pb-0">
          <div className="space-y-8">
            <h2 className="text-center font-mono text-3xl/tight font-medium tracking-tighter text-balance sm:mb-8 sm:text-6xl/tight">
              FrontierCS: The Next Frontier of Computer Science
            </h2>
            <p className="text-fd-muted-foreground text-center font-mono tracking-tight text-balance sm:text-xl/relaxed">
              FrontierCS is a benchmark of open-ended problems across diverse areas of computer science.
            </p>
          </div>
          <Link
          // TODO: arxiv link
            href="https://arxiv.org/abs/2506.11928"
            className={cn(
              "font-mono",
              buttonVariants({
                variant: "secondary",
                size: "xl",
                className: "rounded-none",
              }),
            )}
          >
            read our paper ↗
          </Link>
          {/* <div className="mx-auto flex max-w-3xl flex-col gap-4 md:flex-row md:gap-2">
            <Callout
              className="flex-1"
              title="introducing terminal-bench 2.0 and harbor"
              description="read our launch announcement ↗"
              href="/news/announcement-2-0"
              icon={Terminal}
            />
          </div> */}
          {/* <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-1 sm:gap-2">
            <Link
              href="https://harborframework.com/docs/running-tbench"
              className={cn(
                "font-mono",
                buttonVariants({ size: "xl", className: "rounded-none" }),
              )}
            >
              i want to test my agent
            </Link>
          </div> */}

          {/* <div className="mx-auto flex max-w-xl flex-col justify-center gap-4">
            <p className="text-center font-mono text-sm sm:text-base">
              a stanford x laude collaboration
            </p>
          </div> */}
        </div>
        <div className="flex w-full flex-col items-center py-12">
          {/* <div className="mb-6 flex flex-col items-center gap-2">
            <p className="font-mono text-sm">view model performance</p>
            <ChevronDown className="animate-float size-4" />
          </div> */}
          <div className="grid w-full grid-cols-1 gap-4 mb-16 lg:grid-cols-2">
            <LeaderboardChart className="-mx-4 sm:mx-0" data={cpLeaderboard} title="Algorithmic" version="1.0" />
            <LeaderboardChart className="-mx-4 sm:mx-0" data={researchLeaderboard} title="Research" version="1.0" />
          </div>
          <Link
            href="/leaderboard"
            className={cn(
              "font-mono",
              buttonVariants({
                variant: "secondary",
                size: "xl",
                className: "rounded-none",
              }),
            )}
          >
            view the full leaderboard ↗
          </Link>
        </div>
        <div className="flex min-h-[90vh] flex-col justify-center py-12 sm:pb-16">
          <div className="mb-4 flex flex-col items-center gap-2">
            <p className="font-mono text-sm">
              view FrontierCS problems
            </p>
            <ChevronDown className="animate-float size-4" />
          </div>
          {tasks && (
            <div className="-mx-4 flex flex-col gap-12 sm:mx-0 sm:gap-16">
              <TaskGrid tasks={tasks} behavior="navigate" />
              {/* TODO: Add link to all tasks */}
              <Link
                href="www.wenhaochai.com"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "xl",
                    className: "mx-auto rounded-none font-mono",
                  }),
                )}
              >
                view all FrontierCS problems ↗
              </Link>
            </div>
          )}
        </div>
        <div className="mb-4 flex flex-col items-center gap-2">
            <p className="font-mono text-sm">
              submit your results
            </p>
            <ChevronDown className="animate-float size-4" />
            {/* TODO: Add form here */}
            TODO: add submit guide here
          </div>
        <div className="flex flex-1 flex-col justify-end">
          <CanaryString />
        </div>
      </div>
    </div>
  );
}
