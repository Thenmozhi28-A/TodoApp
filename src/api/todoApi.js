import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({

    getTodos: builder.query({
      query: () => "todos",
    }),

    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "todos/add",
        method: "POST",
        body: newTodo,
      }),
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      
    }),
    
    updateTodo: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `todos/${id}`,
        method: "PUT",  
        body: rest,
      }),
    }),
  }),
});

export const { 
  useGetTodosQuery, 
  useAddTodoMutation, 
  useDeleteTodoMutation,
  useUpdateTodoMutation  
} = todosApi;
