import React from 'react'

import { Link, NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaTachometerAlt,
  FaTicketAlt,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";

function OrganizationHeader() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition sm:px-3 sm:text-sm ${
      isActive
        ? "bg-[#D4AF37] text-[#171717]"
        : "text-gray-300 hover:bg-[#333333] hover:text-[#D4AF37]"
    }`;
  return (
    <header className="bg-[#171717] text-white shadow-lg">
      <nav className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-3 py-4 sm:px-6 lg:flex-nowrap lg:px-8">
        {/* Logo and Brand */}
        <Link
          to="/organization/dashboard"
          className="flex shrink-0 items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37] sm:h-10 sm:w-10">
            <FaBuilding className="text-lg text-[#171717] sm:text-xl" />
          </div>

          <span className="text-xl font-bold sm:text-2xl">
            Queue<span className="text-[#D4AF37]">Less</span>
            <span className="ml-2 text-xs font-medium text-gray-400 sm:text-sm">
              Organization
            </span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-3">
          <NavLink
            to="/organization/dashboard"
            end
            className={navLinkClass}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          

          

          <NavLink
            to="/organization/profile"
            className={navLinkClass}
          >
            <FaUserCircle />
            <span>Profile</span>
          </NavLink>
        </div>

        {/* Organization Account */}
        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-[#D4AF37]/40 px-3 py-2">
          <FaBuilding className="text-[#D4AF37]" />
          <span className="text-xs font-medium text-gray-200 sm:text-sm">
            Organization Portal
          </span>
        </div>
      </nav>
    </header>
  )
}

export default OrganizationHeader