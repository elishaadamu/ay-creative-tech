import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import "./assets/css/style.css";
import Logo from "../assets/images/logo-ay.png";

import RoutesConfig from "./Components/RoutesConfig";

const ONE_HOUR = 60 * 60 * 1000; // 3 600 000 ms

function UserDashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // <-- Add this line
  const [showModal, setShowModal] = useState(false); //

  const isLoggedIn = !!localStorage.getItem("authToken");

  useEffect(() => {
    if (!isLoggedIn) return;

    const lastShown = Number(localStorage.getItem("modalLastShown") || 0);
    const now = Date.now();

    if (now - lastShown > ONE_HOUR) {
      setShowModal(true);
      localStorage.setItem("modalLastShown", now);
    }
  }, [isLoggedIn]);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("modalLastShown", Date.now());
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-100 text-gray-800 dark:text-gray-900">
      {/* ───── Modal ───── */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={Logo} alt="Logo" className="logo" />
            <h2>Welcome to AY Creative Technologies</h2>
            <p>
              <strong>Note:</strong> Money deposited cannot be withdrawn back to
              your bank account. You can only use it for another service in case
              your work fails.
            </p>
            <button onClick={handleCloseModal}>Got it</button>
          </div>
        </div>
      )}

      {/* ───── Rest of layout ───── */}
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
            /* …close icon… */
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            /* …hamburger icon… */
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        {/* Main Content */}
        <div
          className={`
            flex-1 transition-all duration-300
            ${collapsed ? "md:ml-[-140px]" : "md:ml-10"}
          `}
        >
          <RoutesConfig />
        </div>
      </div>
    </div>
  );
}

export default UserDashBoard;
