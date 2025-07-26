import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TColumnType, TTask } from "../types/types";

type BoardState = {
  columns: { [key in TColumnType]: TColumn };
  selectedTask: TTask | null;
};

const initialState: BoardState = {
  columns: {
    todo: {
      title: "todo",
      tasks: [
        { id: "001", title: "Task 1", description: "Task 1 description", notes: [], date: Date.now(), column: "todo" },
      ],
    },
    inProgress: {
      title: "inProgress",
      tasks: [
        {
          id: "002",
          title: "Task 2",
          description: "Task 2 description",
          notes: [],
          date: Date.now(),
          column: "inProgress",
        },
      ],
    },
    done: {
      title: "done",
      tasks: [],
    },
  },
  selectedTask: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
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
  },
});

export const { setSelectedTask, unsetSelectedTask, changeTaskTitle, changeTaskDescription } = boardSlice.actions;
