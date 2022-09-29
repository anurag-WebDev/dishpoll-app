import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DishesView from "./DishesView";
import { useSnackbar } from "notistack";
import "./Dashboard.css";
import SelectedDishRankView from "./SelectedDishRankView";
import { Navigate } from "react-router-dom";
import Header from "./Header";

const Dashboard = ({
  selectedDishes,
  setSelectedDishes,
  dishScore,
  setDishScore,
}) => {
  const [dishesInfo, setDishesInfo] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isUserAuthenticated = sessionStorage.getItem("isAuthenticated");

  console.log(isUserAuthenticated);
  useEffect(() => {
    performApiCall();
  }, []);

  const url =
    "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json";

  const performApiCall = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      // console.log(res.data);
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

  // console.log(selectedDishes);

  return (
    <>
      <Header />
      {isUserAuthenticated ? (
        <Box className="dishes-container">
          <Grid container spacing={2} sx={{ placeContent: "start" }}>
            <Grid item xs={8}>
              <Box className="heading">
                <Typography variant="h6">
                  Select the Best Three Dishes from the List Below
                </Typography>
              </Box>
              {/* <Stack direction="row"> */}
              <DishesView
                error={error}
                isLoading={isLoading}
                dishesInfo={dishesInfo}
                selectedDishes={selectedDishes}
                setSelectedDishes={setSelectedDishes}
              />
            </Grid>
            <Grid item xs={4} className="dishrankview">
              <Box>
                <SelectedDishRankView
                  dishesInfo={dishesInfo}
                  selectedDishes={selectedDishes}
                  setSelectedDishes={setSelectedDishes}
                  dishScore={dishScore}
                  setDishScore={setDishScore}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Navigate replace to="/" />
      )}
    </>
  );
};

export default Dashboard;
