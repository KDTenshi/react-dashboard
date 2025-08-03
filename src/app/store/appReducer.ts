import { combineReducers } from "@reduxjs/toolkit";
import { boardSlice } from "../../features/board/boardSlice";
import { tasksSlice } from "../../features/tasks/tasksSlice";
import { uiSlice } from "../../features/ui/uiSlice";

export const appReducer = combineReducers({
  [boardSlice.reducerPath]: boardSlice.reducer,
  [tasksSlice.reducerPath]: tasksSlice.reducer,
  [uiSlice.reducerPath]: uiSlice.reducer,
});
