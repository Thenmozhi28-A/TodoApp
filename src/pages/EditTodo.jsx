import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  todosApi,
} from "../api/todoApi";
import { useDispatch } from "react-redux";

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data } = useGetTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();

  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if (data?.todos) {
      const todo = data.todos.find((t) => t.id === parseInt(id));
      if (todo) setEditingText(todo.todo);
    }
  }, [data, id]);

  const handleUpdate = async () => {
    if (!editingText.trim()) return;
    try {
      await updateTodo({ id: parseInt(id), todo: editingText }).unwrap();

      dispatch(
        todosApi.util.updateQueryData("getTodos", (draft) => {
          const todo = draft.todos.find((t) => t.id === parseInt(id));
          if (todo) todo.todo = editingText;
        })
      );

      navigate("/");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div style={{ margin: "10px" }}>
      <h2>Edit Todo</h2>
      <input
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditTodo;
