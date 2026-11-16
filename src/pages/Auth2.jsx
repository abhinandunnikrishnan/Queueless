import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ToastContainer, toast } from 'react-toastify';
import { loginOrgAPI, registerOrgAPI } from '../services/userApi';


function Auth2({insideRegister}) {
     const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Formik
  const formik = useFormik({
    initialValues: {
      orgName: "",
      orgEmail: "",
      orgPhoneNo: "",
      orgAddress: "",
      orgPassword: "",
      orgCategory: "",
      orgQueueCount: 1,
      orgQueues: [""],
      orgTiming: {
        openingTime: "",
        closingTime: ""
      }
    },

    validationSchema: Yup.object({
      orgName: insideRegister
        ? Yup.string().required("Organization name is required")
        : Yup.string(),

      orgEmail: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      orgPhoneNo: insideRegister
        ? Yup.string().required("Contact number is required")
        : Yup.string(),

      orgAddress: insideRegister
        ? Yup.string().required("Organization address is required")
        : Yup.string(),

      orgPassword: Yup.string()
        .required("Password is required"),

      orgCategory: insideRegister
        ? Yup.string().required("Organization type is required")
        : Yup.string(),

      orgQueueCount: insideRegister
        ? Yup.number()
            .required("Queue count is required")
            .integer("Queue count must be a whole number")
            .min(1, "Minimum 1 queue is required")
            .max(3, "Maximum 3 queues are allowed")
        : Yup.number().notRequired(),

      orgQueues: insideRegister
          ? Yup.array()
              .of(
                  Yup.string()
                      .trim()
                      .required("Queue name is required")
              )
              .min(1, "At least one queue is required")
              .max(3, "Maximum 3 queues are allowed")
              .test(
                  "queue-count",
                  "Please enter the correct number of queue names",
                  function (queues) {
                      return queues?.length === Number(this.parent.orgQueueCount);
                  }
              )
              .test(
                  "unique-queues",
                  "Queue names must be unique",
                  function (queues) {
                      if (!queues) return true;

                      const names = queues.map(queue =>
                          queue.trim().toLowerCase()
                      );

                      return new Set(names).size === names.length;
                  }
              )
          : Yup.array().notRequired(),

      orgTiming: Yup.object({
        openingTime: insideRegister
          ? Yup.string().required("Opening time is required")
          : Yup.string(),

        closingTime: insideRegister
          ? Yup.string().required("Closing time is required")
          : Yup.string()
        }),
    }),

    onSubmit: (values, { resetForm }) => {
      if (insideRegister) {
        handleOrgRegister(values, resetForm);
      } else {
        handleOrgLogin(values);
      }
    }
  });


  // Organization Register
  const handleOrgRegister = async (orgData, resetForm) => {

    try {
      const result = await registerOrgAPI(orgData);

      console.log(result);

      if (result.status === 201) {
        toast.success("Organization registered successfully!");

        resetForm();

        setTimeout(() => {
          navigate('/orgLogin');
        }, 2000);

      } else {
        toast.error(result);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Registration failed");
    }
  };


  // Organization Login
  const handleOrgLogin = async (orgData) => {

    try {
      const result = await loginOrgAPI(orgData);

      console.log(result);

      if (result.status === 200) {

        toast.success("Organization login successful!");

        sessionStorage.setItem("orgToken", result.data.token);

        sessionStorage.setItem(
          "org",
          JSON.stringify(result.data.user)
        );

        setTimeout(() => {
          navigate('/organization/dashboard');
        }, 2000);

      } else {
        toast.error(result);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Login failed");
    }
  };
  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-[#F5F5F5] px-4 py-10">

      {/* Organization Authentication Card */}
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl sm:p-8">

        {/* Heading */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#171717] text-2xl text-[#D4AF37]">
            <FaBuilding />
          </div>

          <h1 className="text-3xl font-bold text-[#171717]">
            {insideRegister
              ? "Register Organization"
              : "Organization Login"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {insideRegister
              ? "Register your organization with QueueLess."
              : "Access your organization dashboard."}
          </p>

        </div>


        {/* Authentication Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">

          {/* Organization Name */}
          {insideRegister && (
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Organization Name
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 py-3 focus-within:border-[#D4AF37]">

                <FaBuilding className="shrink-0 text-gray-400" />

                <input
                  name="orgName"
                  value={formik.values.orgName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Organization name"
                  className="w-full min-w-0 bg-transparent text-sm outline-none"
                />

              </div>

              {formik.touched.orgName && formik.errors.orgName && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.orgName}
                </p>
              )}

            </div>
          )}


          {/* Organization Email */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Organization Email
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:border-[#D4AF37]">

              <FaEnvelope className="text-gray-400" />

              <input
                name="orgEmail"
                value={formik.values.orgEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                placeholder="Enter organization email"
                className="w-full bg-transparent text-sm outline-none"
              />

            </div>

            {formik.touched.orgEmail && formik.errors.orgEmail && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.orgEmail}
              </p>
            )}

          </div>


          {/* Contact Number - Register Only */}
          {insideRegister && (
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Contact Number
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:border-[#D4AF37]">

                <FaPhone className="text-gray-400" />

                <input
                  name="orgPhoneNo"
                  value={formik.values.orgPhoneNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="tel"
                  placeholder="Enter contact number"
                  className="w-full bg-transparent text-sm outline-none"
                />

              </div>

              {formik.touched.orgPhoneNo && formik.errors.orgPhoneNo && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.orgPhoneNo}
                </p>
              )}

            </div>
          )}


          {/* Organization Address - Register Only */}
          {insideRegister && (
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Organization Address
              </label>

              <div className="flex items-start gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:border-[#D4AF37]">

                <FaMapMarkerAlt className="mt-1 shrink-0 text-gray-400" />

                <textarea
                  name="orgAddress"
                  value={formik.values.orgAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter organization address"
                  rows={3}
                  className="w-full min-w-0 resize-none bg-transparent text-sm outline-none"
                />

              </div>

              {formik.touched.orgAddress && formik.errors.orgAddress && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.orgAddress}
                </p>
              )}

            </div>
          )}


          {/* Organization Type */}
            {insideRegister && (
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Organization Type
                    </label>

                    <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:border-[#D4AF37]">
                        <FaBuilding className="text-gray-400" />

                        <select
                            name="orgCategory"
                            value={formik.values.orgCategory}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full bg-transparent text-sm outline-none"
                        >
                            <option value="">Select Organization Type</option>
                            <option value="Hospital">Hospital</option>
                            <option value="Service Center">Service Center</option>
                            <option value="Salon">Salon</option>
                            <option value="Restaurant">Restaurant</option>
                        </select>
                    </div>

                    {formik.touched.orgCategory && formik.errors.orgCategory && (
                        <p className="mt-1 text-sm text-red-500">
                            {formik.errors.orgCategory}
                        </p>
                    )}
                </div>
            )}



          {/* Number of Queues */}
          {insideRegister && (
              <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Number of Queues
                  </label>

                  <select
                      name="orgQueueCount"
                      value={formik.values.orgQueueCount}
                      onChange={(e) => {
                          const count = Number(e.target.value);

                          formik.setFieldValue("orgQueueCount", count);

                          const updatedQueues = Array.from(
                              { length: count },
                              (_, index) => formik.values.orgQueues[index] || ""
                          );

                          formik.setFieldValue("orgQueues", updatedQueues);
                      }}
                      onBlur={formik.handleBlur}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                  >
                      <option value={1}>1 Queue</option>
                      <option value={2}>2 Queues</option>
                      <option value={3}>3 Queues</option>
                  </select>
              </div>
          )}

          {/* Queue Names */}
          {insideRegister &&
              formik.values.orgQueues.map((queue, index) => (
                  <div key={index}>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Queue {index + 1} Name
                      </label>

                      <input
                          type="text"
                          name={`orgQueues[${index}]`}
                          value={queue}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={`Enter queue ${index + 1} name`}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                      />

                      {formik.touched.orgQueues?.[index] &&
                          formik.errors.orgQueues?.[index] && (
                              <p className="mt-1 text-sm text-red-500">
                                  {formik.errors.orgQueues[index]}
                              </p>
                          )}
                  </div>
              ))}



            {/* Organization Timing */}
            {insideRegister && (
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Organization Working Hours
                    </label>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* Opening Time */}
                        <div>
                            <label className="mb-2 block text-xs font-medium text-gray-500">
                                Opening Time
                            </label>

                            <input
                                type="time"
                                name="orgTiming.openingTime"
                                value={formik.values.orgTiming.openingTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                            />

                            {formik.touched.orgTiming?.openingTime &&
                                formik.errors.orgTiming?.openingTime && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {formik.errors.orgTiming.openingTime}
                                    </p>
                                )}
                        </div>

                        {/* Closing Time */}
                        <div>
                            <label className="mb-2 block text-xs font-medium text-gray-500">
                                Closing Time
                            </label>

                            <input
                                type="time"
                                name="orgTiming.closingTime"
                                value={formik.values.orgTiming.closingTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                            />

                            {formik.touched.orgTiming?.closingTime &&
                                formik.errors.orgTiming?.closingTime && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {formik.errors.orgTiming.closingTime}
                                    </p>
                                )}
                        </div>

                    </div>
                </div>
            )}


          {/* Password */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:border-[#D4AF37]">

              <FaLock className="shrink-0 text-gray-400" />

              <input
                name="orgPassword"
                value={formik.values.orgPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full bg-transparent text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 text-gray-400 hover:text-[#D4AF37]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            {formik.touched.orgPassword && formik.errors.orgPassword && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.orgPassword}
              </p>
            )}

          </div>


          {/* Forgot Password - Login Only */}
          {!insideRegister && (
            <div className="flex justify-end">

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[#9B7B00] hover:underline"
              >
                Forgot Password?
              </Link>

            </div>
          )}


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#D4AF37] px-4 py-3 font-semibold text-[#171717] transition hover:bg-[#C5A028]"
          >
            {insideRegister
              ? "Register Organization"
              : "Login to Dashboard"}
          </button>

        </form>


        {/* Switch Between Login and Register */}
        <p className="mt-8 text-center text-sm text-gray-600">

          {insideRegister
            ? "Already registered?"
            : "Want to register your organization?"}

          <Link
            to={insideRegister ? "/orgLogin" : "/orgRegister"}
            className="ml-2 font-bold text-[#9B7B00] hover:underline"
          >
            {insideRegister ? "Login" : "Register"}
          </Link>

        </p>

      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={3000}
      />

    </div>
  )
}

export default Auth2