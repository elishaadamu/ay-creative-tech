// src/pages/Home.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import loginImage from "./assets/login.png";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

const Login = () => {
  return (
    <motion.div
      className="flex flex-col-reverse md:flex-row md:h-screen w-full"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left: Login Form */}
      <div className="flex flex-col justify-center md:w-1/2 w-full mt-5 md:mt-2 px-8">
        <h1 className="text-3xl font-bold pb-8">Login</h1>
        <form action="/login" method="POST" className="w-full">
          <div className="relative mb-4">
            <MdEmail className="absolute top-3 left-2 text-gray-400" />
            <input
              type="text"
              className="pl-10 py-2 border border-gray-500 rounded w-full"
              placeholder="Your Email address"
              required
            />
          </div>
          <div className="relative mb-4">
            <TbLockPassword className="absolute top-3 left-2 text-gray-400" />
            <input
              type="password"
              className="pl-10 py-2 border border-gray-500 rounded w-full"
              placeholder="Password"
              required
            />
          </div>
          <input
            type="submit"
            value="Log In"
            className="bg-blue-600 text-white py-2 rounded w-full cursor-pointer hover:bg-blue-700"
          />
        </form>
        <p className="mt-4 text-xl flex justify-end text-blue-500 hover:text-blue-700 font-bold">
          <a href="#">Forgotten Password?</a>
        </p>
        <p className="text-gray-400 text-center text-xl mt-3">or</p>
        <div className="flex w-full gap-3 mt-4 flex-col md:flex-row justify-center md:justify-between">
          <button className="border-1 border-gray-500 hover:bg-gray-300 rounded w-full h-10 flex items-center justify-center">
            <div className="flex gap-4 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="36px"
                height="36px"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span className="font-bold">Google</span>
            </div>
          </button>
          <button className="border-1 border-gray-500 hover:bg-gray-300 rounded w-full h-10 flex items-center justify-center">
            <div className="flex gap-4 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="36px"
                height="36px"
              >
                <path
                  fill="#039be5"
                  d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                />
                <path
                  fill="#fff"
                  d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                />
              </svg>
              <span className="font-bold">Facebook</span>
            </div>
          </button>
        </div>
        <p className="mt-5 flex  gap-4 items-center">
          <span className="text-gray-400 text-[20px]">
            Don't have an account?
          </span>
          <NavLink to="/signup" className="no-underline">
            <span className="text-blue-700 text-[20px] font-bold">Signup</span>
          </NavLink>
        </p>
      </div>

      {/* Right: Full Height Image */}
      <div className="md:w-1/2 w-full h-[300px] md:h-[120%] relative">
        <img
          src={loginImage}
          alt="Login visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 pt-[50px] pl-[50px] pr-[30px] md:pt-[100px] md:pl-[100px] md:pr-[30px] bg-black bg-opacity-10">
          <h2 className="text-black text-2xl font-bold">
            The future belongs to those who{" "}
            <span className="text-blue-700">believe</span> in the{" "}
            <span className="text-blue-700">beauty of their dreams</span>
          </h2>
          <p className="text-right text-2xl">- Eleanor Roosevelt</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
