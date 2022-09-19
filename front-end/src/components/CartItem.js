import React from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#e8e8e8',
    borderRadius: '10px',
  },
  banner: {
    width: '100%',
  },
});

const CartItem = ({ img, title, no_of_tickets }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} p={2}>
      <div className={classes.container}>
        <Grid container spacing={2} item xs={12}>
          <Grid item xs={3}>
            <img
              src={img}
              alt="black-panther"
              className={classes.banner}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle1">No of tickets {no_of_tickets}</Typography>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default CartItem;
