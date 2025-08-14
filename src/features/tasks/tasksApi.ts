import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TTask } from "../../shared/types/types";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/tasks" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<TTask[], void>({
      query: () => "/",
      providesTags: ["Tasks"],
    }),
    getTasksByProjectID: builder.query<TTask[], string>({
      query: (projectID) => ({
        url: "/",
        params: {
          projectID,
        },
      }),
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation<void, TTask>({
      query: (task) => ({
        url: "/",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<void, TTask>({
      query: (task) => ({
        url: `/${task.id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksByProjectIDQuery } = tasksApi;
