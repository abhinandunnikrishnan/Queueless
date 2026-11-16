import React, { useEffect, useState } from 'react'
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import Upcoming from '../components/Upcoming';
import Cancelled from '../components/Cancelled';
import Completed from '../components/Completed';
import Header from '../components/Header'
import { getMyBookingsAPI } from '../../services/bookingAPI';


function MyBooking() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const [bookings, setBookings] = useState([]);

const loadBookings = async () => {
    try {
        const result = await getMyBookingsAPI();

        if (result.status === 200) {
            setBookings(result.data.bookings || []);
        }
    } catch (error) {
        console.log("Error fetching bookings:", error);
    }
};

useEffect(() => {
    loadBookings();
}, []);


const upcomingCount = bookings.filter(
    (booking) =>
        booking.status === "waiting" ||
        booking.status === "serving"
).length;

const completedCount = bookings.filter(
    (booking) => booking.status === "completed"
).length;

const cancelledCount = bookings.filter(
    (booking) => booking.status === "cancelled"
).length;


  const tabs = [
    {
      id: "upcoming",
      label: "Upcoming",
      icon: <FaHourglassHalf />,
    },
    {
      id: "completed",
      label: "Completed",
      icon: <FaCheckCircle />,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: <FaTimesCircle />,
    },
  ];

  return (
    <div>
      <Header/>
      <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#B89520]">
              QueueLess
            </p>
  
            <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
              My Bookings
            </h1>
  
            <p className="mt-3 max-w-2xl text-gray-500">
              Manage your queue tokens and keep track of your booking history
              in one place.
            </p>
          </div>
  
          {/* Booking Summary */}
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Upcoming Bookings</p>
                  <h2 className="mt-2 text-3xl font-bold text-[#171717]">
                    {upcomingCount}
                  </h2>
                </div>
  
                <div className="rounded-xl bg-yellow-100 p-4 text-xl text-[#B89520]">
                  <FaTicketAlt />
                </div>
              </div>
            </div>
  
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed Bookings</p>
                  <h2 className="mt-2 text-3xl font-bold text-[#171717]">
                    {completedCount}
                  </h2>
                </div>
  
                <div className="rounded-xl bg-green-100 p-4 text-xl text-green-600">
                  <FaCheckCircle />
                </div>
              </div>
            </div>
  
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Cancelled Bookings</p>
                  <h2 className="mt-2 text-3xl font-bold text-[#171717]">
                    {cancelledCount}
                  </h2>
                </div>
  
                <div className="rounded-xl bg-red-100 p-4 text-xl text-red-500">
                  <FaTimesCircle />
                </div>
              </div>
            </div>
          </div>
  
          {/* Booking Tabs */}
          <div className="mb-6 flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-5 py-3 font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-[#D4AF37] text-[#171717] shadow-sm"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
  
          {/* Booking List */}
          <div>
            {activeTab === "upcoming" && (
              <Upcoming onBookingChange={loadBookings} />
            )}
  
            {activeTab === "completed" && <Completed />}
  
            {activeTab === "cancelled" && <Cancelled />}
          </div>
  
          {/* Footer Note */}
          <div className="mt-10 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm leading-6 text-gray-600">
              <span className="font-semibold text-[#171717]">
                Note:
              </span>{" "}
              Please arrive at your selected organization on time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBooking