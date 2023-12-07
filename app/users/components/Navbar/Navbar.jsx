// Navbar.js
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
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

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
    <div>
      <AppBar
        position="static"
        style={{ background: darkMode ? "#2E3B4E" : "#2196F3" }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
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
              style={{ marginLeft: 10, color: darkMode ? "#fff" : "#000" }}
            >
              Expense
            </Typography>
          </div>

          {isSmallScreen ? ( // Render responsive menu for small screens
            <IconButton color="inherit" aria-label="menu" onClick={handleClick}>
              <Menu />
            </IconButton>
          ) : (
            // Render regular menu items for larger screens
            <div style={{ display: "flex", alignItems: "center" }}>
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
                style={{ color: darkMode ? "#fff" : "#000" }}
              >
                Logout
              </Button>
            </div>
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
    </div>
  );
};
