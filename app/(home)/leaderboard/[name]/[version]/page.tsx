import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CodeBlock } from "@/components/ui/code-block";
import { getCPLeaderboard } from "../../actions";
import { LeaderboardCP } from "../../components/leaderboard-cp";
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
    { name: "FrontierCS", version: "1.0", type: "cp" as const },
  ];

  const leaderboard = validLeaderboards.find(
    (lb) => lb.name === name && lb.version === version,
  );

  if (!leaderboard) {
    notFound();
  }

  // Fetch the appropriate data
  const rows = await getCPLeaderboard();

  const codeBlock = (
    <CodeBlock
      lang="bash"
      title="FrontierCS Leaderboard - Competitive Programming Benchmark"
      code={`# Submit your scores to the leaderboard`}
      className="mb-6 font-mono"
    />
  );

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
        <LeaderboardCP
          rows={rows}
          className="-mx-4 md:mx-0"
        />
      </div>
    </div>
  );
}
