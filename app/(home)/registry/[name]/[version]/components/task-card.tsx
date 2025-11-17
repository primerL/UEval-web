import { GridItem } from "@/components/grid";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/lib/supabase/database.types";
import { CopyButton } from "./copy-button";

type TaskCardProps = {
  task: Tables<"task-example">;
  behavior?: "filter" | "navigate";
};

export function TaskCard({ task, behavior }: TaskCardProps) {
  const category = task["task-category"] ?? "uncategorized";
  const taskName = task["task-name"] ?? `Task ${task.id}`;
  const description = task["task-description"];

  return (
    <GridItem href="#">
      <div className="flex min-h-[280px] flex-1 flex-col justify-between gap-6 py-6">
        <CardHeader className="space-y-4">
          <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <CardTitle>
                <h2 className="font-mono text-xl font-medium">
                  {taskName}
                </h2>
              </CardTitle>
              <CopyButton text={taskName} successMessage="Copied task name" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="hover:bg-muted-foreground/15 font-mono transition-colors duration-200"
            >
              {category}
            </Badge>
            {/* <Badge
              variant="outline"
              className="font-mono text-xs"
            >
              ID: {task.id}
            </Badge> */}
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between">
          {description ? (
            <p className="line-clamp-6 font-mono text-sm leading-relaxed wrap-anywhere whitespace-pre-wrap">
              {description}
            </p>
          ) : (
            <p className="text-muted-foreground font-mono text-sm">
              No description provided.
            </p>
          )}
        </CardContent>
      </div>
    </GridItem>
  );
}
