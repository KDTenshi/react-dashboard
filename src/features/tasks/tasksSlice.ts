import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumnType, TTask, TTaskPriority } from "../../shared/types/types";

type TasksState = {
  list: { [key: string]: TTask };
  selectedTask: TTask | null;
  draggingTaskID: string | null;
};

const initialState: TasksState = {
  list: {},
  selectedTask: null,
  draggingTaskID: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // REMOVE LATER!!!
    setDraggingTaskID: (state, action: PayloadAction<string | null>) => {
      state.draggingTaskID = action.payload;
    },
    //
    setSelectedTask: (state, action: PayloadAction<TTask | null>) => {
      state.selectedTask = action.payload;
    },
    addTask: (state, action: PayloadAction<{ task: TTask }>) => {
      const { task } = action.payload;

      state.list[task.id] = task;
    },
    deleteSelectedTask: (state) => {
      const selectedTask = state.selectedTask;

      if (!selectedTask) return;

      delete state.list[selectedTask.id];
      state.selectedTask = null;
    },
    editSelectedTask: (
      state,
      action: PayloadAction<{ title: string; description: string; deadline: number; priority: TTaskPriority }>
    ) => {
      const { title, description, deadline, priority } = action.payload;

      if (!state.selectedTask) return;

      const task = state.list[state.selectedTask.id];

      task.title = title;
      task.description = description;
      task.deadline = deadline;
      task.priority = priority;

      state.selectedTask = task;
    },
    changeTaskColumn: (state, action: PayloadAction<{ taskID: string; column: TColumnType }>) => {
      const { taskID, column } = action.payload;

      const task = state.list[taskID];

      task.column = column;
    },
  },
});

export const { setDraggingTaskID, setSelectedTask, addTask, deleteSelectedTask, editSelectedTask, changeTaskColumn } =
  tasksSlice.actions;
