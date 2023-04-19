import { Box, Grid, Snackbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Post from "../components/Post";
import PostDetailsModal from "../components/PostDetailModal";
import useAuth from "../hooks/useAuth";
import EditableProfile from "../components/EditableProfile";

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const instance = useAxiosPrivate();
  const { userId } = useAuth();
  const isMyProfile = userId === user._id;
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchUser = async () => {
      try {
        const response1 = await instance.get(`/user/${username}`);
        isMounted && setUser(response1.data);
        setLoading(false);
      } catch (error) {}
    };
    fetchUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [instance, user._id, username, successMessage]);
  console.log(user);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchUser = async () => {
      try {
        const response2 = await instance.get(`/post/my/${user._id}`);
        isMounted && setPost(response2.data);
        setLoading(false);
      } catch (error) {}
    };
    fetchUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [instance, successMessage, user._id]);
  const handlePostClick = (_id) => {
    setSelectedPostId(_id);
  };

  const isMyPost = (author) => {
    return author._id === userId;
  };

  const onSave = async (updatedUser) => {
    try {
      const response = await instance.put(`/update/${user._id}`, updatedUser);
      const newresponse = await instance.get(`/user/${username}`);
      setUser(newresponse?.data);
      setSuccessMessage(response?.data?.message);
    } catch (err) {
      setSuccessMessage(err?.data?.message);
    }
  };
  const onDelete = async () => {
    setLoading(false);

    const password = window.prompt(
      "Please enter your password to confirm deletion:"
    );
    try {
      if (!password) {
        setSuccessMessage("Password empty");
        return setLoading(false);
      }
      setLoading(true);
      const response = await instance.delete(`/delete/${user._id}`, {
        data: {
          password: password,
        },
      });
      localStorage.removeItem("asdasd");
      localStorage.removeItem("asdasdasd");
      setLoading(false);
      setSuccessMessage(response?.data?.message);
      navigate("/login");
    } catch (error) {
      setSuccessMessage(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };
  const handleDeletePost = async (delete_id) => {
    try {
      const response = await instance.delete(`/post/delete-post/${delete_id}`);
      setSuccessMessage(response?.data?.message);
      setSelectedPostId();
    } catch (error) {
      setSuccessMessage("Delete unsuccessful");
    }
  };
  console.log(post);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Container maxWidth="md">
            <EditableProfile
              user={user}
              isMyProfile={isMyProfile}
              onSave={onSave}
              onDelete={onDelete}
              loading={loading}
            />
            <Box display="flex" flexDirection="column" alignItems="center">
              {post?.length ? (
                post?.map((p) => (
                  <Post
                    key={p._id}
                    id={p._id}
                    profilePicture={p.author.profilePicture}
                    username={user.name}
                    picture={p.picture}
                    title={p.title}
                    content={p.content}
                    createdAt={p.createdAt}
                    onClick={handlePostClick}
                    onDeletePost={handleDeletePost}
                    isMyPost={isMyPost(p.author)}
                  />
                ))
              ) : (
                <Typography variant="h6">
                  THE USER HAVEN'T POSTED YET
                </Typography>
              )}{" "}
            </Box>{" "}
            <PostDetailsModal
              postId={selectedPostId}
              onClose={() => setSelectedPostId(null)}
            />
          </Container>
        </Grid>
      </Grid>{" "}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
    </>
  );
};

export default ProfilePage;
