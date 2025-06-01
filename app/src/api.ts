import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  INote,
  INoteRequestDTO,
  INoteResponseDTO,
  INoteUpdateRequestDTO,
} from "./types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080",
  }),
  tagTypes: ["Note"],
  endpoints: (builder) => ({
    getNotes: builder.query<INote[], void>({
      query: () => `/notes`,
      providesTags: ["Note"],
      transformResponse: (response: INoteResponseDTO[]) => {
        return response.map(({ id, created_at, updated_at, title, body }) => ({
          id: id,
          createdAt: new Date(created_at),
          updatedAt: new Date(updated_at),
          title: title,
          body: body ?? "",
        }));
      },
    }),
    getNoteById: builder.query<INote, { id: string }>({
      query: ({ id }) => `/notes/${id}`,
      providesTags: (_result, _error, { id }) => [{ type: "Note", id }],
      transformResponse: (response: INoteResponseDTO) => {
        const { id, created_at, updated_at, title, body } = response;
        return {
          id: id,
          createdAt: new Date(created_at),
          updatedAt: new Date(updated_at),
          title: title,
          body: body ?? "",
        };
      },
    }),
    createNote: builder.mutation<INote, INoteRequestDTO>({
      query: (note) => ({
        url: `/notes`,
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["Note"],
      transformResponse: (response: INoteResponseDTO) => {
        const { id, created_at, updated_at, title, body } = response;
        return {
          id: id,
          createdAt: new Date(created_at),
          updatedAt: new Date(updated_at),
          title: title,
          body: body ?? "",
        };
      },
    }),
    updateNote: builder.mutation<INote, INoteUpdateRequestDTO>({
      query: ({ id, note }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: note,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Note", id },
        "Note",
      ],
      transformResponse: (response: INoteResponseDTO) => {
        const { id, created_at, updated_at, title, body } = response;
        return {
          id: id,
          createdAt: new Date(created_at),
          updatedAt: new Date(updated_at),
          title: title,
          body: body ?? "",
        };
      },
    }),
    deleteNote: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Note", id },
        "Note",
      ],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = apiSlice;
