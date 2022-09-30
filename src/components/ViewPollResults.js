import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Navigate, Link } from "react-router-dom";

import Header from "./Header";
import GenerateTableFromData from "./GenerateTableFromData";
import "./ViewPollResults.css";

const ViewPollResults = () => {
  const [pollList, setPollList] = useState([]);
  const [listToDisplay, setListToDisplay] = useState([]);
  const isUserAuthenticated = sessionStorage.getItem("isAuthenticated");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("dishScoreData"));
    // console.log(items);
    if (items) {
      setPollList(items);
    }
  }, []);

  useEffect(() => {
    selectedDishesTotalScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollList]);

  const selectedDishesTotalScore = () => {
    let totalScoreMap = pollList.reduce((mapAcc, obj) => {
      if (!mapAcc[obj.name]) {
        mapAcc[obj.name] = obj.score;
      } else {
        mapAcc[obj.name] = mapAcc[obj.name] + obj.score;
      }

      return mapAcc;
    }, {});

    totalScoreList(totalScoreMap);
  };

  const totalScoreList = (data) => {
    let tempArray = [];

    Object.keys(data).forEach((key) =>
      tempArray.push({
        name: key,
        score: data[key],
      })
    );
    console.log(tempArray);
    tempArray = tempArray.sort((a, b) => b.score - a.score);
    setListToDisplay(() => [...tempArray]);
  };

  let table = (
    <Grid container spacing={2} padding={"1rem"}>
      <Grid item xs={12}>
        <Box className="headingBox">
          <Typography className="heading" variant="h6">
            Dish Poll Results
          </Typography>
        </Box>
        <GenerateTableFromData
          className="table"
          listToDisplay={listToDisplay}
        />{" "}
      </Grid>
    </Grid>
  );

  return (
    <>
      <Header />
      <Box className="poll-page-redirect">
        {" "}
        <Link to="/dashboard">Go to Poll Page</Link>
      </Box>
      {isUserAuthenticated ? table : <Navigate replace to="/" />}
    </>
  );
};

export default ViewPollResults;
