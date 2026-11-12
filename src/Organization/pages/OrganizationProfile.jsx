import React, { useEffect, useState } from 'react'
import OrganizationHeader from '../Components/OrganizationHeader'
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaEdit,
  FaGlobe,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import OrganisationEdit from '../Components/OrganisationEdit';


function OrganizationProfile() {
  const [showEdit, setShowEdit] = useState(false);
  const[orgname,setOrgname]=useState("")
  const[orgtype,setOrgtype]=useState("")
  const[orgaddress,setOrgaddress]=useState("")
  const[orgphno,setOrgphno]=useState("")
  const[email,setEmail]=useState("")
  const [orgTiming, setOrgTiming] = useState({
    openingTime: "",
    closingTime: ""
  });
  

  useEffect(()=>{
          if(sessionStorage.getItem("orgToken")&&sessionStorage.getItem("org")){
            const org = JSON.parse(sessionStorage.getItem("org"))
            setOrgname(org?.orgName)
            setOrgtype(org?.orgCategory)
            setOrgaddress(org?.orgAddress)
            setOrgphno(org?.orgPhoneNo)
            setEmail(org?.orgEmail)
            setOrgTiming(org?.orgTiming || {
              openingTime: "",
              closingTime: ""
            });
          }
        },[])

  return (
    <div>
      <OrganizationHeader />

      <div className="min-h-screen space-y-6 bg-[#F7F7F5] px-4 py-6 sm:px-6 lg:px-8">

        {showEdit ? (
          <OrganisationEdit />
        ) : (
          <>

            {/* Page Heading */}
            <div>
              <h1 className="text-2xl font-bold text-[#171717] sm:text-3xl">
                Organization Profile
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                View and manage your organization's information.
              </p>
            </div>

            {/* Profile Banner */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="h-32 bg-linear-to-r from-[#171717] via-[#333333] to-[#98720D] sm:h-40" />

              <div className="flex flex-col gap-4 px-5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
                <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#D4AF37] shadow-md sm:h-28 sm:w-28">
                    <FaBuilding className="text-4xl text-[#171717] sm:text-5xl" />
                  </div>

                  <div className="sm:pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-[#f8f7f7] sm:text-2xl">
                        {orgname}
                      </h2>
                      <FaCheckCircle className="text-green-600" />
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                     {orgtype}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <FaMapMarkerAlt className="text-[#98720D]" />
                      {orgaddress}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowEdit(true)}
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#C5A028]"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

              {/* Organization Information */}
              <div className="space-y-6 xl:col-span-2">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37]/20">
                      <FaBuilding className="text-lg text-[#98720D]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#171717]">
                        Organization Information
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Basic details about your organization
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Organization Name
                      </p>
                      <p className="mt-2 font-semibold text-[#171717]">
                        {orgname}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Business Category
                      </p>
                      <p className="mt-2 font-semibold text-[#171717]">
                        {orgtype}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      About Organization
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      City Care Hospital provides healthcare services and
                      consultation appointments. QueueLess helps visitors reserve
                      tokens and track their waiting position conveniently.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37]/20">
                      <FaPhone className="text-lg text-[#98720D]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#171717]">
                        Contact Information
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        How customers can contact you
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <FaEnvelope className="mt-1 text-[#98720D]" />
                      <div>
                        <p className="text-xs text-gray-400">Email Address</p>
                        <p className="mt-1 text-sm font-medium text-[#171717]">
                          {email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaPhone className="mt-1 text-[#98720D]" />
                      <div>
                        <p className="text-xs text-gray-400">Phone Number</p>
                        <p className="mt-1 text-sm font-medium text-[#171717]">
                          {orgphno}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="mt-1 text-[#98720D]" />
                      <div>
                        <p className="text-xs text-gray-400">Business Address</p>
                        <p className="mt-1 text-sm font-medium leading-6 text-[#171717]">
                          {orgaddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Cards */}
              <div className="space-y-6">

                {/* Account Status */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-[#171717]">Account Status</h3>

                  <div className="mt-5 flex items-center gap-3 rounded-lg bg-green-50 p-4">
                    <FaCheckCircle className="text-2xl text-green-600" />
                    <div>
                      <p className="font-semibold text-green-700">Verified</p>
                      <p className="mt-1 text-xs text-green-600">
                        Organization is approved
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-b border-gray-100 py-3">
                    <span className="text-sm text-gray-500">Account Type</span>
                    <span className="text-sm font-semibold text-[#171717]">
                      Organization
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-gray-500">Profile Status</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Complete
                    </span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37]/20">
                      <FaClock className="text-lg text-[#98720D]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#171717]">
                        Operating Hours
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Business schedule
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#F7F7F5] p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Opening Time
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#171717]">
                      {orgTiming.openingTime || "--:--"}
                    </p>

                    <div className="my-4 border-t border-gray-200" />

                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Closing Time
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#171717]">
                      {orgTiming.closingTime || "--:--"}
                    </p>
                  </div>

                  <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
                    <FaCalendarAlt className="mt-0.5 shrink-0 text-[#98720D]" />
                    <p>
                      Operating hours apply to all working days.
                    </p>
                  </div>
                </div>

                {/* Account Manager */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/20">
                      <FaUser className="text-xl text-[#98720D]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#171717]">Account Owner</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Organization Admin
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400">Owner Email</p>
                    <p className="mt-1 break-all text-sm font-medium text-[#171717]">
                      {email}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </>
        )}

      </div>
    </div>
  )
}

export default OrganizationProfile