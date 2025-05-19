import "./style.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Home from "./pages/Home";
import NavBar from "./components/Nav";
import Backtotop from "./components/Backtotop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import UserDashBoard from "./user/dashboard";

const App = () => {
  const location = useLocation();
  const showLayout =
    location.pathname === "/" || location.pathname === "/contact";

  return (
    <div className="flex flex-col min-h-screen">
      {showLayout && <NavBar />}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} /> {/* 404 Route */}
            <Route path="*" element={<NotFound />} /> {/* 404 Route */}
            <Route path="/dashboard/*" element={<UserDashBoard />} />{" "}
            {/* 404 Route */}
          </Routes>
        </AnimatePresence>
      </div>
      {showLayout && <Footer />}
      <Backtotop />
    </div>
  );
};

export default App;
