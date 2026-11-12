import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaPowerOff,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import axiosInstance from "../../api/axiosInstance";


function Header() {
     const [menuOpen, setMenuOpen] = useState(false);
     const [token, setToken] = useState("");
     const [dp, setDp] = useState("");
     const [profileOpen, setProfileOpen] = useState(false);
     const [userId,setUserId]=useState("")

    useEffect(()=>{
      if(sessionStorage.getItem("token")&&sessionStorage.getItem("user")){
        const userToken=sessionStorage.getItem("token")
        const user=JSON.parse(sessionStorage.getItem("user"))
        setToken(userToken)
        setDp(user.picture)
        setUserId(user._id)
      }
    },[token])

     const navLinkClass = ({ isActive }) =>
    `whitespace-nowrap rounded-md px-2 py-2 text-xs font-medium transition sm:px-3 sm:text-sm lg:text-base ${
      isActive
        ? "bg-[#D4AF37] text-[#171717]"
        : "text-white hover:bg-[#333333] hover:text-[#E5C65B]"
    }`

  return (
    <header className="bg-[#171717] relative text-white shadow-lg">
      <nav className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-3 py-4 sm:px-6 lg:flex-nowrap lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/queue2.png"
            alt="QueueLess"
            className="h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-12"
          />

          <span className="text-xl font-bold sm:text-2xl lg:text-3xl">
            Queue<span className="text-[#D4AF37]">Less</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center justify-center gap-3 lg:gap-4">

          {/* menu icon and login button */}
          <div className="flex items-center text-2xl py-2 lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#D4AF37]"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className={menuOpen
              ? "absolute left-0 top-full z-50 flex w-full flex-col gap-2 bg-[#171717] p-5 shadow-lg lg:static lg:w-auto lg:flex-row lg:items-center lg:gap-3 lg:bg-transparent lg:p-0 lg:shadow-none"
              : "hidden lg:flex lg:items-center lg:gap-3"
            }>
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
  
            <NavLink to="/organizations" className={navLinkClass}>
              <span className="flex items-center gap-1 sm:gap-2">
                <FaBuilding />
                Organizations
              </span>
            </NavLink>
  
            
  
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

            {/* Organization Portal */}
            <Link
              to="/orgLogin"
              onClick={() => setMenuOpen(false)}
              className="md:mt-0 mt-2 flex items-center gap-2 rounded-lg border border-[#D4AF37] px-3 py-2 text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#171717] mx-2"
            >
              <FaUserCircle />
              <span>Organization Portal</span>
            </Link>

            {/* Profile / Login - Right Most */}
            <div className="relative ml-2">

              {!token ? (
                <NavLink
                  to="/login"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              ) : (
                <>
                  {/* Profile Icon */}
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#D4AF37]"
                  >
                    {dp ? (
                      <img
                        src={
                          dp.startsWith("https://lh3.googleusercontent.com")
                            ? dp
                            : `${axiosInstance.defaults.baseURL}/uploads/${dp}`
                        }
                        alt="Profile"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-3xl text-[#D4AF37]" />
                    )}
                  </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg bg-white p-2 shadow-xl ring-1 ring-black/10">

                      <Link
                        to={`/profile/${userId}`}
                        onClick={() => {
                          setProfileOpen(false);
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaGear />
                        Profile
                      </Link>

                      <button
                        onClick={() => {
                          sessionStorage.clear();
                          setToken("");
                          setDp("");
                          setProfileOpen(false);
                          setMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FaPowerOff />
                        Logout
                      </button>

                    </div>
                  )}
                </>
              )}

            </div>

          </div>
        </div>

      </nav>
    </header>
  )
}

export default Header