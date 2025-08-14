import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TProject } from "../../shared/types/types";

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
    updateProject: builder.mutation<void, TProject>({
      query: (project) => ({
        url: `/${project.id}`,
        method: "PUT",
        body: project,
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
  useUpdateProjectMutation,
} = projectsApi;
