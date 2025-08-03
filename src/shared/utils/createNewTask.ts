import { nanoid } from "@reduxjs/toolkit";
import type { TTask, TTaskPriority } from "../types/types";

export const createNewTask = (title: string, description: string, deadline: number, priority: TTaskPriority) => {
  const newTask: TTask = {
    id: nanoid(),
    title,
    description,
    date: Date.now(),
    deadline,
    priority,
    column: "todo",
  };

  return newTask;
};
