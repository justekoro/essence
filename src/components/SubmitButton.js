import { Button } from '@mui/material';
import React from 'react';

const SubmitButton = ({ onClick }) => {
  return (
    <div>
        <Button sx={{marginTop: 2}} variant="outlined" color='error' onClick={onClick}>Rechercher</Button>
    </div>
  );
};

export default SubmitButton;
