import {
  FormControl,
  FormHelperText,
  TextField as MaterialInput,
} from '@mui/material';
import React from 'react';

const TextField = ({ label, name, value, error, helperText, onChange }) => {
  return (
    <FormControl fullWidth>
      <MaterialInput
        label={label}
        name={name}
        value={value}
        error={error}
        onChange={onChange}
      />
      <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default TextField;
