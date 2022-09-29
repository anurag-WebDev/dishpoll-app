import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import "./SelectedDishRankView.css";

const SelectedDishRankView = ({
  dishesInfo,
  selectedDishes,
  setSelectedDishes,
  dishScore,
  setDishScore,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  // console.log(selectedDishes);
  useEffect(() => {
    selectedDishesTotalScore();
  }, [dishScore]);

  const handleSubmitVote = (e) => {
    e.preventDefault();
    if (selectedDishes.length < 3) {
      enqueueSnackbar("Please select atleast 3 Dishes to cast Vote.", {
        variant: "error",
      });
      return;
    }
    if (containsDuplicatesDishes() === true) {
      enqueueSnackbar(
        "Please remove Duplicate Dishes and choose Unique Dishes to Cast Vote.",
        {
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

    setDishScore((prevDishScoreFromRank) => [
      ...prevDishScoreFromRank,
      ...dishScoreFromRank,
    ]);

    // console.log(dishRanks);
  };

  // console.log(dishScore);

  const selectedDishesTotalScore = () => {
    let scoreTotalMap = dishScore.reduce((mapAcc, obj) => {
      if (!mapAcc[obj.name]) {
        mapAcc[obj.name] = obj.score;
      } else {
        mapAcc[obj.name] = mapAcc[obj.name] + obj.score;
      }
      return mapAcc;
    }, new Map());
    console.log(scoreTotalMap);
  };

  const containsDuplicatesDishes = () => {
    const uniqueValues = new Set(selectedDishes.map((dish) => dish.dishName));

    if (uniqueValues.size < selectedDishes.length) {
      return true;
    }
    return false;
  };

  // console.log(dishScore);

  const handleRemove = (e) => {
    const dishToRemove = e.target.name;

    const updatedDishRanks = selectedDishes.filter(
      (dish) => dish.dishName !== dishToRemove
    );

    setSelectedDishes(() => [...updatedDishRanks]);

    // console.log(updatedDishRanks);
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
            {/* <Stack direction="column"> */}{" "}
            <Typography variant="body1">Rank {dish.rank} :</Typography>
            {/* </Stack> */}
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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* <Box> */}
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
      {/* {selectedDishes.map((dish, index) => )}{" "} */}
    </Box>
  );
};

export default SelectedDishRankView;
