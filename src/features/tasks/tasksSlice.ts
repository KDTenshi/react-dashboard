import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumnType, TTask, TTaskPriority } from "../../shared/types/types";

type TasksState = {
  localProjectTasks: { [key: string]: TTask };
  selectedTaskID: string | null;
};

type EditTaskArguments = {
  title: string;
  description: string;
  deadline: number;
  priority: TTaskPriority;
};

const initialState: TasksState = {
  localProjectTasks: {},
  selectedTaskID: null,
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
    setSelectedTaskID: (state, action: PayloadAction<string>) => {
      state.selectedTaskID = action.payload;
    },
    clearSelectedTaskID: (state) => {
      state.selectedTaskID = null;
    },
    addTask: (state, action: PayloadAction<{ task: TTask }>) => {
      const { task } = action.payload;

      state.localProjectTasks[task.id] = task;
    },
    editSelectedTask: (state, action: PayloadAction<EditTaskArguments>) => {
      const { title, description, deadline, priority } = action.payload;

      if (!state.selectedTaskID) return;

      state.localProjectTasks[state.selectedTaskID] = {
        ...state.localProjectTasks[state.selectedTaskID],
        title,
        description,
        deadline,
        priority,
      };
    },
    deleteSelectedTask: (state) => {
      if (!state.selectedTaskID) return;

      delete state.localProjectTasks[state.selectedTaskID];
    },
    changeSelectedTaskColumn: (state, action: PayloadAction<{ column: TColumnType }>) => {
      const { column } = action.payload;

      if (!state.selectedTaskID) return;

      state.localProjectTasks[state.selectedTaskID].column = column;
    },
  },
});

export const {
  setLocalProjectTasks,
  clearLocalProjectTasks,
  setSelectedTaskID,
  clearSelectedTaskID,
  addTask,
  editSelectedTask,
  deleteSelectedTask,
  changeSelectedTaskColumn,
} = tasksSlice.actions;
