import { Grid } from "@/components/grid";
import { Tables } from "@/lib/supabase/database.types";
import { TaskCard } from "./task-card";

interface TaskGridProps {
  tasks: Tables<"task">[];
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
