import { GridItem } from "@/components/grid";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/lib/supabase/database.types";
import { CopyButton } from "./copy-button";
import { TaskImage } from "./task-image";

type TaskCardProps = {
  task: Tables<"task">;
  behavior?: "filter" | "navigate";
  showPreviewLabel?: boolean;
};

export function TaskCard({
  task,
  behavior,
  showPreviewLabel = true,
}: TaskCardProps) {
  const category = task["task-category"] ?? "uncategorized";
  const taskName = task["task-name"] ?? `Task ${task.id}`;
  const description = task["task-description"];
  const hasPreview = Boolean(task?.gt_image);
  const previewLabel = showPreviewLabel
    ? "reference (ground truth) image"
    : undefined;

  // For task, use fixed dataset values
  // TODO: Change dataset name and version
  const datasetName = "UEval";
  const datasetVersion = "1.0";
  const taskId = task["id"].toString();

  return (
    <GridItem href={`/registry/${datasetName}/${datasetVersion}/${taskId}`}>
      <div className="flex min-h-[360px] flex-1 flex-col gap-4 py-6">
        {hasPreview && (
          <TaskImage
            data={task.gt_image}
            alt={`${taskName} reference image`}
            label={previewLabel}
            wrapperClassName="px-6 justify-start"
            figureClassName="items-start gap-3"
            imageClassName="h-48 w-full max-h-none rounded-lg border bg-background object-cover p-0 shadow-sm"
            captionClassName="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          />
        )}
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
