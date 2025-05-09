import "./style.css";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Home from "./Home";
import NavBar from "./components/Nav";
import Login from "./Login";
import Signup from "./Signup";
import Services from "./Services";
import "./style.css";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-[1500px] ">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
