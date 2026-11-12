
import Header from '../components/Header'
import React from "react";
import { Link } from 'react-router-dom';
import { CiSearch, CiClock2, CiBellOn } from "react-icons/ci";
import {
  FaArrowRight,
  FaMobileAlt,
  FaStore,
  FaCheckCircle,
  FaUsers,
  FaRegClock,
  FaTicketAlt,
} from "react-icons/fa";


function Home() {
  
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171717] overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,23,0.88), rgba(23,23,23,0.90)), url('/queueLanding.png')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="flex justify-center items-center">

            {/* Left Side */}
            <div className="text-center lg:text-left">
              <p className="text-[#D4AF37] text-sm tracking-[0.25em] font-semibold mb-6">
                YOUR TIME MATTERS
              </p>

              <h1 className="text-4xl sm:text-5xl xl:text-7xl font-bold leading-tight">
                Skip the Line.
                <span className="block text-[#D4AF37] mt-2">
                  Not the Experience.
                </span>
              </h1>

              <p className="text-gray-300 text-base md:text-lg leading-8 max-w-xl mx-auto lg:mx-0 mt-7">
                Join queues virtually, track your token in real time,
                and spend less time waiting and more time living.
              </p>

              {/* Search */}
              <div className="mt-9 w-full max-w-xl mx-auto lg:mx-0 flex items-center bg-white rounded-xl p-2 shadow-lg">
                <CiSearch className="text-gray-500 text-3xl ml-2 shrink-0" />

                <input
                  type="text"
                  placeholder="Search hospitals, salons, restaurants..."
                  className="flex-1 min-w-0 w-full p-3 text-black outline-none bg-transparent text-sm md:text-base"
                />

                <button className="bg-[#D4AF37] text-[#171717] px-4 md:px-6 py-3 rounded-lg font-semibold hover:bg-[#e4c45b] transition">
                  Search
                </button>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-7">
                <Link
                  to="/register"
                  className="bg-[#D4AF37] text-[#171717] px-6 md:px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 hover:bg-[#e4c45b] transition"
                >
                  Join a Queue <FaArrowRight />
                </Link>

                <Link
                  to="/orgRegister"
                  className="border border-white/40 px-6 md:px-8 py-4 rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                >
                  For Businesses
                </Link>
              </div>
            </div>

            {/* Right Side: Queue Preview */}
            
          </div>

          {/* Statistics */}
          
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[#A78016] text-sm font-semibold tracking-widest">
              WHY QUEUELESS
            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-5">
              A Smarter Way to Wait
            </h2>

            <p className="text-gray-600 mt-6 leading-8">
              Enjoy a convenient queue experience without spending hours
              standing in line.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mt-14">
            {/* Feature 1 */}
            <div className="h-full bg-white rounded-2xl p-7 md:p-8 border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/15 text-[#98720D] flex items-center justify-center">
                <FaMobileAlt className="text-2xl" />
              </div>

              <h3 className="font-bold text-lg mt-6">
                Join From Anywhere
              </h3>

              <p className="text-gray-600 leading-7 mt-4 text-sm">
                Book your token online without standing in a physical queue.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="h-full bg-white rounded-2xl p-7 md:p-8 border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/15 text-[#98720D] flex items-center justify-center">
                <FaRegClock className="text-2xl" />
              </div>

              <h3 className="font-bold text-lg mt-6">
                Live Wait Times
              </h3>

              <p className="text-gray-600 leading-7 mt-4 text-sm">
                Check your queue position and estimated waiting time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="h-full bg-white rounded-2xl p-7 md:p-8 border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/15 text-[#98720D] flex items-center justify-center">
                <CiBellOn className="text-3xl" />
              </div>

              <h3 className="font-bold text-lg mt-6">
                Real-time Alerts
              </h3>

              <p className="text-gray-600 leading-7 mt-4 text-sm">
                Receive updates when your turn is approaching.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="h-full bg-white rounded-2xl p-7 md:p-8 border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/15 text-[#98720D] flex items-center justify-center">
                <FaStore className="text-2xl" />
              </div>

              <h3 className="font-bold text-lg mt-6">
                Easy Management
              </h3>

              <p className="text-gray-600 leading-7 mt-4 text-sm">
                Help organizations manage queues more efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[#A78016] text-sm font-semibold tracking-widest">
              HOW IT WORKS
            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-5">
              Four Steps. Less Waiting.
            </h2>

            <p className="text-gray-600 mt-6 leading-8">
              Get your token and track your turn with just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-8 mt-16">
            {/* Step 1 */}
            <div className="text-center px-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#171717] text-[#D4AF37] flex items-center justify-center">
                <CiSearch className="text-4xl" />
              </div>

              <h3 className="font-bold text-lg mt-6">1. Find a Place</h3>

              <p className="text-gray-600 text-sm leading-7 mt-4">
                Discover hospitals, salons, restaurants, and other services.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center px-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#171717] text-[#D4AF37] flex items-center justify-center">
                <FaTicketAlt className="text-2xl" />
              </div>

              <h3 className="font-bold text-lg mt-6">2. Book a Token</h3>

              <p className="text-gray-600 text-sm leading-7 mt-4">
                Choose an organization and reserve your virtual token.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center px-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#171717] text-[#D4AF37] flex items-center justify-center">
                <CiBellOn className="text-4xl" />
              </div>

              <h3 className="font-bold text-lg mt-6">3. Track Your Turn</h3>

              <p className="text-gray-600 text-sm leading-7 mt-4">
                Stay updated as the queue moves forward.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center px-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#171717] text-[#D4AF37] flex items-center justify-center">
                <FaCheckCircle className="text-2xl" />
              </div>

              <h3 className="font-bold text-lg mt-6">4. Arrive on Time</h3>

              <p className="text-gray-600 text-sm leading-7 mt-4">
                Reach your destination when your turn approaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business CTA */}
      <section id="business" className="px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto bg-[#171717] text-white rounded-3xl px-7 sm:px-10 md:px-16 py-10 md:py-16 grid md:grid-cols-[1fr_auto] items-center gap-8 md:gap-12">
          <div className="max-w-2xl">
            <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.2em]">
              FOR ORGANIZATIONS
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-5 leading-tight">
              Better Queue Management Starts Here.
            </h2>

            <p className="text-gray-400 leading-8 mt-5">
              Manage tokens, monitor queue progress, and help your customers
              enjoy a smoother service experience.
            </p>
          </div>

          <Link
            to="/orgRegister"
            className="w-full md:w-auto justify-center bg-[#D4AF37] text-[#171717] px-6 md:px-7 py-4 rounded-lg font-semibold flex items-center gap-3 hover:bg-[#e4c45b] transition"
          >
            Register Your Business <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-3xl border border-gray-200 px-6 sm:px-10 py-12 md:py-16">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Ready to Skip the Line?
          </h2>

          <p className="text-gray-600 leading-8 mt-6 max-w-xl mx-auto">
            Your time is valuable. Let QueueLess make every visit a little
            easier.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-3 mt-8 bg-[#D4AF37] text-[#171717] px-8 py-4 rounded-lg font-semibold hover:bg-[#e4c45b] transition"
          >
            Get Started <FaArrowRight />
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home