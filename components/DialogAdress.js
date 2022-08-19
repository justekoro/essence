import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ adress, city }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        adresse
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Adresse trouvée"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {adress}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          <Button onClick={handleClose} autoFocus>
            <a href={`https://www.google.com/maps?q=${adress} - ${city}`} target="_blank" rel='noreferrer'>ouvrir dans maps ?</a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
