import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { RiImageAddFill } from "react-icons/ri";

const PostFormModal = ({ open, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    picture: "",
  });
  const [preview, setPreview] = useState(null);
  const closeForm = () => {
    setFormData({
      title: "",
      content: "",
      picture: "",
    });
    setPreview(null);
    handleClose();
  };
  const handleSaveClick = () => {
    handleSave(formData);
    setFormData({
      title: "",
      content: "",
      picture: "",
    });
    setPreview(null);
    handleClose();
  };
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const resizedImage = await resizeImage(file, 400, 400);
      const reader = new FileReader();
      reader.readAsDataURL(resizedImage);
      reader.onloadend = () => {
        setFormData({
          picture: reader.result,
        });
        setPreview(reader.result);
      };
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
        {" "}
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
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        )}
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          required
          value={formData.title}
          onChange={(event) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              title: event.target.value,
            }))
          }
        />
        <TextField
          margin="dense"
          id="content"
          label="Content"
          type="text"
          multiline
          rows={4}
          fullWidth
          required
          value={formData.content}
          onChange={(event) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              content: event.target.value,
            }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeForm}>Cancel</Button>
        <Button onClick={handleSaveClick} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
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

export default PostFormModal;
