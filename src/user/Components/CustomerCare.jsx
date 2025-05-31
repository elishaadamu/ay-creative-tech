import React, { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

function CustomerCare() {
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const whatsappStyles = {
    button: `fixed bottom-6 right-6 bg-green-500 text-white  p-4 rounded-full shadow-lg 
             hover:bg-green-600 transition-all duration-300 z-50 animate-bounce-slow`,
    modal: `fixed bottom-20 right-6 bg-white rounded-lg shadow-xl p-6 
           max-w-sm z-50 transition-all duration-300 transform mb-5
           ${
             showWhatsAppModal
               ? "opacity-100 scale-100"
               : "opacity-0 scale-95 pointer-events-none"
           }`,
  };

  const toggleWhatsAppModal = () => {
    setShowWhatsAppModal(!showWhatsAppModal);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={toggleWhatsAppModal}
        className={whatsappStyles.button}
        aria-label="Contact us on WhatsApp"
      >
        {showWhatsAppModal ? (
          <IoMdClose className="text-2xl" />
        ) : (
          <BsWhatsapp className="text-2xl" />
        )}
      </button>

      {/* WhatsApp Modal */}
      <div className={whatsappStyles.modal}>
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
          <p className="text-gray-600">Need help? Chat with us on WhatsApp!</p>
          <a
            href="https://wa.me/+2347067206984" // Replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            <BsWhatsapp className="text-xl" />
            <span>Chat Now</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default CustomerCare;
