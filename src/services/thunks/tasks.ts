import type { AppThunk } from "../../app/store/appStore";
import { addTaskIDToLocalProject, deleteTaskIDFromLocalProject } from "../../features/projects/projectsSlice";
import { addTask, deleteSelectedTask } from "../../features/tasks/tasksSlice";
import type { TTaskPriority } from "../../shared/types/types";
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
