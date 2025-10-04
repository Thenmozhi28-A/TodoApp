import React, { useState, useEffect } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  todosApi,
} from "../api/todoApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function TodosList() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (data?.todos) setTodos(data.todos);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  const handleAdd = async () => {
    //நீங்கள் ஒரு function-ஐ async என்று சொன்னால், அது Promise return செய்யும்.
    if (!newTodo.trim()) return;
    try {
      const res = await addTodo({
        //await பயன்படுத்தினால், Promise முடியும் வரை அடுத்து செல்லாது.
        todo: newTodo,
        completed: false,
        userId: 1,
      }).unwrap();

      setTodos((prev) => [...prev, res]);

      dispatch(
        todosApi.util.updateQueryData("getTodos", (draft) => {
          draft.todos.unshift(res);
        })
      );

      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      //try = முயற்சி செய்
      await deleteTodo(id).unwrap(); // backed la delete

      setTodos((prev) => prev.filter((t) => t.id !== id)); //ui update

      dispatch(
        //redux la ulla action aa trigger pana function
        todosApi.util.updateQueryData("getTodos", (draft) => {
          draft.todos = draft.todos.filter((t) => t.id !== id);
        })
      );
    } catch (err) {
      //catch = பிழை வந்தால் பிடி, safe-ஆ exit பண்ண
      console.error(err);
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>Enter Your Todo:</label>
        <input
          style={{ marginLeft: "10px" }}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          >
            <span>{todo.todo}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => navigate(`/edit/${todo.id}`)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodosList;
