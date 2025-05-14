// src/pages/Home.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "./assets/logo-ay.png";
import Svg from "./assets/bg.svg";
import Background from "./assets/bg-form.jpg";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

const Signup = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100  px-4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white my-8  p-8 rounded shadow-md w-full max-w-md">
        <div className="bg-form z-20 absolute">
          <img src={Svg} alt="" />
        </div>
        <div className=" my-5 mx-auto w-40 max-w-full">
          <NavLink
            exact="true"
            to="/"
            className="text-black font-bold text-4xl"
          >
            <img src={Logo} alt="Logo" />
          </NavLink>
        </div>
        <div>
          <h3 className="text-gray-500 mb-4 text-xl font-semibold">
            Welcome to AY Creative Technologies
          </h3>
          <p className="mb-5 text-gray-500">Create a new account</p>
        </div>
        <form action="/signup" method="POST" className="w-full">
          <div className="relative mb-4">
            <p className="mb-3">
              <label
                htmlFor="Firstname"
                className="text-gray-500  text-[13px] my-10 "
              >
                FIRST NAME
              </label>
            </p>
            <input
              type="text"
              className="pl-5 py-2 border border-gray-500 rounded w-full h-[50px]"
              placeholder="First Name"
              required
              name="Firstname"
              id="Firstname"
            />
          </div>
          <p className=" mt-5 mb-3">
            <label htmlFor="Lastname" className="text-gray-500 text-[13px] ">
              LAST NAME
            </label>
          </p>
          <input
            type="text"
            className="pl-5 py-2 border border-gray-500 rounded w-full h-[50px]"
            placeholder="Last Name"
            required
            name="Lastname"
            id="Lastname"
          />
          <p className="mt-5 mb-3">
            <label
              htmlFor="Email"
              className="text-gray-500  text-[13px] my-10 "
            >
              EMAIL
            </label>
          </p>

          <input
            type="email"
            className="pl-5 py-2 border border-gray-500 rounded w-full h-[50px]"
            placeholder="Email Address"
            required
            name="email"
            id="Email"
          />
          <p className="mt-5 mb-3">
            <label
              htmlFor="Phone_Num"
              className="text-gray-500  text-[13px] my-10 "
            >
              PHONE NUMBER
            </label>
          </p>

          <input
            type="tel"
            className="pl-5 py-2 border border-gray-500 rounded w-full h-[50px]"
            placeholder="Phone Number"
            required
            name="phone_num"
            id="Phone_Num"
          />
          <p className="mt-5 mb-3">
            <label htmlFor="NIN" className="text-gray-500  text-[13px] my-10 ">
              NIN NUMBER
            </label>
          </p>
          <input
            type="number"
            className="pl-5 py-2 border border-gray-500 rounded w-full h-[50px]"
            placeholder="NIN Number"
            required
            name="NIN"
            id="NIN"
          />
          <p className="mt-5 mb-3">
            <label
              htmlFor="Password"
              className="text-gray-500  text-[13px] my-10 "
            >
              PASSWORD
            </label>
          </p>

          <input
            type="password"
            className="pl-5 py-2 border border-gray-500 rounded w-full h-[50px]"
            placeholder="Password"
            required
            name="password"
            id="Password"
          />
          <input
            type="submit"
            value="Signup"
            className="submit bg-amber-600 h-[50px] text-white py-2 mt-5 rounded w-full cursor-pointer "
          />
        </form>

        <p className="text-gray-400 text-center text-xl my-5">or</p>
        <div className="flex flex-col md:flex-row gap-3">
          {/* Google Button */}
          <button className="border border-gray-500 hover:bg-gray-300 rounded h-10 flex items-center justify-center w-full">
            <div className="flex gap-4 items-center">
              {/* SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
              >
                ...
              </svg>
              <span className="font-bold">Google</span>
            </div>
          </button>

          {/* Facebook Button */}
          <button className="border border-gray-500 hover:bg-gray-300 rounded h-10 flex items-center justify-center w-full">
            <div className="flex gap-4 items-center">
              {/* SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
              >
                ...
              </svg>
              <span className="font-bold">Facebook</span>
            </div>
          </button>
        </div>

        <p className="mt-5 text-center">
          <span className="text-gray-400 text-[16px]">
            Already have an account?
          </span>{" "}
          <NavLink to="/login" className="text-blue-700 text-[16px] font-bold">
            Log In
          </NavLink>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
