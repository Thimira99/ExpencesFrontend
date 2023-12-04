// AddCategoryDialog.js
"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export const AddCategoryDialog = ({
  isOpen,
  onClose,
  onSave,
  formData,
  onInputChange,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Category Name"
          fullWidth
          margin="normal"
          name="category"
          value={formData.categoryName}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
