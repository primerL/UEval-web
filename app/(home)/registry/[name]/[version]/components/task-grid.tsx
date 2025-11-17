import { Grid } from "@/components/grid";
import { Tables } from "@/lib/supabase/database.types";
import { TaskCard } from "./task-card";

interface TaskGridProps {
  tasks: Tables<"task-example">[];
  behavior?: "filter" | "navigate";
}

export function TaskGrid({ tasks, behavior }: TaskGridProps) {
  return (
    <Grid>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} behavior={behavior} />
      ))}
    </Grid>
  );
}
