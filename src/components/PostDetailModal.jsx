import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PostDetailsModal = ({ postId, onClose }) => {
  const [post, setPost] = useState(null);
  const { userId } = useAuth();
  const instance = useAxiosPrivate();
  const [comment, setComment] = useState("");
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchPost = async () => {
      try {
        const response = await instance.get(`/post/view/${postId}`, {
          signal: controller.signal,
        });
        isMounted && setPost(response.data);
      } catch (error) {}
    };
    fetchPost();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [instance, postId]);

  const handleClose = () => {
    onClose();
    setPost(null);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      await instance.post(`/comment/addComment/${postId}`, {
        content: comment,
        author: userId,
      });
      setComment("");
      const updatedPost = await instance.get(`/post/view/${postId}`);
      setPost(updatedPost.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getContentWithLink = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g; //Nakita ko lang sa google
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  };
  return (
    <Dialog open={!!postId} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">{post?.author?.name}</DialogTitle>
      <DialogTitle>{post?.title || "Loading..."}</DialogTitle>
      <DialogContent>
        {post ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box marginBottom={2}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {post.name}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: getContentWithLink(post.content),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box marginBottom={2}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Comments
                </Typography>
              </Box>
              {post.comments?.map((comment) => (
                <Box key={comment._id} marginBottom={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Avatar>
                        {comment.author?.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item xs={10}>
                      <Box marginBottom={1}>
                        <Typography
                          variant="body1"
                          dangerouslySetInnerHTML={{
                            __html: getContentWithLink(comment.content),
                          }}
                        />
                      </Box>
                      <Typography variant="caption">
                        By {comment.author?.name} on{" "}
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Box marginTop={2}>
                <form onSubmit={handleCommentSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <TextField
                        label="Add a comment"
                        fullWidth
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailsModal;
