import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";

export default function InputSearch({ onChange, value }) {
  return (
  // input search
  <TextField id="outlined-basic" label="recherche" variant="outlined" onChange={onChange} value={value}/>);
}
