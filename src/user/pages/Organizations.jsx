import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from "react-router-dom";
import { CiSearch, CiLocationOn, CiClock2 } from "react-icons/ci";
import {
  FaHospital,
  FaSpa,
  FaUtensils,
  FaTooth,
  FaArrowRight,
  FaUsers,
  FaTicketAlt,
} from "react-icons/fa";
import { BiSolidCarMechanic } from 'react-icons/bi';
import { getAllOrganizationsAPI } from '../../services/userApi';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify/unstyled';

function Organizations() {
  const [organizations, setOrganizations] = useState([]);

const [loading, setLoading] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [categoryFilter, setCategoryFilter] = useState("all");

const filteredOrganizations = organizations.filter((org) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    org.orgName?.toLowerCase().includes(search) ||
    org.orgAddress?.toLowerCase().includes(search) ||
    org.orgCategory?.toLowerCase().includes(search);

  const matchesCategory =
    categoryFilter === "all" ||
    org.orgCategory?.toLowerCase() === categoryFilter;

  return matchesSearch && matchesCategory;
});



// Fetch all organizations

const getAllOrganizations = async () => {
  setLoading(true);

  try {
    const result = await getAllOrganizationsAPI();

    console.log("Organizations response:", result);

    if (result?.status === 200) {
      setOrganizations(result.data);
    }
  } catch (error) {
    console.log(
      "Organizations error:",
      error.response?.data || error.message
    );

    toast.error("Unable to fetch organizations");
  } finally {
    setLoading(false);
  }
};



// Call API when page loads
useEffect(() => {
  getAllOrganizations();
}, []);

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171717]">
      <Header />

      
{/* Page Heading and Search */}
<section className="px-6 pt-12 pb-6 md:pt-16">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-end md:justify-center gap-6">
      <div>
        <p className="text-[#A78016] text-sm font-semibold tracking-widest">
          ORGANIZATION DIRECTORY
        </p>

        <h1 className="text-3xl md:text-5xl font-bold mt-4">
          Explore Organizations
        </h1>

        <p className="text-gray-600 leading-7 mt-4 max-w-2xl">
          Find hospitals, salons, restaurants, and other services.
          Check the queue and book your token online.
        </p>
      </div>

      
    </div>

    {/* Search Bar */}
    <div className="mt-8 max-w-2xl flex mx-auto items-center bg-white border border-gray-200 rounded-xl p-2 focus-within:border-[#D4AF37] transition">
      <CiSearch className="text-gray-500 text-3xl ml-2 shrink-0" />

      <input
  type="text"
  placeholder="Search organizations..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="flex-1 min-w-0 p-3 text-black outline-none bg-transparent"
/>

      
    </div>
  </div>
