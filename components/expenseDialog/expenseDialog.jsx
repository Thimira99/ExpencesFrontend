// ExpenseDialog.js
"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { ExpenseForm } from "../index";

export const ExpenseDialog = ({
  isOpen,
  onClose,
  onSave,
  formData,
  onInputChange,
  categoryOptions,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent>
        <ExpenseForm
          formData={formData}
          onInputChange={onInputChange}
          categoryOptions={categoryOptions}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
