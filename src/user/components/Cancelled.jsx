import React from 'react'
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTimesCircle,
} from "react-icons/fa";
function Cancelled() {
  const bookings = [
    {
      id: 1,
      organization: "City Care Hospital",
      service: "General Consultation",
      token: "A-072",
      date: "15 Oct 2026",
      location: "Kochi, Kerala",
    },
    
  ];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-[#171717]">
                {booking.organization}
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

          <div className="my-5 rounded-xl bg-gray-100 p-5 text-center">
            <p className="text-sm text-gray-500">Cancelled Token</p>
            <p className="mt-2 text-4xl font-bold text-gray-500">
              {booking.token}
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex items-center gap-3">
              <FaCalendarAlt className="text-gray-500" />
              {booking.date}
            </p>

            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-gray-500" />
              {booking.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cancelled