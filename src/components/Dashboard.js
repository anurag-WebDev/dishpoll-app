import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DishesView from "./DishesView";
import { useSnackbar } from "notistack";
import "./Dashboard.css";

const Dashboard = () => {
  const [dishesInfo, setDishesInfo] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    performApiCall();
  }, []);

  const url =
    "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json";

  const performApiCall = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      console.log(res.data);
      setDishesInfo(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(true);
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      }
    }
  };

  console.log(dishesInfo);

  return (
    <>
      <Box className="dishes-container">
        <Grid container spacing={2} sx={{ placeContent: "start" }}>
          <Grid item xs={6}>
            <Box className="heading">
              <Typography variant="h7">
                Select the Best Three Dishes from the List Below.
              </Typography>
            </Box>
            {/* <Stack direction="row"> */}
            <DishesView
              error={error}
              isLoading={isLoading}
              dishesInfo={dishesInfo}
            />
          </Grid>
          <Grid item xs={6}>
            <Box></Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
