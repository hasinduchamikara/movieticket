import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';

import TextField from './TextField';

const Payment = () => {
  const [method, setMethod] = useState('card');

  const methodChangeHandler = (event) => {
    setMethod(event.target.value);
  };

  return (
    <Grid container p={2}>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel>Select a method</FormLabel>
          <RadioGroup row onClick={methodChangeHandler} value={method}>
            <FormControlLabel value="card" control={<Radio />} label="Card" />
            <FormControlLabel
              value="mobile"
              control={<Radio />}
              label="Mobile"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      {method === 'card' && (
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField label="Name on card" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Credit card number" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="CVC" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Card expiration" />
          </Grid>
        </Grid>
      )}
      {method === 'mobile' && (
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12}>
            <TextField label="Mobile number" />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Payment;
