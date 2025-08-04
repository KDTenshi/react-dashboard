import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TColumnType } from "../../shared/types/types";
import { arrayMove } from "@dnd-kit/sortable";

type BoardState = {
  columns: { [key in TColumnType]: TColumn };
};

const initialState: BoardState = {
  columns: {
    todo: {
      title: "todo",
      taskIDs: [],
    },
    inProgress: {
      title: "inProgress",
      taskIDs: [],
    },
    done: {
      title: "done",
      taskIDs: [],
    },
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTaskToColumn: (state, action: PayloadAction<{ column: TColumnType; taskID: string }>) => {
      const { column, taskID } = action.payload;

      state.columns[column].taskIDs.push(taskID);
    },
    deleteTaskFromColumn: (state, action: PayloadAction<{ column: TColumnType; taskID: string }>) => {
      const { column, taskID } = action.payload;

      state.columns[column].taskIDs = state.columns[column].taskIDs.filter((id) => id !== taskID);
    },
    moveTaskToColumn: (state, action: PayloadAction<{ from: TColumnType; to: TColumnType; taskID: string }>) => {
      const { from, to, taskID } = action.payload;

      state.columns[from].taskIDs = state.columns[from].taskIDs.filter((id) => id !== taskID);
      state.columns[to].taskIDs = [taskID, ...state.columns[to].taskIDs];
    },
    moveTaskInColumn: (state, action: PayloadAction<{ activeID: string; overID: string; column: TColumnType }>) => {
      const { activeID, overID, column } = action.payload;

      const activeIndex = state.columns[column].taskIDs.findIndex((id) => id === activeID);
      const overIndex = state.columns[column].taskIDs.findIndex((id) => id === overID);

      if (activeIndex === -1 || overIndex === -1) return;

      state.columns[column].taskIDs = arrayMove(state.columns[column].taskIDs, activeIndex, overIndex);
    },
  },
});

export const { addTaskToColumn, deleteTaskFromColumn, moveTaskToColumn, moveTaskInColumn } = boardSlice.actions;
