import React from "react";

function AdvancedBVNSlip() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Basic BVN Slip</h1>
        <p className="text-gray-700 mb-4">
          This is a basic slip layout for BVN verification.
        </p>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Basic BVN Slip"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default AdvancedBVNSlip;
