import React from "react";
import BVNVerificationHistory from "./Verifications/BVNVerificationHistory";
import NINVerificationHistory from "./Verifications/NINVerificationHistory";

function Verifications() {
  return (
    <div>
      <BVNVerificationHistory />
      <hr className="my-4 text-gray-400" />
      <NINVerificationHistory />
    </div>
  );
}

export default Verifications;
