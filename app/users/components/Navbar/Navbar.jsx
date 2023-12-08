"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  useMediaQuery,
  Container,
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { colors } from "@/constants/colors";

export const Navbar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleClick = (event) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleNavigate = (path) => {
    router.push(`/users/${path}`);
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace(`/login`);
  };

  return (
    <>
      <AppBar
        position="static"
        style={{ background: darkMode ? colors.darkMode : colors.primary }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Container style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <CurrencyExchangeIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              style={{
                marginLeft: 10,
                color: darkMode ? colors.secondary : colors.darkMode,
              }}
            >
              Expense
            </Typography>
          </Container>
          {isSmallScreen ? (
            <IconButton color="inherit" aria-label="menu" onClick={handleClick}>
              <Menu />
            </IconButton>
          ) : (
            <Container
              style={{ display: "flex", justifyContent: "flex-end", gap: 20 }}
            >
              <Switch
                checked={darkMode}
                onChange={handleToggleDarkMode}
                icon={<Brightness7Icon />}
                checkedIcon={<Brightness4Icon />}
                color="default"
              />
              <Button
                color="inherit"
                onClick={() => handleNavigate("dashboard")}
              >
                My Expenses
              </Button>
              <Button color="inherit" onClick={() => handleNavigate("details")}>
                Expense Details
              </Button>
              <Button
                color="inherit"
                onClick={() => handleLogout()}
                style={{ color: darkMode ? colors.secondary : colors.darkMode }}
              >
                Logout
              </Button>
            </Container>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleNavigate("dashboard")}>
              My Expenses
            </MenuItem>
            <MenuItem onClick={() => handleNavigate("details")}>
              Expense Details
            </MenuItem>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};
