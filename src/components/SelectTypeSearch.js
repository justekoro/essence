import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectTypeSearch({ onChange, value }) {

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          onChange={onChange}
        >
          <MenuItem value={"City"}>Ville</MenuItem>
          <MenuItem value={"Postal-Code"}>code Postal</MenuItem>
          <MenuItem value={"Dep"}>Département</MenuItem>
          <MenuItem value={"Dep-Code"}>Code de Département</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
