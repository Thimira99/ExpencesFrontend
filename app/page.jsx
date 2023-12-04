"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <Container className={styles.container}>
      <Typography variant="h4" className={styles.heading}>
        Welcome to the Expense Management System
      </Typography>
      <Box>
        <Link href={"/users/login"}>
          <Button className={styles.button}>Get Started</Button>
        </Link>
      </Box>
    </Container>
  );
}
