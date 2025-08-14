import type { AppThunk } from "../../app/store/appStore";
import { projectsApi } from "../../features/projects/projectsApi";
import { clearLocalProject, setLocalProject } from "../../features/projects/projectsSlice";
import { tasksApi } from "../../features/tasks/tasksApi";
import { clearLocalProjectTasks, setLocalProjectTasks } from "../../features/tasks/tasksSlice";

export const getProjectByIDThunk = (projectID: string): AppThunk => {
  return async (dispatch) => {
    try {
      const project = await dispatch(projectsApi.endpoints.getProjectByID.initiate(projectID)).unwrap();
      const projectTasks = await dispatch(tasksApi.endpoints.getTasksByProjectID.initiate(project.id)).unwrap();

      dispatch(setLocalProject(project));
      dispatch(setLocalProjectTasks({ tasks: projectTasks }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearLocalProjectThunk = (): AppThunk => {
  return (dispatch) => {
    dispatch(clearLocalProject());
    dispatch(clearLocalProjectTasks());
  };
};
