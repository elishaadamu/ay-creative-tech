import React from "react";
import BVNVerificationHistory from "./History/BVNVerificationHistory";
import NINVerificationHistory from "./History/NINVerificationHistory";

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
