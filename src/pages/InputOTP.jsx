import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputOTP = ({ onSubmit }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [invalid, setInvalid] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[idx] = value[0];
    setOtp(newOtp);
    setInvalid(false);

    // Move to next input
    if (idx < 5 && value) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        // Clear current
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        // Move to previous
        inputsRef.current[idx - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (paste.length === 6) {
      setOtp(paste.split("").slice(0, 6));
      inputsRef.current[5].focus();
      setInvalid(false);
    }
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join("").length !== 6) {
      setInvalid(true);
      toast.error("Please fill all 6 digits of the OTP.");
      return;
    }
    // Simulate OTP check (replace with real API call if needed)
    const correctOtp = "123456"; // Replace with your logic
    if (otp.join("") === correctOtp) {
      toast.success("OTP verified! Redirecting...");
      setTimeout(() => {
        navigate("/resetpassword");
      }, 1200);
    } else {
      setInvalid(true);
      toast.error("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-2 text-amber-700">Enter OTP</h2>
        <p className="mb-6 text-gray-600 text-center">
          Please enter the 6-digit code sent to your email.
        </p>
        <div className="flex gap-2 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`w-12 h-12 text-center border rounded text-xl focus:outline-none transition
                ${
                  invalid && otp[idx] === ""
                    ? "border-red-500"
                    : "border-gray-300"
                }
                focus:border-amber-500`}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              autoFocus={idx === 0}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded transition w-full"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default InputOTP;
