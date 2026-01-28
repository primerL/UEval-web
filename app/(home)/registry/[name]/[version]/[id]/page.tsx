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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PageProps = {
  params: Promise<{
    id: string;
    name: string;
    version: string;
  }>;
  searchParams: Promise<SearchParams>;
};

let allTasksCache: Awaited<ReturnType<typeof fetchAllTasks>> | null = null;

const fetchAllTasks = async (retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("task")
        .select('id, "task-name", "task-category", "task-description", question, gt_image, answer_image')
        .order("id", { ascending: true });

      if (error) {
        console.error(`Supabase error (attempt ${attempt}/${retries}):`, error);
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, attempt * 1000));
          continue;
        }
        return [];
      }
      return data || [];
    } catch (error) {
      console.error(`Timeout fetching tasks (attempt ${attempt}/${retries}):`, error);
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        continue;
      }
      return [];
    }
  }
  return [];
};

const getAllTasks = async () => {
  if (!allTasksCache) {
    allTasksCache = await fetchAllTasks();
  }
  return allTasksCache;
};

const getTask = async ({ id }: { id: string }) => {
  const tasks = await getAllTasks();
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    throw new Error(`Task ${id} not found`);
  }
  return task;
};

export async function generateStaticParams() {
  try {
    const tasks = await getAllTasks();
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
        {(task?.gt_image || task?.answer_image || task.question) && (
          <Section title="Example">
            {task.question && (
              <div className="prose prose-sm dark:prose-invert max-w-none font-mono wrap-anywhere">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {task.question.replace(/\\n/g, '\n')}
                </ReactMarkdown>
              </div>
            )}
            {(task?.gt_image || task?.answer_image) && (
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
            )}
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
