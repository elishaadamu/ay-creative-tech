import React, { useState } from "react";
import BasicImg from "../assets/images/information.png";
import RegularImg from "../assets/images/regular.png";
import StandardImg from "../assets/images/standard.png";
import PremiumImg from "../assets/images/premium.png";
import { MdOutlineSendToMobile } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Add this import
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { config } from "../../config/config.jsx";

function NIN() {
  const navigate = useNavigate();

  /* ---------------------------------- data --------------------------------- */
  const cardVerify = [
    { label: "NIN", value: "nin" },
    { label: "VNIN", value: "vnin" },
    { label: "DOC", value: "doc" },
  ];

  const cardSlip = [
    { label: "Information Slip", value: "Basic", image: BasicImg, price: 200 },
    { label: "Regular Slip", value: "Regular", image: RegularImg, price: 200 },
    {
      label: "Standard Slip",
      value: "Standard",
      image: StandardImg,
      price: 200,
    },
    { label: "Premium Slip", value: "Premium", image: PremiumImg, price: 300 },
  ];

  /* ---------------------------- component state ---------------------------- */
  const [selectedVerify, setSelectedVerify] = useState(""); // unselected by default
  const [selectedSlip, setSelectedSlip] = useState(""); // unselected by default
  const [formData, setFormData] = useState({
    nin: "",
  });
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  /* --------------------------------- render -------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVerify || !selectedSlip) {
      toast.error("Please select both verification type and slip layout");
      return;
    }

    // Find the selected slip's price
    const selectedSlipObj = cardSlip.find((s) => s.value === selectedSlip);
    const slipAmount = selectedSlipObj ? selectedSlipObj.price : 0;

    setLoading(true);
    const payload = {
      verifyWith: selectedVerify,
      slipLayout: selectedSlip,
      nin: formData.nin,
      amount: slipAmount,
    };
    console.log("Sending payload:", payload);

    try {
      const response = await axios.post(
        `${config.apiBaseUrl}${config.endpoints.NINVerify}`,
        payload,
        {
          withCredentials: true,
        }
      );

      setVerificationResult(response.data);
      toast.success("NIN verified successfully!");
      navigate("/dashboard/verifications/ninslip", {
        state: { userData: response.data.result.nin_data },
      });
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full rounded-2xl mb-10 bg-white p-5 shadow-lg">
      <p className="text-[18px] text-gray-500">NIN Verification</p>
      <form onSubmit={handleSubmit}>
        {/* ------------------------------- Step #1 ------------------------------- */}
        <p className="mt-7 text-[14px] text-gray-500">1. Verify With</p>
        <hr className="my-5 border-gray-200" />

        <div className="grid gap-6 p-4 sm:grid-cols-2 md:grid-cols-3">
          {cardVerify.map(({ label, value }) => (
            <label
              key={value}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-6 text-center transition
            ${
              selectedVerify === value
                ? "border-amber-400 ring-2 ring-amber-300 shadow-lg"
                : "border-gray-200 shadow-md hover:shadow-lg"
            }`}
            >
              <input
                type="radio"
                name="verifyWith"
                value={value}
                checked={selectedVerify === value}
                onChange={() => setSelectedVerify(value)}
                className="hidden"
                required
              />

              <h3 className="mb-4 text-lg font-semibold text-gray-600">
                {label}
              </h3>

              {/* visual radio indicator */}
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selectedVerify === value
                    ? "border-amber-400"
                    : "border-gray-300"
                }`}
              >
                {selectedVerify === value && (
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                )}
              </span>
            </label>
          ))}
        </div>

        {/* ------------------------------- Step #2 ------------------------------- */}
        <p className="mt-7 text-[14px] text-gray-500">2. Slip Layout</p>
        <hr className="my-5 border-gray-200" />

        <div className="grid gap-6 p-4 sm:grid-cols-2 md:grid-cols-3">
          {cardSlip.map(({ label, value, image, price }) => (
            <label
              key={value}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-6 text-center transition
            ${
              selectedSlip === value
                ? "border-amber-400 ring-2 ring-amber-300 shadow-lg"
                : "border-gray-200 shadow-md hover:shadow-lg"
            }`}
            >
              <input
                type="radio"
                name="slipLayout"
                value={value}
                checked={selectedSlip === value}
                onChange={() => setSelectedSlip(value)}
                className="hidden"
                required
              />

              {/* price */}
              <p className="mb-4 text-3xl font-bold tracking-wide text-slate-700">
                ₦{price}.00
              </p>

              {/* preview image */}
              <img
                src={image}
                alt={label}
                loading="lazy"
                className="mb-4 h-24 w-full object-contain"
              />

              {/* label */}
              <h4 className="mb-4 text-base font-semibold text-gray-600">
                {label}
              </h4>

              {/* visual radio indicator */}
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selectedSlip === value
                    ? "border-amber-400"
                    : "border-gray-300"
                }`}
              >
                {selectedSlip === value && (
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                )}
              </span>
            </label>
          ))}
        </div>
        {/* ------------------------------- Step #3 ------------------------------- */}
        <div>
          <p className="mt-7 text-[14px] text-gray-500">3. Supply ID Number</p>
          <hr className="my-7 border-gray-200" />
          <input
            type="text"
            className="pl-5 py-2 border border-gray-200 focus:border-gray-200 rounded w-full h-[50px]"
            placeholder="NIN NUMBER"
            required
            name="nin"
            value={formData.nin}
            onChange={handleInputChange}
            inputMode="numeric" // Fixed from inputmode
            maxLength="11" // Fixed from maxlength
            pattern="\d{11}"
            title="NIN must be exactly 11 digits"
          />

          <p className="text-gray-400 text-[12px] mt-2 ">
            We'll never share your details with anyone else.
          </p>
          <label className="flex items-start mt-8 space-x-3 cursor-pointer">
            <span className="relative">
              <input
                type="checkbox"
                className="peer shrink-0 appearance-none h-5 w-5 border border-gray-400 rounded-sm bg-white checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                required
                title="Required"
              />
              <svg
                className="absolute w-4 h-4 text-white left-0.5 top-0.5 pointer-events-none hidden peer-checked:block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.586l7.879-7.879a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              By checking this box, you agree that the owner of the ID has
              granted you consent to verify his/her identity.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center text-xl mt-10 mb-8 cursor-pointer justify-center gap-2 ${
              loading ? "bg-gray-400" : "bg-amber-500 hover:bg-amber-600"
            } text-white font-medium py-2 px-4 rounded-xl w-full h-[50px] transition-colors`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <MdOutlineSendToMobile className="" />
            )}
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default NIN;
