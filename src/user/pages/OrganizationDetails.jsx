import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import {
  FaHospital,
  FaArrowLeft,
  FaArrowRight,
  FaTicketAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { CiLocationOn, CiClock2, CiBellOn } from "react-icons/ci";
import Header from '../components/Header';
import { viewOrganisationApi } from '../../services/userApi';

function OrganizationDetails() {
  const{id}=useParams()
  const [selectedDateGeneral, setSelectedDateGeneral] = useState("");
  const [selectedDateSpecial, setSelectedDateSpecial] = useState("");
  const [selectedTimeGeneral, setSelectedTimeGeneral] = useState("");
  const [selectedTimeSpecial, setSelectedTimeSpecial] = useState("");
  
  const[orgDetails,setOrgDetails]=useState([])
  console.log(orgDetails);

  useEffect(()=>{
    getOrgDetails()
  },[])

  const getOrgDetails=async()=>{
    const result=await viewOrganisationApi(id)
    setOrgDetails(result.data)
  }

  const timeSlots = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
];

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171717]">
      <Header />

      {/* Back Navigation */}
      <section className="px-6 pt-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/organizations"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#98720D] transition"
          >
            <FaArrowLeft />
            Back to Organizations
          </Link>
        </div>
      </section>

      {/* Organization Information */}
      <section className="px-6 py-8 md:py-12">
        <div className="mx-auto max-w-5xl">

          {/* Left Side */}
          <div className="min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center">
                  <FaHospital className="text-4xl text-[#98720D]" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-[#D4AF37]/15 text-[#98720D] px-3 py-1 rounded-full text-xs font-semibold">
                      {orgDetails.orgCategory}
                    </span>

                    
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mt-4">
                    {orgDetails.orgName}
                  </h1>

                  <p className="text-gray-600 leading-7 mt-3">
                    Providing healthcare services with a more convenient
                    queue experience for every visitor.
                  </p>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 mt-5 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <CiLocationOn className="text-xl" />
                      {orgDetails.orgAddress} 
                    </span>

                    <span className="flex items-center gap-2">
                      <CiClock2 className="text-xl" />
                      Working hours 
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-7 pt-6">
                <h2 className="text-xl font-bold">About Organization</h2>

                <p className="text-gray-600 leading-8 mt-3">
                  This section provides information about the organization,
                  its services, and how visitors can use QueueLess to join
                  a virtual queue. Organization details will be displayed
                  here once they are available.
                </p>
              </div>
            </div>

            {/* Available Services */}
            <div className="mt-8">
              <div>
                <p className="text-[#A78016] text-sm font-semibold tracking-widest">
                  AVAILABLE SERVICES
                </p>

                <h2 className="text-2xl md:text-3xl font-bold mt-3">
                  Choose Your Service
                </h2>

                <p className="text-gray-600 mt-3 leading-7">
                  Select the service you need before joining the queue.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 items-stretch">
                {/* Service 1 */}
                <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-lg">
                  <h3 className="font-bold text-lg">
                    General Consultation
                  </h3>

                  <p className="text-sm text-gray-500 leading-6 mt-3 flex-1">
                    Join the queue for a general consultation.
                  </p>

                  {/* Select Booking Date */}
                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Select Booking Date
                    </label>

                    <input
                      type="date"
                      value={selectedDateGeneral}
                      min={new Date().toLocaleDateString("en-CA")}
                      onChange={(e) => setSelectedDateGeneral(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-[#F7F7F5] p-3 text-sm text-[#171717] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>

                  {selectedDateGeneral && (
                    <div className="mt-5">
                      <label className="mb-3 block text-sm font-semibold text-gray-700">
                        Select Time Slot
                      </label>

                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedTimeGeneral(slot)}
                            className={`rounded-lg border px-3 py-3 text-xs font-medium transition ${
                              selectedTimeGeneral === slot
                                ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#98720D]"
                                : "border-gray-200 bg-white text-gray-600 hover:border-[#D4AF37]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTimeGeneral && (
                    <p className="mt-3 text-sm font-semibold text-[#98720D]">
                      Selected Time: {selectedTimeGeneral}
                    </p>
                  )}

                  {selectedDateGeneral && (
                    <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-[#F7F7F5] p-4">
                      <FaUsers className="text-xl text-[#98720D]" />

                      <div>
                        <p className="text-sm text-gray-500">People Waiting</p>
                        <p className="text-lg font-bold text-[#171717]">
                          12 People
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Show Waiting Time Only After Date Selection */}
                  {selectedDateGeneral && (
                    <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4">
                      <CiClock2 className="text-2xl text-[#98720D]" />

                      <div>
                        <p className="text-sm text-gray-600">
                          Estimated Waiting Time
                        </p>
                        <p className="text-lg font-bold text-[#171717]">
                          20–30 minutes
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          For {selectedDateGeneral}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Token Price</span>
                    <span className="text-xl font-bold text-[#98720D]">₹50</span>
                  </div>

                  <Link
                    
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-[#171717] text-white py-3 rounded-lg font-semibold hover:bg-[#333] transition"
                  >
                    Book Token <FaArrowRight />
                  </Link>
                </div>

                {/* Service 2 */}
                <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-lg">
                  <h3 className="font-bold text-lg">
                    Specialist Consultation
                  </h3>

                  <p className="text-sm text-gray-500 leading-6 mt-3 flex-1">
                    Check availability for specialist services.
                  </p>

                  {/* Select Booking Date */}
                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Select Booking Date
                    </label>

                    <input
                      type="date"
                      value={selectedDateSpecial}
                      min={new Date().toLocaleDateString("en-CA")}
                      onChange={(e) => setSelectedDateSpecial(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-[#F7F7F5] p-3 text-sm text-[#171717] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>

                  {selectedDateSpecial && (
                    <div className="mt-5">
                      <label className="mb-3 block text-sm font-semibold text-gray-700">
                        Select Time Slot
                      </label>

                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedTimeSpecial(slot)}
                            className={`rounded-lg border px-3 py-3 text-xs font-medium transition ${
                              selectedTimeSpecial === slot
                                ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#98720D]"
                                : "border-gray-200 bg-white text-gray-600 hover:border-[#D4AF37]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTimeSpecial && (
                    <p className="mt-3 text-sm font-semibold text-[#98720D]">
                      Selected Time: {selectedTimeSpecial}
                    </p>
                  )}

                  {selectedDateSpecial && (
                    <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-[#F7F7F5] p-4">
                      <FaUsers className="text-xl text-[#98720D]" />

                      <div>
                        <p className="text-sm text-gray-500">People Waiting</p>
                        <p className="text-lg font-bold text-[#171717]">
                          12 People
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Show Waiting Time Only After Date Selection */}
                  {selectedDateSpecial && (
                    <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4">
                      <CiClock2 className="text-2xl text-[#98720D]" />

                      <div>
                        <p className="text-sm text-gray-600">
                          Estimated Waiting Time
                        </p>
                        <p className="text-lg font-bold text-[#171717]">
                          20–30 minutes
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          For {selectedDateSpecial}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Token Price</span>
                    <span className="text-xl font-bold text-[#98720D]">₹100</span>
                  </div>

                  <Link
                    
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-[#171717] text-white py-3 rounded-lg font-semibold hover:bg-[#333] transition"
                  >
                    Book Token <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </section>
    </div>
  )
}

export default OrganizationDetails