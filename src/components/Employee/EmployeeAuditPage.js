import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/EmployeeAuditPage.css";

const EmployeeAuditPage = () => {
  const [auditRequests, setAuditRequests] = useState([]);
  const [responses, setResponses] = useState({});
  const [submittedIds, setSubmittedIds] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);

  const fetchAuditRequests = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || !user.id) return;

    try {
      const res = await API.get(`/audit/user/${user.id}`);
      setAuditRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch audit requests", err);
    }
  };

  useEffect(() => {
    fetchAuditRequests();
  }, []);

  const handleSelectChange = (id, value) => {
    setResponses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        action: value,
      },
    }));
  };

  const handleResponseChange = (id, value) => {
    setResponses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        employeeResponse: value,
      },
    }));
  };

  const handleSubmit = async (id) => {
    const response = responses[id];
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const audit = auditRequests.find((r) => r.id === id);

    if (!response?.action || !response.employeeResponse?.trim()) {
      alert("Please select an action and enter your response.");
      return;
    }

    const payload = {
      action: response.action,
      status: response.action.toUpperCase(), // ✅ Backend requires status too
      performedBy: user.name || "Employee",
      auditDescrption: response.employeeResponse.trim(), // 🛠️ backend expects this as @NotBlank
      employeeResponse: response.employeeResponse.trim(),
      auditDate: new Date().toISOString(),
    };

    try {
      await API.put(`/audit/respond/${id}`, payload);
      setSubmittedIds((prev) => [...prev, id]);
      setSuccessMsg(`✅ Audit for "${audit.assetName}" submitted!`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit audit.");
    }
  };

  return (
    <div className="audit-container">
      <h2 className="audit-header">📝 Pending Audit Verifications</h2>

      {successMsg && <p className="audit-success">{successMsg}</p>}

      {auditRequests.length === 0 ? (
        <p className="no-audit-text">No audits pending for you.</p>
      ) : (
        <div className="audit-list">
          {auditRequests.map((req) => {
            const isSubmitted = submittedIds.includes(req.id);
            const response = responses[req.id] || {};

            return (
              <div key={req.id} className="audit-card">
                <div className="audit-info">
                  <strong>🖥️ Asset:</strong> {req.assetName}
                </div>
                <div className="audit-info">
                  <strong>📋 Admin Note:</strong> {req.adminNote || "—"}
                </div>

                <div className="audit-actions">
                  <div className="audit-field">
                    <label className="audit-label">✅ Your Action</label>
                    <select
                      value={response.action || ""}
                      onChange={(e) =>
                        handleSelectChange(req.id, e.target.value)
                      }
                      className="audit-select"
                      disabled={isSubmitted}
                      required
                    >
                      <option value="">-- Select Action --</option>
                      <option value="Verified">Verified</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="audit-field full-width">
                    <label className="audit-label">🧾 Your Response</label>
                    <input
                      type="text"
                      value={response.employeeResponse || ""}
                      onChange={(e) =>
                        handleResponseChange(req.id, e.target.value)
                      }
                      className="audit-input"
                      placeholder="e.g., Asset is in good condition"
                      disabled={isSubmitted}
                      required
                    />
                  </div>

                  {isSubmitted ? (
                    <div
                      className={`status-pill ${response.action.toLowerCase()}`}
                    >
                      {response.action}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSubmit(req.id)}
                      className="audit-submit-btn"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EmployeeAuditPage;




// b4 final
// import React, { useEffect, useState } from "react";
// import API from "../../services/api"; // axios instance with token set
// import "../../styles/EmployeeAuditPage.css";

// const EmployeeAuditPage = () => {
//   const [auditRequests, setAuditRequests] = useState([]);
//   const [responses, setResponses] = useState({});
//   const [submittedIds, setSubmittedIds] = useState([]);
//   const [successMsg, setSuccessMsg] = useState(null);

//   const fetchAuditRequests = async () => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!user || !user.id) return;

//     try {
//       const res = await API.get(`/audit/user/${user.id}`);
//       if (Array.isArray(res.data)) {
//         setAuditRequests(res.data);
//       } else {
//         setAuditRequests([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch audit requests", err);
//     }
//   };

//   useEffect(() => {
//     fetchAuditRequests();
//   }, []);

//   const handleSelectChange = (id, value) => {
//     setResponses((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         action: value,
//       },
//     }));
//   };

//   const handleDescriptionChange = (id, value) => {
//     setResponses((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         auditDescrption: value,
//       },
//     }));
//   };

//   const handleSubmit = async (id) => {
//     const response = responses[id];
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     const audit = auditRequests.find((r) => r.id === id);

//     if (!response || !response.action || !response.auditDescrption) {
//       alert("Please select action and enter description");
//       return;
//     }

//     const payload = {
//       id: 0, // backend auto-generates
//       action: response.action,
//       performedBy: user.name || "Employee",
//       auditDescrption: response.auditDescrption,
//       auditDate: new Date(),
//       employeeId: user.id,
//       employeeName: user.name,
//       assetId: audit.assetId,
//       assetName: audit.assetName,
//     };

//     try {
//       await API.post("/audit/addAudit", payload);
//       setSubmittedIds((prev) => [...prev, id]);
//       setSuccessMsg(`✅ Audit for "${audit.assetName}" submitted!`);
//       setTimeout(() => setSuccessMsg(null), 3000);
//     } catch (err) {
//       console.error("Submission error:", err);
//       alert("Failed to submit audit");
//     }
//   };

//   return (
//     <div className="audit-container">
//       <h2 className="audit-header">📝 Pending Audit Verifications</h2>

//       {successMsg && <p className="audit-success">{successMsg}</p>}

//       {auditRequests.length === 0 ? (
//         <p className="no-audit-text">No audits pending for you.</p>
//       ) : (
//         <div className="audit-list">
//           {auditRequests.map((req) => {
//             const isSubmitted = submittedIds.includes(req.id);
//             const response = responses[req.id] || {};

//             return (
//               <div key={req.id} className="audit-card">
//                 <div className="audit-info">
//                   <strong>🖥️ Asset:</strong> {req.assetName}
//                 </div>
//                 <div className="audit-info">
//                   <strong>📋 Admin Note:</strong> {req.auditDescrption}
//                 </div>

//                 <div className="audit-actions">
//                   <div className="audit-field">
//                     <label className="audit-label">✅ Your Action</label>
//                     <select
//                       value={response.action || ""}
//                       onChange={(e) =>
//                         handleSelectChange(req.id, e.target.value)
//                       }
//                       className="audit-select"
//                       disabled={isSubmitted}
//                       required
//                     >
//                       <option value="">-- Select Action --</option>
//                       <option value="Verified">Verified</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </div>

//                   <div className="audit-field full-width">
//                     <label className="audit-label">🧾 Description</label>
//                     <input
//                       type="text"
//                       value={response.auditDescrption || ""}
//                       onChange={(e) =>
//                         handleDescriptionChange(req.id, e.target.value)
//                       }
//                       className="audit-input"
//                       placeholder="e.g., Everything looks good."
//                       disabled={isSubmitted}
//                       required
//                     />
//                   </div>

//                   {isSubmitted ? (
//                     <div
//                       className={`status-pill ${response.action.toLowerCase()}`}
//                     >
//                       {response.action}
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleSubmit(req.id)}
//                       className="audit-submit-btn"
//                     >
//                       Submit
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeAuditPage;




// import React, { useState } from "react";
// import "../../styles/EmployeeAuditPage.css";

// const EmployeeAuditPage = () => {
//   const [auditRequests, setAuditRequests] = useState([
//     {
//       id: 1,
//       assetName: "Dell Laptop",
//       auditDescrption: "Verify laptop condition",
//       performedBy: "Admin",
//       status: "", // pending
//     },
//     {
//       id: 2,
//       assetName: "HP Monitor",
//       auditDescrption: "Check screen issue",
//       performedBy: "Admin",
//       status: "", // pending
//     },
//   ]);

//   const [responses, setResponses] = useState({});  // audit desc,action->verified/rejected
//   const [submittedIds, setSubmittedIds] = useState([]);
//   const [successMsg, setSuccessMsg] = useState(null);

//   const handleSelectChange = (id, value) => {
//     setResponses((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         action: value,
//       },
//     }));
//   };

//   const handleDescriptionChange = (id, value) => {
//     setResponses((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         auditDescrption: value,
//       },
//     }));
//   };

//   const handleSubmit = (id) => {
//     const response = responses[id];
//     if (!response || !response.action || !response.auditDescrption) {
//       alert("Please select action and enter description");
//       return;
//     }

//     const payload = {
//       assetId: id,
//       employeeId: 101,
//       performedBy: "Employee Name",
//       action: response.action,
//       auditDescrption: response.auditDescrption,
//     };

//     console.log("Submitting audit response:", payload);

//     setSubmittedIds((prev) => [...prev, id]);
//     setSuccessMsg(`✅ Audit for "${auditRequests.find(r => r.id === id).assetName}" submitted!`);

//     // Optional: Reset the success message after 3 seconds
//     setTimeout(() => setSuccessMsg(null), 3000);
//   };

//   return (
//     <div className="audit-container">
//       <h2 className="audit-header">📝 Pending Audit Verifications</h2>

//       {successMsg && <p className="audit-success">{successMsg}</p>}

//       {auditRequests.length === 0 ? (
//         <p className="no-audit-text">No audits pending for you.</p>
//       ) : (
//         <div className="audit-list">
//           {auditRequests.map((req) => {
//             const isSubmitted = submittedIds.includes(req.id);
//             const response = responses[req.id] || {};

//             return (
//               <div key={req.id} className="audit-card">
//                 <div className="audit-info">
//                   <strong>🖥️ Asset:</strong> {req.assetName}
//                 </div>
//                 <div className="audit-info">
//                   <strong>📋 Admin Note:</strong> {req.auditDescrption}
//                 </div>

//                 <div className="audit-actions">
//                   <div className="audit-field">
//                     <label className="audit-label">✅ Your Action</label>
//                     <select
//                       value={response.action || ""}
//                       onChange={(e) => handleSelectChange(req.id, e.target.value)}
//                       className="audit-select"
//                       disabled={isSubmitted}
//                       required
//                     >
//                       <option value="">-- Select Action --</option>
//                       <option value="Verified">Verified</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </div>

//                   <div className="audit-field full-width">
//                     <label className="audit-label">🧾 Description</label>
//                     <input
//                       type="text"
//                       value={response.auditDescrption || ""}
//                       onChange={(e) => handleDescriptionChange(req.id, e.target.value)}
//                       className="audit-input"
//                       placeholder="e.g., Everything looks good."
//                       disabled={isSubmitted}
//                       required
//                     />
//                   </div>

//                   {isSubmitted ? (
//                     <div className={`status-pill ${response.action.toLowerCase()}`}>
//                       {response.action}
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleSubmit(req.id)}
//                       className="audit-submit-btn"
//                     >
//                       Submit
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeAuditPage;






































































































































































































































































































































































































































// import React, { useState, useEffect } from "react";

// const EmployeeAuditPage = () => {
//   // 🧠 Replace with API call: /api/audit/user/{uid}
//   const [auditRequests, setAuditRequests] = useState([
//     {
//       id: 1,
//       assetName: "Dell Laptop",
//       auditDescrption: "Verify laptop condition",
//       performedBy: "Admin",
//       status: "", // action not yet submitted
//     },
//     {
//       id: 2,
//       assetName: "HP Monitor",
//       auditDescrption: "Check screen issue",
//       performedBy: "Admin",
//       status: "", // still pending
//     },
//   ]);

//   const [responses, setResponses] = useState({});

//   const handleSelectChange = (id, value) => {
//     setResponses((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         action: value,
//       },
//     }));
//   };

//   const handleDescriptionChange = (id, value) => {
//     setResponses((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         auditDescrption: value,
//       },
//     }));
//   };

//   const handleSubmit = (id) => {
//     const response = responses[id];
//     if (!response || !response.action || !response.auditDescrption) {
//       alert("Please select action and enter description");
//       return;
//     }

//     const payload = {
//       assetId: id, // assuming assetId === audit id here; change if needed
//       employeeId: 101, // 👉 Replace with actual logged-in user ID
//       performedBy: "Employee Name", // 👉 Replace with user.name
//       action: response.action,
//       auditDescrption: response.auditDescrption,
//     };

//     console.log("Submitting audit response:", payload);
//     // axios.post('/api/audit/addAudit', payload)

//     // Optional: show success toast / update UI
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-6">📝 Pending Audit Verifications</h2>

//       {auditRequests.length === 0 ? (
//         <p>No audits pending for you.</p>
//       ) : (
//         <div className="space-y-6">
//           {auditRequests.map((req) => (
//             <div
//               key={req.id}
//               className="border rounded shadow p-4 bg-white space-y-3"
//             >
//               <div>
//                 <strong>🖥️ Asset:</strong> {req.assetName}
//               </div>
//               <div>
//                 <strong>📋 Admin Note:</strong> {req.auditDescrption}
//               </div>

//               <div className="flex gap-4 items-center">
//                 <div>
//                   <label className="font-medium block mb-1">
//                     ✅ Your Action
//                   </label>
//                   <select
//                     value={responses[req.id]?.action || ""}
//                     onChange={(e) =>
//                       handleSelectChange(req.id, e.target.value)
//                     }
//                     className="border rounded px-3 py-1"
//                     required
//                   >
//                     <option value="">-- Select Action --</option>
//                     <option value="Verified">Verified</option>
//                     <option value="Rejected">Rejected</option>
//                   </select>
//                 </div>

//                 <div className="flex-1">
//                   <label className="font-medium block mb-1">
//                     🧾 Description
//                   </label>
//                   <input
//                     type="text"
//                     value={responses[req.id]?.auditDescrption || ""}
//                     onChange={(e) =>
//                       handleDescriptionChange(req.id, e.target.value)
//                     }
//                     className="w-full border rounded px-3 py-1"
//                     placeholder="e.g., Everything looks good."
//                     required
//                   />
//                 </div>

//                 <button
//                   onClick={() => handleSubmit(req.id)}
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mt-6"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeAuditPage;