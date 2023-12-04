"use client";

// components/LoginForm.js
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import Link from "next/link";

export const LoginForm = ({ onSubmit }) => {
  // Initializing values
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Handle change
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation using yup
    loginSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // If validation passes, call the onSubmit callback
        onSubmit(formData);
      })
      .catch((error) => {
        console.log(error);
        // If validation fails, handle the error (update errors state)
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      });
  };

  // Login schema
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={500}
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginTop={30}
      padding={5}
      borderRadius={10}
      boxShadow="5px 5px 5px #ccc"
    >
      <Typography variant="h3" padding={3}>
        Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        margin="normal"
        value={formData.email}
        placeholder="Email"
        onChange={(e) => handleChange("email", e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
        required
      />
      <TextField
        label="Password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={Boolean(errors.password)}
        helperText={errors.password}
        required
      />
      <Button
        sx={{ marginTop: 3 }}
        variant="contained"
        type="submit"
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Link href={"/users/signup"}>
        <Button sx={{ marginTop: 3 }} variant="text">
          Sign up
        </Button>
      </Link>
    </Box>
  );
};
