// ExpenseForm.js
"use client";

import React from "react";
import { TextField, MenuItem } from "@mui/material";

export const ExpenseForm = ({ formData, onInputChange, categoryOptions }) => {
  return (
    <>
      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        name="date"
        value={formData.date}
        onChange={onInputChange}
      />
      <TextField
        label="Category"
        fullWidth
        select
        margin="normal"
        name="category"
        value={formData.category}
        onChange={onInputChange}
      >
        {categoryOptions.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        name="description"
        value={formData.description}
        onChange={onInputChange}
      />
      <TextField
        label="Amount"
        fullWidth
        margin="normal"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={onInputChange}
      />
    </>
  );
};
