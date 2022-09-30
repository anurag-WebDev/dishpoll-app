import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import "./SelectedDishRankView.css";

const SelectedDishRankView = ({
  dishesInfo,
  selectedDishes,
  setSelectedDishes,
  dishScore,
  setDishScore,
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (dishScore.length) {
      const temp = JSON.stringify(dishScore);
      localStorage.setItem("dishScoreData", temp);
    }
  }, [dishScore]);

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

  const handleSubmitVote = (e) => {
    e.preventDefault();
    if (selectedDishes.length < 3) {
      enqueueSnackbar("Please select atleast 3 Dishes to cast Vote.", {
        action: (snackbarId) => action(snackbarId),
        variant: "error",
      });
      return;
    }
    if (containsDuplicatesDishes() === true) {
      enqueueSnackbar(
        "Please remove Duplicate Dishes and choose Unique Dishes to Cast Vote.",
        {
          action: (snackbarId) => action(snackbarId),
          variant: "error",
        }
      );
      return;
    }
    const dishScoreFromRank = selectedDishes.map((dish) => {
      if (dish.rank === 1) {
        return { name: dish.dishName, score: 30 };
      } else if (dish.rank === 2) {
        return { name: dish.dishName, score: 20 };
      } else if (dish.rank === 3) {
        return { name: dish.dishName, score: 10 };
      }
      return 1;
    });

    if (localStorage.getItem("dishScoreData")) {
      const prevLocalStorageData = JSON.parse(
        localStorage.getItem("dishScoreData")
      );

      setDishScore(() => [...prevLocalStorageData, ...dishScoreFromRank]);
    } else {
      setDishScore(() => [...dishScoreFromRank]);
    }
    enqueueSnackbar(
      "Selected Dishes Voted Succesfully,click on go to poll page to view results",
      {
        action: (snackbarId) => action(snackbarId),
        variant: "success",
      }
    );
  };

  const containsDuplicatesDishes = () => {
    const uniqueValues = new Set(selectedDishes.map((dish) => dish.dishName));

    if (uniqueValues.size < selectedDishes.length) {
      return true;
    }
    return false;
  };

  const handleRemove = (e) => {
    const dishToRemove = e.target.name;

    const updatedDishRanks = selectedDishes.filter(
      (dish) => dish.dishName !== dishToRemove
    );

    setSelectedDishes(() => [...updatedDishRanks]);
  };

  let rankView = selectedDishes
    .sort((a, b) => a.rank - b.rank)
    .map((dish, index) => (
      <Box
        display="flex"
        alignItems="flex-start"
        padding="1rem"
        textAlign="center"
        key={index}
        className="details"
      >
        <Stack direction="row" spacing={2} paddingBottom="1rem">
          <Box sx={{ width: "4rem" }}>
            <Typography variant="body1">Rank {dish.rank} :</Typography>
          </Box>
          <Box sx={{ width: "4rem" }}>
            <Typography variant="body1"> {dish.dishName}</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              name={dish.dishName}
              onClick={(e) => handleRemove(e)}
            >
              Remove
            </Button>
          </Box>
        </Stack>
      </Box>
    ));

  let noDishSelected = (
    <Box sx={{ padding: "2rem" }}>
      No Dishes Selected,Select Dishes To View Ranks.
    </Box>
  );

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h6" sx={{ alignSelf: "center" }}>
        Selected Dishes
      </Typography>
      {selectedDishes.length ? (
        <Box sx={{ textAlign: "center" }}>
          {rankView}
          <Button variant="contained" onClick={(e) => handleSubmitVote(e)}>
            Submit Vote
          </Button>
        </Box>
      ) : (
        noDishSelected
      )}
    </Box>
  );
};

export default SelectedDishRankView;
