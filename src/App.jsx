
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './user/pages/Home'
import MyBooking from './user/pages/MyBooking'
import OrganizationDetails from './user/pages/OrganizationDetails'
import Organizations from './user/pages/Organizations'
import Profile from './user/pages/Profile'
import Contact from './user/pages/Contact'

import OrganizationDashboard from './Organization/pages/OrganizationDashboard'
import OrganizationProfile from './Organization/pages/OrganizationProfile'

import AdminDashboard from './admin/pages/AdminDashboard'
import AdminResource from './admin/pages/AdminResource'

import Auth from './pages/Auth'
import Auth2 from './pages/Auth2'
import Pnf from './pages/Pnf'

import Preloader1 from './components/Preloader1'
import Footer from './components/Footer'
import { useState } from 'react'


function App() {

  const[isLoading,setIsLoading]=useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 1000);

  return (
    <>
      <Routes>

        <Route path='/' element={isLoading?<Preloader1/>:<Home/>}/>
        <Route path='/mybooking/:id' element={<MyBooking/>}/>
        <Route path='/organizations' element={<Organizations/>}/>
        <Route path='/organizations/:id' element={<OrganizationDetails/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth insideRegister/>}/>
        <Route path='/orgLogin' element={<Auth2/>}/>
        <Route path='/orgRegister' element={<Auth2 insideRegister/>}/>
        <Route path='/contact' element={<Contact/>}/>

        <Route path='/organization/dashboard' element={<OrganizationDashboard/>}/>
        <Route path='/organization/profile' element={<OrganizationProfile/>}/>

        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/resource' element={<AdminResource/>}/>

        <Route path='/*' element={<Pnf/>}/>

      </Routes>
      <Footer/>
    </>
  )
}

export default App
