import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Addcar = ({ addCar }) => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    color: '',
    fuel: '',
    year: '',
    price: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCarClick = () => {
    setOpen(false);
    addCar(car);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCar({ ...car, [name]: value });
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            name='brand'
            label='Brand'
            type='text'
            fullWidth
            variant='standard'
            value={car.brand}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='model'
            label='Model'
            type='text'
            fullWidth
            variant='standard'
            value={car.model}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='color'
            label='Color'
            type='text'
            fullWidth
            variant='standard'
            value={car.color}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='year'
            label='Year'
            type='number'
            fullWidth
            variant='standard'
            value={car.year}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='fuel'
            label='Fuel'
            type='text'
            fullWidth
            variant='standard'
            value={car.fuel}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='price'
            label='Price'
            type='number'
            fullWidth
            variant='standard'
            value={car.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={addCarClick} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Addcar;
