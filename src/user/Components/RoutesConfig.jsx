import React from "react";
import { Route, Routes } from "react-router-dom";
import NIN from "../pages/NIN";
import PhoneNIN from "../pages/PhoneNIN";
import Home from "../pages/Home";
import Footer from "../Components/Footer";
import Verifications from "../pages/Verifications";
import BVNVerificationHistory from "../pages/History/BVNVerificationHistory";
import NINVerificationHistory from "../pages/History/NINVerificationHistory";
import FundingHistory from "../pages/FundingHistory";
import BVNVerify from "../pages/BVNVerify";
import Enrollment from "../pages/Enrollment";
import DataSubscription from "../pages/Data";
import AirtimeSubscription from "../pages/Airtime";
import NINSlip from "../layout/Ninslip";
import NotFound from "../pages/NotFound";
import BasicBVN from "../layout/BasicBVN";
import AdvancedBVN from "../layout/AdvancedBVN";
import IPEClearance from "../pages/IPEClearance";
import SetPin from "../layout/SetPin";
import ResetPin from "../layout/ResetPin";
import IPEClearanceHistory from "../pages/History/IPEHistory";

function RoutesConfig() {
  return (
    <div className="flex-1 p-8 md:ml-64 min-h-screen flex flex-col ">
      <Routes className="flex-1 notvalid ">
        <Route path="/" element={<Home />} />
        <Route path="/verifications/nin" element={<NIN />} />
        <Route path="/verificationhistory" element={<Verifications />} />
        <Route path="/bvnhistory" element={<BVNVerificationHistory />} />
        <Route path="/ninhistory" element={<NINVerificationHistory />} />
        <Route path="/fundinghistory" element={<FundingHistory />} />
        <Route path="/verifications/pvn" element={<PhoneNIN />} />
        <Route path="/enrollment" element={<Enrollment />} />
        <Route path="/verifications/bvn" element={<BVNVerify />} />
        <Route path="/data" element={<DataSubscription />} />
        <Route path="/airtime" element={<AirtimeSubscription />} />
        <Route path="/verifications/ninslip" element={<NINSlip />} />
        <Route path="/verifications/basicbvn" element={<BasicBVN />} />
        <Route path="/verifications/advancedbvn" element={<AdvancedBVN />} />
        <Route path="/setpin" element={<SetPin />} />
        <Route path="/reset-pin" element={<ResetPin />} />
        <Route path="/ipe-clearance" element={<IPEClearance />} />
        <Route path="/ipe-history" element={<IPEClearanceHistory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default RoutesConfig;
