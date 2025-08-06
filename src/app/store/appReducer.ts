import { combineReducers } from "@reduxjs/toolkit";
import { tasksSlice } from "../../features/tasks/tasksSlice";
import { uiSlice } from "../../features/ui/uiSlice";
import { projectsSlice } from "../../features/projects/projectsSlice";

export const appReducer = combineReducers({
  [projectsSlice.reducerPath]: projectsSlice.reducer,
  [tasksSlice.reducerPath]: tasksSlice.reducer,
  [uiSlice.reducerPath]: uiSlice.reducer,
});
