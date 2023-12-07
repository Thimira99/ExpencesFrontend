"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container className={styles.container}>
      <Typography variant="h4" className={styles.heading}>
        Welcome to the Expense Management System
      </Typography>
      <Box>
        <Link href={"/login"}>
          <Button className={styles.button}>Get Started</Button>
        </Link>
      </Box>
    </Container>
  );
}
