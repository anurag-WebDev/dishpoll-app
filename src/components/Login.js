import React, { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import userData from "../lib/users";
import "./Login.css";

function Login() {
  const loginInit = {
    username: "",
    password: "",
  };

  const [loginInfo, setLogInInfo] = useState(loginInit);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogInInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const logIn = (formData) => {
    if (validateInputData(formData)) {
      const isValidUserName = userData.filter(
        (user) => user.username === formData.username
      );

      if (isValidUserName.length) {
        if (isValidUserName[0].password === formData.password) {
          sessionStorage.setItem("isAuthenticated", true);
          enqueueSnackbar("Logged in Succesfully", {
            variant: "success",
            autoHideDuration: 1000,
          });
          navigate("/dashboard");
        } else {
          sessionStorage.setItem("isAuthenticated", false);
          enqueueSnackbar("Password Invalid", {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      } else {
        enqueueSnackbar("Username Invalid", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };

  const validateInputData = (inputData) => {
    if (inputData.username === "") {
      enqueueSnackbar("Username is a required field", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return false;
    } else if (inputData.password === "") {
      enqueueSnackbar("Password is a required field", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return false;
    }
    return true;
  };

  return (
    <>
      <Box className="main">
        <Box className="content">
          <Stack spacing={2} className="form">
            <Typography variant="h5" alignSelf="center  ">
              Dish Poll
            </Typography>
            <TextField
              variant="outlined"
              // placeholder="Username"
              id="username"
              label="username"
              name="username"
              fullWidth
              value={loginInfo.username}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              // placeholder="Password"
              id="password"
              label="password"
              name="password"
              fullWidth
              value={loginInfo.password}
              onChange={(e) => handleChange(e)}
            />
            <Button
              variant="contained"
              onClick={() => {
                logIn(loginInfo);
              }}
            >
              Login To Vote
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Login;
