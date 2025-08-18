import { createListenerMiddleware, isAnyOf, type TypedStartListening } from "@reduxjs/toolkit";
import {
  addTaskIDToLocalProject,
  deleteTaskIDFromLocalProject,
  editLocalProjectTitle,
} from "../../features/projects/projectsSlice";
import type { AppDispatch, AppState } from "./appStore";
import { projectsApi } from "../../features/projects/projectsApi";
import { addTask, deleteSelectedTask, editSelectedTask } from "../../features/tasks/tasksSlice";
import { tasksApi } from "../../features/tasks/tasksApi";

export const listenerMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<AppState, AppDispatch>;
const startListening = listenerMiddleware.startListening as AppStartListening;

startListening({
  matcher: isAnyOf(editLocalProjectTitle.match, addTaskIDToLocalProject.match, deleteTaskIDFromLocalProject.match),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState();
    const project = state.projectsSlice.localProject;

    if (!project) return;

    listenerApi.dispatch(projectsApi.endpoints.updateProject.initiate(project));
  },
});

startListening({
  matcher: addTask.match,
  effect: async (action, listenerApi) => {
    const { task } = action.payload;

    try {
      await listenerApi.dispatch(tasksApi.endpoints.addTask.initiate(task)).unwrap();
    } catch (error) {
      console.log(error);
    }
  },
});

startListening({
  matcher: editSelectedTask.match,
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();

    const selectedTaskID = state.tasksSlice.selectedTaskID;

    if (!selectedTaskID) return;

    const task = state.tasksSlice.localProjectTasks[selectedTaskID];

    try {
      await listenerApi.dispatch(tasksApi.endpoints.updateTask.initiate(task)).unwrap();
    } catch (error) {
      console.log(error);
    }
  },
});

startListening({
  matcher: deleteSelectedTask.match,
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    const selectedTaskID = state.tasksSlice.selectedTaskID;

    if (!selectedTaskID) return;

    try {
      await listenerApi.dispatch(tasksApi.endpoints.deleteTask.initiate(selectedTaskID)).unwrap();
    } catch (error) {
      console.log(error);
    }
  },
});
