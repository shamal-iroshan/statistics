/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

interface IProps {
  options: string[];
  label: string;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export default function DropDown({
  options,
  label,
  onChange,
  disabled = false
}: IProps): React.ReactElement {
  return (
    <Autocomplete
      disabled={disabled}
      sx={{ width: 300 }}
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={options.map((option) => option)}
      onChange={(event, value) => onChange(value)}
      onInputChange={(event, value) => onChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            type: 'search'
          }}
        />
      )}
    />
  );
}
