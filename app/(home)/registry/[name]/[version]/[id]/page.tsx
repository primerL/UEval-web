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
import { TaskDemo } from "./components/task-demo";
import { TaskHeader } from "./components/task-header";
import { TaskInstruction } from "./components/task-instruction";
import { TaskTags } from "./components/task-tags";
import { TaskUsage } from "./components/task-usage";
import { TaskImage } from "../components/task-image";
import { Section } from "./components/section";

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

  // console.log("Task fetched successfully:", task);
  return task;
};

export async function generateStaticParams() {
  try {
    const supabase = await createClient();

    // Add timeout protection with AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const { data: tasks, error } = await supabase
      .from("task")
      .select("id")
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);

    if (error) {
      console.error("Failed to fetch tasks for generateStaticParams:", error);
      return [];
    }

    if (!tasks || tasks.length === 0) {
      return [];
    }

    return tasks.map((task) => ({
      name: 'UEval',
      version: '1.0',
      id: task.id.toString(),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    // Return empty array to allow build to continue without static params
    // Pages will be generated on-demand if needed
    return [];
  }
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
          name={task["task-name"] ?? "Untitled Task"}
          category={task["task-category"] ?? "uncategorized"}
        />
        <TaskInstruction
          instruction={task["task-description"] ?? "No description available"}
        />
        {(task?.gt_image || task?.answer_image) && (
          <Section title="Example">
            <div className="grid gap-4 sm:grid-cols-2">
              <TaskImage
                data={task?.gt_image}
                alt="Ground truth image"
                label="reference (ground truth) image"
              />
              <TaskImage
                data={task?.answer_image}
                alt="Answer image"
                label="model generated image"
              />
            </div>
          </Section>
        )}
        {/* {task["author-name"] !== "unknown" && task["author-name"] !== "anonymous" && (
          <p className="text-muted-foreground font-mono text-sm">
            Created by {task["author-name"]}
          </p>
        )} */}
        {/* <div className="flex flex-1 flex-col justify-end">
          <CanaryString />
        </div> */}
      </div>
    </div>
  );
}
