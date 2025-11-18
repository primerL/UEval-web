"use client";

import { Tables } from "@/lib/supabase/database.types";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import { parseAsSetOfStrings } from "../lib/parse-as-set-of-strings";
import { filterTasks } from "../lib/search-params";
import { TaskGrid } from "./task-grid";
import { FilterOption, TaskToolbar } from "./task-toolbar";

interface FilterableTaskGridProps {
  tasks: Tables<"task">[];
}

export function FilterableTaskGrid({ tasks }: FilterableTaskGridProps) {
  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [selectedCategories, setSelectedCategories] = useQueryState(
    "categories",
    parseAsSetOfStrings.withDefault(new Set()),
  );

  const { categories } = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        const category = task["task-category"] ?? "uncategorized";
        acc.categories[category] = (acc.categories[category] ?? 0) + 1;
        return acc;
      },
      {
        categories: {} as Record<string, number>,
      },
    );
  }, [tasks]);

  const categoryOptions: FilterOption[] = useMemo(
    () =>
      Object.entries(categories)
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count),
    [categories],
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskName = task["task-name"]?.toLowerCase() ?? "";
      const taskDescription = task["task-description"]?.toLowerCase() ?? "";
      const taskCategory = task["task-category"] ?? "uncategorized";

      // Filter by search query
      if (searchQuery && !taskName.includes(searchQuery.toLowerCase()) && !taskDescription.includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Filter by category
      if (selectedCategories.size > 0 && !selectedCategories.has(taskCategory)) {
        return false;
      }

      return true;
    });
  }, [tasks, searchQuery, selectedCategories]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categories: Set<string>) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="-mx-4 flex flex-col sm:mx-0">
      <div className="mb-3 flex items-center justify-between px-4 sm:px-0">
        <p className="text-muted-foreground font-mono text-sm">
          Showing {filteredTasks.length} tasks
        </p>
        <button
          className="text-primary disabled:text-muted-foreground font-mono text-sm font-normal underline-offset-4 hover:underline disabled:hover:no-underline"
          disabled={selectedCategories.size === 0 && searchQuery === ""}
          onClick={() => {
            setSearchQuery(null);
            setSelectedCategories(null);
          }}
        >
          Clear filters
        </button>
      </div>
      <TaskToolbar
        searchQuery={searchQuery}
        onSearch={handleSearch}
        categories={categoryOptions}
        tags={[]}
        difficulties={[]}
        selectedCategories={new Set(selectedCategories)}
        selectedTags={new Set()}
        selectedDifficulties={new Set()}
        onCategoryChange={handleCategoryChange}
        onTagChange={() => {}}
        onDifficultyChange={() => {}}
      />
      <TaskGrid tasks={filteredTasks} behavior="filter" />
      <div className="flex flex-col px-4 sm:px-0">
        {filteredTasks.length > 0 && (
          <p className="text-muted-foreground mt-6 font-mono text-sm">
            Displaying {filteredTasks.length} of {tasks.length} available tasks
          </p>
        )}
      </div>
    </div>
  );
}
