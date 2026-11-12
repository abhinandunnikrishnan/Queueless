import React from 'react'
import AdminHeader from '../components/AdminHeader'
import {
  FaUsers,
  FaBuilding,
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";

function AdminResource() {
  return (
    <div>
      <AdminHeader/>
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#171717] sm:text-3xl">
          Admin Resources
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage users and organizations registered on QueueLess.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D4AF37]/20">
            <FaUsers className="text-2xl text-[#98720D]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="mt-1 text-2xl font-bold text-[#171717]">1,248</h2>
            <p className="mt-1 text-xs text-green-600">Registered users</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D4AF37]/20">
            <FaBuilding className="text-2xl text-[#98720D]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Organizations</p>
            <h2 className="mt-1 text-2xl font-bold text-[#171717]">86</h2>
            <p className="mt-1 text-xs text-green-600">Registered organizations</p>
          </div>
        </div>
      </div>

      {/* Tabs - Design Only */}
      <div className="flex gap-6 border-b border-gray-200">
        <button className="flex items-center gap-2 border-b-2 border-[#D4AF37] px-2 py-3 text-sm font-semibold text-[#98720D]">
          <FaUsers />
          Users
        </button>
        <button className="flex items-center gap-2 border-b-2 border-transparent px-2 py-3 text-sm font-semibold text-gray-500">
          <FaBuilding />
          Organizations
        </button>
      </div>

      {/* Search Bar - Design Only */}
      <div className="relative w-full sm:max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-bold text-[#171717]">Registered Users</h2>
          <p className="mt-1 text-sm text-gray-500">
            Overview of users registered on the platform.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left text-sm">
            <thead className="bg-[#171717] text-white">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Contact Details</th>
                <th className="px-5 py-4">Joined Date</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="transition hover:bg-[#F7F7F5]">
                <td className="px-5 py-4">
                  <p className="font-semibold text-[#171717]">Arjun Nair</p>
                  <p className="mt-1 text-xs text-gray-500">USR-001</p>
                </td>
                <td className="px-5 py-4">
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-[#98720D]" />
                    arjun@example.com
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-gray-500">
                    <FaPhone className="text-xs" />
                    98765 43210
                  </p>
                </td>
                <td className="px-5 py-4 text-gray-600">20 Oct 2026</td>
                
                <td className="px-5 py-4">
                  <button className="rounded-lg border border-gray-200 p-2 text-[#98720D] hover:bg-[#D4AF37]/20">
                    <FaEye />
                  </button>
                </td>
              </tr>
 
            </tbody>
          </table>
        </div>
      </div>

      {/* Organizations Preview */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-5">
          <div>
            <h2 className="text-lg font-bold text-[#171717]">
              Registered Organizations
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Overview of organizations using QueueLess.
            </p>
          </div>
          <span className="rounded-full bg-[#D4AF37]/20 px-3 py-1 text-xs font-semibold text-[#98720D]">
            86 Organizations
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-187.5 text-left text-sm">
            <thead className="bg-[#171717] text-white">
              <tr>
                <th className="px-5 py-4">Organization</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="transition hover:bg-[#F7F7F5]">
                <td className="px-5 py-4">
                  <p className="font-semibold text-[#171717]">
                    City Care Hospital
                  </p>
                  <p className="mt-1 text-xs text-gray-500">ORG-001</p>
                </td>
                <td className="px-5 py-4">
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-[#98720D]" />
                    citycare@example.com
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-gray-500">
                    <FaPhone className="text-xs" />
                    0484 123 4567
                  </p>
                </td>
                <td className="px-5 py-4 text-gray-600">Hospital</td>
                <td className="px-5 py-4">
                  <span className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-[#98720D]" />
                    Kochi, Kerala
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-700">
                    <FaCheckCircle />
                    Approved
                  </span>
                </td>
              </tr>
 
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminResource