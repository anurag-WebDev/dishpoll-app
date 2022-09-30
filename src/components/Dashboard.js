import { Box, Grid, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DishesView from "./DishesView";
import { Navigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import SelectedDishRankView from "./SelectedDishRankView";
import Header from "./Header";
import "./Dashboard.css";

const Dashboard = ({
  selectedDishes,
  setSelectedDishes,
  dishScore,
  setDishScore,
}) => {
  const [dishesInfo, setDishesInfo] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isUserAuthenticated = sessionStorage.getItem("isAuthenticated");

  useEffect(() => {
    performApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const action = (snackbarId) => {
    return (
      <Button
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Dismiss
      </Button>
    );
  };

  const url =
    "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json";

  const performApiCall = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      setDishesInfo(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(true);
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, {
          action: (snackbarId) => action(snackbarId),
          variant: "error",
        });
      }
    }
  };

  return (
    <>
      <Header />
      <Box className="result-page-redirect">
        {" "}
        <Link to="/viewpollresult">Go to Result Page</Link>
      </Box>
      {isUserAuthenticated ? (
        <Box className="dishes-container">
          <Grid container spacing={2} sx={{ placeContent: "start" }}>
            <Grid item xs={8}>
              <Box className="heading-select">
                <Typography variant="h6">Select Best Dishes</Typography>
              </Box>
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
