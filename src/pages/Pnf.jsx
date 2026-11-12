import React from 'react'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

function Pnf() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl text-center">

        {/* 404 Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]/15">
          <FaExclamationTriangle className="text-3xl text-[#D4AF37]" />
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-extrabold tracking-tight text-[#D4AF37] sm:text-9xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-bold text-[#171717] sm:text-3xl">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
          The page you are looking for doesn't exist or may have been moved.
          Let's get you back to QueueLess.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3 font-semibold text-[#171717] transition hover:bg-[#E5C65B] sm:w-auto"
          >
            <FaArrowLeft />
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="w-full rounded-lg border border-[#171717] px-6 py-3 font-semibold text-[#171717] transition hover:bg-[#171717] hover:text-white sm:w-auto"
          >
            Contact Support
          </Link>
        </div>

        {/* Branding */}
        <p className="mt-12 text-sm text-gray-400">
          Queue<span className="font-semibold text-[#B89625]">Less</span>
          {" "}— Less waiting, more living.
        </p>
      </div>
    </div>
  )
}

export default Pnf