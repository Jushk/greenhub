import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Container } from "@mui/system";
import theme from "../theme";

const Users = () => {
  const [users, setUsers] = useState();
  const instance = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await instance.get("/users", {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {}
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [instance]);

  return (
    <Box>
      {users?.length ? (
        <List>
          {users.map((user) => (
            <Container maxWidth="lg" sx={{ marginTop: theme.spacing(1) }}>
              <Paper>
                <ListItem
                  ListItemButton
                  key={user._id}
                  component={Link}
                  to={`/profile/${user.username}`}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={user.name}
                      src={user?.profilePicture || user?.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                </ListItem>
              </Paper>
            </Container>
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1">No users found</Typography>
      )}
    </Box>
  );
};

export default Users;
