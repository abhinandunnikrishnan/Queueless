import React from 'react'
import { FaTimes, FaSave, FaBuilding } from "react-icons/fa";

function OrganisationEdit() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Heading */}
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-[#171717]">
            Edit Organization Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your organization's information.
          </p>
        </div>

        <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <FaTimes size={18} />
        </button>
      </div>

      {/* Organization Icon */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#171717] text-[#D4AF37]">
          <FaBuilding size={28} />
        </div>

        <div>
          <h3 className="font-semibold text-[#171717]">
            Organization Logo
          </h3>
          <p className="text-xs text-gray-500">
            Upload your organization logo
          </p>
          <button className="mt-2 text-sm font-semibold text-[#98720D]">
            Change Logo
          </button>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-5">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              type="text"
              defaultValue="City Care Hospital"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Organization Type
            </label>
            <select
              defaultValue="Hospital"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
            >
              <option>Hospital</option>
              <option>Clinic</option>
              <option>Service Center</option>
              <option>Bank</option>
              <option>Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="3"
              defaultValue="Providing quality healthcare services to our community."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-100 pt-5">
          <h3 className="mb-4 text-base font-bold text-[#171717]">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="citycare@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+91 9876543210"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                rows="2"
                defaultValue="Ernakulam, Kerala, India"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="border-t border-gray-100 pt-5">
          <h3 className="mb-4 text-base font-bold text-[#171717]">
            Working Hours
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Opening Time
              </label>
              <input
                type="time"
                defaultValue="09:00"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Closing Time
              </label>
              <input
                type="time"
                defaultValue="18:00"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-2.5 text-sm font-semibold text-[#D4AF37] hover:bg-black"
          >
            <FaSave />
            Save Changes
          </button>
        </div>

      </form>
    </div>
  )
}

export default OrganisationEdit