import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TColumnType, TTask, TTaskPriority } from "../types/types";

type BoardState = {
  columns: { [key in TColumnType]: TColumn };
  selectedTask: TTask | null;
  isAdding: boolean;
  sideBarStatus: "shown" | "hidden" | null;
};

const initialState: BoardState = {
  columns: {
    todo: {
      title: "todo",
      tasks: [],
    },
    inProgress: {
      title: "inProgress",
      tasks: [],
    },
    done: {
      title: "done",
      tasks: [],
    },
  },
  selectedTask: null,
  isAdding: false,
  sideBarStatus: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setIsAdding: (state, action: PayloadAction<boolean>) => {
      state.isAdding = action.payload;
    },
    setSelectedTask: (state, action: PayloadAction<{ task: TTask }>) => {
      const { task } = action.payload;
      state.selectedTask = task;
    },
    unsetSelectedTask: (state) => {
      state.selectedTask = null;
    },
    addTask: (
      state,
      action: PayloadAction<{ title: string; description: string; priority: TTaskPriority; deadline: number }>
    ) => {
      const { title, description, priority, deadline } = action.payload;

      const newTask: TTask = {
        id: `${Date.now()}`,
        title,
        description,
        date: Date.now(),
        deadline,
        column: "todo",
        priority,
      };

      state.columns.todo.tasks = [newTask, ...state.columns.todo.tasks];
    },
    deleteTask: (state, action: PayloadAction<{ selectedTask: TTask }>) => {
      const { selectedTask } = action.payload;

      const taskColumn = state.columns[selectedTask.column];

      taskColumn.tasks = taskColumn.tasks.filter((task) => task.id !== selectedTask.id);
      state.selectedTask = null;
    },
    editSelectedTask: (
      state,
      action: PayloadAction<{ title: string; description: string; priority: TTaskPriority; deadline: number }>
    ) => {
      const { title, description, priority, deadline } = action.payload;

      if (!state.selectedTask) return;

      const id = state.selectedTask.id;
      const column = state.selectedTask.column;

      const task = state.columns[column].tasks.find((task) => task.id === id);

      if (!task) return;

      if (task.title !== title) task.title = title;
      if (task.description !== description) task.description = description;
      if (task.priority !== priority) task.priority = priority;
      if (task.deadline !== deadline) task.deadline = deadline;

      state.selectedTask = task;
    },
    switchSideBarStatus: (state) => {
      if (!state.sideBarStatus || state.sideBarStatus === "shown") {
        state.sideBarStatus = "hidden";
      } else if (state.sideBarStatus === "hidden") {
        state.sideBarStatus = "shown";
      }
    },
  },
});

export const {
  setIsAdding,
  setSelectedTask,
  unsetSelectedTask,
  addTask,
  deleteTask,
  editSelectedTask,
  switchSideBarStatus,
} = boardSlice.actions;
