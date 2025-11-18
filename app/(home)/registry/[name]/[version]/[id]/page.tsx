import { CanaryString } from "@/components/canary-string";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { createClient } from "@/lib/supabase/authless-server";
import { unstable_cache } from "next/cache";
import { SearchParams } from "nuqs";
import { buildTaskGithubUrl } from "../../../lib/utils";
import { TaskDemo } from "./components/task-demo";
import { TaskHeader } from "./components/task-header";
import { TaskInstruction } from "./components/task-instruction";
import { TaskTags } from "./components/task-tags";
import { TaskUsage } from "./components/task-usage";

type PageProps = {
  params: Promise<{
    id: string;
    name: string;
    version: string;
  }>;
  searchParams: Promise<SearchParams>;
};

const getTask = async ({ id }: { id: string }) => {
  const supabase = await createClient();
  const { data: task, error } = await supabase
    .from("task")
    .select("*")
    .eq("id", parseInt(id))
    .single();

  if (error) {
    console.error("Supabase error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    throw new Error(error.message);
  }

  console.log("Task fetched successfully:", task);
  return task;
};

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: tasks } = await supabase
    .from("task")
    .select("id");

  if (!tasks) {
    return [];
  }

  return tasks.map((task) => ({
    name: 'FrontierCS',
    version: '1.0',
    id: task.id.toString(),
  }));
}

export default async function Task({ params }: PageProps) {
  const { id, name, version } = await params;
  const task = await getTask({ id });

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6 sm:pt-12">
      <div className="flex w-full max-w-3xl flex-1 flex-col gap-6 font-mono">
        {/* <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/registry">Registry</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/registry/${name}/${version}`}>
                {name}=={version}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
        {/* TODO: Change task format */}
        <TaskHeader
          name={task["task-name"]}
          category={task["task-category"]}
        />
        <TaskInstruction
          instruction={task["task-description"]}
        />
        {task["author-name"] !== "unknown" && task["author-name"] !== "anonymous" && (
          <p className="text-muted-foreground font-mono text-sm">
            Created by {task["author-name"]}
          </p>
        )}
        <div className="flex flex-1 flex-col justify-end">
          <CanaryString />
        </div>
      </div>
    </div>
  );
}
