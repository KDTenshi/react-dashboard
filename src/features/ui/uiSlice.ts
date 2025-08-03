import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  isAddTaskFormShown: boolean;
  sideBarStatus: "shown" | "hidden" | null;
};

const initialState: UIState = {
  isAddTaskFormShown: false,
  sideBarStatus: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsAddTaskFormShown: (state, action: PayloadAction<boolean>) => {
      state.isAddTaskFormShown = action.payload;
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

export const { setIsAddTaskFormShown, switchSideBarStatus } = uiSlice.actions;
