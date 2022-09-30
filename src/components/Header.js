import { Box, Button } from "@mui/material";
import React from "react";
import "./Header.css";

const Header = () => {
  let isUserAuthenticated = sessionStorage.getItem("isAuthenticated");
  let logout;

  const performLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  if (isUserAuthenticated) {
    logout = (
      <Box className="logout">
        <Button
          variant="contained"
          onClick={() => {
            performLogout();
          }}
        >
          Logout
        </Button>
      </Box>
    );
  }
  return (
    <Box className="header">
      <Box className="header-title">DishPoll</Box>
      {logout}
    </Box>
  );
};

export default Header;
