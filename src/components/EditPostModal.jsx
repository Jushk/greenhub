import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditPostModal = ({ open, handleClose, handleSave, title, content }) => {
  const [formData, setFormData] = useState({
    title,
    content,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          required
          value={formData.title}
          name="title"
          onChange={handleChange}
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
          name="content"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostModal;
