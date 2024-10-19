const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for all routes

// Mock data
let todos = [{ id: 1, task: "Sample task" }];

app.use(express.json());

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/todos", (req, res) => {
  const newTodo = { id: todos.length + 1, task: req.body.task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Delete a todo by id
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
