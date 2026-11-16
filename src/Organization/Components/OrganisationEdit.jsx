import React, { useState } from 'react'
import { FaTimes, FaSave, FaBuilding } from "react-icons/fa";
import { updateOrgProfileAPI } from '../../services/userApi';


function OrganisationEdit({
  orgname,
  orgtype,
  orgaddress,
  orgphno,
  email,
  orgTiming,
  orgDesc,
  onClose,
  onUpdated
}) {
  const [formData, setFormData] = useState({
    orgName: orgname || "",
    orgCategory: orgtype || "",
    orgDesc: orgDesc || "",
    orgEmail: email || "",
    orgPhoneNo: orgphno || "",
    orgAddress: orgaddress || "",
    openingTime: orgTiming?.openingTime || "",
    closingTime: orgTiming?.closingTime || ""
});
const [saving, setSaving] = useState(false);


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setSaving(true);

        const updatedData = {
            orgName: formData.orgName,
            orgCategory: formData.orgCategory,
            orgDesc: formData.orgDesc,
            orgPhoneNo: formData.orgPhoneNo,
            orgAddress: formData.orgAddress,
            orgTiming: {
                openingTime: formData.openingTime,
                closingTime: formData.closingTime
            }
        };

        const result = await updateOrgProfileAPI(updatedData);

        if (result.status === 200) {
            sessionStorage.setItem(
                "org",
                JSON.stringify(result.data.organization)
            );

            onUpdated(result.data.organization);

            alert("Organisation profile updated successfully!");
            onClose();
        }

    } catch (error) {
        console.error(
            "Profile update error:",
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.message ||
            "Unable to update organisation profile."
        );

    } finally {
        setSaving(false);
    }
};


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value
    }));
};

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
      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              type="text"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Organization Type
            </label>
            <select
              name="orgCategory"
              value={formData.orgCategory}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
            >
              <option value="">Select Category</option>
              <option value="Hospital">Hospital</option>
              <option value="Service Center">Service Center</option>
              <option value="Salon">Salon</option>
              <option value="Restaurant">Restaurant</option>
              
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="orgDesc"
              rows="3"
              value={formData.orgDesc}
              onChange={handleChange}
              placeholder="Tell customers about your organization..."
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
                 name="orgEmail"
                 readOnly
                 value={formData.orgEmail}
                 onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="orgPhoneNo"
                value={formData.orgPhoneNo}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                type="text"
                name="orgAddress"
                value={formData.orgAddress}
                onChange={handleChange}
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
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Closing Time
              </label>
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
              Cancel
          </button>

          <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-2.5 text-sm font-semibold text-[#D4AF37] hover:bg-black disabled:opacity-50"
          >
              <FaSave />
              {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  )
}

export default OrganisationEdit