import React from "react";
import { Route, Routes } from "react-router-dom";
import NIN from "../pages/NIN";
import NinPhone from "../pages/NinPhone";
import Home from "../pages/Home";
import Footer from "../Components/Footer";

function RoutesConfig() {
  return (
    <div className="flex-1 p-8 md:ml-64 min-h-screen flex flex-col ">
      <Routes className="flex-1 ">
        <Route path="/" element={<Home />} />
        <Route path="verifications/nin" element={<NIN />} />
        <Route path="verifications/pvn" element={<NinPhone />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default RoutesConfig;
