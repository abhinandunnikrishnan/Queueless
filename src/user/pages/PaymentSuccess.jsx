import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import { checkPaymentStatusAPI } from '../../services/bookingAPI'

function PaymentSuccess() {
     const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [status, setStatus] = useState('checking')
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    if (!sessionId) {
      setStatus('failed')
      return
    }

    let attempts = 0
    let interval

    const checkStatus = async () => {
      try {
        const result = await checkPaymentStatusAPI(sessionId)

        if (result.data.paid) {
          setBooking(result.data.booking)
          setStatus('success')
          clearInterval(interval)
        } else {
          attempts++

          if (attempts >= 12) {
            setStatus('pending')
            clearInterval(interval)
          }
        }
      } catch (error) {
        console.log('Payment verification error:', error)
        setStatus('failed')
        clearInterval(interval)
      }
    }

    checkStatus()
    interval = setInterval(checkStatus, 3000)

    return () => clearInterval(interval)
  }, [sessionId])
  return (
     <>
      <Header />

      <div className="min-h-screen bg-[#F7F7F5] flex justify-center items-center px-4 py-10">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">

          {status === 'checking' && (
            <>
              <div className="text-5xl mb-5">⏳</div>
              <h1 className="text-2xl font-bold text-[#171717]">
                Verifying Payment...
              </h1>
              <p className="text-gray-500 mt-3">
                Please wait while we confirm your payment and generate your token.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-5xl mb-5">✓</div>
              <h1 className="text-3xl font-bold text-[#171717]">
                Payment Successful!
              </h1>
              <p className="text-gray-600 mt-3">
                Your QueueLess token has been booked successfully.
              </p>

              {booking && (
                <div className="bg-[#F7F7F5] rounded-xl p-5 mt-6 text-left">
                  <p className="font-semibold text-lg">
                    Token: {booking.tokenCode}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Organization: {booking.orgName}
                  </p>
                  <p className="text-gray-600">
                    Service: {booking.service}
                  </p>
                  <p className="text-gray-600">
                    Date: {booking.bookingDate}
                  </p>
                  <p className="text-gray-600">
                    Time: {booking.timeSlot}
                  </p>
                </div>
              )}
            </>
          )}

          {status === 'pending' && (
            <>
              <div className="text-5xl mb-5">⌛</div>
              <h1 className="text-2xl font-bold text-[#171717]">
                Payment Confirmation Pending
              </h1>
              <p className="text-gray-500 mt-3">
                Your payment is being processed. Please check My Bookings shortly.
              </p>
            </>
          )}

          {status === 'failed' && (
            <>
              <div className="text-5xl mb-5">!</div>
              <h1 className="text-2xl font-bold text-red-600">
                Unable to Verify Payment
              </h1>
              <p className="text-gray-500 mt-3">
                We couldn't verify your payment. Please check My Bookings before trying again.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              to="/organizations"
              className="bg-[#D4AF37] hover:bg-[#c5a12f] text-[#171717] font-semibold px-6 py-3 rounded-lg"
            >
              Book More Tokens
            </Link>

            <Link
              to="/mybooking"
              className="border border-[#171717] text-[#171717] font-semibold px-6 py-3 rounded-lg"
            >
              My Bookings
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default PaymentSuccess