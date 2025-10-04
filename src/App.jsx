import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodosList from "..//src/pages/TodosList";
import EditTodo from "..//src/pages/EditTodo";
import Ex from "./pages/Ex";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<TodosList />} />
    //     <Route path="/edit/:id" element={<EditTodo />} />
    //   </Routes>
    // </Router>
    <Ex/>
  );
}

export default App;
