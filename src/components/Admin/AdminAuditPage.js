import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import API from "../../services/api";
import "../../styles/AdminAuditPage.css";

const AdminAuditPage = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeAssets, setEmployeeAssets] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    assetId: "",
    description: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchAuditLogs();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await API.get("/audit/logs");
      const sortedLogs = [...res.data].sort(
        (a, b) => new Date(b.auditDate) - new Date(a.auditDate)
      );
      setAuditLogs(sortedLogs);
    } catch (err) {
      console.error("Failed to fetch audit logs", err);
    }
  };

  const fetchAssetsForEmployee = async (empId) => {
    try {
      const res = await API.get(`/assets/assigned/${empId}`);
      setEmployeeAssets(res.data);
    } catch (err) {
      console.error("Failed to fetch assets for employee", err);
      setEmployeeAssets([]);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "employeeId" && { assetId: "" }),
    }));

    if (name === "employeeId") {
      await fetchAssetsForEmployee(value);
    }
  };

  const selectedEmployee = employees.find(
    (emp) => String(emp.id) === formData.employeeId
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employee = selectedEmployee;
    const asset = employeeAssets.find(
      (a) => String(a.id) === formData.assetId
    );

    if (!employee || !asset || !formData.description.trim()) {
      alert("Please fill all fields correctly.");
      return;
    }

    const payload = {
      performedBy: "Admin",
      status: "PENDING",
      auditDescrption: formData.description.trim(),
      adminNote: formData.description.trim(),
      employeeId: employee.id,
      assetId: asset.id,
    };

    try {
      await API.post("/audit/request", payload);
      fetchAuditLogs();
      setFormData({ employeeId: "", assetId: "", description: "" });
      setEmployeeAssets([]);
    } catch (err) {
      console.error("Failed to submit audit", err);
      alert("Failed to submit audit request. Check backend logs.");
    }
  };

  return (
    <Container maxWidth="md" className="audit-page">
      <Typography variant="h5" className="title">
        📤 Send Audit Request
      </Typography>

      <Paper elevation={3} className="form-container">
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              select
              required
            >
              <MenuItem value="">-- Select Employee --</MenuItem>
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={String(emp.id)}>
                  {emp.id} - {emp.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Employee Name"
              value={selectedEmployee?.name || ""}
              InputProps={{ readOnly: true }}
            />

            <Select
              name="assetId"
              value={formData.assetId}
              onChange={handleChange}
              displayEmpty
              required
              disabled={!formData.employeeId}
            >
              <MenuItem value="">
                {formData.employeeId
                  ? "-- Choose Asset --"
                  : "Select Employee First"}
              </MenuItem>
              {employeeAssets.map((asset) => (
                <MenuItem key={asset.id} value={String(asset.id)}>
                  {asset.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              name="description"
              label="Audit Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Submit Audit Request
            </Button>
          </Box>
        </form>
      </Paper>

      <Typography variant="h5" className="title" style={{ marginTop: "2rem" }}>
        📄 Audit Logs
      </Typography>

      <Paper className="table-container">
        <Box sx={{ overflowX: "auto" }}>
         <Table>
  <TableHead>
    <TableRow>
      <TableCell>#</TableCell>
      <TableCell>Employee</TableCell>
      <TableCell>Asset</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Action</TableCell>
      <TableCell>Performed By</TableCell>
      <TableCell>Admin Note</TableCell>
      <TableCell>Employee Response</TableCell>
      <TableCell>Audit Description</TableCell>
      <TableCell>Date</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {auditLogs.length > 0 ? (
      auditLogs.map((log, index) => (
        <TableRow key={log.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{log.employeeName}</TableCell>
          <TableCell>{log.assetName}</TableCell>
          <TableCell>
            <span
              className={`status-pill ${log.status?.toLowerCase() || "pending"}`}
            >
              {log.status}
            </span>
          </TableCell>
          <TableCell>{log.action || "—"}</TableCell>
          <TableCell>{log.performedBy || "—"}</TableCell>
          <TableCell>{log.adminNote || "—"}</TableCell>
          <TableCell>{log.employeeResponse || "—"}</TableCell>
          <TableCell>{log.auditDescrption || "—"}</TableCell>
          <TableCell>
            {log.auditDate ? new Date(log.auditDate).toLocaleString() : "—"}
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={10} align="center">
          No audit logs found.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>
        </ Box>

      </Paper>
    </Container>
  );
};

export default AdminAuditPage;




//b4 final
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
// } from "@mui/material";
// import API from "../../services/api";
// import "../../styles/AdminAuditPage.css";

// const AdminAuditPage = () => {
//   const [employees, setEmployees] = useState([]);
//   const [employeeAssets, setEmployeeAssets] = useState([]);
//   const [auditLogs, setAuditLogs] = useState([]);

//   const [formData, setFormData] = useState({
//     employeeId: "",
//     assetId: "",
//     description: "",
//   });

//   useEffect(() => {
//     fetchEmployees();
//     fetchAuditLogs();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const res = await API.get("/employees");
//       setEmployees(res.data);
//     } catch (err) {
//       console.error("Failed to fetch employees", err);
//     }
//   };

//   const fetchAuditLogs = async () => {
//     try {
//       const res = await API.get("/audit/logs");
//       setAuditLogs(res.data);
//     } catch (err) {
//       console.error("Failed to fetch audit logs", err);
//     }
//   };

//   const fetchAssetsForEmployee = async (empId) => {
//     try {
//       const res = await API.get(`/assets/assigned/${empId}`);
//       setEmployeeAssets(res.data);
//     } catch (err) {
//       console.error("Failed to fetch assets for employee", err);
//       setEmployeeAssets([]);
//     }
//   };

//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "employeeId" && { assetId: "" }),
//     }));

//     if (name === "employeeId") {
//       await fetchAssetsForEmployee(value);
//     }
//   };

//   const selectedEmployee = employees.find(
//     (emp) => String(emp.id) === formData.employeeId
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const employee = selectedEmployee;
//     const asset = employeeAssets.find(
//       (a) => String(a.id) === formData.assetId
//     );

//     const payload = {
//       action: "PENDING",
//       performedBy: "Admin",
//       auditDescrption: formData.description,
//       employeeId: employee.id,
//       employeeName: employee.name,
//       assetId: asset.id,
//       assetName: asset.name,
//     };

//     try {
//       await API.post("/audit/addAudit", payload);
//       fetchAuditLogs();
//       setFormData({ employeeId: "", assetId: "", description: "" });
//       setEmployeeAssets([]);
//     } catch (err) {
//       console.error("Failed to submit audit", err);
//     }
//   };

//   return (
//     <Container maxWidth="md" className="audit-page">
//       <Typography variant="h5" className="title">
//         📤 Send Audit Request
//       </Typography>

//       <Paper elevation={3} className="form-container">
//         <form onSubmit={handleSubmit}>
//           <Box display="flex" flexDirection="column" gap={2}>
//             <TextField
//               label="Employee ID"
//               name="employeeId"
//               value={formData.employeeId}
//               onChange={handleChange}
//               select
//               required
//             >
//               <MenuItem value="">-- Select Employee --</MenuItem>
//               {employees.map((emp) => (
//                 <MenuItem key={emp.id} value={String(emp.id)}>
//                   {emp.id} - {emp.name}
//                 </MenuItem>
//               ))}
//             </TextField>

//             <TextField
//               label="Employee Name"
//               value={selectedEmployee?.name || ""}
//               InputProps={{ readOnly: true }}
//             />

//             <Select
//               name="assetId"
//               value={formData.assetId}
//               onChange={handleChange}
//               displayEmpty
//               required
//               disabled={!formData.employeeId}
//             >
//               <MenuItem value="">
//                 {formData.employeeId
//                   ? "-- Choose Asset --"
//                   : "Select Employee First"}
//               </MenuItem>
//               {employeeAssets.map((asset) => (
//                 <MenuItem key={asset.id} value={String(asset.id)}>
//                   {asset.name}
//                 </MenuItem>
//               ))}
//             </Select>

//             <TextField
//               name="description"
//               label="Audit Description"
//               multiline
//               rows={3}
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />

//             <Button type="submit" variant="contained" color="primary">
//               Submit Audit Request
//             </Button>
//           </Box>
//         </form>
//       </Paper>

//       <Typography variant="h5" className="title" style={{ marginTop: "2rem" }}>
//         📄 Audit Logs
//       </Typography>

//       <Paper className="table-container">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>#</TableCell>
//               <TableCell>Employee</TableCell>
//               <TableCell>Asset</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Performed By</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Description</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {auditLogs.length > 0 ? (
//               auditLogs.map((log, index) => (
//                 <TableRow key={log.id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{log.employeeName}</TableCell>
//                   <TableCell>{log.assetName}</TableCell>
//                   <TableCell>
//                     <span
//                       className={`status-pill ${
//                         log.action === "Verified"
//                           ? "verified"
//                           : log.action === "Rejected"
//                           ? "rejected"
//                           : "pending"
//                       }`}
//                     >
//                       {log.action}
//                     </span>
//                   </TableCell>
//                   <TableCell>{log.performedBy}</TableCell>
//                   <TableCell>
//                     {new Date(log.auditDate).toLocaleString()}
//                   </TableCell>
//                   <TableCell>{log.auditDescrption}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center">
//                   No audit logs found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Container>
//   );
// };

// export default AdminAuditPage;



// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
// } from "@mui/material";
// import "../../styles/AdminAuditPage.css";

// const AdminAuditPage = () => {
//   const [employees] = useState([
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Aarav Patel" },
//   ]);

//   const [assets] = useState([
//     { id: 101, name: "Dell Laptop", employeeId: 1 },
//     { id: 102, name: "HP Monitor", employeeId: 2 },
//     { id: 103, name: "Keyboard", employeeId: 1 },
//   ]);

//   const [auditLogs, setAuditLogs] = useState([
//     {
//       id: 1,
//       employeeName: "John Doe",
//       assetName: "Dell Laptop",
//       action: "Verified",
//       performedBy: "Admin",
//       auditDate: "2025-07-10 10:30 AM",
//       description: "Asset verified in good condition",
//     },
//     {
//       id: 2,
//       employeeName: "Aarav Patel",
//       assetName: "HP Monitor",
//       action: "Rejected",
//       performedBy: "Admin",
//       auditDate: "2025-07-09 03:15 PM",
//       description: "Screen flickering observed",
//     },
//   ]);

//   const [formData, setFormData] = useState({
//     employeeId: "",
//     assetId: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "employeeId" && { assetId: "" }), // reset asset on emp change
//     }));
//   };

//   const selectedEmployee = employees.find(
//     (emp) => emp.id === parseInt(formData.employeeId)
//   );

//   const filteredAssets = assets.filter(
//     (asset) => asset.employeeId === parseInt(formData.employeeId)
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const employee = employees.find(
//       (emp) => emp.id === parseInt(formData.employeeId)
//     );
//     const asset = assets.find(
//       (ast) => ast.id === parseInt(formData.assetId)
//     );

//     const newAudit = {
//       id: auditLogs.length + 1,
//       employeeName: employee?.name || "Unknown",
//       assetName: asset?.name || "Unknown",
//       action: "PENDING",
//       performedBy: "Admin",
//       auditDate: new Date().toLocaleString(),
//       description: formData.description,
//     };

//     setAuditLogs((prevLogs) => [newAudit, ...prevLogs]);

//     setFormData({
//       employeeId: "",
//       assetId: "",
//       description: "",
//     });
//   };

//   return (
//     <Container maxWidth="md" className="audit-page">
//       <Typography variant="h5" className="title">
//         📤 Send Audit Request
//       </Typography>

//       <Paper elevation={3} className="form-container">
//         <form onSubmit={handleSubmit}>
//           <Box display="flex" flexDirection="column" gap={2}>
//             {/* Employee ID: type or select */}
//             <TextField
//               label="Employee ID"
//               name="employeeId"
//               value={formData.employeeId}
//               onChange={handleChange}
//               select
//               SelectProps={{
//                 native: false,
//                 renderValue: () => formData.employeeId || "",
//               }}
//               required
//             >
//               <MenuItem value="">-- Enter or Select Employee ID --</MenuItem>
//               {employees.map((emp) => (
//                 <MenuItem key={emp.id} value={emp.id}>
//                   {emp.id} - {emp.name}
//                 </MenuItem>
//               ))}
//             </TextField>

//             {/* Autofill name */}
//             <TextField
//               label="Employee Name"
//               value={selectedEmployee?.name || ""}
//               disabled
//             />

//             {/* Asset dropdown */}
//             <Select
//               name="assetId"
//               value={formData.assetId}
//               onChange={handleChange}
//               displayEmpty
//               required
//               disabled={!formData.employeeId}
//             >
//               <MenuItem value="">
//                 {formData.employeeId
//                   ? "-- Choose Asset --"
//                   : "Select Employee ID first"}
//               </MenuItem>
//               {filteredAssets.map((asset) => (
//                 <MenuItem key={asset.id} value={asset.id}>
//                   {asset.name}
//                 </MenuItem>
//               ))}
//             </Select>

//             <TextField
//               name="description"
//               label="Audit Description"
//               multiline
//               rows={3}
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />

//             <Button type="submit" variant="contained" color="primary">
//               Submit Audit Request
//             </Button>
//           </Box>
//         </form>
//       </Paper>

//       <Typography variant="h5" className="title" style={{ marginTop: "2rem" }}>
//         📄 Audit Logs
//       </Typography>

//       <Paper className="table-container">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>#</TableCell>
//               <TableCell>Employee</TableCell>
//               <TableCell>Asset</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Performed By</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Description</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {auditLogs.length > 0 ? (
//               auditLogs.map((log, index) => (
//                 <TableRow key={log.id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{log.employeeName}</TableCell>
//                   <TableCell>{log.assetName}</TableCell>
//                   <TableCell>
//                     <span
//                       className={`status-pill ${
//                         log.action === "Verified"
//                           ? "verified"
//                           : log.action === "Rejected"
//                           ? "rejected"
//                           : "pending"
//                       }`}
//                     >
//                       {log.action}
//                     </span>
//                   </TableCell>
//                   <TableCell>{log.performedBy}</TableCell>
//                   <TableCell>{log.auditDate}</TableCell>
//                   <TableCell>{log.description}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center">
//                   No audit logs found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Container>
//   );
// };

// export default AdminAuditPage;
