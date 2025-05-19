import React, { useState } from "react";
import BasicImg from "../assets/images/information.png";
import RegularImg from "../assets/images/regular.png";
import StandardImg from "../assets/images/standard.png";
import PremiumImg from "../assets/images/premium.png";

function NIN() {
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
  const [selectedVerify, setSelectedVerify] = useState("nin");
  const [selectedSlip, setSelectedSlip] = useState(cardSlip[0].value); // default to the first option

  /* --------------------------------- render -------------------------------- */
  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-lg">
      <p className="text-[18px] text-gray-500">NIN Verification</p>

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
                selectedSlip === value ? "border-amber-400" : "border-gray-300"
              }`}
            >
              {selectedSlip === value && (
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
              )}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default NIN;
