import React from "react";
import { Route, Routes } from "react-router-dom";
import NIN from "../pages/NIN";
import PhoneNIN from "../pages/PhoneNIN";
import Home from "../pages/Home";
import Footer from "../Components/Footer";
import VerificationHistory from "../pages/VerificationHistory";
import BVNVerify from "../pages/BVNVerify";
import Enrollment from "../pages/enrollment";
import DataSubscription from "../pages/Data";
import AirtimeSubscription from "../pages/airtime";

function RoutesConfig() {
  return (
    <div className="flex-1 p-8 md:ml-64 min-h-screen flex flex-col ">
      <Routes className="flex-1 ">
        <Route path="/" element={<Home />} />
        <Route path="verifications/nin" element={<NIN />} />
        <Route path="verificationhistory" element={<VerificationHistory />} />
        <Route path="verifications/pvn" element={<PhoneNIN />} />
        <Route path="enrollment" element={<Enrollment />} />
        <Route path="verifications/bvn" element={<BVNVerify />} />
        <Route path="data" element={<DataSubscription />} />
        <Route path="airtime" element={<AirtimeSubscription />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default RoutesConfig;
