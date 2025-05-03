import React from 'react';

function PaymentFailed() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Payment Failed!</h1>
        <p className="text-lg text-gray-700">
          Oops! Something went wrong. Please try again or contact support if the issue persists.
        </p>
      </div>
    </div>
  );
}

export default PaymentFailed;
