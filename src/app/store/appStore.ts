import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import { appReducer } from "./appReducer";
import { useDispatch, useSelector } from "react-redux";
import { tasksApi } from "../../features/tasks/tasksApi";
import { projectsApi } from "../../features/projects/projectsApi";

export const appStore = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware, projectsApi.middleware),
});

type AppState = ReturnType<typeof appStore.getState>;
type AppDispatch = typeof appStore.dispatch;

export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
