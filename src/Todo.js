import React, { useState } from "react";

const ToDoApp = () => {
  const [todos, setTodos] = useState([]); // State to hold the list of todos
  const [newTodo, setNewTodo] = useState(""); // State to hold the new todo input

  // Function to add a new todo
  const addTodo = () => {
    if (newTodo.trim() === "") return; // Prevent empty todos
    setTodos([...todos, newTodo]); // Add the new todo to the list
    setNewTodo(""); // Reset the input field
  };

  // Function to delete a todo
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index); // Filter out the todo to delete
    setTodos(updatedTodos); // Update the todo list
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>To-Do List</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // Set the new todo
          placeholder="Enter a new task"
        />
        <button onClick={addTodo}>Add To-Do</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            {todo} 
            <button onClick={() => deleteTodo(index)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoApp;
