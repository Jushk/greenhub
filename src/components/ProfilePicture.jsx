import React, { useState } from "react";
import { Avatar, Button, Grid } from "@mui/material";
import { Skeleton } from "@mui/material";
import { RiImageAddFill } from "react-icons/ri";

const ProfilePicture = ({
  myProfile,
  eLoading,
  editedUser,
  editing,
  onProfilePictureChange,
}) => {
  const [profilePicture, setProfilePicture] = useState("");
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const resizedImage = await resizeImage(file, 400, 400);
      const reader = new FileReader();
      reader.readAsDataURL(resizedImage);
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        onProfilePictureChange(reader.result);
      };
    }
  };
  return (
    <>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          {eLoading ? (
            <Skeleton variant="circular" width={150} height={150} />
          ) : (
            <Avatar
              sx={{ width: 150, height: 150 }}
              src={profilePicture ? profilePicture : myProfile}
            >
              {editedUser.name?.charAt(0)}
            </Avatar>
          )}
        </Grid>
        {editing && (
          <Grid item>
            <input
              type="file"
              id="upload-button"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
            <label htmlFor="upload-button">
              <Button
                variant="contained"
                component="span"
                startIcon={<RiImageAddFill />}
              >
                Upload
              </Button>
            </label>
          </Grid>
        )}
      </Grid>
    </>
  );
};
function resizeImage(file, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, file.type);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
}
export default ProfilePicture;
