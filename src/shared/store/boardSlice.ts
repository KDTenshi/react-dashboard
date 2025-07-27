import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TColumnType, TTask, TTaskPriority } from "../types/types";

type BoardState = {
  columns: { [key in TColumnType]: TColumn };
  selectedTask: TTask | null;
  isAdding: boolean;
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
    changeTaskTitle: (state, action: PayloadAction<{ selectedTask: TTask; title: string }>) => {
      const { selectedTask, title } = action.payload;

      const taskColumn = state.columns[selectedTask.column];

      const task = taskColumn.tasks.find((task) => task.id === selectedTask.id);

      if (task) {
        task.title = title;
        state.selectedTask = task;
      }
    },
    changeTaskDescription: (state, action: PayloadAction<{ selectedTask: TTask; description: string }>) => {
      const { selectedTask, description } = action.payload;

      const taskColumn = state.columns[selectedTask.column];

      const task = taskColumn.tasks.find((task) => task.id === selectedTask.id);

      if (task) {
        task.description = description;
        state.selectedTask = task;
      }
    },
    addTask: (state, action: PayloadAction<{ title: string; description: string; priority: TTaskPriority }>) => {
      const { title, description, priority } = action.payload;

      const newTask: TTask = {
        id: `${Date.now()}`,
        title,
        description,
        date: Date.now(),
        notes: [],
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
  },
});

export const {
  setIsAdding,
  setSelectedTask,
  unsetSelectedTask,
  changeTaskTitle,
  changeTaskDescription,
  addTask,
  deleteTask,
} = boardSlice.actions;
