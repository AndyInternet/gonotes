import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { INote, INoteRequestDTO, INoteUpdateRequestDTO } from "./types";

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
    }),
    getNoteById: builder.query<INote, { id: string }>({
      query: ({ id }) => `/note/${id}`,
      providesTags: (_result, _error, { id }) => [{ type: "Note", id }],
    }),
    createNote: builder.mutation<INote, INoteRequestDTO>({
      query: (note) => ({
        url: `/note`,
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["Note"],
    }),
    updateNote: builder.mutation<INote, INoteUpdateRequestDTO>({
      query: ({ id, note }) => ({
        url: `/note/${id}`,
        method: "PUT",
        body: note,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Note", id },
        "Note",
      ],
    }),
    deleteNote: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/note/${id}`,
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
