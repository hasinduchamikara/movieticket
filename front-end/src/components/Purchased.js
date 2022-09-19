import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import QrCode from "react-qr-code";

// actions
import { fetchTickets } from "../actions/movieActions";

const useStyles = makeStyles({
  banner: {
    width: "100%",
  },
});

const Purchased = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [tickets, setTickets] = useState([]);

  const data = useSelector((state) => state.movie.getTicketsData.data);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  useEffect(() => {
    setTickets([]);
    if (data && data.movies.length > 0) {
      for (const element of data.movies) {
        for (const movie of element.movies) {
          setTickets((prev) => [...prev, movie]);
        }
      }
    }
  }, [data]);

  return (
    <Grid container spacing={2} padding={2}>
      {tickets.map((ticket) => (
        <Grid item xs={6}>
          <QrCode
            value={`${ticket.movie.name}`}
            title={ticket.movie.name}
            className={classes.banner}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Purchased;
