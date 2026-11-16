import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaHospital,
  FaArrowLeft,
  FaArrowRight,
  FaTicketAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { CiLocationOn, CiClock2, CiBellOn } from "react-icons/ci";
import Header from "../components/Header";
import { viewOrganisationApi } from "../../services/userApi";
import {
  createCheckoutSessionAPI,
  getQueueAvailabilityAPI,
} from "../../services/bookingAPI";


function OrganizationDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [queueSelections, setQueueSelections] = useState({});
  const [queueWaiting, setQueueWaiting] = useState({});
  const [generalWaiting, setGeneralWaiting] = useState(0);
  const [specialWaiting, setSpecialWaiting] = useState(0);

  const [orgDetails, setOrgDetails] = useState([]);
  console.log(orgDetails);

  useEffect(() => {
    getOrgDetails();
  }, []);

  useEffect(() => {
    Object.entries(queueSelections).forEach(([queue, selection]) => {
      if (selection.date && selection.time) {
        getQueueAvailability(
          queue,
          selection.date,
          selection.time,
          (waitingCount) => {
            setQueueWaiting((prev) => ({
              ...prev,
              [queue]: waitingCount,
            }));
          },
        );
      }
    });
  }, [queueSelections, id]);

  const getOrgDetails = async () => {
    const result = await viewOrganisationApi(id);
    setOrgDetails(result.data);
  };

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

  const getQueueAvailability = async (service, date, timeSlot, setWaiting) => {
    try {
      const result = await getQueueAvailabilityAPI(id, date, service, timeSlot);

      if (result.status === 200) {
        setWaiting(result.data.totalWaiting);
      }
    } catch (error) {
      console.log(
        "Queue availability error:",
        error.response?.data || error.message,
      );

      setWaiting(0);
    }
  };

  const handleBookToken = async (service, date, timeSlot) => {
  if (!date || !timeSlot) {
    alert("Please select date and time slot");
    return;
  }

  if (!sessionStorage.getItem("token")) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  try {
    const result = await createCheckoutSessionAPI({
      orgId: id,
      service,
      bookingDate: date,
      timeSlot,
    });

    if (result.status === 200 && result.data.checkoutUrl) {
      window.location.href = result.data.checkoutUrl;
    } else {
      alert(result.data?.message || "Unable to start payment");
    }
  } catch (error) {
    console.log("Payment error:", error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};

  const getEstimatedWaitingTime = (waitingCount) => {
    if (waitingCount === 0) {
      return "No waiting time";
    }

    const minTime = waitingCount * 5;
    const maxTime = waitingCount * 10;

    return `${minTime}–${maxTime} minutes`;
  };

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
                    Making everyday services easier with a smarter, faster, and more convenient virtual queue experience.
                  </p>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 mt-5 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <CiLocationOn className="text-xl" />
                      {orgDetails.orgAddress}
                    </span>

                    
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-gray-600">
  <i className="fa-regular fa-clock"></i>

  <span>
    Working Hours:{" "}
    {orgDetails.orgTiming?.openingTime && orgDetails.orgTiming?.closingTime
      ? `${orgDetails.orgTiming.openingTime} - ${orgDetails.orgTiming.closingTime}`
      : "Not available"}
  </span>
</div>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-7 pt-6">
                <h2 className="text-xl font-bold">About Organization</h2>

                <p className="text-gray-600 leading-8 mt-3 whitespace-pre-line">
                  {orgDetails.orgDesc || "No description added yet."}
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

              <div className="mt-5 mb-5">
                <p className="text-sm text-gray-600">
                  Total Queues: {orgDetails.orgQueues?.length || 0}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 items-stretch">
                {orgDetails.orgQueues?.map((queue, index) => {
                  const selectedDate = queueSelections[queue]?.date || "";
                  const selectedTime = queueSelections[queue]?.time || "";

                  return (
                    <div
                      key={index}
                      className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-lg"
                    >
                      <h3 className="font-bold text-lg">{queue}</h3>

                      <p className="text-sm text-gray-500 leading-6 mt-3 flex-1">
                        Join the queue for {queue}.
                      </p>

                      {/* Select Booking Date */}
                      <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Select Booking Date
                        </label>

                        <input
                          type="date"
                          value={selectedDate}
                          min={new Date().toLocaleDateString("en-CA")}
                          onChange={(e) =>
                            setQueueSelections((prev) => ({
                              ...prev,
                              [queue]: {
                                ...prev[queue],
                                date: e.target.value,
                              },
                            }))
                          }
                          className="w-full rounded-lg border border-gray-300 bg-[#F7F7F5] p-3 text-sm text-[#171717] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        />
                      </div>

                      {/* Select Time Slot */}
                      {selectedDate && (
                        <div className="mt-5">
                          <label className="mb-3 block text-sm font-semibold text-gray-700">
                            Select Time Slot
                          </label>

                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((slot, slotIndex) => (
                              <button
                                key={slotIndex}
                                type="button"
                                onClick={() =>
                                  setQueueSelections((prev) => ({
                                    ...prev,
                                    [queue]: {
                                      ...prev[queue],
                                      time: slot,
                                    },
                                  }))
                                }
                                className={`rounded-lg border px-3 py-3 text-xs font-medium transition ${
                                  selectedTime === slot
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

                      {selectedTime && (
                        <p className="mt-3 text-sm font-semibold text-[#98720D]">
                          Selected Time: {selectedTime}
                        </p>
                      )}

                      {selectedDate && selectedTime && (
                        <div className="mt-4 rounded-lg bg-[#F7F7F5] p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              People Waiting
                            </span>

                            <span className="font-bold">
                              {queueWaiting[queue] ?? 0}
                            </span>
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-600">
                              Estimated Waiting Time
                            </span>

                            <span className="text-sm font-semibold text-[#98720D]">
                              {getEstimatedWaitingTime(
                                queueWaiting[queue] ?? 0,
                              )}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Token Price */}
                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Token Price
                        </span>

                        <span className="text-xl font-bold text-[#98720D]">
                          ₹{queue.toLowerCase().includes("normal") ? 50 : 100}
                        </span>
                      </div>

                      {/* Book Token */}
                      <button
                        type="button"
                        onClick={() =>
                          handleBookToken(queue, selectedDate, selectedTime)
                        }
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-[#171717] text-white py-3 rounded-lg font-semibold hover:bg-[#333] transition"
                      >
                        Book Token <FaArrowRight />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrganizationDetails;
