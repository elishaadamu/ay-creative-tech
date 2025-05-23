import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";

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

const rows = []; // Add your data here

export default function VerificationsHistoryTable() {
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
        loading={rows.length === 0}
        getRowId={(row) => row.reportId}
      />
    </Box>
  );
}
