import type { AppThunk } from "../../app/store/appStore";
import { setSelectedTaskID } from "../tasks/tasksSlice";
import { setIsTaskPopupShown } from "./uiSlice";

export const showTaskPopup = (selectedTaskID: string): AppThunk => {
  return (dispatch) => {
    dispatch(setSelectedTaskID(selectedTaskID));
    dispatch(setIsTaskPopupShown(true));
  };
};

export const hideTaskPopup = (): AppThunk => {
  return (dispatch) => {
    dispatch(setSelectedTaskID(null));
    dispatch(setIsTaskPopupShown(false));
  };
};
