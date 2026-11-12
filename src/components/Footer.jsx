import React from 'react'
import { FaTicketAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <Link
            to="/"
            className="flex w-fit items-center gap-3 text-xl font-extrabold text-white no-underline"
          >
            <img
            src="/queue2.png"
            alt="QueueLess"
            className="h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-12"
          />
            <span className="text-xl font-bold ">
            Queue<span className="text-[#D4AF37]">Less</span>
          </span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            A convenient way to discover services, book queue
            tokens, and manage your visits.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/" className="text-slate-400 no-underline hover:text-white">
              Home
            </Link>
            <Link to="/organizations" className="text-slate-400 no-underline hover:text-white">
              Organizations
            </Link>
            <Link to="/login" className="text-slate-400 no-underline hover:text-white">
              User Login
            </Link>
            <Link to="/contact" className="text-slate-400 no-underline hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">For Organizations</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/orgLogin" className="text-slate-400 no-underline hover:text-white">
              Organization Login
            </Link>
            <Link to="/orgRegister" className="text-slate-400 no-underline hover:text-white">
              Register Organization
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between lg:px-8">
          <p>© 2026 QueueLess. All rights reserved.</p>
          <p>Smarter queues. Better experiences.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer