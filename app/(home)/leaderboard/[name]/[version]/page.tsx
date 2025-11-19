import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CodeBlock } from "@/components/ui/code-block";
import { getLeaderboard } from "../../actions";
import { LeaderboardCP } from "../../components/leaderboard-cp";
import { leaderboards } from "../../leaderboards";
import { notFound } from "next/navigation";

type LeaderboardPageProps = {
  params: Promise<{
    name: string;
    version: string;
  }>;
};

export async function generateStaticParams() {
  return leaderboards.map(({ name, version }) => ({ name, version }));
}

export default async function LeaderboardPage({
  params,
}: LeaderboardPageProps) {
  const resolvedParams = await params;
  const leaderboard = leaderboards.find(
    (lb) => lb.name === resolvedParams.name && lb.version === resolvedParams.version,
  );

  if (!leaderboard) {
    notFound();
  }

  const { name, version } = leaderboard;
  const rows = await getLeaderboard();
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
        <CodeBlock
          lang="bash"
          title={`${name} overview`}
          code={`# ${leaderboard.description}`}
          className="mb-6 font-mono"
        />
        <LeaderboardCP
          rows={rows}
          className="-mx-4 md:mx-0"
        />
      </div>
    </div>
  );
}
