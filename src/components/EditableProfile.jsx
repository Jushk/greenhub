import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Skeleton from "@mui/material/Skeleton";
import Delete from "@mui/icons-material/Delete";
import ProfilePicture from "./ProfilePicture";

const EditableProfile = ({ user, isMyProfile, onSave, onDelete, loading }) => {
  const [editing, setEditing] = useState(false);
  const [eloading, seteLoading] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [tags, setTags] = useState(user.tags?.join(","));
  const [profilePicture, setProfilePicture] = useState("");
  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleEditProfile = () => {
    setEditing(true);
  };
  const handleDeleteProfile = () => {
    seteLoading(true);
    onDelete().then(() => {
      seteLoading(false);
    });
  };

  const handleSaveProfile = () => {
    seteLoading(true);
    onSave({ ...editedUser, tags, profilePicture }).then(() => {
      seteLoading(false);
      setEditing(false);
    });
  };

  const handleCancelEdit = () => {
    setEditedUser(user);
    setTags(user.tags || []);
    setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleTagInputChange = (event) => {
    const { value } = event.target;
    setTags(value.split(","));
  };

  const handleProfilePictureChange = (picture) => {
    setProfilePicture(picture);
  };
  const getContentWithLink = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g; //Nakita ko lang sa google
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  };
  return (
    <Paper style={{ padding: 2, margin: 2 }}>
      <Box sx={{ p: 5 }}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={4}>
            <ProfilePicture
              myProfile={user.profilePicture}
              eLoading={eloading}
              editedUser={editedUser}
              editing={editing}
              onProfilePictureChange={handleProfilePictureChange}
            />
            <Box display="flex" justifyContent="left" mt={2} sx={{ pl: 2 }}>
              {editing ? (
                <TextField
                  name="name"
                  label="Name"
                  value={editedUser.name || ""}
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
                />
              ) : loading ? (
                <Skeleton variant="text" width={200} height={50} />
              ) : (
                <Typography variant="h5" fontWeight="bold">
                  {editedUser.name}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Personal Information
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1">
                  {editing ? (
                    <TextField
                      name="username"
                      label="Username"
                      value={editedUser.username || ""}
                      variant="outlined"
                      fullWidth
                      onChange={handleInputChange}
                    />
                  ) : loading ? (
                    <Skeleton variant="text" width={200} height={25} />
                  ) : (
                    <>Name: {editedUser.username}</>
                  )}
                </Typography>
                <Typography variant="subtitle1">
                  {editing ? (
                    <TextField
                      name="course"
                      label="Course"
                      value={editedUser.course || ""}
                      variant="outlined"
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mt: 2 }}
                    />
                  ) : loading ? (
                    <Skeleton variant="text" width={200} height={25} />
                  ) : (
                    <>
                      Course:
                      {editedUser.course}
                    </>
                  )}
                </Typography>

                <Typography variant="subtitle1">
                  {editing ? (
                    <TextField
                      name="bio"
                      label="Bio"
                      value={editedUser.bio || ""}
                      variant="outlined"
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mt: 2 }}
                    />
                  ) : loading ? (
                    <Skeleton variant="text" width={200} height={25} />
                  ) : (
                    <>
                      <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: getContentWithLink(
                            `Bio: ${
                              editedUser.bio || "the user didn't add a bio yet"
                            }`
                          ),
                        }}
                      />
                    </>
                  )}
                </Typography>
                <Typography variant="subtitle1">
                  {editing ? (
                    <TextField
                      name="tags"
                      value={tags || ""}
                      variant="outlined"
                      fullWidth
                      onChange={handleTagInputChange}
                      label="Tags"
                      sx={{ mt: 2 }}
                    />
                  ) : loading ? (
                    <Skeleton variant="text" width={200} height={25} />
                  ) : (
                    <>
                      Tags:{" "}
                      {editedUser.tags?.map(
                        (tag, index) =>
                          `#${tag}${
                            index < editedUser.tags.length - 1 ? " " : ""
                          }`
                      ) || "No tags added"}
                    </>
                  )}
                </Typography>
              </CardContent>
              {isMyProfile && (
                <CardActions>
                  {editing ? (
                    <>
                      <IconButton
                        aria-label="cancel edit"
                        onClick={handleCancelEdit}
                      >
                        <Typography>Cancel</Typography>
                      </IconButton>
                      <IconButton
                        aria-label="save changes"
                        onClick={handleSaveProfile}
                      >
                        <Typography>Save</Typography>
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        aria-label="edit profile"
                        onClick={handleEditProfile}
                      >
                        <EditIcon />
                      </IconButton>{" "}
                      <IconButton
                        aria-label="delete profile"
                        onClick={handleDeleteProfile}
                      >
                        <Delete style={{ color: "red" }} />
                      </IconButton>
                    </>
                  )}
                </CardActions>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default EditableProfile;
