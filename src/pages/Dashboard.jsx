import {
  Box,
  Button,
  Grid,
  Hidden,
  Paper,
  Typography,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../theme";
import Post from "../components/Post";
import PostFormModal from "../components/PostFormModal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Users from "../components/Users";
import useAuth from "../hooks/useAuth";
import PostDetailsModal from "../components/PostDetailModal";
import MyCalendar from "../components/MyCalendar";
import TodoList from "../components/TodoList";

const Dashboard = () => {
  const [posts, setPosts] = useState();
  const { userId } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const instance = useAxiosPrivate();
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleNewPostClick = () => {
    setIsNewPostModalOpen(true);
  };

  const handleNewPostClose = () => {
    setIsNewPostModalOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        const response = await instance.get("/post/getPost", {
          signal: controller.signal,
        });
        isMounted && setPosts(response.data);
      } catch (err) {}
    };
    getPosts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [instance]);

  const handleNewPostSave = async (newPost) => {
    console.log(newPost);
    try {
      await instance.post("/post/newPost", {
        ...newPost,
        author: userId,
      });
      const updatePosts = await instance.get("/post/getPost");
      setPosts(updatePosts.data);
      setIsNewPostModalOpen(false);
      setSuccessMessage("Post successful");
    } catch (error) {}
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };
  const handlePostClick = (_id) => {
    setSelectedPostId(_id);
  };
  console.log(posts);
  return (
    <>
      <Grid container direction="row" justifyContent="space-around">
        {" "}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          component={Hidden}
          only={["xs", "sm"]}
          implementation="css"
        >
          {/* Left Column */}
          <MyCalendar />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={6}>
          {/* Middle Column */}
          <Paper
            style={{ padding: theme.spacing(2), margin: theme.spacing(1, 1) }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleNewPostClick}
            >
              New Post
            </Button>
          </Paper>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{ margin: theme.spacing(1, 1) }}
          >
            {posts?.length ? (
              posts?.map((post) => (
                <Post
                  key={post._id}
                  id={post._id}
                  profilePicture={[post.author.profilePicture]}
                  picture={post.picture}
                  username={post.author.name}
                  title={post.title}
                  content={post.content}
                  createdAt={post.createdAt}
                  onClick={handlePostClick}
                />
              ))
            ) : (
              <Typography variant="h6">NO POST AVAILABLE</Typography>
            )}{" "}
          </Box>
          <PostFormModal
            open={isNewPostModalOpen}
            handleClose={handleNewPostClose}
            handleSave={handleNewPostSave}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          lg={3}
          component={Hidden}
          lgDown
          implementation="css"
        >
          {/* Right Column */}
          <TodoList />
          <Users />
        </Grid>
      </Grid>
      <PostDetailsModal
        postId={selectedPostId}
        onClose={() => setSelectedPostId(null)}
      />{" "}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
    </>
  );
};

export default Dashboard;
