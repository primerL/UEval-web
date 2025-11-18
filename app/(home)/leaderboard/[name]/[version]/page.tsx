import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CodeBlock } from "@/components/ui/code-block";
import { getCPLeaderboard, getResearchLeaderboard } from "../../actions";
import { LeaderboardCP } from "../../components/leaderboard-cp";
import { LeaderboardResearch } from "../../components/leaderboard-research";
import { notFound } from "next/navigation";

type LeaderboardPageProps = {
  params: Promise<{
    name: string;
    version: string;
  }>;
};

export default async function LeaderboardPage({
  params,
}: LeaderboardPageProps) {
  const { name, version } = await params;

  // Validate the leaderboard exists
  const validLeaderboards = [
    { name: "Algorithmic", version: "1.0", type: "cp" as const },
    { name: "Research", version: "1.0", type: "research" as const },
  ];

  const leaderboard = validLeaderboards.find(
    (lb) => lb.name === name && lb.version === version,
  );

  if (!leaderboard) {
    notFound();
  }

  // Fetch the appropriate data
  let rows;
  let codeBlock;

  if (leaderboard.type === "cp") {
    rows = await getCPLeaderboard();
    codeBlock = (
      <CodeBlock
        lang="bash"
        title="Algorithmic Problems"
        code={`# Covering Optimization tasks, Constructive tasks, and Interactive tasks`}
        className="mb-6 font-mono"
      />
    );
  } else if (leaderboard.type === "research") {
    rows = await getResearchLeaderboard();
    codeBlock = (
      <CodeBlock
        lang="bash"
        title="Research Problems"
        code={`# Spanning six major CS domains: OS, HPC, AI, DB, PL, and Security`}
        className="mb-6 font-mono"
      />
    );
  } else {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6 sm:pt-12">
      <div className="flex w-full max-w-7xl flex-col">
        <Breadcrumb className="mb-6 hidden font-mono sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/leaderboard">Leaderboards</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {name}@{version}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="font-mono text-4xl tracking-tighter">
          {name}@{version} Leaderboard
        </h2>
        {codeBlock}
        {leaderboard.type === "cp" ? (
          <LeaderboardCP
            rows={rows}
            className="-mx-4 md:mx-0"
          />
        ) : (
          <LeaderboardResearch
            rows={rows}
            className="-mx-4 md:mx-0"
          />
        )}
      </div>
    </div>
  );
}
