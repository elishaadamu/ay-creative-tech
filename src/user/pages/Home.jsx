import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { CiWallet } from "react-icons/ci";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaCube } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import NIMC from "../assets/images/nimc.png";
import NIBSS from "../assets/images/nibss.png";
import CAC from "../assets/images/cac.png";
import Airtime from "../assets/images/airtime.png";
import Bank from "../assets/images/bank.webp";
import Data from "../assets/images/data.png";
import { IoClose } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa"; // <-- Add this import
import "../assets/css/style.css";
import Logo from "../assets/images/logo-ay.png";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config/config.jsx";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

function decryptData(ciphertext) {
  if (!ciphertext) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
}

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // <-- add this
  const toggleModal = () => setIsOpen((open) => !open); // <-- and this

  const [creatingAccount, setCreatingAccount] = useState(false);
  const [account, setAccount] = useState(null);
  const [loadingAccount, setLoadingAccount] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const user = decryptData(localStorage.getItem("user"));
  const firstName = user?.firstName || "User";
  const userId = user?._id || user?.id;

  // Detect if user is new or returning
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    // Check localStorage for a flag
    const hasVisited = localStorage.getItem("hasVisitedAYCreative");
    if (hasVisited) {
      setIsReturning(true);
    } else {
      setIsReturning(false);
      localStorage.setItem("hasVisitedAYCreative", "true");
    }
  }, []);

  // Fetch account info on mount
  useEffect(() => {
    const fetchAccount = async () => {
      setLoadingAccount(true);
      try {
        const res = await axios.get(
          `${config.apiBaseUrl}/virtualAccount/${userId}`
        );
        setAccount(res.data); // <-- use res.data, not res.data.account
      } catch (err) {
        setAccount(null);
        console.error("Fetch account error:", err, err.response?.data);
      }
      setLoadingAccount(false);
    };
    if (userId) {
      fetchAccount();
    }
  }, [userId]);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCreateAccount = async () => {
    setCreatingAccount(true);
    try {
      const res = await axios.post(
        `${config.apiBaseUrl}/virtualAccount/create/${userId}`
      );
      console.log("Create account response:", res.data);

      const accountRes = await axios.get(
        `${config.apiBaseUrl}/virtualAccount/${userId}`
      );
      setAccount(accountRes.data);

      localStorage.setItem(
        "user",
        encryptData({ ...user, account: accountRes.data })
      );

      // SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your virtual account has been created successfully. You can now fund your wallet.",
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Create account error:", err, err.response?.data);
      alert(
        err.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    }
    setCreatingAccount(false);
  };

  // Add this function inside Dashboard component
  const refreshAccount = async () => {
    setLoadingAccount(true);
    try {
      const res = await axios.get(
        `${config.apiBaseUrl}/virtualAccount/${userId}`
      );
      setAccount(res.data);
    } catch (err) {
      setAccount(null);
      console.error("Fetch account error:", err, err.response?.data);
    }
    setLoadingAccount(false);
  };

  // navItems.js
  const navItems = [
    {
      id: 1,
      name: "NIN VERIFY",
      icon: NIMC,
      to: "/dashboard/verifications/nin",
    },
    {
      id: 2,
      name: "NIN WITH PHONE",
      icon: NIMC,
      to: "/dashboard/verifications/pvn",
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
      to: "/dashboard/enrollment",
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
      name: "DATA SUBSCRIPTION",
      icon: Data,
      to: "/data",
    },
    {
      id: 12,
      name: "CAC REGISTRATION",
      icon: CAC,
      to: "/court-doc",
    },
    {
      id: 13,
      name: "BVN LICENCES",
      icon: NIBSS,
      to: "/police-report",
    },
    {
      id: 14,
      name: "BANK AGENCY",
      icon: Bank,
      to: "/verification",
    },
  ];

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => setModalVisible(true), 10); // allow for transition
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setIsOpen(false), 300); // match transition duration
  };

  return (
    <div className="max-w-[1500px] mx-auto">
      <div className="mb-10 text-2xl text-gray-500 font-bold">
        {isReturning
          ? `Welcome back, ${firstName} 🙂`
          : `Welcome to AY Creative Technologies, ${firstName} 👋`}
      </div>
      <div className="flex justify-center  max-w-full flex-col md:flex-row  gap-10">
        <div className="flex-1/2 rounded-lg bg-white hover:shadow-lg shadow-md ring-2 ring-amber-50/2 w-full p-7">
          {loadingAccount ? (
            <div className="flex items-center justify-center h-[100px]">
              <span className="text-gray-400">Loading...</span>
            </div>
          ) : account ? (
            <>
              <p className="text-gray-500 text-[16px] font-light">
                Wallet Balance
              </p>
              <p className="text-gray-600 text-[30px] mb-10 font-bold font-sans">
                ₦{account.balance || "0.00"}
              </p>
              <p
                onClick={openModal}
                className="w-[140px] h-[40px] text-black bg-amber-400 cursor-pointer hover:bg-amber-500 max-w-full rounded-lg p-2"
                style={{ marginTop: "16px" }}
              >
                <span className="flex flex-row items-center gap-2">
                  <CiWallet className="text-2xl font-bold" />
                  <span>Add Money</span>
                </span>
              </p>
            </>
          ) : (
            <>
              <p className="mb-4 text-gray-500 text-[15px]">
                To use your wallet, you need to create a virtual account. Click
                the button below to get started! 🚀
              </p>
              <button
                className="w-[140px] h-[40px] text-black bg-amber-400 cursor-pointer hover:bg-amber-500 max-w-full rounded-lg p-2 flex items-center justify-center"
                onClick={handleCreateAccount}
                disabled={creatingAccount}
              >
                {creatingAccount ? "Creating..." : "Create Account"}
              </button>
            </>
          )}

          {/* Modal */}
          {isOpen && (
            <div
              className={`fixed inset-0 z-50 flex justify-center items-center bg-black/30 transition-opacity duration-300 ${
                modalVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`bg-white rounded-xl w-[450px] h-[450px] max-w-full text-center relative shadow-xl transform transition-all duration-300 ${
                  modalVisible ? "scale-100" : "scale-90"
                } flex flex-col justify-center items-center mx-auto`}
              >
                {/* Close Button */}
                <button
                  className="absolute top-[-10px] right-[-15px] cursor-pointer bg-gray-200 rounded p-1 text-gray-500 hover:text-black"
                  onClick={closeModal}
                >
                  <IoClose size={24} />
                </button>

                {/* Modal Content */}
                <h2 className="text-2xl font-bold text-gray-500 mb-1">
                  Fund Your Wallet
                </h2>
                <p className="text-md my-4 text-gray-500">
                  Send money to your AY Creative Technologies Account
                </p>

                <div className="flex justify-center mt-5 mb-10">
                  <img src={Logo} alt="Wallet Icon" className="w-[200px]" />
                </div>

                {account ? (
                  <>
                    <p className="font-semibold text-gray-500">
                      Datapin-{account.accountName}
                    </p>
                    <p className="text-xl text-gray-500">{account.bankName}</p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <p className="text-xl text-gray-500 font-bold mb-0">
                        {account.accountNumber}
                      </p>
                      <button
                        className="ml-2 text-gray-500 hover:text-amber-500"
                        onClick={() => {
                          navigator.clipboard.writeText(account.accountNumber);
                          toast.success("Copied!", {
                            position: "top-center",
                            autoClose: 1200,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            style: { fontSize: "15px" },
                          });
                        }}
                        title="Copy account number"
                      >
                        <FaRegCopy size={20} />
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-red-500">No account details available.</p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1/2 rounded bg-white shadow-md hover:shadow-lg ring-2 ring-amber-50/2  w-full p-5">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full py-4">
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
            <span className="font-semibold text-[14px] text-gray-400">
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
      {/* <pre>{JSON.stringify(account, null, 2)}</pre> */}
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
