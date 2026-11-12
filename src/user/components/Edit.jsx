import React, { useEffect, useState } from 'react'
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import axiosInstance from '../../api/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import { userEditAPI } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';
function Edit({onClose}) {
  const [userDetails,setUserDetails]=useState({
        username:"",address:"",phoneNo:"",picture:"",role:"",id:""
    })
    const [existingPicture,setExistingPicture] = useState("")
    const [preview,setPreview] =useState("")
    const [imageFile,setImageFile]=useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(sessionStorage.getItem("user")){
            const user =JSON.parse(sessionStorage.getItem("user"))
            setUserDetails({...userDetails,username:user.username,phoneNo:user.phoneNo,address:user.address,role:user.role,id:user._id})
            setExistingPicture(user.picture)
        }
    },[])
    // console.log(userDetails);
    // console.log(existingPicture);

    const handleFileUpload = (e)=>{
        const imageFile = e.target.files[0]
        if(imageFile.type.startsWith("image/")){
            setUserDetails({...userDetails,picture:e.target.files[0]})
            const url =URL.createObjectURL(e.target.files[0])
            setPreview(url)
            setImageFile(true)
        }else{
            setImageFile(false)
        }
    }

    const resetProfile=()=>{
        const user =JSON.parse(sessionStorage.getItem("user"))
        setUserDetails({...userDetails,username:user.username,phoneNo:user.phoneNo,address:user.address,role:user.role,id:user._id})
        setExistingPicture(user.picture)
        setPreview("")
        setImageFile(false)
        
    }

    const handleUpdateUser=async()=>{
        const {username,phoneNo,address,picture,role,id}=userDetails
        if(!username || !phoneNo || !address ){
            toast.info("Please fill the form completely")
        }else{
          // api call
          const reqBody = new FormData()
            for(let key in userDetails){
                if(key != picture){
                    reqBody.append(key,userDetails[key])
                }else{
                    preview?reqBody.append("picture",picture):reqBody.append("picture",existingPicture)
                }
            }
            // api call
            const result = await userEditAPI(id,reqBody)
            console.log(result);
            if(result.status==200){
                toast.success("user Profile updated successfully please Login")
                setTimeout(()=>{
                    sessionStorage.clear()
                    navigate('/login')
                },2500)
            }
        }

    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#171717]">
              Edit Profile
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your personal information
            </p>
          </div>

          <button onClick={onClose} className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100">
            <FaTimes size={20} />
          </button>
        </div>

       {/* Profile Image */}
        <div className="mb-6 flex flex-col items-center">

            <div className="h-20 w-20 overflow-hidden rounded-full bg-[#171717]">

                {existingPicture === "" ? (
                    <img
                        src={
                            preview
                                ? preview
                                : "https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png"
                        }
                        alt="User"
                        className="h-full w-full rounded-full object-cover"
                    />
                ) : existingPicture.startsWith("http://lh3.googleusercontent.com/") ? (
                    <img
                        src={preview ? preview : existingPicture}
                        alt="User"
                        className="h-full w-full rounded-full object-cover"
                    />
                ) : (
                    <img
                        src={
                            preview
                                ? preview
                                : `${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`
                        }
                        alt="User"
                        className="h-full w-full rounded-full object-cover"
                    />
                )}

            </div>

            <label className="mt-3 cursor-pointer text-sm font-semibold text-[#B89520] hover:underline">
                Change Profile Photo

                <input
                    type="file"
                    accept="image/*"
                    onChange={e=>handleFileUpload(e)}
                    className="hidden"
                />
            </label>
            {!imageFile && <div className='mt-5 text-yellow-500 text-sm'>*Only Accepts Image File</div>}

        </div>

        {/* Form Design */}
        <form className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <div className="flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-[#D4AF37]">
              <FaUser className="text-gray-400" />

              <input
                value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})}
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-transparent px-3 py-3 text-gray-800 outline-none"
              />
            </div>
          </div>

         

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Phone Number
            </label>

            <div className="flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-[#D4AF37]">
              <FaPhone className="text-gray-400" />

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={userDetails.phoneNo} onChange={e=>setUserDetails({...userDetails,phoneNo:e.target.value})}
                className="w-full bg-transparent px-3 py-3 text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Address
            </label>

            <div className="flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-[#D4AF37]">
              <FaMapMarkerAlt className="text-gray-400" />

              <input
                type="text"
                placeholder="Enter your address"
                value={userDetails.address} onChange={e=>setUserDetails({...userDetails,address:e.target.value})}
                className="w-full bg-transparent px-3 py-3 text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              onClick={resetProfile}
              type="button"
              className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              Reset
            </button>

            <button
              onClick={handleUpdateUser}
              type="button"
              className="rounded-lg bg-[#D4AF37] px-5 py-3 font-semibold text-[#171717] transition hover:bg-[#E5C65B]"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
      {/* toast container */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
  )
}

export default Edit