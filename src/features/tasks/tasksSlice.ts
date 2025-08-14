import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TTask } from "../../shared/types/types";

type TasksState = {
  localProjectTasks: { [key: string]: TTask };
};

const initialState: TasksState = {
  localProjectTasks: {},
};

export const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    setLocalProjectTasks: (state, action: PayloadAction<{ tasks: TTask[] }>) => {
      const { tasks } = action.payload;

      tasks.forEach((task) => {
        state.localProjectTasks[task.id] = task;
      });
    },
    clearLocalProjectTasks: (state) => {
      state.localProjectTasks = {};
    },
    addTask: (state, action: PayloadAction<{ task: TTask }>) => {
      const { task } = action.payload;

      state.localProjectTasks[task.id] = task;
    },
  },
});

export const { setLocalProjectTasks, clearLocalProjectTasks, addTask } = tasksSlice.actions;
