import { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import theme from "../theme";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditPostModal from "./EditPostModal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import linkifyHtml from "linkify-html";

const Post = ({
  id,
  profilePicture,
  username,
  title,
  picture,
  content,
  createdAt,
  onClick,
  isMyPost,
  onDeletePost,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title, content });
  const [successMessage, setSuccessMessage] = useState("");
  const instance = useAxiosPrivate();

  const handleEditClick = (event) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = async (updatedData) => {
    try {
      setIsEditing(false);
      const response = await instance.put(`/post/edit-post/${id}`, updatedData);
      setFormData(updatedData);
      setSuccessMessage(response?.data?.message);
    } catch (error) {
      setSuccessMessage("Edit unsuccessful");
    }
  };

  const getContentWithLink = (text) => {
    const linkedText = linkifyHtml(text, {});
    return linkedText;
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };
  return (
    <>
      <Paper
        style={{
          padding: theme.spacing(2),
          margin: theme.spacing(1, 0),
          width: "100%",
        }}
        onClick={() => onClick(id)}
      >
        <Box display="flex" alignItems="center">
          <Avatar src={profilePicture}>{username?.charAt(0)}</Avatar>
          <Box marginLeft={2}>
            <Typography variant="subtitle2" fontWeight="bold">
              {username}
            </Typography>
            <Typography variant="caption">{createdAt}</Typography>
          </Box>
          {isMyPost && (
            <Box sx={{ marginLeft: "auto" }}>
              <IconButton
                onClick={() => onDeletePost(id)}
                size="small"
                aria-label="delete"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={handleEditClick}
                size="small"
                aria-label="edit"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
        <Typography variant="body1" style={{ marginTop: theme.spacing(2) }}>
          {formData.title}
        </Typography>
        <Typography
          variant="body2"
          style={{ marginTop: theme.spacing(2) }}
          dangerouslySetInnerHTML={{
            __html: getContentWithLink(formData.content),
          }}
        />{" "}
        {picture && (
          <img
            src={picture}
            alt="Post"
            style={{ maxWidth: "100%", marginTop: theme.spacing(2) }}
          />
        )}
      </Paper>
      {isEditing && (
        <EditPostModal
          open={true}
          handleClose={() => setIsEditing(false)}
          handleSave={handleSave}
          title={formData.title}
          content={formData.content}
        />
      )}{" "}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
    </>
  );
};

export default Post;
