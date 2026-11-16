import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import {
  FaUsers,
  FaBuilding,
  FaTicketAlt,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { getAdminDashboardStatsAPI } from '../../services/userApi';


function AdminDashboard() {

  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalOrganizations: 0,
    totalBookings: 0,
    bookingStatus: {
        waiting: 0,
        serving: 0,
        completed: 0,
        cancelled: 0,
        skipped: 0
    }
});

const [loading, setLoading] = useState(true);

const getDashboardStats = async () => {
    try {
        const result = await getAdminDashboardStatsAPI();
        setDashboardStats(result.data);
    } catch (error) {
        console.error("Error fetching admin dashboard:", error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    getDashboardStats();
}, []);

  const statusData = [
    {
        name: "Completed",
        value: dashboardStats.bookingStatus.completed,
        color: "#D4AF37"
    },
    {
        name: "Waiting",
        value: dashboardStats.bookingStatus.waiting,
        color: "#171717"
    },
    {
        name: "Serving",
        value: dashboardStats.bookingStatus.serving,
        color: "#98720D"
    },
    {
        name: "Cancelled",
        value: dashboardStats.bookingStatus.cancelled,
        color: "#D1D5DB"
    },
    {
        name: "Skipped",
        value: dashboardStats.bookingStatus.skipped,
        color: "#9CA3AF"
    }
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
    {loading ? "..." : dashboardStats.totalUsers}
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
            {loading ? "..." : dashboardStats.totalOrganizations}
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
            {loading ? "..." : dashboardStats.totalBookings}
          </h2>
          
        </div>
      </div>

      

      {/* Booking Status Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
       

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
                <Tooltip formatter={(value) => `${value} bookings`} />
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