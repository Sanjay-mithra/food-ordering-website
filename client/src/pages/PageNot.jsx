import React from 'react'

function PageNot() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white px-6 py-12 text-gray-800 font-poppins">
    {/* Left side: image */}
    <div className="w-full lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
      <img
        src="https://img.freepik.com/premium-vector/delivery-man-parcel-handover-customer-cartoon-art-illustration_56104-607.jpg"
        alt="Delivery Illustration"
        className="max-w-md w-full"
      />
    </div>

    {/* Right side: error message */}
    <div className="w-full lg:w-1/2 text-center lg:text-left px-6">
      <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-3">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Oops! Looks like you're lost. <br />
        The page you're looking for isn't here.
      </p>
      <Link
        to="/"
        className="btn bg-orange-500 !bg-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-yellow-600"
      >
        Go Back Home
      </Link>
    </div>
  </div>
  )
}

export default PageNot;
