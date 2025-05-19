import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import "./assets/css/style.css";
import Logo from "../assets/images/logo-ay.png";

function UserDashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-100 text-gray-800 dark:text-gray-900">
      {/* Toggle button for mobile */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <img
          src={Logo}
          alt="Logo"
          className="w-[120px] dark:invert-1 invert-0"
        />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700 dark:text-gray-200 focus:outline-none"
        >
          {sidebarOpen ? (
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 md:ml-64">
          <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </div>
  );
}

export default UserDashBoard;
