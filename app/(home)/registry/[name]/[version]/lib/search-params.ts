import { Tables } from "@/lib/supabase/database.types";
import { createLoader, parseAsString } from "nuqs/server";
import { parseAsSetOfStrings } from "./parse-as-set-of-strings-server";

export const searchParams = {
  search: parseAsString.withDefault(""),
  categories: parseAsSetOfStrings.withDefault(new Set()),
  tags: parseAsSetOfStrings.withDefault(new Set()),
  difficulties: parseAsSetOfStrings.withDefault(new Set()),
};

export const loadSearchParams = createLoader(searchParams);

export const filterTasks = (
  tasks: Tables<"task">[],
  query: string,
  categories: Set<string>,
  tags: Set<string>,
  difficulties: Set<string>,
) => {
  return tasks.filter((task) => {
    const taskName = task["task-name"]?.toLowerCase() ?? "";
    const taskDescription = task["task-description"]?.toLowerCase() ?? "";
    const taskCategory = task["task-category"] ?? "uncategorized";

    const matchesSearch =
      query === "" ||
      taskName.includes(query.toLowerCase()) ||
      taskDescription.includes(query.toLowerCase());

    const matchesCategories =
      categories.size === 0 || categories.has(taskCategory);

    return matchesSearch && matchesCategories;
  });
};
