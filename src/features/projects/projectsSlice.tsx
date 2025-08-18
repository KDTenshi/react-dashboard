import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumnType, TProject } from "../../shared/types/types";
import { arrayMove } from "@dnd-kit/sortable";

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
    deleteTaskIDFromLocalProject: (state, action: PayloadAction<{ column: TColumnType; taskID: string }>) => {
      const { column, taskID } = action.payload;

      if (!state.localProject) return;

      state.localProject.columns[column] = state.localProject.columns[column].filter((id) => id !== taskID);
    },
    moveTaskInLocalProject: (
      state,
      action: PayloadAction<{ columnFrom: TColumnType; columnTo: TColumnType; taskID: string }>
    ) => {
      const { columnFrom, columnTo, taskID } = action.payload;

      if (!state.localProject) return;

      state.localProject.columns[columnFrom] = state.localProject.columns[columnFrom].filter((id) => id !== taskID);
      state.localProject.columns[columnTo].push(taskID);
    },
    moveTaskInLocalColumn: (
      state,
      action: PayloadAction<{ column: TColumnType; activeID: string; overID: string }>
    ) => {
      const { column, activeID, overID } = action.payload;

      if (!state.localProject) return;

      const activeIndex = state.localProject.columns[column].findIndex((id) => id === activeID);
      const overIndex = state.localProject.columns[column].findIndex((id) => id === overID);

      if (activeIndex === -1 || overIndex === -1) return;

      state.localProject.columns[column] = arrayMove(state.localProject.columns[column], activeIndex, overIndex);
    },
  },
});

export const {
  setLocalProject,
  clearLocalProject,
  editLocalProjectTitle,
  addTaskIDToLocalProject,
  deleteTaskIDFromLocalProject,
  moveTaskInLocalProject,
  moveTaskInLocalColumn,
} = projectsSlice.actions;
