import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumnType, TTask, TTaskPriority } from "../../shared/types/types";

type TasksState = {
  list: { [key: string]: TTask };
  selectedTaskID: string | null;
};

const initialState: TasksState = {
  list: {},
  selectedTaskID: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSelectedTaskID: (state, action: PayloadAction<string | null>) => {
      state.selectedTaskID = action.payload;
    },
    addTask: (state, action: PayloadAction<{ task: TTask }>) => {
      const { task } = action.payload;

      state.list[task.id] = task;
    },
    deleteSelectedTask: (state) => {
      const selectedTaskID = state.selectedTaskID;

      if (!selectedTaskID) return;

      delete state.list[selectedTaskID];
      state.selectedTaskID = null;
    },
    editSelectedTask: (
      state,
      action: PayloadAction<{ title: string; description: string; deadline: number; priority: TTaskPriority }>
    ) => {
      const { title, description, deadline, priority } = action.payload;

      if (!state.selectedTaskID) return;

      const task = state.list[state.selectedTaskID];

      task.title = title;
      task.description = description;
      task.deadline = deadline;
      task.priority = priority;
    },
    changeTaskColumn: (state, action: PayloadAction<{ taskID: string; column: TColumnType }>) => {
      const { taskID, column } = action.payload;

      const task = state.list[taskID];

      task.column = column;
    },
  },
});

export const { setSelectedTaskID, addTask, deleteSelectedTask, editSelectedTask, changeTaskColumn } =
  tasksSlice.actions;
