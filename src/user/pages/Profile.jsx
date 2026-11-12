import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaCog,
} from "react-icons/fa";
import Edit from "../components/Edit";
import { useState } from "react";
import Header from '../components/Header';
import axiosInstance from '../../api/axiosInstance';


function Profile() {
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState({
  username: "",
  email: "",
  role: "",
  picture: "",
  phoneNo:""
  });

  useEffect(() => {
  const loggedUser = sessionStorage.getItem("user");

  if (loggedUser) {
    setUser(JSON.parse(loggedUser));
  }
  }, []);

  return (
     <div>
      <Header/>
       <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
  
          {/* Page Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#171717]">
              My <span className="text-[#D4AF37]">Profile</span>
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your personal information and account details.
            </p>
          </div>
  
          {/* Profile Header */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-md">
            <div className="h-32 bg-[#171717] sm:h-40" />
  
            <div className="flex flex-col gap-5 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
              <div className="-mt-12 flex flex-col items-center gap-4 sm:-mt-14 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#D4AF37] text-[#171717] sm:h-28 sm:w-28">
                  {user.picture ? (
                    <img
                      src={
                        user.picture.startsWith("https://lh3.googleusercontent.com")
                          ? user.picture
                          : `${axiosInstance.defaults.baseURL}/uploads/${user.picture}`
                      }
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-6xl sm:text-7xl" />
                  )}
                </div>
  
                <div className="text-center sm:pb-2 sm:text-left">
                  <h2 className="text-2xl font-bold text-[#171717]">
                    {user.username}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {user.role}
                  </p>
                </div>
              </div>
  
              <button
                onClick={() => setShowEdit(true)}
                type="button"
                className="flex items-center justify-center gap-2 self-center rounded-lg bg-[#D4AF37] px-5 py-3 font-semibold text-[#171717] transition hover:bg-[#E5C65B] sm:self-auto"
              >
                <FaEdit />
                Edit Profile
              </button>
            </div>
          </div>
  
          {/* My Bookings Link */}
          <div className="mt-6 flex justify-end">
            <Link
              to="/mybooking/:id"
              className="flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 font-semibold text-[#171717] transition hover:bg-[#E5C65B]"
            >
              <FaTicketAlt />
              My Bookings
            </Link>
          </div>
  
          {/* Profile Content */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
  
            {/* Personal Information */}
            <div className="flex flex-col rounded-2xl bg-white p-6 shadow-md lg:col-span-2 sm:p-8">
              <h3 className="border-b border-gray-200 pb-4 text-xl font-bold text-[#171717]">
                Personal Information
              </h3>
  
              <div className="mt-6 grid flex-1 grid-cols-1 content-between gap-x-6 gap-y-8 py-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <FaUserCircle className="mt-1 text-lg text-[#B89625]" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="mt-1 font-semibold text-[#171717]">
                      {user.username}
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 text-lg text-[#B89625]" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="mt-1 break-all font-semibold text-[#171717]">
                      {user.email}
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-3">
                  <FaPhone className="mt-1 text-lg text-[#B89625]" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="mt-1 font-semibold text-[#171717]">
                      {user.phoneNo}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCog className="mt-1 text-lg text-[#B89625]" />
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="mt-1 font-semibold text-[#171717]">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Token Summary */}
            <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
              <h3 className="border-b border-gray-200 pb-4 text-xl font-bold text-[#171717]">
                Token Summary
              </h3>
  
              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#D4AF37]/20 p-3 text-[#9B7B13]">
                      <FaTicketAlt />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Total Tokens
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-[#171717]">12</span>
                </div>
  
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                      <FaClock />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Active Tokens
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-[#171717]">2</span>
                </div>
  
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-100 p-3 text-green-600">
                      <FaCheckCircle />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Completed
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-[#171717]">10</span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Recent Token Activity */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-md sm:p-8">
            <h3 className="border-b border-gray-200 pb-4 text-xl font-bold text-[#171717]">
              Recent Token Activity
            </h3>
  
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-150 text-left">
                <thead>
                  <tr className="bg-gray-50 text-sm text-gray-500">
                    <th className="rounded-l-lg px-4 py-3 font-semibold">
                      Organization
                    </th>
                    <th className="px-4 py-3 font-semibold">Token</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="rounded-r-lg px-4 py-3 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
  
                <tbody className="divide-y divide-gray-100 text-sm">
                  <tr>
                    <td className="px-4 py-4 font-medium text-[#171717]">
                      City Care Hospital
                    </td>
                    <td className="px-4 py-4">#T102</td>
                    <td className="px-4 py-4 text-gray-500">28 Oct 2026</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        Active
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
        </div>
        {showEdit && <Edit onClose={() => setShowEdit(false)} />}
      </div>
     </div>
    
  )
}

export default Profile