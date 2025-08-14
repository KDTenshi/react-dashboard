import { nanoid } from "@reduxjs/toolkit";
import type { TProject } from "../types/types";

export const createNewProject = (title: string) => {
  const projectID = nanoid();

  const newProject: TProject = {
    id: projectID,
    title,
    columns: {
      todo: [],
      inProgress: [],
      done: [],
    },
  };

  return newProject;
};
