// src/pages/Home.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/images/logo-ay.png";
import Svg from "../assets/images/bg.svg";
import { TbEye, TbEyeOff } from "react-icons/tb";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setInvalidFields((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newInvalid = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newInvalid.email = true;
    if (!form.password || form.password.length < 8) newInvalid.password = true;
    setInvalidFields(newInvalid);
    return Object.keys(newInvalid).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setError("Please correct the highlighted fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://verification-bdef.onrender.com/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("showWelcomeModal", "true");
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      const apiMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(apiMessage);

      if (
        apiMessage.toLowerCase().includes("incorrect password") ||
        apiMessage.toLowerCase().includes("wrong password")
      ) {
        toast.error("Incorrect password. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        className="min-h-screen flex items-center justify-center relative bg-gray-100  px-4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-form-1 z-2 absolute">
          <img src={Svg} alt="Bg" />
        </div>
        <div className="bg-white my-8 z-10 p-8  rounded shadow-md w-full max-w-md">
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
            <p className="mb-5 text-gray-500">Please sign-in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative mb-4"></div>

            <p className="mt-5 mb-3">
              <label htmlFor="Email" className="text-gray-500  text-[12px]  ">
                EMAIL
              </label>
            </p>

            <input
              type="email"
              className={`pl-5 py-2 text-black border rounded w-full h-[50px] ${
                invalidFields.email
                  ? "border-red-500"
                  : form.email
                  ? "border-green-500"
                  : "border-gray-500"
              }`}
              placeholder="Email Address"
              required
              name="email"
              id="Email"
              value={form.email}
              onChange={handleChange}
            />

            <p className="mt-5 mb-3 flex justify-between items-center">
              <label
                htmlFor="Password"
                className="text-gray-500  text-[12px]  "
              >
                PASSWORD
              </label>
              <a href="#" className="text-amber-500 text-[12px]">
                Forgot Password?
              </a>
            </p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`pl-5 text-black py-2 border rounded w-full h-[50px] ${
                  invalidFields.password ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Password"
                required
                name="password"
                id="Password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-4 cursor-pointer text-gray-500 "
                tabIndex={-1}
              >
                {showPassword ? <TbEyeOff size={20} /> : <TbEye size={20} />}
              </button>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="w-4 h-4 cursor-pointer   text-green-500 border border-gray-100 rounded focus:ring-green-500 focus:ring-1"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="submit bg-amber-600 h-[50px] text-white py-2 mt-5 rounded w-full cursor-pointer flex items-center justify-center"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              )}
              {loading ? "Signing in..." : "Signin"}
            </button>
          </form>

          <p className="text-gray-400 text-center text-xl my-5">or</p>
          <div className="flex flex-col md:flex-row gap-3">
            {/* Google Button */}
            <button className="btn bg-white text-black border-[#e5e5e5] border h-10 flex items-center justify-center w-full">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              <span className="ml-2">Login with Google</span>
            </button>

            {/* Facebook Button */}
            <button className="btn bg-[#1A77F2] text-white border-[#005fd8] border h-10 flex items-center justify-center w-full">
              <svg
                aria-label="Facebook logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  fill="white"
                  d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
                ></path>
              </svg>
              <span className="ml-2">Login with Facebook</span>
            </button>
          </div>

          <p className="mt-5 text-center">
            <span className="text-gray-400 text-[16px]">
              New on our platform?
            </span>{" "}
            <NavLink
              to="/signup"
              className="text-amber-600 text-[16px] font-bold"
            >
              Create an account
            </NavLink>
          </p>
        </div>
        <div className="bg-form-2 absolute">
          <img src={Svg} alt="Bg" className="w-full" />
        </div>
      </motion.div>
    </>
  );
};

export default Login;
