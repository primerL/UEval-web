import { Grid } from "@/components/grid";
import { Tables } from "@/lib/supabase/database.types";
import { TaskCard } from "./task-card";

export type TaskListItem = Pick<Tables<"task">, "id" | "task-name" | "task-category" | "task-description"> & {
  gt_image?: string | null;
};

interface TaskGridProps {
  tasks: TaskListItem[];
  behavior?: "filter" | "navigate";
  showPreviewLabel?: boolean;
}

export function TaskGrid({ tasks, behavior, showPreviewLabel }: TaskGridProps) {
  return (
    <Grid>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          behavior={behavior}
          showPreviewLabel={showPreviewLabel}
        />
      ))}
    </Grid>
  );
}
