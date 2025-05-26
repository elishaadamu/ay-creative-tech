import CryptoJS from "crypto-js";

// Access the storage key from environment variables
const SECRET_KEY = import.meta.env.VITE_STORAGE_KEY;

// Validate that the key exists
if (!SECRET_KEY) {
  throw new Error(
    "Storage encryption key is not defined in environment variables"
  );
}

// Add debugging
export const secureStorage = {
  set(key, data) {
    try {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        SECRET_KEY
      ).toString();
      localStorage.setItem(key, encryptedData);
      console.log("Data saved:", key, data); // Debug log
    } catch (error) {
      console.error("Error storing data:", error);
    }
  },

  get(key) {
    try {
      const encryptedData = localStorage.getItem(key);
      if (!encryptedData) {
        console.log("No data found for key:", key); // Debug log
        return null;
      }

      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log("Data retrieved:", key, decryptedData); // Debug log
      return decryptedData;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
