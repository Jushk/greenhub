import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import theme from "../theme";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const TodoList = () => {
  const { userId } = useAuth();
  const instance = useAxiosPrivate();
  const [todos, setTodos] = useState();
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getTodos = async () => {
      try {
        const response = await instance.get(`/todo/get?userId=${userId}`);
        isMounted && setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [instance, userId]);

  const handleNewTodoChange = (event) => setNewTodo(event.target.value);

  const handleAddTodo = () => {
    try {
      if (newTodo.trim() !== "") {
        const newTodoItem = {
          author: userId,
          todo: newTodo.trim(),
          createdAt: new Date().toISOString(),
        };
        setTodos([...todos, newTodoItem]);
        instance.post("/todo/add", { userId, todo: newTodo });
        setNewTodo("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTodo = (index, id) => {
    try {
      instance.delete(`/todo/delete?id=${id}`);
      setTodos(todos.filter((_, i) => i !== index));
    } catch (err) {
      console.log(err);
    }
  };
  console.log(todos);
  return (
    <Container maxWidth="xs">
      <Paper
        style={{
          marginTop: theme.spacing(3),
          padding: theme.spacing(0, 2),
        }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="New Todo"
              value={newTodo}
              onChange={handleNewTodoChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddTodo}>
              Add Todo
            </Button>
          </Grid>
          <Grid item>
            <List>
              {todos?.map((todo, index) => (
                <ListItem key={todo._id}>
                  <ListItemText primary={todo.todo} />
                  <Button onClick={() => handleDeleteTodo(index, todo._id)}>
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TodoList;
