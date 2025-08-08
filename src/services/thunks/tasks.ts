import type { AppThunk } from "../../app/store/appStore";
import { projectsApi } from "../../features/projects/projectsApi";
import { tasksApi } from "../../features/tasks/tasksApi";
import type { TTask, TTaskPriority } from "../../shared/types/types";
import { createNewTask } from "../../shared/utils/createNewTask";

type AddTaskThunkArguments = {
  title: string;
  description: string;
  deadline: number;
  priority: TTaskPriority;
};

export const addTaskThunk = (args: AddTaskThunkArguments): AppThunk => {
  return async (dispatch, getState) => {
    const state = getState();

    const activeProjectID = state.projects.activeProjectID;

    if (!activeProjectID) return;

    const newTask = createNewTask({ ...args, projectID: activeProjectID });

    try {
      const activeProject = await dispatch(projectsApi.endpoints.getProjectByID.initiate(activeProjectID)).unwrap();

      await dispatch(tasksApi.endpoints.addTask.initiate(newTask)).unwrap();
      await dispatch(
        projectsApi.endpoints.addTaskIDToProject.initiate({ project: activeProject, taskID: newTask.id })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTaskThunk = (task: TTask): AppThunk => {
  return async (dispatch, getState) => {
    const state = getState();

    const activeProjectID = state.projects.activeProjectID;

    if (!activeProjectID) return;

    try {
      const activeProject = await dispatch(projectsApi.endpoints.getProjectByID.initiate(activeProjectID)).unwrap();

      await dispatch(tasksApi.endpoints.deleteTask.initiate(task.id)).unwrap();
      await dispatch(
        projectsApi.endpoints.deleteTaskFromProject.initiate({
          project: activeProject,
          taskID: task.id,
          column: task.column,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
};
