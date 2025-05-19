import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo-ay.png";
import {
  FiHome,
  FiPhone,
  FiKey,
  FiLogOut,
  FiSettings,
  FiFileText,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  FaFlag,
  FaBuilding,
  FaCar,
  FaIdBadge,
  FaLeaf,
  FaSimCard,
} from "react-icons/fa";
import { RiPassportFill } from "react-icons/ri";
import { MdHistory } from "react-icons/md";

const sidebarSections = [
  {
    section: "",
    links: [
      {
        to: "/dashboard/home",
        icon: <FiHome className="w-5 h-5" />,
        label: "Dashboard",
      },
    ],
  },
  {
    section: "VERIFICATIONS",
    links: [
      {
        to: "/dashboard/verifications/nin",
        icon: <FaFlag className="w-5 h-5" />,
        label: "NIN Verification",
      },
      {
        to: "/dashboard/verifications/pvn",
        icon: <FiPhone className="w-5 h-5" />,
        label: "NIN With Phone",
      },
      {
        to: "/verifications/bvn",
        icon: <FaSimCard className="w-5 h-5" />,
        label: "BVN Verification",
      },
      {
        to: "/verifications/cac",
        icon: <FaBuilding className="w-5 h-5" />,
        label: "CAC Verification",
      },
      {
        to: "/verifications/drivers-license",
        icon: <FaCar className="w-5 h-5" />,
        label: "Driving License",
      },
      {
        to: "/verifications/voters-card",
        icon: <FaIdBadge className="w-5 h-5" />,
        label: "Voters Card",
      },
      {
        to: "/verifications/passport",
        icon: <RiPassportFill className="w-5 h-5" />,
        label: "International Passport",
      },
    ],
  },
  {
    section: "SUMMARY AND HISTORY",
    links: [
      {
        to: "/transactions",
        icon: <FiFileText className="w-5 h-5" />,
        label: "Transactions History",
      },
      {
        to: "/verifications/history",
        icon: <MdHistory className="w-5 h-5" />,
        label: "Verifications History",
      },
    ],
  },
  {
    section: "DEVELOPER AND SECURITY",
    links: [
      {
        to: "/documentation",
        icon: <FiKey className="w-5 h-5" />,
        label: "Documentation",
      },
      {
        to: "/change-password",
        icon: <FiSettings className="w-5 h-5" />,
        label: "Change Password",
      },
      {
        to: "/logout",
        icon: <FiLogOut className="w-5 h-5 text-red-500" />,
        label: "Sign Out",
      },
    ],
  },
];

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <div
      className={`sidebar custom-scrollbar fixed flex flex-col top-0 left-0 h-full shadow-lg text-amber-300 bg-gray-900 z-30
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Collapse/Expand Button */}
      <button
        className="absolute cursor-pointer -right-3 top-6 z-40 hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        type="button"
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      <div className="flex items-center pl-[15px] h-20 border-b border-gray-700 transition-all duration-300">
        <img
          src={Logo}
          alt="Logo"
          className={`transition-all duration-300 ${
            collapsed ? "w-10" : "w-[150px]"
          } invert`}
        />
      </div>

      <div className="flex-1 overflow-y-auto mt-4">
        {sidebarSections.map((section, i) => (
          <div key={i} className="mb-6">
            {!collapsed && section.section && (
              <p className="px-6 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {section.section}
              </p>
            )}
            <div className="flex flex-col">
              {section.links.map((link, j) => (
                <NavLink
                  to={link.to}
                  key={j}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-2 text-sm font-medium border-l-4 transition-colors duration-200
                    ${collapsed ? "justify-center px-0" : ""}
                    ${
                      isActive
                        ? "border-amber-400 text-amber-300 bg-gray-800"
                        : "border-transparent text-gray-300 hover:text-amber-300 hover:bg-gray-800"
                    }`
                  }
                  title={collapsed ? link.label : undefined}
                >
                  {link.icon}
                  {!collapsed && <span className="ml-3">{link.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
