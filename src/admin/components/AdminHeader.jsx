import React from 'react'
import { Link, NavLink } from "react-router-dom";
import {
  FaShieldAlt,
  FaBuilding,
  FaUsers,
  FaTicketAlt,
} from "react-icons/fa";

function AdminHeader() {
  const navLinkClass = ({ isActive }) =>
    `whitespace-nowrap rounded-md px-2 py-2 text-xs font-medium transition sm:px-3 sm:text-sm lg:text-base ${
      isActive
        ? "bg-[#D4AF37] text-[#171717]"
        : "text-white hover:bg-[#333333] hover:text-[#E5C65B]"
    }`;
  return (
    <header className="bg-[#171717] text-white shadow-lg">
      <nav className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-3 py-4 sm:px-6 lg:flex-nowrap lg:px-8">

        {/* Admin Logo */}
        <Link
          to="/admin"
          className="flex shrink-0 items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37] sm:h-10 sm:w-10">
            <FaShieldAlt className="text-xl text-[#171717]" />
          </div>

          <span className="text-xl font-bold sm:text-2xl">
            Queue<span className="text-[#D4AF37]">Less</span>
            <span className="ml-2 text-xs font-medium text-gray-400 sm:text-sm">
              Admin
            </span>
          </span>
        </Link>

        {/* Admin Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 lg:gap-3">
  <NavLink to="/admin/Dashboard" end className={navLinkClass}>
    Dashboard
  </NavLink>

  <NavLink to="/admin/resource" className={navLinkClass}>
    <span className="flex items-center gap-1 sm:gap-2">
      <FaBuilding />
      Admin Resources
    </span>
  </NavLink>

  
</div>

        {/* Admin Badge */}
        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-[#D4AF37]/50 px-3 py-2 text-xs font-semibold text-[#D4AF37] sm:text-sm">
          <FaShieldAlt />
          <span>Administrator</span>
        </div>

      </nav>
    </header>
  
  )
}

export default AdminHeader