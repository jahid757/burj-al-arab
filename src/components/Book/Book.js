import { Button, Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    
    const date = new Date()
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: date.setDate(date.getDate() + 2)
    });

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkIn = date;
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkOut = date
        setSelectedDate(newDate);
    };

    const handelBooking = () => {
        const newBooking = {...loggedInUser,...selectedDate}
        fetch('http://localhost:3001/addBooking',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
        //   disableToolbar
        //   variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Check In Date"
          value={selectedDate.checkIn}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Check Out Date"
          format="dd/MM/yyyy"
          value={selectedDate.checkOut}
          onChange={handleCheckOutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Button onClick={handelBooking} variant="contained" color="primary">Book Now</Button>
    </MuiPickersUtilsProvider>
    <Bookings></Bookings>
        </div>
    );
};

export default Book;