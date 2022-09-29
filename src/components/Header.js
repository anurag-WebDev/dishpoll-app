import { Box, Button } from "@mui/material";
import React from "react";
import "./Header.css";

const Header = () => {
  let isUserAuthenticated = sessionStorage.getItem("isAuthenticated");
  let logout;

  const performLogout = () => {
    sessionStorage.clear();
    window.location.reload();
    // <Navigate replace to="/" />;
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
      {/* <Stack direction="row"> */}
      <Box className="header-title">DishPoll</Box>
      {logout}
      {/* </Stack> */}
    </Box>
  );
};

export default Header;
