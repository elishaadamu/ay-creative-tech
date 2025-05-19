import React, { useState, useRef, useEffect } from "react";
import { CiWallet } from "react-icons/ci";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaCube } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NIMC from "../assets/images/nimc.png";
import NIBSS from "../assets/images/nibss.png";
import CAC from "../assets/images/cac.png";
import Airtime from "../assets/images/airtime.png";
import Bank from "../assets/images/bank.webp";

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // navItems.js
  const navItems = [
    {
      id: 1,
      name: "NIN VERIFY",
      icon: NIMC,
      to: "/nin-verify",
    },
    {
      id: 2,
      name: "NIN WITH PHONE",
      icon: NIMC,
      to: "/bvn-verify",
    },
    {
      id: 3,
      name: "IPE CLEARANCE",
      icon: NIMC,
      to: "/tin-verify",
    },
    {
      id: 4,
      name: "MODIFICATION",
      icon: NIMC,
      to: "/pvc-verify",
    },
    {
      id: 5,
      name: "PERSONALIZATION",
      icon: NIMC,
      to: "/passport",
    },
    {
      id: 6,
      name: "DEMOGRAPHIC SEARCH",
      icon: NIMC,
      to: "/drivers-license",
    },
    {
      id: 7,
      name: "VALIDATION",
      icon: NIMC,
      to: "/voter",
    },
    {
      id: 8,
      name: "ENROLLMENT",
      icon: NIMC,
      to: "/cac",
    },
    {
      id: 9,
      name: "BVN VERIFY",
      icon: NIBSS,
      to: "/nimc-print",
    },
    {
      id: 10,
      name: "AIRTIME SUBSCRIPTION",
      icon: Airtime,
      to: "/birth-cert",
    },
    {
      id: 11,
      name: "CAC REGISTRATION",
      icon: CAC,
      to: "/court-doc",
    },
    {
      id: 12,
      name: "BVN LICENCES",
      icon: NIBSS,
      to: "/police-report",
    },
    {
      id: 13,
      name: "BANK AGENCY",
      icon: Bank,
      to: "/verification",
    },
  ];

  return (
    <div className="max-w-[1500px] mx-auto">
      <div className="mb-10 text-2xl text-gray-500 font-bold">
        Welcome to AY Creative Technologies, User
      </div>
      <div className="flex justify-center max-w-full flex-col md:flex-row  gap-10">
        <div className="flex-1/2 rounded-lg hover:shadow-lg shadow-md ring-2 ring-amber-50/2 w-full p-7">
          <p className="text-gray-500 text-[16px] font-light">Wallet Balance</p>
          <p className="text-gray-600 text-[30px] mb-10 font-bold font-sans">
            ₦0.00
          </p>
          <p className="w-[140px] h-[40px] text-black bg-amber-400 cursor-pointer hover:bg-amber-500 max-w-full rounded-lg p-2 ">
            <span className="flex flex-row items-center gap-2">
              <CiWallet className="text-2xl font-bold" />
              <span>Add Money</span>
            </span>
          </p>
        </div>
        <div className="flex-1/2 rounded shadow-md hover:shadow-lg ring-2 ring-amber-50/2  w-full p-10">
          <div className="flex justify-between items-center relative">
            <FaCube className="text-5xl" />
            <div className="relative" ref={dropdownRef}>
              <FaEllipsisVertical
                className="cursor-pointer hover:bg-gray-200 hover:rounded-full h-full"
                onClick={() => setDropdownOpen((open) => !open)}
              />
              {dropdownOpen && (
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 mt-[30px] bg-gray-50 shadow-lg rounded-md py-2 px-4 z-50 min-w-[120px]">
                  <NavLink
                    to="/verifications/history"
                    className="block text-gray-700 hover:text-amber-600 py-1"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View More
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-500 text-[16px] mt-8 font-normal ">
            Verifications History
          </p>
          <p className="text-gray-500 text-[24px] mt-2 font-bold ">0</p>
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full p-4">
        {navItems.map((item) => (
          <NavLink
            to={item.to}
            key={item.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center text-center"
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-16 h-16 object-contain mb-3"
            />
            <span className="font-semibold text-gray-400">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
