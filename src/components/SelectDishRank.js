import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";

const SelectDishRank = ({ dish, selectedDishes, setSelectedDishes }) => {
  const { enqueueSnackbar } = useSnackbar();

  const rankingArray = [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
  ];

  const handleRankChange = (e) => {
    const dishName = e.target.name;
    const value = e.target.value;

    const dishRankSelected = [
      {
        dishName: dishName,
        rank: value,
      },
    ];

    if (
      selectedDishes.some(
        (dish) => dish.rank === value || dish.dishName === dishName
      )
    ) {
      let newSelectedDishes = selectedDishes.filter(
        (dish) => dish.rank !== value
      );
      newSelectedDishes = [...dishRankSelected, ...newSelectedDishes];
      // console.log(newSelectedDishes);
      setSelectedDishes(() => [...newSelectedDishes]);
      enqueueSnackbar("Dish Added", {
        variant: "success",
        autoHideDuration: 500,
      });
    } else {
      setSelectedDishes((prevRank) => [...prevRank, ...dishRankSelected]);
      enqueueSnackbar("Dish Added", {
        variant: "success",
        autoHideDuration: 500,
      });
    }
  };

  return (
    <>
      <TextField
        id={dish.dishName}
        name={dish.dishName}
        select
        label="Select"
        value={0}
        onChange={(e) => handleRankChange(e)}
        helperText="Select the rank of the Dish"
      >
        {rankingArray.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default SelectDishRank;
