import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { config } from "../../config/config.jsx";
import CryptoJS from "crypto-js";

const columns = [
  {
    field: "avatar",
    headerName: "AVATAR",
    width: 100,
    renderCell: () => <img src="https://via.placeholder.com/40" alt="avatar" />,
  },
  { field: "reportId", headerName: "REPORT ID", width: 130 },
  { field: "displayName", headerName: "DISPLAY NAME", width: 160 },
  { field: "reportType", headerName: "REPORT TYPE", width: 160 },
  { field: "date", headerName: "DATE", width: 140 },
  {
    field: "action",
    headerName: "ACTION",
    width: 140,
    renderCell: () => <button>View</button>,
  },
];

function decryptData(ciphertext) {
  const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;
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
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Get userId from encrypted localStorage
    let userId = null;
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userObj = decryptData(userStr);
        userId = userObj?._id || userObj?.id;
      }
    } catch {}

    if (!userId) {
      setLoading(false);
      return;
    }

    // Fetch verification history
    axios
      .get(
        `${config.apiBaseUrl}${config.endpoints.NINHistory}?userId=${userId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // Adjust the mapping based on your API response structure
        const history = res.data?.data || [];
        const formattedRows = history.map((item, idx) => ({
          id: idx,
          reportId: item.reportId || item._id || idx,
          displayName: item.displayName || item.firstname + " " + item.surname,
          reportType: item.reportType || "NIN",
          date: item.date || item.createdAt?.slice(0, 10),
        }));
        setRows(formattedRows);
      })
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <p className="text-[18px] text-gray-500 mb-5">Verifications History</p>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          mb: 5,
        }}
      >
        <TextField label="REFERENCE" variant="outlined" size="small" />
        <TextField label="DISPLAY NAME" variant="outlined" size="small" />
        <TextField
          label="DATE"
          variant="outlined"
          size="small"
          placeholder="StartDate to EndDate"
        />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={loading}
        getRowId={(row) => row.reportId}
      />
    </Box>
  );
}
