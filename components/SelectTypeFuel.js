import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { MenuItem } from "@mui/material";
import React from "react";

const SelectTypeFuel = ({ value, onChange }) => {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          onChange={onChange}
        >
          <MenuItem value={"Gazole"}>Gazole</MenuItem>
          <MenuItem value={"E85"}>E85</MenuItem>
          <MenuItem value={"E10"}>E10</MenuItem>
          <MenuItem value={"SP98"}>SP98</MenuItem>
          <MenuItem value={"SP95"}>SP95</MenuItem>
          <MenuItem value={"GPLc"}>GPLc</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectTypeFuel;
