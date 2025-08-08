import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TTask } from "../../shared/types/types";

type EditTaskArguments = { task: TTask; title: string; description: string; deadline: number; priority: string };

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/tasks" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTaskByID: builder.query<TTask, string>({
      query: (taskID) => `/${taskID}`,
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation<void, TTask>({
      query: (task) => ({
        url: "/",
        method: "POST",
        body: task,
      }),
    }),
    editTask: builder.mutation<void, EditTaskArguments>({
      query: ({ task, title, description, deadline, priority }) => ({
        url: `/${task.id}`,
        method: "PUT",
        body: {
          ...task,
          title,
          description,
          deadline,
          priority,
        },
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (taskID) => ({
        url: `/${taskID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetTaskByIDQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = tasksApi;
