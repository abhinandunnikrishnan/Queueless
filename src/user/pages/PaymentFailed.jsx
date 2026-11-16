import React from 'react'

function PaymentFailed() {
  return (
    <>
    <Header/>
    <div className='container min-h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10'>
            <div>
                <h1 className='text-red-600 md:text-4xl font-bold'>Payment Failed</h1>
                <p className='text-2xl my-10'>Sorry For Your Inconvenience</p>
                <Link to={"/organizations"} className='flex items-center bg-blue-500 w-60 p-2 text-white font-bold rounded'>Book Token</Link>
            </div>
            <div className='flex justify-center items-center'>
                <img src="https://easyfashion.com.bd/wp-content/uploads/2021/04/payment-failed-min.gif" alt="failed" />
            </div>
        </div>

    </div>
    </>
  )
}

export default PaymentFailed