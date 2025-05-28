import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; // <-- Import toastify
import "react-toastify/dist/ReactToastify.css"; // <-- Import styles
import CoatofArm from "../assets/images/coat-of-arm.png";
import BVNlogo from "../assets/images/BVN-logo.png";
import Avatar from "../assets/images/BVN-logo.png";

function BasicBVN() {
  const handlePrint = () => {
    toast.info("Printing BVN Slip...", { autoClose: 2000 }); // <-- Show toast
    // Set the document title before printing
    const prevTitle = document.title;
    document.title = "Basic BVN Slip";
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = prevTitle;
      }, 1000);
    }, 1200); // Delay to allow toast to show
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <ToastContainer /> {/* Toast container for notifications */}
      {/* Print button OUTSIDE the printable area */}
      <button
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-green-600 text-white flex justify-start rounded hover:bg-green-700 no-print"
      >
        Print BVN Slip
      </button>
      {/* Printable area */}
      <div className="bg-white   p-8 w-[850px] h-full print-slip">
        <header className="flex justify-center items-center gap-5">
          <img src={CoatofArm} alt="Coat of Arms" className="w-23 h-15" />
          <div>
            <p className="text-[18px] text-gray-600 font-bold">
              Federal Republic of Nigeria
            </p>
          </div>
          <img src={BVNlogo} alt="BVN logo" className="w-20 h-12" />
        </header>
        <h2 className="text-[18px] text-gray-600 font-bold text-center">
          Verified BVN Details
        </h2>
        <div className="flex justify-between items-baseline relative ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-start items-start mt-3 flex-1/2">
              <div className="grid gap-2">
                <div className="flex">
                  <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                    First Name:
                  </span>
                  <span className="text-gray-600 text-[11px]">John</span>
                </div>
                <div className="flex">
                  <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                    Middle Name:
                  </span>
                  <span className="text-gray-600 text-[11px]">Michael</span>
                </div>
                <div className="flex">
                  <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                    Last Name
                  </span>
                  <span className="text-gray-600 text-[11px]">Doe</span>
                </div>
                <div className="flex">
                  <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                    Date of Birth:
                  </span>
                  <span className="text-gray-600 text-[11px]">01/01/1990</span>
                </div>
                <div className="flex">
                  <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                    Gender:
                  </span>
                  <span className="text-gray-600 text-[11px]">Male</span>
                </div>
                <div className="">
                  <div className="flex items-start gap-2 mt-5">
                    <div className="grid gap-2">
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                          Marital Status:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          Single
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                          Phone Number:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          08012345678
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                          Enrollment Institution:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          Zenith Bank
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                          Origin State:
                        </span>
                        <span className="text-gray-600 text-[11px]">Lagos</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                          Residence State:
                        </span>
                        <span className="text-gray-600 text-[11px]">Abuja</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                          Residential Address:
                        </span>
                        <span className="text-gray-600 text-[11px] w-10">
                          BEHIND LIVING FAITHCHURCH,NEWLAYOUT,KISSAGYHIP
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                          NIN:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          85639354692
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                          Enrollment Branch:
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          Zenith Bank HQ
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                          Origin LGA:
                        </span>
                        <span className="text-gray-600 text-[11px]">Ikeja</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-[80px] inline-block text-[11px]">
                          Residence LGA:
                        </span>
                        <span className="text-gray-600 text-[11px]">Garki</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* You can add a placeholder image or remove this block */}
              <div className="max-w-[400px] w-[145px] flex flex-col items-center mx-auto">
                <img
                  src={Avatar}
                  alt="Profile"
                  className="w-[80px] h-[100px] object-cover avatar"
                />
                <p className="text-center text-[10px] text-gray-700 font-semibold ">
                  BVN
                </p>
                <p className="text-center text-[16px] mt-1 text-gray-700 font-semibold">
                  222 50 586 879
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer section */}
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
                This BVN slip remains the property of the Federal Republic of
                Nigeria, and MUST be surrendered on demand;
              </li>
              <li className="ml-4 mb-2">
                This BVN slip does not imply nor confer citizenship of the
                Federal Republic of Nigeria on the individual the document is
                issued to;
              </li>
              <li className="ml-4 mb-2">
                This BVN slip is valid for the lifetime of the holder and{" "}
                <span className="text-red-500 font-bold">DOES NOT EXPIRE</span>.
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Print styles */}
      <style>
        {`
          @media print {
            @page {
              size: 850px 530px; /* width height */
              margin: 0;
            }
            body * {
              visibility: hidden !important;
            }
            .print-slip, .print-slip * {
              visibility: visible !important;
            }
            .print-slip {
              position: absolute !important;
              left: 0;
              top: 0;
              width: 850px !important;
              height: 530px !important;
              margin: 0 !important;
              box-shadow: none !important;
              background: white !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              overflow: hidden !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default BasicBVN;
