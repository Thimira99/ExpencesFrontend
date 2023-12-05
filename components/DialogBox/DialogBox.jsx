// ExpenseDialog.js
"use client";

import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export const DialogBox = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
