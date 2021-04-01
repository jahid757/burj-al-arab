import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBookings] = useState([])
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    useEffect(() =>{
        fetch('http://localhost:3001/api?email='+loggedInUser.email,{
            method: 'GET',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
        .then(response => response.json())
        .then(data =>{
            setBookings(data);
        })
    },[loggedInUser.email])
    // console.log(bookings);
    return (
        <div>
            <h1>You Have {bookings.length} Bookings</h1>
            {
                bookings.map(booking => <li key={booking._id}> Name: {booking.name} From : {(new Date(booking.checkIn).toDateString('dd/MM/yyyy'))} To : {(new Date(booking.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;