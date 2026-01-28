import { CanaryString } from "@/components/canary-string";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/authless-server";
import { cn } from "@/lib/utils";
import { ChevronDown, Terminal } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Callout } from "./components/callout";
import { LeaderboardChart } from "./components/leaderboard-chart";
import { getLeaderboard } from "./leaderboard/actions";
import { TaskGrid } from "./registry/[name]/[version]/components/task-grid";

const getTasks = async (retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const supabase = await createClient();

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      const { data: tasks, error } = await supabase
        .from("task")
        .select("*")
        .order("id", { ascending: true })
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (error) {
        console.error(`Supabase error (attempt ${attempt}/${retries}):`, error);
        console.error("Error details:", JSON.stringify(error, null, 2));

        if (attempt < retries) {
          console.log(`Retrying in ${attempt * 1000}ms...`);
          await new Promise(resolve => setTimeout(resolve, attempt * 1000));
          continue;
        }
        return []; // Return empty array after all retries exhausted
      }

      // console.log("Tasks fetched successfully:", tasks);
      return tasks || [];
    } catch (error) {
      console.error(`Timeout or error fetching tasks (attempt ${attempt}/${retries}):`, error);

      if (attempt < retries) {
        console.log(`Retrying in ${attempt * 1000}ms...`);
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        continue;
      }
      return []; // Return empty array on timeout after all retries
    }
  }
  return [];
};

export default async function Tasks() {
  const tasks = await getTasks();
  const leaderboard = await getLeaderboard();

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6">
      <div className="flex w-full max-w-7xl flex-1 flex-col items-center">
        <div className="flex flex-col justify-center gap-16 sm:pt-24 sm:pb-0">
          <div className="space-y-8">
            <h2 className="text-center font-mono text-3xl/tight font-medium tracking-tighter text-balance sm:mb-8 sm:text-6xl/tight">
              UEval: A Benchmark for Unified Multimodal Generation
            </h2>
            <div className="flex flex-col items-center gap-2">
              <p className="text-center font-mono text-sm text-fd-muted-foreground">
                <a href="https://primerl.github.io/" className="hover:underline">Bo Li</a>
                {", "}
                <a href="https://davidyyd.github.io" className="hover:underline">Yida Yin</a>
                {", "}
                <a href="https://wenhaochai.com/" className="hover:underline">Wenhao Chai</a>
                {", "}
                <a href="https://zeyofu.github.io/" className="hover:underline">Xingyu Fu</a>
                {"*, "}
                <a href="https://liuzhuang13.github.io" className="hover:underline">Zhuang Liu</a>
                {"*"}
              </p>
              <p className="text-center font-mono text-xs text-fd-muted-foreground">
                Princeton University
              </p>
              <p className="text-center font-mono text-xs text-fd-muted-foreground">
                (* indicates co-advising)
              </p>
            </div>
            <p className="text-fd-muted-foreground text-center font-mono tracking-tight text-balance sm:text-xl/relaxed">
              UEval comprises 1,000 expert-curated prompts that require both images and text in the model outputs, sourced from 8 diverse real-world domains.
            </p>
          </div>
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
        <div className="flex w-full flex-col items-center py-12 gap-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
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
            <Link
              href="https://github.com/EvolvingLMMs-Lab/lmms-eval"
              className={cn(
                "font-mono",
                buttonVariants({
                  variant: "secondary",
                  size: "xl",
                  className: "rounded-none",
                }),
              )}
            >
              test with lmms-eval ↗
            </Link>
          </div>

          <figure className="w-full">
            <img src="/og.png" alt="teaser" className="w-full" />
            <figcaption className="mt-2 text-left text-xs font-mono text-muted-foreground space-y-1">
              <p>Priel im Winter (Tidal Channel in Winter), 1960s</p>
              <p>Hans Grohs, 1892-1981; born Dithmarschen, Germany; died Heide, Germany</p>
              <p>Courtesy of the Princeton University Art Museum. Used with permission.</p>
            </figcaption>
          </figure>

          {/* <div className="mb-6 flex flex-col items-center gap-2">
            <p className="font-mono text-sm">view model performance</p>
            <ChevronDown className="animate-float size-4" />
          </div> */}
          <div className="w-full mb-16">
            <LeaderboardChart className="-mx-4 sm:mx-0" data={leaderboard} title="Full-Leaderboard" version="1.0" />
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
              view UEval problems
            </p>
            <ChevronDown className="animate-float size-4" />
          </div>
          {tasks && (
            <div className="-mx-4 flex flex-col gap-12 sm:mx-0 sm:gap-16">
              <TaskGrid
                tasks={tasks}
                behavior="navigate"
                showPreviewLabel={false}
              />
              <Link
                href="https://huggingface.co/datasets/primerL/UEval-test"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "xl",
                    className: "mx-auto rounded-none font-mono",
                  }),
                )}
              >
                view all UEval problems ↗
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
          <p>
            Submit your results by opening{" "}
            <a
              href="https://github.com/primerL/UEval-web/issues"
              className="text-foreground underline underline-offset-4"
            >
              an issue in our GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-end">
          <CanaryString />
        </div>
      </div>
    </div>
  );
}
