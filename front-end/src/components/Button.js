import React from 'react';
import { Button as MaterialButton } from '@mui/material';

const Button = ({ type = 'submit', label, onClick }) => {
  return (
    <MaterialButton
      type={type}
      variant="contained"
      sx={{ color: 'white', textTransform: 'none' }}
      fullWidth
      onClick={onClick}
    >
      {label}
    </MaterialButton>
  );
};

export default Button;
