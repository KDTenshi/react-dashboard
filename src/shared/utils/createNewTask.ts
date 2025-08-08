import { nanoid } from "@reduxjs/toolkit";
import type { TTask, TTaskPriority } from "../types/types";

type CreateNewTaskArguments = {
  title: string;
  description: string;
  deadline: number;
  priority: TTaskPriority;
  projectID: string;
};

export const createNewTask = ({ title, description, deadline, priority, projectID }: CreateNewTaskArguments) => {
  const newTask: TTask = {
    id: nanoid(),
    projectID,
    title,
    description,
    date: Date.now(),
    deadline,
    priority,
    column: "todo",
  };

  return newTask;
};
