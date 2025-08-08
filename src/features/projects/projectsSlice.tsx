import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumnType, TProject, TRecentProject } from "../../shared/types/types";
import { createNewProject } from "../../shared/utils/createNewProject";
import { arrayMove } from "@dnd-kit/sortable";

type ProjectsState = {
  activeProjectID: string | null;
  recentProjects: TRecentProject[];
  list: {
    [key: string]: TProject;
  };
};

const initialState: ProjectsState = {
  activeProjectID: null,
  recentProjects: [],
  list: {},
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setActiveProjectID: (state, action: PayloadAction<string | null>) => {
      state.activeProjectID = action.payload;
    },
    addRecentProject: (state, action: PayloadAction<{ projectID: string }>) => {
      const { projectID } = action.payload;

      const projectTitle = "SAMPLE TITLE";

      const projectIndex = state.recentProjects.findIndex((project) => project.id === projectID);

      if (projectIndex === -1) {
        state.recentProjects = [{ id: projectID, title: projectTitle }, ...state.recentProjects];
      } else {
        state.recentProjects = arrayMove(state.recentProjects, projectIndex, 0);
      }
    },
    addProject: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;

      const newProject = createNewProject(title);

      state.list[newProject.id] = newProject;
    },
    deleteProject: (state, action: PayloadAction<{ projectID: string }>) => {
      const { projectID } = action.payload;

      state.recentProjects = state.recentProjects.filter((project) => project.id !== projectID);
      delete state.list[projectID];
    },
    editProjectTitle: (state, action: PayloadAction<{ projectID: string; title: string }>) => {
      const { projectID, title } = action.payload;

      state.list[projectID].title = title;
    },
    addTaskIDToColumn: (state, action: PayloadAction<{ taskID: string; column: TColumnType }>) => {
      const { taskID, column } = action.payload;

      const projectID = state.activeProjectID;

      if (!projectID) return;

      state.list[projectID].columns[column].taskIDs = [taskID, ...state.list[projectID].columns[column].taskIDs];
    },
    deleteTaskIDFromColumn: (state, action: PayloadAction<{ taskID: string; column: TColumnType }>) => {
      const { taskID, column } = action.payload;

      const projectID = state.activeProjectID;

      if (!projectID) return;

      state.list[projectID].columns[column].taskIDs = state.list[projectID].columns[column].taskIDs.filter(
        (id) => id !== taskID
      );
    },
    moveTaskIDToColumn: (state, action: PayloadAction<{ taskID: string; from: TColumnType; to: TColumnType }>) => {
      const { taskID, from, to } = action.payload;

      const projectID = state.activeProjectID;

      if (!projectID) return;

      state.list[projectID].columns[from].taskIDs = state.list[projectID].columns[from].taskIDs.filter(
        (id) => id !== taskID
      );

      state.list[projectID].columns[to].taskIDs = [taskID, ...state.list[projectID].columns[to].taskIDs];
    },
    moveTaskIDInColumn: (state, action: PayloadAction<{ activeID: string; overID: string; column: TColumnType }>) => {
      const { activeID, overID, column } = action.payload;

      const projectID = state.activeProjectID;

      if (!projectID) return;

      const activeIndex = state.list[projectID].columns[column].taskIDs.findIndex((id) => id === activeID);
      const overIndex = state.list[projectID].columns[column].taskIDs.findIndex((id) => id === overID);

      if (activeIndex === -1 || overIndex === -1) return;

      state.list[projectID].columns[column].taskIDs = arrayMove(
        state.list[projectID].columns[column].taskIDs,
        activeIndex,
        overIndex
      );
    },
  },
});

export const {
  setActiveProjectID,
  addRecentProject,
  addProject,
  deleteProject,
  editProjectTitle,
  addTaskIDToColumn,
  deleteTaskIDFromColumn,
  moveTaskIDToColumn,
  moveTaskIDInColumn,
} = projectsSlice.actions;
