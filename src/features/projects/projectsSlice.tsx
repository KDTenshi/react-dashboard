import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TProject } from "../../shared/types/types";

type ProjectsState = {
  localProject: TProject | null;
};

const initialState: ProjectsState = {
  localProject: null,
};

export const projectsSlice = createSlice({
  name: "projectsSlice",
  initialState,
  reducers: {
    setLocalProject: (state, action: PayloadAction<TProject>) => {
      state.localProject = action.payload;
    },
    clearLocalProject: (state) => {
      state.localProject = null;
    },
    editLocalProjectTitle: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;

      if (!state.localProject) return;

      state.localProject.title = title;
    },
    addTaskIDToLocalProject: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      if (!state.localProject) return;

      state.localProject.columns.todo = [taskID, ...state.localProject.columns.todo];
    },
  },
});

export const { setLocalProject, clearLocalProject, editLocalProjectTitle, addTaskIDToLocalProject } =
  projectsSlice.actions;
