import React, { useEffect, useState } from 'react'
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
import { approveOrganizationAPI, getAdminResourcesAPI, removeOrganizationAPI } from '../../services/userApi';




function AdminResource() {
  const [resources, setResources] = useState({
  totalUsers: 0,
  totalOrganizations: 0,
  users: [],
  organizations: []
});
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  const fetchResources = async () => {
    try {
      const response = await getAdminResourcesAPI();
      setResources(response.data);
    } catch (error) {
      console.log("Error fetching admin resources:", error);
    }
  };

  fetchResources();
}, []);
const filteredUsers = resources.users.filter((user) =>
  `${user.username} ${user.email} ${user.phoneNo || ""}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

const filteredOrganizations = resources.organizations.filter((org) =>
  `${org.orgName} ${org.orgEmail} ${org.orgCategory || ""} ${org.orgAddress || ""}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

const handleApproveOrganization = async (orgId) => {
  try {
    const response = await approveOrganizationAPI(orgId);

    alert(response.data.message);

    // Refresh organization list
    const updatedData = await getAdminResourcesAPI();
    setResources(updatedData.data);

  } catch (error) {
    console.log("Error approving organization:", error);

    alert(
      error.response?.data?.message || "Failed to approve organization"
    );
  }
};

const handleRemoveOrganization = async (orgId) => {
  const confirmRemove = window.confirm(
    "Are you sure you want to remove this organization?"
  );

  if (!confirmRemove) return;

  try {
    const response = await removeOrganizationAPI(orgId);

    alert(response.data.message);

    // Refresh organization list
    const updatedData = await getAdminResourcesAPI();
    setResources(updatedData.data);

  } catch (error) {
    console.log("Error removing organization:", error);

    alert(
      error.response?.data?.message || "Failed to remove organization"
    );
  }
};

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
            <h2 className="mt-1 text-2xl font-bold text-[#171717]">{resources.totalUsers.toLocaleString()}</h2>
            <p className="mt-1 text-xs text-green-600">Registered users</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D4AF37]/20">
            <FaBuilding className="text-2xl text-[#98720D]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Organizations</p>
            <h2 className="mt-1 text-2xl font-bold text-[#171717]">{resources.totalOrganizations.toLocaleString()}</h2>
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
  placeholder="Search users or organizations..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Phone.No </th>
                <th className="px-5 py-4">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
             {filteredUsers.map((user) => (
  <tr key={user._id} className="border-b hover:bg-gray-50">
    <td className="px-6 py-4">
      <div className="font-medium text-gray-900">
        {user.username}
      </div>
      <div className="text-sm text-gray-500">
        {user._id}
      </div>
    </td>

    <td className="px-6 py-4">
      {user.email}
    </td>

    <td className="px-6 py-4">
      {user.phoneNo || "Not provided"}
    </td>

    <td className="px-6 py-4">
      {user.address || "Not provided"}
    </td>
  </tr>
))}
 
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
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Phone.No</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Address</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrganizations.map((org) => (
  <tr key={org._id} className="border-b hover:bg-gray-50">
    <td className="px-6 py-4">
      <div className="font-medium text-gray-900">
        {org.orgName}
      </div>
      <div className="text-sm text-gray-500">
        {org._id}
      </div>
    </td>

    <td className="px-6 py-4">
      {org.orgEmail}
    </td>

    <td className="px-6 py-4">
      {org.orgPhoneNo || "Not provided"}
    </td>

    <td className="px-6 py-4">
      {org.orgCategory || "Not specified"}
    </td>

    <td className="px-6 py-4">
      {org.orgAddress || "Not provided"}
    </td>

   
    <td className="px-6 py-4">
  <div className="flex items-center gap-2">

    {org.approvalStatus !== "approved" && (
      <button
        onClick={() => handleApproveOrganization(org._id)}
        className="bg-[#D4AF37] hover:bg-[#b89525] text-black px-4 py-2 rounded-lg text-sm font-semibold transition"
      >
        <FaCheckCircle className="inline mr-2" />
        Approve
      </button>
    )}

    {org.approvalStatus === "approved" && (
      <span className="text-green-600 font-medium text-sm">
        Approved
      </span>
    )}

    <button
      onClick={() => handleRemoveOrganization(org._id)}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
    >
      Remove
    </button>

  </div>
</td>
  </tr>
  
))}
 
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminResource