import * as React from "react";
import axios from "axios";
import { config } from "../../config/config.jsx";
import CryptoJS from "crypto-js";
import { format } from "date-fns"; // Add this import for date formatting
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";

// Add your secret key for decryption
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

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

export default function VerificationsHistoryTable() {
  // Get encrypted user data from localStorage
  const encryptedUser = localStorage.getItem("user");
  const user = decryptData(encryptedUser);
  const userId = user?._id || user?.id;

  // Log the user ID
  console.log("User ID:", userId);

  // Set the API link using the userId
  const apiLink = `${config.apiBaseUrl}${config.endpoints.VerificationHistory}${userId}`;
  console.log("API Link:", apiLink);

  const [loading, setLoading] = React.useState(false);
  const [apiData, setApiData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [sortConfig, setSortConfig] = React.useState({
    key: "createdAt",
    direction: "desc",
  });

  const fetchVerificationHistory = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await axios.get(apiLink, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Log full transaction array
      console.log("All Transactions:", response.data.transactions);
      setApiData(response.data.transactions || []);
    } catch (error) {
      console.error("Error fetching verification history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter transactions based on search term
  const filteredTransactions = apiData.filter((transaction) => {
    const searchStr = searchTerm.toLowerCase();
    const transactionDate = new Date(transaction.createdAt);

    // Date filter
    const passesDateFilter =
      (!startDate || transactionDate >= startDate) &&
      (!endDate || transactionDate <= endDate);

    // Text search filter
    const passesSearchFilter =
      transaction.accountNumber?.toLowerCase().includes(searchStr) ||
      transaction.transactionReference?.toLowerCase().includes(searchStr) ||
      transaction.type?.toLowerCase().includes(searchStr) ||
      transaction.status?.toLowerCase().includes(searchStr) ||
      transaction.description?.toLowerCase().includes(searchStr);

    return passesDateFilter && passesSearchFilter;
  });

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (sortConfig.key === "createdAt") {
        const dateA = new Date(a[sortConfig.key]);
        const dateB = new Date(b[sortConfig.key]);
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  // Create a reusable header component
  const TableHeader = ({ label, sortKey, className }) => {
    const isSorted = sortConfig.key === sortKey;
    const icon = isSorted ? (
      sortConfig.direction === "asc" ? (
        <ArrowUpIcon className="w-4 h-4 text-blue-600" />
      ) : (
        <ArrowDownIcon className="w-4 h-4 text-blue-600" />
      )
    ) : (
      <ArrowsUpDownIcon className="w-4 h-4 text-gray-400" />
    );

    return (
      <th
        scope="col"
        className={`${className} cursor-pointer hover:bg-gray-50`}
        onClick={() => sortKey && sortData(sortKey)}
      >
        <div className="flex items-center justify-between">
          <span>{label}</span>
          <span className="ml-2">{icon}</span>
        </div>
      </th>
    );
  };

  React.useEffect(() => {
    fetchVerificationHistory();
  }, [userId]);

  const sortedTransactions = getSortedData(filteredTransactions);

  return (
    <div className="p-4 max-w-[70%] md:max-w-full">
      <h2 className="text-2xl font-bold mb-4">Verifications History</h2>

      {/* Search and Date Filter Controls */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search transactions..."
          className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          dateFormat="dd/MM/yyyy"
          isClearable
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          dateFormat="dd/MM/yyyy"
          isClearable
        />
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && sortedTransactions.length > 0 ? (
        <div className="relative overflow-hidden rounded-lg border border-gray-200 shadow">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader
                    label="Date"
                    sortKey="createdAt"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  />
                  <TableHeader
                    label="Reference"
                    sortKey="transactionReference"
                    className="hidden md:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  />
                  <TableHeader
                    label="Type"
                    sortKey="type"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  />
                  <TableHeader
                    label="Amount"
                    sortKey="amount"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  />
                  <TableHeader
                    label="Status"
                    sortKey="status"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTransactions.map((transaction, index) => (
                  <tr
                    key={transaction._id || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {format(
                        new Date(transaction.createdAt),
                        "dd/MM/yy HH:mm"
                      )}
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      <span className="text-xs">
                        {transaction.transactionReference}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          transaction.type === "credit"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      ₦{transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          transaction.status === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No transactions found</p>
      )}
    </div>
  );
}
