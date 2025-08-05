import type { AppThunk } from "../../app/store/appStore";
import type { TColumnType, TTaskPriority } from "../../shared/types/types";
import { createNewTask } from "../../shared/utils/createNewTask";
import { addTaskToColumn, deleteTaskFromColumn, moveTaskToColumn } from "../board/boardSlice";
import { setIsTaskPopupShown } from "../ui/uiSlice";
import { addTask, changeTaskColumn, deleteSelectedTask } from "./tasksSlice";

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
    const selectedTaskID = state.tasks.selectedTaskID;

    if (!selectedTaskID) return;

    const column = state.tasks.list[selectedTaskID].column;

    dispatch(deleteSelectedTask());
    dispatch(deleteTaskFromColumn({ column, taskID: selectedTaskID }));
    dispatch(setIsTaskPopupShown(false));
  };
};

export const moveTask = (column: TColumnType, taskID: string): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();

    const columnFrom = state.tasks.list[taskID].column;

    dispatch(changeTaskColumn({ taskID, column }));
    dispatch(moveTaskToColumn({ taskID, to: column, from: columnFrom }));
  };
};
