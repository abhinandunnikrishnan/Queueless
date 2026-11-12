import React from 'react'
import AdminHeader from '../components/AdminHeader'
import {
  FaUsers,
  FaBuilding,
  FaTicketAlt,
  FaRupeeSign,
  FaArrowUp,
  FaArrowDown,
  FaEye,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function AdminDashboard() {
  const bookingData = [
    { month: "May", bookings: 320, completed: 280 },
    { month: "Jun", bookings: 450, completed: 390 },
    { month: "Jul", bookings: 380, completed: 330 },
    { month: "Aug", bookings: 590, completed: 510 },
    { month: "Sep", bookings: 520, completed: 460 },
    { month: "Oct", bookings: 720, completed: 640 },
  ];

  // Sample user and organization data
  const growthData = [
    { month: "May", users: 180, organizations: 12 },
    { month: "Jun", users: 240, organizations: 18 },
    { month: "Jul", users: 310, organizations: 24 },
    { month: "Aug", users: 390, organizations: 31 },
    { month: "Sep", users: 470, organizations: 38 },
    { month: "Oct", users: 560, organizations: 45 },
  ];

  // Sample booking status data
  const statusData = [
    { name: "Completed", value: 65, color: "#D4AF37" },
    { name: "Waiting", value: 20, color: "#171717" },
    { name: "Cancelled", value: 15, color: "#D1D5DB" },
  ];

  // Sample recent bookings
  const recentBookings = [
    {
      id: "QL-1001",
      customer: "Arjun Nair",
      organization: "City Care Hospital",
      date: "28 Oct 2026",
      status: "Completed",
    },
    {
      id: "QL-1002",
      customer: "Anjali Menon",
      organization: "Style Studio",
      date: "28 Oct 2026",
      status: "Waiting",
    },
    {
      id: "QL-1003",
      customer: "Rahul Kumar",
      organization: "The Food Corner",
      date: "27 Oct 2026",
      status: "Cancelled",
    },
    {
      id: "QL-1004",
      customer: "Meera Das",
      organization: "City Care Hospital",
      date: "27 Oct 2026",
      status: "Completed",
    },
  ];

  const statusClass = (status) => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Waiting") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  return (
    <div>
      <AdminHeader/> 
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#171717] sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Overview of your QueueLess platform.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
          <span className="font-medium text-[#171717]">Today:</span>{" "}
          {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Users */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/20">
              <FaUsers className="text-xl text-[#98720D]" />
            </div>
            
          </div>
          <p className="mt-4 text-sm text-gray-500">Total Users</p>
          <h2 className="mt-1 text-2xl font-bold text-[#171717]">
            1,248
          </h2>
          
        </div>

        {/* Organizations */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/20">
              <FaBuilding className="text-xl text-[#98720D]" />
            </div>
            
          </div>
          <p className="mt-4 text-sm text-gray-500">Organizations</p>
          <h2 className="mt-1 text-2xl font-bold text-[#171717]">
            86
          </h2>
          
        </div>

        {/* Bookings */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/20">
              <FaTicketAlt className="text-xl text-[#98720D]" />
            </div>
            
          </div>
          <p className="mt-4 text-sm text-gray-500">Total Bookings</p>
          <h2 className="mt-1 text-2xl font-bold text-[#171717]">
            3,642
          </h2>
          
        </div>
      </div>

      {/* Booking Trend Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#171717]">
            Booking Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Monthly bookings and completed bookings.
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={bookingData}
              margin={{ top: 5, right: 10, left: -15, bottom: 5 }}
            >
              <CartesianGrid
                stroke="#E5E7EB"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="bookings"
                name="Total Bookings"
                stroke="#D4AF37"
                strokeWidth={3}
                dot={{ r: 4, fill: "#D4AF37" }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                name="Completed"
                stroke="#171717"
                strokeWidth={2}
                dot={{ r: 3, fill: "#171717" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth and Booking Status Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Growth Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#171717]">
              Platform Growth
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              New users and organizations each month.
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={growthData}
                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  stroke="#E5E7EB"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="users"
                  name="Users"
                  fill="#D4AF37"
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="organizations"
                  name="Organizations"
                  fill="#171717"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Status Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-2">
            <h2 className="text-lg font-bold text-[#171717]">
              Booking Status
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Distribution of booking statuses.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  stroke="none"
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard