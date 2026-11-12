import React from 'react'
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Upcoming() {
  const bookings = [
    {
      id: 1,
      organization: "City Care Hospital",
      service: "General Consultation",
      token: "A-105",
      date: "30 Oct 2026",
      time: "10:30 AM",
      location: "Kochi, Kerala",
      status: "Waiting",
    }
  ];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
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

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
              {booking.status}
            </span>
          </div>

          <div className="my-5 rounded-xl bg-[#171717] p-5 text-center">
            <p className="text-sm text-gray-300">Your Token Number</p>
            <p className="mt-2 text-4xl font-bold text-[#D4AF37]">
              {booking.token}
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex items-center gap-3">
              <FaCalendarAlt className="text-[#B89520]" />
              {booking.date}
            </p>

            <p className="flex items-center gap-3">
              <FaClock className="text-[#B89520]" />
              {booking.time}
            </p>

            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#B89520]" />
              {booking.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Upcoming