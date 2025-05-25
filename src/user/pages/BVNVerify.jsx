import React, { useState } from "react";
import { VscUnverified } from "react-icons/vsc";
import { MdOutlineSendToMobile } from "react-icons/md";

function NIN() {
  /* ---------------------------------- data --------------------------------- */
  const cardVerify = [
    { label: "BANK VERIFICATION NUMBER", value: "BANK VERIFICATION NUMBER" },
  ];

  const cardSlip = [
    { label: "Basic Details", value: "Basic", price: 200 },
    { label: "Advanced Details", value: "Advanced", price: 200 },
  ];

  /* ---------------------------- component state ---------------------------- */
  const [selectedVerify, setSelectedVerify] = useState(""); // unselected by default
  const [selectedSlip, setSelectedSlip] = useState(""); // unselected by default

  /* --------------------------------- render -------------------------------- */
  return (
    <div className="w-full rounded-2xl mb-10 bg-white p-5 shadow-lg">
      <p className="text-[18px] text-gray-500">BVN Verification</p>
      <form action="#" method="post">
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

              <h3 className="mb-4 text-sm font-semibold text-gray-600">
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
        <p className="mt-7 text-[14px] text-gray-500">2. Details Needed</p>
        <hr className="my-5 border-gray-200" />

        <div className="grid gap-6 p-4 sm:grid-cols-2 md:grid-cols-3">
          {cardSlip.map(({ label, value, price }) => (
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
          <p className="mt-7 text-[14px] text-gray-500">3. Supply BVN Number</p>
          <hr className="my-4 border-gray-200" />
          <div className="flex flex-row justify-start gap-3 items-center my-5">
            <p className="bg-purple-700 p-2 rounded-full text-white">
              <VscUnverified className="text-3xl" />
            </p>
            <div>
              <p className="text-gray-500 text-[16px] mb-1 ">For a watch</p>
              <p className="text-gray-500 text-[16px]">
                Dail *565*0# from your registered phone number to get your BVN!
              </p>
            </div>
          </div>
          <input
            type="text"
            class="pl-5 py-2 border border-gray-200 focus:border-gray-200 rounded w-full h-[50px]"
            placeholder="BVN NUMBER"
            required
            name="NIN"
            id="number"
            inputmode="numeric"
            pattern="\d{11}"
            maxlength="11"
            title="NIN must be exactly 11 digits"
          />

          <p className="text-gray-400 text-[12px] mt-2 ">
            We'll never share your details with anyone else.
          </p>
          <label class="flex items-center mt-8 space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox validator"
              required
              title="Required"
            />
            <span class="text-sm text-gray-400">
              By checking this box, you agreed that the owner of the ID has
              granted you consent to verify his/her identity.
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="flex items-center text-xl mt-10 mb-8 cursor-pointer justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-xl w-full h-[50px] transition-colors"
        >
          <MdOutlineSendToMobile className="" />
          Verify
        </button>
      </form>
    </div>
  );
}

export default NIN;
