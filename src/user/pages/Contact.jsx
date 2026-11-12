import React from 'react'
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import Header from '../components/Header';

function Contact() {
  return (
    <>
    <Header/>
        <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#B89625]">
              Get in Touch
            </p>
    
            <h1 className="text-3xl font-bold text-[#171717] sm:text-4xl">
              Contact <span className="text-[#D4AF37]">Us</span>
            </h1>
    
            <p className="mt-4 text-gray-600">
              Have questions about QueueLess? We are here to help.
              Reach out to us for assistance, feedback, or enquiries.
            </p>
          </div>
    
          {/* Main Section */}
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="rounded-2xl bg-[#171717] p-8 text-white shadow-lg">
              <h2 className="text-2xl font-bold">Contact Information</h2>
    
              <p className="mt-3 text-sm leading-6 text-gray-300">
                Get in touch with the QueueLess team. We would be happy
                to hear from you.
              </p>
    
              <div className="mt-10 space-y-8">
                <div className="flex items-start gap-4">
                  <FaEnvelope className="mt-1 text-xl text-[#D4AF37]" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="mt-1 break-all text-sm text-gray-300">
                      support@queueless.com
                    </p>
                  </div>
                </div>
    
                <div className="flex items-start gap-4">
                  <FaPhone className="mt-1 text-xl text-[#D4AF37]" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="mt-1 text-sm text-gray-300">
                      +91 9876543210
                    </p>
                  </div>
                </div>
    
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="mt-1 text-xl text-[#D4AF37]" />
                  <div>
                    <h3 className="font-semibold">Service</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-300">
                      Virtual queue management made simple.
                    </p>
                  </div>
                </div>
              </div>
    
              <div className="mt-12 border-t border-gray-700 pt-5">
                <p className="text-sm text-gray-400">
                  QueueLess — Less waiting, more living.
                </p>
              </div>
            </div>
    
            {/* Contact Form Design */}
            <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8 lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#171717]">
                Send Us a Message
              </h2>
    
              <p className="mt-2 text-sm text-gray-500">
                Fill out the form below to get in touch with us.
              </p>
    
              <form className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                    />
                  </div>
    
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
    
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                  />
                </div>
    
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    placeholder="Write your message..."
                    rows={5}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                  />
                </div>
    
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3 font-semibold text-[#171717] transition hover:bg-[#E5C65B]"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}

export default Contact