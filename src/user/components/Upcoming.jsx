import React from 'react'
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { cancelBookingAPI, getMyBookingsAPI } from '../../services/bookingAPI';

function Upcoming({ onBookingChange }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);
  
  const loadBookings = async () => {
    try {
        const result = await getMyBookingsAPI();

        setBookings(result.data.bookings);

    } catch (error) {
        console.log(error);
    }
};

  const upcomingBookings = bookings.filter(
    (booking) =>
        booking.status === "waiting" ||
        booking.status === "serving"
);

const handleCancel = async (id) => {
    try {
        const result = await cancelBookingAPI(id);

        if (result.status === 200) {
            alert("Booking cancelled successfully");
            await loadBookings();
            onBookingChange();
        }

    } catch (error) {
        alert(
            error.response?.data?.message ||
            "Unable to cancel booking"
        );
    }
};

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {upcomingBookings.map((booking) => (
        <div key={booking._id}>
          <div
            
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">
                  {booking.orgName}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {booking.service}
                </p>
              </div>
  
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                {booking.status}
              </span>
            </div>
  
            <div className="my-5 rounded-xl bg-[#171717] p-5 text-center">
              <p className="text-sm text-gray-300">Your Token Number</p>
              <p className="mt-2 text-4xl font-bold text-[#D4AF37]">
                {booking.tokenCode}
              </p>
            </div>
  
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-3">
                <FaCalendarAlt className="text-[#B89520]" />
                {booking.bookingDate}
              </p>
  
              <p className="flex items-center gap-3">
                <FaClock className="text-[#B89520]" />
                {booking.timeSlot}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
    {booking.status === "waiting" && (
        <button
            onClick={() => handleCancel(booking._id)}
            className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200"
        >
            Cancel Booking
        </button>
    )}
</div>
        </div>
        
      ))}
      
    </div>
  )
}

export default Upcoming