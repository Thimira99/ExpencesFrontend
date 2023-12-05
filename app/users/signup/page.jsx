"use client";

import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import * as yup from "yup";
import Link from "next/link";
import { ToastService } from "@/services/toast";
import { signupAPI } from "@/utils/ApiRequests";
import { useRouter } from "next/navigation";
import HttpService from "@/services/httpService";

const SignUpPage = () => {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle change
  const handleChange = (field, value) => {
    setInputs((prevData) => ({
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
    signupSchema
      .validate(inputs, { abortEarly: false })
      .then(() => {
        // If validation passes, call the onSubmit callback
        handleSignUp(inputs);
      })
      .catch((error) => {
        // If validation fails, handle the error (update errors state)
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      });
  };

  // Signup schema
  const signupSchema = yup.object().shape({
    name: yup.string().required("First name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Password must contain at least letters, numbers and special character with 6 digits"
      ),
  });

  const handleSignUp = (data) => {
    HttpService.fetch("POST", signupAPI, data)
      .then((res) => {
        console.log(res.data);
        ToastService.success("Registered successfully.");
        router.push("/users/login");
      })
      .catch((err) => {
        if (err.response.data) {
          ToastService.error(err.response.data.message);
        }
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={500}
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginTop={25}
      padding={5}
      borderRadius={10}
      boxShadow="5px 5px 5px #ccc"
    >
      <Typography variant="h3" padding={3}>
        Sign up
      </Typography>
      <TextField
        type="text"
        variant="outlined"
        margin="normal"
        value={inputs.name}
        placeholder="First Name"
        onChange={(e) => handleChange("name", e.target.value)}
        error={Boolean(errors.name)}
        helperText={errors.name}
        required
      />
      <TextField
        type="email"
        name="email"
        variant="outlined"
        margin="normal"
        value={inputs.email}
        placeholder="Email"
        onChange={(e) => handleChange("email", e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
        required
      />
      <TextField
        type="password"
        name="password"
        variant="outlined"
        margin="normal"
        value={inputs.password}
        placeholder="Password"
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
        Sign up
      </Button>
      <Link href={"/users/login"}>Login</Link>
    </Box>
  );
};

export default SignUpPage;
