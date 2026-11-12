import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowRight,
  FaEye, FaEyeSlash
} from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { googleLoginAPI, loginAPI, registerAPI } from '../services/userApi';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Auth({insideRegister}) {
  const navigate= useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const formik=useFormik({
    initialValues:{
      username:"username",
      email:"",
      password:""
    },
    validationSchema:Yup.object({
      username:Yup.string().min(3,"Must Be Atleast 3 Characters").required("required"),
      email:Yup.string().email("invalid email").required("required"),
      password:Yup.string().required("required")
    }),
    onSubmit:(values,{resetForm})=>{
      console.log(values);
      if(insideRegister){
        // register api call
        handleRegsiter(values)
      }else{
        // login api call
        handleLogin(values)
      }
      resetForm()
    }
  })
  const handleRegsiter=async(userData)=>{
    const result= await registerAPI(userData)
    console.log(result);
    if(result.status==201){
      toast.success("successfully registered!! ")
    }else{
      toast.error(result)
    }
    navigate('/login')
    
  }

  const handleLogin=async(userData)=>{
    const result= await loginAPI(userData)
    console.log(result);
    if(result.status==200){
      toast.success("successfully Logined!! ")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      setTimeout(() => {
        if(result.data.user.role=="admin"){
        navigate('/admin/dashboard')
      }else{
        navigate('/')
      }
      }, 2000);
    }else{
      toast.error(result)
    }
  }

  const handleGoogleLogin=async(credentialResponse)=>{
    console.log("inside google login");
    const {email,name,picture}=jwtDecode(credentialResponse.credential)
    console.log(email,name,picture);
    // api call
    const result = await googleLoginAPI({username:name,email,password:"googlePassword",picture})
    if(result.status==200){
      toast.success("login success")
       sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      setTimeout(() => {
        if(result.data.user.role=="admin"){
        navigate('/admin/dashboard')
      }else{
        navigate('/')
      }
      }, 2000);
    }else{
      toast.error(result)
    }
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-[#F5F5F5] px-4 py-10">

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Authentication Form */}
        <div className="p-6 sm:p-10 lg:p-12">

          {/* Form Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#171717]">
              {!insideRegister ? "Welcome Back!" : "Create Account"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {!insideRegister
                ? "Login to continue to your account."
                : "Register to start using QueueLess."}
            </p>
          </div>

          {/* Conditional Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">

            {/* Name - Register Only */}
            {insideRegister && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:border-[#D4AF37]">
                  <FaUser className="text-gray-400" />

                  <input
                    name='username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-transparent text-sm outline-none"
                    required
                  />
                  <div className='mb-5 text-yellow-400'>{formik.errors.username}</div>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:border-[#D4AF37]">
                <FaEnvelope className="text-gray-400" />

                <input
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-sm outline-none"
                  required
                />
                <div className='mb-5 text-yellow-400'>{formik.errors.email}</div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:border-[#D4AF37]">
                <FaLock className="shrink-0 text-gray-400" />

                <input
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full bg-transparent text-sm outline-none"
                  required
                />
                <div className='mb-5 text-yellow-400'>{formik.errors.password}</div>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 text-gray-400 hover:text-[#D4AF37]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
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

            {/* Submit Button - UI Only */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-3 font-semibold text-[#171717] transition hover:bg-[#C5A028]"
            >
              {!insideRegister ? "Login" : "Create Account"}
              <FaArrowRight />
            </button>

          </form>

          {/* google Login */}
              {
                !insideRegister &&
                <div className='my-5 text-center'>
                  <p>------------or------------</p>
                  <div className='mt-2 flex justify-center items-center w-full'>
                    <GoogleLogin
                      onSuccess={credentialResponse => {
                        handleGoogleLogin(credentialResponse)
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                  </div>
                </div>
              }

          {/* Switch Login / Register */}
          <p className="mt-8 text-center text-sm text-gray-600">
            {!insideRegister
              ? "Don't have an account?"
              : "Already have an account?"}

              <Link
                to={insideRegister ? "/login" : "/register"}
                className="ml-2 font-bold text-[#9B7B00] hover:underline"
              >
                {insideRegister ? "Login" : "Register"}
              </Link>
          </p>
              
        </div>
      </div>
       {/* toast container */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
  )
}

export default Auth