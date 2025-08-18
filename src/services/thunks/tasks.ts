import type { AppThunk } from "../../app/store/appStore";
import { projectsApi } from "../../features/projects/projectsApi";
import {
  addTaskIDToLocalProject,
  deleteTaskIDFromLocalProject,
  moveTaskInLocalProject,
} from "../../features/projects/projectsSlice";
import { tasksApi } from "../../features/tasks/tasksApi";
import { addTask, changeSelectedTaskColumn, deleteSelectedTask } from "../../features/tasks/tasksSlice";
import type { TColumnType, TTaskPriority } from "../../shared/types/types";
import { createNewTask } from "../../shared/utils/createNewTask";

type AddTaskThunkArguments = {
  title: string;
  description: string;
  deadline: number;
  priority: TTaskPriority;
};

export const addTaskThunk = ({ title, description, deadline, priority }: AddTaskThunkArguments): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();

    const localProject = state.projectsSlice.localProject;

    if (!localProject) return;

    const task = createNewTask({ title, description, deadline, priority, projectID: localProject.id });

    dispatch(addTask({ task }));
    dispatch(addTaskIDToLocalProject({ taskID: task.id }));
  };
};

export const deleteTaskThunk = ({ taskID }: { taskID: string }): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();

    const column = state.tasksSlice.localProjectTasks[taskID].column;

    dispatch(deleteSelectedTask());
    dispatch(deleteTaskIDFromLocalProject({ taskID, column }));
  };
};

export const moveTaskToColumnThunk = ({ taskID, columnTo }: { taskID: string; columnTo: TColumnType }): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    const columnFrom = state.tasksSlice.localProjectTasks[taskID].column;

    dispatch(changeSelectedTaskColumn({ column: columnTo }));
    dispatch(moveTaskInLocalProject({ columnFrom, columnTo, taskID }));
  };
};

export const updateServerDataThunk = ({ taskID }: { taskID: string }): AppThunk => {
  return async (dispatch, getState) => {
    const state = getState();

    const task = state.tasksSlice.localProjectTasks[taskID];
    const project = state.projectsSlice.localProject;

    if (!project) return;

    try {
      await dispatch(tasksApi.endpoints.updateTask.initiate(task)).unwrap();
      await dispatch(projectsApi.endpoints.updateProject.initiate(project)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
};
