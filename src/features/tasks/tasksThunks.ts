import type { AppThunk } from "../../app/store/appStore";
import type { TTaskPriority } from "../../shared/types/types";
import { createNewTask } from "../../shared/utils/createNewTask";
import { addTaskToColumn, deleteTaskFromColumn } from "../board/boardSlice";
import { addTask, deleteSelectedTask } from "./tasksSlice";

export const createTask = (title: string, description: string, deadline: number, priority: TTaskPriority): AppThunk => {
  return (dispatch) => {
    const task = createNewTask(title, description, deadline, priority);

    dispatch(addTask({ task }));
    dispatch(addTaskToColumn({ column: task.column, taskID: task.id }));
  };
};

export const deleteTask = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    const selectedTask = state.tasks.selectedTask;

    if (!selectedTask) return;

    dispatch(deleteSelectedTask());
    dispatch(deleteTaskFromColumn({ column: selectedTask.column, taskID: selectedTask.id }));
  };
};
