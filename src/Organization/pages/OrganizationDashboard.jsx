import React, { useEffect, useState } from 'react'
import OrganizationHeader from '../Components/OrganizationHeader'
import {
  FaBuilding,
  FaTicketAlt,
  FaUsers,
  FaCheckCircle,
  FaBullhorn,
  FaClock,
  FaArrowRight,
  FaForward,
} from "react-icons/fa";
import { getOrganizationQueueAPI, serveNextAPI } from '../../services/bookingAPI';


function OrganizationDashboard() {
  const [orgname, setOrgname] = useState("");
  const [orgtype, setOrgtype] = useState("");
  const [orgaddress, setOrgaddress] = useState("");

  // Date and time states
  const today = new Date();

  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}`;

  const [selectedDate, setSelectedDate] = useState(todayString);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    "09:00 AM - 10:00 AM"
  );

  // General queue state
  const [generalQueue, setGeneralQueue] = useState({
    serving: null,
    waiting: [],
    completed: [],
    totalWaiting: 0,
    totalCompleted: 0
  });

  // Specialist queue state
  const [specialQueue, setSpecialQueue] = useState({
    serving: null,
    waiting: [],
    completed: [],
    totalWaiting: 0,
    totalCompleted: 0
  });

  // Load queue
  const loadQueue = async (service) => {
    try {
      const result = await getOrganizationQueueAPI(
        selectedDate,
        service,
        selectedTimeSlot
      );

      if (result?.status === 200) {
        const queueData = {
          serving: result.data.serving || null,
          waiting: result.data.waiting || [],
          completed: result.data.completed || [],
          totalWaiting: result.data.totalWaiting || 0,
          totalCompleted: result.data.totalCompleted || 0
        };

        if (service === "General Consultation") {
          setGeneralQueue(queueData);
        } else {
          setSpecialQueue(queueData);
        }
      }
    } catch (error) {
      console.log(
        "Queue loading error:",
        error.response?.data || error.message
      );
    }
  };

  // Organization details
  useEffect(() => {
    if (sessionStorage.getItem("orgToken") && sessionStorage.getItem("org")) {
      const org = JSON.parse(sessionStorage.getItem("org"));

      setOrgname(org?.orgName || "");
      setOrgtype(org?.orgCategory || "");
      setOrgaddress(org?.orgAddress || "");
    }
  }, []);

  // Load both queues whenever date or time changes
  useEffect(() => {
    loadQueue("General Consultation");
    loadQueue("Specialist Consultation");
  }, [selectedDate, selectedTimeSlot]);

  // Serve next token
  const handleServeNext = async (service) => {
    try {
      await serveNextAPI(
        selectedDate,
        service,
        selectedTimeSlot
      );

      await loadQueue(service);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to serve next token"
      );
    }
  };

  // Combine waiting bookings
  const allWaitingBookings = [
    ...(generalQueue.waiting || []),
    ...(specialQueue.waiting || [])
  ];

  return (
    <div>
      <OrganizationHeader/>
      <div className="min-h-screen bg-[#F7F7F5] p-4 sm:p-6 lg:p-8">
      {/* Page Heading */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#171717] sm:text-3xl">
            Organization Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your tokens and serve customers efficiently.
          </p>
        </div>

        
      </div>

      {/* Organization Banner */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-[#171717] p-5 text-white shadow-lg sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] sm:h-16 sm:w-16">
              <FaBuilding className="text-2xl text-[#171717] sm:text-3xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                {orgname}
              </h2>
              <p className="mt-1 text-sm text-gray-300">
                {orgtype} · {orgaddress}
              </p>
              
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs text-gray-400">Today's Date</p>
            <p className="mt-1 font-semibold">
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row">
  <div className="flex-1">
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      Select Date
    </label>
    <input
      type="date"
      value={selectedDate}
      min={todayString}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="w-full rounded-lg border border-gray-300 p-3"
    />
  </div>

  <div className="flex-1">
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      Select Time Slot
    </label>
    <select
      value={selectedTimeSlot}
      onChange={(e) => setSelectedTimeSlot(e.target.value)}
      className="w-full rounded-lg border border-gray-300 p-3"
    >
      <option>09:00 AM - 10:00 AM</option>
      <option>10:00 AM - 11:00 AM</option>
      <option>11:00 AM - 12:00 PM</option>
      <option>12:00 PM - 01:00 PM</option>
      <option>02:00 PM - 03:00 PM</option>
      <option>03:00 PM - 04:00 PM</option>
    </select>
  </div>
</div>

      
{/* Separate Service Dashboards */}
<div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

  {/* General Consultation */}
  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

    <div className="bg-[#171717] p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">General Consultation</h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage general consultation tokens
          </p>
        </div>
        <div className="rounded-xl bg-[#D4AF37] p-3">
          <FaTicketAlt className="text-2xl text-[#171717]" />
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-400">NOW SERVING</p>
      <h3 className="mt-1 text-5xl font-bold text-[#D4AF37]">
        {generalQueue.serving?.tokenCode || "Not Started"}
      </h3>
    </div>

    {/* General Statistics */}
    <div className="grid grid-cols-2 gap-3 p-5">
      <div className="rounded-xl bg-[#F7F7F5] p-4">
        <FaUsers className="text-lg text-[#98720D]" />
        <p className="mt-3 text-xs text-gray-500">Waiting Tokens</p>
        <p className="mt-1 text-2xl font-bold text-[#171717]">{generalQueue.totalWaiting}</p>
      </div>

      <div className="rounded-xl bg-[#F7F7F5] p-4">
        <FaCheckCircle className="text-lg text-green-600" />
        <p className="mt-3 text-xs text-gray-500">Completed Tokens</p>
        <p className="mt-1 text-2xl font-bold text-[#171717]">{generalQueue.totalCompleted}</p>
      </div>

      <div className="rounded-xl bg-[#F7F7F5] p-4">
        <FaTicketAlt className="text-lg text-[#98720D]" />
        <p className="mt-3 text-xs text-gray-500">Current Token</p>
        <p className="mt-1 text-xl font-bold text-[#171717]">{generalQueue.serving?.tokenCode || "--"}</p>
      </div>

      <div className="rounded-xl bg-[#F7F7F5] p-4">
        <FaClock className="text-lg text-[#98720D]" />
        <p className="mt-3 text-xs text-gray-500">Next Token</p>
        <p className="mt-1 text-xl font-bold text-[#171717]">{generalQueue.waiting?.[0]?.tokenCode || "--"}</p>
      </div>
    </div>

    {/* General Token Controls */}
    <div className="flex flex-col gap-3 px-5 pb-5 sm:flex-row">
     <button
      onClick={() => handleServeNext("General Consultation")}
      disabled={generalQueue.waiting.length === 0}
      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3 font-semibold text-[#171717] transition hover:bg-[#E5C65B] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <FaBullhorn />
      Call Next Token
      <FaArrowRight />
    </button>

      <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100">
        <FaForward />
        Skip
      </button>
    </div>
  </div>


  {/* Specialist Consultation */}
  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

    <div className="bg-[#171717] p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Specialist Consultation</h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage specialist consultation tokens
          </p>
        </div>
        <div className="rounded-xl bg-[#D4AF37] p-3">
          <FaTicketAlt className="text-2xl text-[#171717]" />
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-400">NOW SERVING</p>
      <h3 className="mt-1 text-5xl font-bold text-[#D4AF37]">
       {specialQueue.serving?.tokenCode || "Not Started"}
      </h3>
    </div>

    {/* Specialist Statistics */}
    <div className="grid grid-cols-2 gap-3 p-5">
      <div className="rounded-xl bg-[#F7F7F5] p-4">
        <FaUsers className="text-lg text-[#98720D]" />
        <p className="mt-3 text-xs text-gray-500">Waiting Tokens</p>
        <p className="mt-1 text-2xl font-bold text-[#171717]">{specialQueue.totalWaiting}</p>
      </div>

      <div className="rounded-xl bg-[#F7F7F5] p-4">
        <FaCheckCircle className="text-lg text-green-600" />
        <p className="mt-3 text-xs text-gray-500">Completed Tokens</p>
        <p className="mt-1 text-2xl font-bold text-[#171717]">{specialQueue.totalCompleted}</p>
      </div>

      <div className="rounded-xl bg-[#F7F7F5] p-4">
        <FaTicketAlt className="text-lg text-[#98720D]" />
        <p className="mt-3 text-xs text-gray-500">Current Token</p>
        <p className="mt-1 text-xl font-bold text-[#171717]">{specialQueue.serving?.tokenCode || "--"}</p>
      </div>

      <div className="rounded-xl bg-[#F7F7F5] p-4">
        <FaClock className="text-lg text-[#98720D]" />
        <p className="mt-3 text-xs text-gray-500">Next Token</p>
        <p className="mt-1 text-xl font-bold text-[#171717]">{specialQueue.waiting?.[0]?.tokenCode || "--"}</p>
      </div>
    </div>

    {/* Specialist Token Controls */}
    <div className="flex flex-col gap-3 px-5 pb-5 sm:flex-row">
      <button
        onClick={() => handleServeNext("Specialist Consultation")}
        disabled={specialQueue.waiting.length === 0}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3 font-semibold text-[#171717] transition hover:bg-[#E5C65B] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaBullhorn />
        Call Next Token
        <FaArrowRight />
      </button>

      <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100">
        <FaForward />
        Skip
      </button>
    </div>
  </div>

</div>


      {/* Waiting Queue Table */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-xl font-bold text-[#171717]">
              Waiting Queue
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Customers waiting to be served.
            </p>
          </div>
          <span className="w-fit rounded-full bg-[#D4AF37]/15 px-4 py-2 text-sm font-semibold text-[#98720D]">
            {allWaitingBookings.length} waiting
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-187.5 text-left text-sm">
            <thead className="bg-[#F7F7F5] text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Token</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Booking Time</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allWaitingBookings.length > 0 ? (
                allWaitingBookings.map((booking) => (
                  <tr key={booking._id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-[#98720D]">
                      {booking.tokenCode}
                    </td>

                    <td className="px-6 py-4 font-medium text-[#171717]">
                      {booking.username}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {booking.service}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {booking.timeSlot}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No waiting customers for this date and time slot.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      
    </div>
    </div>
  )
}

export default OrganizationDashboard