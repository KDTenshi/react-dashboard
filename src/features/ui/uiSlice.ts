import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  isAddProjectFormShown: boolean;
  isAddTaskFormShown: boolean;
  isTaskPopupShown: boolean;
  sideBarStatus: "shown" | "hidden" | null;
};

const initialState: UIState = {
  isAddProjectFormShown: false,
  isAddTaskFormShown: false,
  isTaskPopupShown: false,
  sideBarStatus: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsAddProjectFormShown: (state, action: PayloadAction<boolean>) => {
      state.isAddProjectFormShown = action.payload;
    },
    setIsAddTaskFormShown: (state, action: PayloadAction<boolean>) => {
      state.isAddTaskFormShown = action.payload;
    },
    setIsTaskPopupShown: (state, action: PayloadAction<boolean>) => {
      state.isTaskPopupShown = action.payload;
    },
    switchSideBarStatus: (state) => {
      if (!state.sideBarStatus || state.sideBarStatus === "shown") {
        state.sideBarStatus = "hidden";
        return;
      }

      if (state.sideBarStatus === "hidden") {
        state.sideBarStatus = "shown";
      }
    },
  },
});

export const { setIsAddProjectFormShown, setIsAddTaskFormShown, setIsTaskPopupShown, switchSideBarStatus } =
  uiSlice.actions;
