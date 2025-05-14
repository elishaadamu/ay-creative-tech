import "./style.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Home from "./Home";
import NavBar from "./components/Nav";
import Backtotop from "./components/Backtotop";
import Login from "./Login";
import Signup from "./Signup";
import Services from "./Services";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  const showLayout =
    location.pathname === "/" || location.pathname === "/services";

  return (
    <div className="flex flex-col min-h-screen">
      {showLayout && <NavBar />}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </AnimatePresence>
      </div>
      {showLayout && <Footer />}
      <Backtotop />
    </div>
  );
};

export default App;
