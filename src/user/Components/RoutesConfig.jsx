import React from "react";
import { Route, Routes } from "react-router-dom";
import NIN from "../pages/NIN";
import NinPhone from "../pages/NINPhone";

function RoutesConfig() {
  return (
    <div className="flex-1 p-8 md:ml-64">
      <Routes>
        <Route path="verifications/nin" element={<NIN />} />
        <Route path="verifications/pvn" element={<NinPhone />} />
      </Routes>
    </div>
  );
}

export default RoutesConfig;
