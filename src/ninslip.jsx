import React, { useRef } from "react";

function NINSlip() {
  const slipRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 no-print"
      >
        Print NIN Slip
      </button>

      {/* Printable area */}
      <div
        ref={slipRef}
        className="bg-white shadow-md rounded-lg p-8 w-[850px] h-full print-slip"
      >
        <header className="flex justify-center items-center gap-5">
          <div>
            <p className="text-[18px] text-gray-600 font-bold">
              Federal Republic of Nigeria
            </p>
          </div>
        </header>
        <h2 className="text-[18px] text-gray-600 font-bold text-center">
          Verified NIN Details
        </h2>
        <div className="flex-1/2 ">
          <h4 className="text-green-600 text-[18px] text-center">Verified</h4>
          <p className="text-[10px] text-gray-600  text-center">
            This is a property of National Identity Management Commission
            (NIMC), Nigeria.
          </p>
          <p className="text-[10px] text-gray-600  text-center">
            If found, please return to the nearest NIMC's office or contact +234
            815 769 1214, +234 815 769 1071
          </p>
          <ul className="list-decimal font-semibold text-[10px] text-gray-600  mt-2 ">
            <li className="ml-4 mb-2">
              This NIN slip remains the property of the Federal Republic of
              Nigeria, and MUST be surrendered on demand;
            </li>
            <li className="ml-4 mb-2">
              This NIN slip does not imply nor confer citizenship of the Federal
              Republic of Nigeria on the individual the document is issued to;
            </li>
            <li className="ml-4 mb-2">
              This NIN slip is valid for the lifetime of the holder and{" "}
              <span className="text-red-500 font-bold">DOES NOT EXPIRE</span>.
            </li>
          </ul>
        </div>
      </div>
      {/* Print styles */}
      <style>
        {`
          @media print {
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
              width: 100vw !important;
              margin: 0 !important;
              box-shadow: none !important;
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

export default NINSlip;