</section>


      {/* Organization Categories */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-[#A78016] text-sm font-semibold tracking-widest">
              EXPLORE CATEGORIES
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              What Service Do You Need?
            </h2>

            <p className="text-gray-600 mt-4">
              Choose a category to discover available organizations.
            </p>
            <button
  onClick={() => setCategoryFilter("all")}
  className={`mt-6 px-6 py-3 rounded-lg font-semibold border transition ${
    categoryFilter === "all"
      ? "bg-[#D4AF37] text-[#171717] border-[#D4AF37]"
      : "bg-white text-gray-700 border-gray-200 hover:border-[#D4AF37]"
  }`}
>
  All Organizations
</button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
            <button
  onClick={() => setCategoryFilter("hospital")}
  className={`bg-white border rounded-2xl p-5 md:p-7 text-left hover:border-[#D4AF37] hover:shadow-md transition ${
    categoryFilter === "hospital"
      ? "border-[#D4AF37] shadow-md"
      : "border-gray-200"
  }`}
>
              <FaHospital className="text-3xl text-[#98720D]" />
              <h3 className="font-bold mt-4">Hospitals</h3>
              <p className="text-sm text-gray-500 mt-2">Medical services</p>
            </button>

            <button
  onClick={() => setCategoryFilter("salon")}
  className={`bg-white border rounded-2xl p-5 md:p-7 text-left hover:border-[#D4AF37] hover:shadow-md transition ${
    categoryFilter === "salon"
      ? "border-[#D4AF37] shadow-md"
      : "border-gray-200"
  }`}
>
              <FaSpa className="text-3xl text-[#98720D]" />
              <h3 className="font-bold mt-4">Salons</h3>
              <p className="text-sm text-gray-500 mt-2">Personal care</p>
            </button>

            <button
  onClick={() => setCategoryFilter("restaurant")}
  className={`bg-white border rounded-2xl p-5 md:p-7 text-left hover:border-[#D4AF37] hover:shadow-md transition ${
    categoryFilter === "restaurant"
      ? "border-[#D4AF37] shadow-md"
      : "border-gray-200"
  }`}
>
              <FaUtensils className="text-3xl text-[#98720D]" />
              <h3 className="font-bold mt-4">Restaurants</h3>
              <p className="text-sm text-gray-500 mt-2">Dining services</p>
            </button>

            <button
  onClick={() => setCategoryFilter("service centre")}
  className={`bg-white border rounded-2xl p-5 md:p-7 text-left hover:border-[#D4AF37] hover:shadow-md transition ${
    categoryFilter === "service centre"
      ? "border-[#D4AF37] shadow-md"
      : "border-gray-200"
  }`}
>
              <BiSolidCarMechanic className="text-3xl text-[#98720D]" />
              <h3 className="font-bold mt-4">Service Centre</h3>
              <p className="text-sm text-gray-500 mt-2">Vehicle Services</p>
            </button>
          </div>
        </div>
      </section>

      {/* Organization Listings */}
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[#A78016] text-sm font-semibold tracking-widest">
                ORGANIZATION DIRECTORY
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-3">
                Explore Organizations
              </h2>

              <p className="text-gray-600 mt-3">
                Find a service and check its queue before you visit.
              </p>
            </div>

            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

  {loading ? (
    <div className="col-span-full text-center py-16">
      <p className="text-gray-500">Loading organizations...</p>
    </div>
  ) : filteredOrganizations.length > 0 ? (

    filteredOrganizations.map((org) => {
      const CategoryIcon =
        org.orgCategory?.toLowerCase() === "hospital"
          ? FaHospital
          : org.orgCategory?.toLowerCase() === "salon"
          ? FaSpa
          : org.orgCategory?.toLowerCase() === "restaurant"
          ? FaUtensils
          : org.orgCategory?.toLowerCase() === "service centre"
          ? BiSolidCarMechanic
          : FaHospital;

      return (
        <div
          key={org._id}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#D4AF37] transition flex flex-col"
        >
          <div className="h-2 bg-[#D4AF37]" />

          <div className="p-6 flex flex-col flex-1">

            <div className="flex items-start justify-between gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center">
                <CategoryIcon className="text-2xl text-[#98720D]" />
              </div>

              <span className="text-xs font-semibold px-3 py-2 rounded-full bg-gray-100 text-gray-600">
                {org.orgCategory}
              </span>
            </div>

            <h3 className="text-xl font-bold mt-5">
              {org.orgName}
            </h3>

            <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
              <CiLocationOn className="text-xl shrink-0" />
              {org.orgAddress}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-[#F7F7F5] rounded-xl p-4">
                <p className="text-xs text-gray-500">Now serving</p>
                <p className="font-bold text-lg mt-1">--</p>
              </div>

              <div className="bg-[#F7F7F5] rounded-xl p-4">
                <p className="text-xs text-gray-500">Waiting time</p>
                <p className="font-bold text-lg mt-1">--</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-6 mt-5 flex-1">
              Check available services and join the virtual queue.
            </p>
            <Link
              to={`/organizations/${org._id}`}
              className="w-full mt-6 bg-[#171717] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#333] transition"
            >
              View Organization <FaArrowRight />
            </Link>

          </div>
        </div>
      );
    })

  ) : (
    <div className="col-span-full text-center py-16">
      <p className="text-gray-500 mt-2">
  No organizations match your search or selected category.
</p>
    </div>
  )}

</div>
        </div>
      </section>

      {/* Business Registration CTA */}
      <section className="px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto bg-[#171717] text-white rounded-3xl p-8 md:p-12 lg:p-16 grid md:grid-cols-[1fr_auto] items-center gap-8">
          <div className="max-w-2xl">
            <p className="text-[#D4AF37] text-sm font-semibold tracking-widest">
              OWN A BUSINESS?
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Bring Your Queue Online.
            </h2>

            <p className="text-gray-400 leading-8 mt-5">
              Register your organization, manage tokens, and give your
              customers a more convenient way to wait.
            </p>
          </div>

          <Link
            to="/orgRegister"
            className="flex items-center justify-center gap-3 bg-[#D4AF37] text-[#171717] px-7 py-4 rounded-lg font-semibold hover:bg-[#e4c45b] transition"
          >
            Register Organization <FaArrowRight />
          </Link>
        </div>
      </section>
    {/* toast container */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
  )
}

export default Organizations