import * as React from "react";
import axios from "axios";
import { config } from "../../../config/config.jsx";
import CryptoJS from "crypto-js";
import { format } from "date-fns"; // Add this import for date formatting
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";
import { Empty, Modal } from "antd";
import { InboxOutlined, EyeOutlined } from "@ant-design/icons";

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

  // Set the API link using the userId
  const apiLink = `${config.apiBaseUrl}${config.endpoints.VerificationHistory}${userId}`;

  const [loading, setLoading] = React.useState(false);
  const [apiData, setApiData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [sortConfig, setSortConfig] = React.useState({
    key: "createdAt",
    direction: "desc",
  });
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);

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

      setApiData(response.data.transactions || []);
    } catch (error) {
      console.error("Error fetching verification history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter transactions based on search term and BVN verification type
  const filteredTransactions = apiData.filter((transaction) => {
    const searchStr = searchTerm.toLowerCase();
    const transactionDate = new Date(transaction.createdAt);

    // Only include BVN verification transactions
    const isBVNVerification =
      transaction.TransactionType === "BVN-Verification";

    // Date filter
    const passesDateFilter =
      (!startDate || transactionDate >= startDate) &&
      (!endDate || transactionDate <= endDate);

    // Text search filter
    const passesSearchFilter =
      transaction.accountNumber?.toLowerCase().includes(searchStr) ||
      transaction.transactionReference?.toLowerCase().includes(searchStr) ||
      transaction.status?.toLowerCase().includes(searchStr) ||
      transaction.description?.toLowerCase().includes(searchStr);

    return isBVNVerification && passesDateFilter && passesSearchFilter;
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
    <div className="p-4 w-full">
      <h2 className="text-[clamp(1.2rem,1.7vw,2rem)] font-bold mb-4 text-gray-500">
        BVN Verifications History
      </h2>

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

      {loading}

      {!loading && sortedTransactions.length > 0 ? (
        <div className="relative border border-gray-200 rounded-lg shadow">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <TableHeader
                      label="Date"
                      sortKey="createdAt"
                      className="w-[clamp(80px,15vw,112px)] px-2 py-2 text-left text-[clamp(0.65rem,1vw,0.75rem)] font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                    />
                    <TableHeader
                      label="Tracking ID"
                      sortKey="transactionReference"
                      className="  sm:table-cell w-[clamp(70px,12vw,96px)] px-2 py-2 text-left text-[clamp(0.65rem,1vw,0.75rem)] font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                    />
                    <TableHeader
                      label="Ticket ID"
                      sortKey="type"
                      className="w-[clamp(70px,12vw,96px)] px-2 py-2 text-left text-[clamp(0.65rem,1vw,0.75rem)] font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                    />

                    <TableHeader
                      label="Status"
                      sortKey="status"
                      className="w-[clamp(70px,12vw,96px)] px-2 py-2 text-left text-[clamp(0.65rem,1vw,0.75rem)] font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                    />
                    <TableHeader
                      label="Details"
                      className="w-[60px] px-2 py-2 text-left text-[clamp(0.65rem,1vw,0.75rem)] font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                    />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedTransactions.map((transaction, index) => (
                    <tr
                      key={transaction._id || index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="w-[clamp(80px,15vw,112px)] px-2 py-2 whitespace-nowrap text-[clamp(0.7rem,1.1vw,0.875rem)] text-gray-600">
                        {format(
                          new Date(transaction.createdAt),
                          "dd/MM/yy HH:mm"
                        )}
                      </td>
                      <td className=" sm:table-cell w-[clamp(120px,20vw,160px)] px-2 py-2 whitespace-nowrap">
                        <span className="text-[clamp(0.7rem,1.1vw,0.875rem)] text-gray-600">
                          {transaction.transactionReference}
                        </span>
                      </td>
                      <td className="w-[clamp(70px,12vw,96px)] px-2 py-2 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[clamp(0.65rem,1vw,0.75rem)] font-medium capitalize ${
                            transaction.type === "credit"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>

                      <td className="w-[clamp(70px,12vw,96px)] px-2 py-2 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[clamp(0.65rem,1vw,0.75rem)] font-medium capitalize ${
                            transaction.status === "success"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="w-[60px] px-2 py-2 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setIsModalVisible(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <EyeOutlined className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 60 }}
            description={
              <div className="text-center">
                <p className="text-gray-500 text-lg mb-2">
                  No IPE Clearance Records found
                </p>
                <p className="text-gray-400 text-sm">
                  Your IPE Clearance history will appear here
                </p>
              </div>
            }
          />
        </div>
      )}

      {/* Transaction Details Modal */}
      <Modal
        title="Transaction Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedTransaction && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p
                  className={`mt-1 text-sm ${
                    selectedTransaction.status === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedTransaction.status}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">NIN</p>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedTransaction.nin}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ticket ID</p>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedTransaction.ticketId}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Action</p>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedTransaction.action}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Created Date
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {format(
                    new Date(selectedTransaction.createdAt),
                    "dd/MM/yyyy HH:mm:ss"
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Old Tracking ID
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedTransaction.oldTrackingId}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  New Tracking ID
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedTransaction.newTrackingId}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
