import React, { useEffect, useState } from 'react'
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTimesCircle,
} from "react-icons/fa";
import { getMyBookingsAPI } from '../../services/bookingAPI';
function Cancelled() {
  const [bookings, setBookings] = useState([]);

    const loadBookings = async () => {
        try {
            const result = await getMyBookingsAPI();
            setBookings(result.data.bookings);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const cancelledBookings = bookings.filter(
        (booking) => booking.status === "cancelled"
    );
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {
      cancelledBookings.length > 0 ? (
      cancelledBookings.map((booking) => (
        <div
          key={booking._id}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
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

            <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              <FaTimesCircle />
              Cancelled
            </span>
          </div>

          <div className="my-5 rounded-xl bg-[#171717] p-5 text-center">
            <p className="text-sm text-gray-300">Cancelled Token</p>
            <p className="mt-2 text-4xl font-bold text-[#D4AF37]">
              {booking.tokenCode}
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex items-center gap-3">
              <FaCalendarAlt className="text-gray-500" />
              {booking.bookingDate}
            </p>

            
          </div>
        </div>
      ))
    ):(
       <p className="col-span-full py-10 text-center text-gray-500">
        No cancelled bookings found.
    </p>
    )

    }
    </div>
  )
}

export default Cancelled