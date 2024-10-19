import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, List, ListItem, ListItemText, IconButton, Container, Typography, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ToDoApp = () => {
    const [todos, setTodos] = useState([]); // State to hold the list of todos
    const [newTodo, setNewTodo] = useState(""); // State to hold the new todo input

    useEffect(() => {
        axios.get("http://localhost:5000/todos") // Replace with your backend address
            .then((response) => setTodos(response.data))
            .catch((error) => console.error("Error fetching todos:", error));
    }, []);

    const addTodo = () => {
        if (newTodo.trim() === "") return;
        axios.post("http://localhost:5000/todos", { task: newTodo }) // Replace with your backend address
            .then((response) => {
                setTodos([...todos, response.data]);
                setNewTodo("");
            })
            .catch((error) => console.error("Error adding todo:", error));
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`) // Replace with your backend address
            .then(() => {
                const updatedTodos = todos.filter((todo) => todo.id !== id);
                setTodos(updatedTodos);
            })
            .catch((error) => console.error("Error deleting todo:", error));
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
                <Typography variant="h4" align="center" gutterBottom>
                    To-Do List
                </Typography>
                <TextField
                    label="Enter a new task"
                    fullWidth
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    variant="outlined"
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addTodo}
                    fullWidth
                >
                    Add To-Do
                </Button>

                <List>
                    {todos.map((todo) => (
                        <ListItem
                            key={todo.id}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={todo.task} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ToDoApp;
