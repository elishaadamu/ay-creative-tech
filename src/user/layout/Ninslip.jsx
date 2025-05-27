import React from "react";
import { useLocation } from "react-router-dom";
import CoatofArm from "../assets/images/coat-of-arm.png";
import NIMC from "../assets/images/nimc-1.png";

function NINSlip() {
  const location = useLocation();
  const userData = location.state?.userData || {};
  console.log("User Data:", userData);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-[850px] h-full">
        <header className="flex justify-center items-center gap-5">
          <img src={CoatofArm} alt="Coat of Arms" className="w-23 h-15" />
          <div>
            <p className="text-[18px] text-gray-600 font-bold">
              Federal Republic of Nigeria
            </p>
          </div>
          <img src={NIMC} alt="NIMC logo" className="w-20 h-12" />
        </header>
        <h2 className="text-[18px] text-gray-600 font-bold text-center">
          Verified NIN Details
        </h2>
        <div className="flex justify-between items-baseline relative gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-start items-start mt-3 flex-1/2">
              <div className="grid gap-2">
                <div className="flex">
                  <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                    First Name:
                  </span>
                  <span className="text-gray-600 text-[11px]">
                    {userData.firstname}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                    Middle Name:
                  </span>
                  <span className="text-gray-600 text-[11px]">
                    {userData.middlename}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                    Surname:
                  </span>
                  <span className="text-gray-600 text-[11px]">
                    {userData.surname}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                    Date of Birth:
                  </span>
                  <span className="text-gray-600 text-[11px]">
                    {userData.birthdate}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                    Gender:
                  </span>
                  <span className="text-gray-600 text-[11px]">
                    {userData.gender === "m" ? "Male" : "Female"}
                  </span>
                </div>
                <div className="mt-2 mb-2">
                  <h1 className="text-[14px] text-gray-500">
                    NIN Number:{" "}
                    <span className="bg-green-400 text-white p-1 font-semibold">
                      {userData.nin}
                    </span>
                  </h1>
                  <div className="flex items-start gap-2 mt-3">
                    <div className="grid gap-2">
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                          Tracking ID:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          {userData.trackingId}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                          Residence State:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          {userData.residence_state}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                          Birth State:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          {userData.birthstate}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                          Address:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          {userData.residence_address}
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                          Phone Number:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          {userData.telephoneno}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                          Residence LGA:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          {userData.residence_lga}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[100px] inline-block text-[11px]">
                          Birth LGA:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          {userData.birthlga}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {userData.photo && (
                  <img
                    src={`data:image/jpeg;base64,${userData.photo}`}
                    alt="Profile"
                    className="w-[140px] h-[100px] object-cover rounded-full avatar mt-[20px]"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Keeping the original disclaimer section */}
          <div className="flex-1/2 ">
            <h4 className="text-green-600 text-[18px] text-center">Verified</h4>
            <p className="text-[10px] text-gray-600  text-center">
              This is a property of National Identity Management Commission
              (NIMC), Nigeria.
            </p>
            <p className="text-[10px] text-gray-600  text-center">
              If found, please return to the nearest NIMC's office or contact
              +234 815 769 1214, +234 815 769 1071
            </p>
            <ul className="list-decimal font-semibold text-[10px] text-gray-600  mt-2 ">
              <li className="ml-4 mb-2">
                This NIN slip remains the property of the Federal Republic of
                Nigeria, and MUST be surrendered on demand;
              </li>
              <li className="ml-4 mb-2">
                This NIN slip does not imply nor confer citizenship of the
                Federal Republic of Nigeria on the individual the document is
                issued to;
              </li>
              <li className="ml-4 mb-2">
                This NIN slip is valid for the lifetime of the holder and{" "}
                <span className="text-red-500 font-bold">DOES NOT EXPIRE</span>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NINSlip;
