import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TColumnType, TProject } from "../../shared/types/types";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/projects" }),
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    getProjects: builder.query<TProject[], void>({
      query: () => "/",
      providesTags: ["Projects"],
    }),
    getProjectByID: builder.query<TProject, string>({
      query: (projectID) => `/${projectID}`,
      providesTags: ["Projects"],
    }),
    addProject: builder.mutation<void, TProject>({
      query: (project) => ({
        url: "/",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (projectID) => ({
        url: `/${projectID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
    addTaskIDToProject: builder.mutation<void, { project: TProject; taskID: string }>({
      query: ({ project, taskID }) => ({
        url: `/${project.id}`,
        method: "PUT",
        body: {
          ...project,
          columns: {
            ...project.columns,
            todo: {
              ...project.columns.todo,
              taskIDs: [taskID, ...project.columns.todo.taskIDs],
            },
          },
        },
      }),
      invalidatesTags: ["Projects"],
    }),

    deleteTaskFromProject: builder.mutation<void, { project: TProject; taskID: string; column: TColumnType }>({
      query: ({ project, taskID, column }) => ({
        url: `/${project.id}`,
        method: "PUT",
        body: {
          ...project,
          columns: {
            ...project.columns,
            [column]: {
              ...project.columns[column],
              taskIDs: project.columns.todo.taskIDs.filter((id) => id !== taskID),
            },
          },
        },
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIDQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useAddTaskIDToProjectMutation,
  useDeleteTaskFromProjectMutation,
} = projectsApi;
