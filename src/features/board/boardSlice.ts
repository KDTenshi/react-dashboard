import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TColumnType } from "../../shared/types/types";

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
  },
});

export const { addTaskToColumn, deleteTaskFromColumn } = boardSlice.actions;
