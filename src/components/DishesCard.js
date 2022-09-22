import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";

const DishesCard = ({ dish }) => {
  const rankingArray = [
    { label: "none", value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
  ];

  const dishesInit = {
    name: "",
    value: "",
  };

  const [rank, setRank] = useState(0);
  const [selectedDishes, setSelectedDishes] = useState([]);

  const handleRankChange = (e) => {};
  console.log(rank);
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: "25rem",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={dish.image}
        alt={dish.dishName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dish.dishName}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {dish.description}
        </Typography>
      </CardContent>
      <CardActionArea>
        <TextField
          id={dish.dishName}
          name={dish.dishName}
          select
          label="Select"
          value={rank}
          onChange={(e) => handleRankChange(e)}
          helperText="Please select the rank of the Dish"
        >
          {rankingArray.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </CardActionArea>
    </Card>
  );
};

export default DishesCard;
