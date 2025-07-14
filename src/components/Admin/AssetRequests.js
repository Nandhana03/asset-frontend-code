import React, { useEffect, useState } from 'react';
import '../../styles/AdminServiceRequests.css';
import API from '../../services/api';

const statusColors = {
  PENDING: '#e6c200',
  APPROVED: '#6DC36D',
  REJECTED: '#E57373',
  UNDER_REVIEW: '#9575CD',
};

const AdminAssetRequests = () => {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get('/requests');
      const onlyRequestType = res.data.filter(req => req.issueType === 'REQUEST');
      setRequests(onlyRequestType);

      const uniqueCategories = [
        ...new Set(onlyRequestType.map(req => req.issueType).filter(Boolean))
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Failed to fetch service requests', err);
    }
  };

  const updateAssetStatus = async (assetId, newAssetStatus, employeeId = null) => {
    try {
      const assetRes = await API.get(`/assets/${assetId}`);
      const updatedAsset = {
        ...assetRes.data,
        status: newAssetStatus
      };

      if (newAssetStatus === 'ASSIGNED') {
        const today = new Date().toISOString().split('T')[0];
        updatedAsset.assignedToId = employeeId;
        updatedAsset.purchasedDate = today;
      }

      await API.put(`/assets/${assetId}`, updatedAsset);
    } catch (err) {
      console.error('Failed to update asset status', err);
    }
  };

  const handleStatusChange = async (id, newStatus, assetId) => {
    const reqToUpdate = requests.find(r => r.id === id);
    if (!reqToUpdate) return;

    if (!['PENDING', 'UNDER_REVIEW'].includes(reqToUpdate.status)) {
      alert("You can't change the status once it's APPROVED or REJECTED.");
      return;
    }

    const confirmed = window.confirm(
      "⚠️ You can change your decision only if it's in PENDING or UNDER_REVIEW.\nOnce you confirm APPROVED or REJECTED, it will be locked permanently.\n\nProceed?"
    );
    if (!confirmed) return;

    try {
      const updatedReq = {
        id: reqToUpdate.id,
        status: newStatus.toUpperCase(),
        description: reqToUpdate.description || '',
      };

      await API.put(`/requests/${id}`, updatedReq);

      if (newStatus === 'APPROVED') {
        await updateAssetStatus(assetId, 'ASSIGNED', reqToUpdate.employeeId);
      } else if (newStatus === 'REJECTED') {
        await updateAssetStatus(assetId, 'AVAILABLE');
      } else if (newStatus === 'UNDER_REVIEW') {
        await updateAssetStatus(assetId, 'REQUESTED');
      }

      fetchRequests();
    } catch (err) {
      console.error('Failed to update request/asset status', err);
    }
  };

  const filteredRequests = requests.filter(req => {
    const effectiveStatus = req.status || 'PENDING';
    return (
      (statusFilter ? effectiveStatus === statusFilter : true) &&
      (categoryFilter ? req.issueType === categoryFilter : true)
    );
  });

  return (
    <div className="admin-service-requests">
      <h2>Asset Requests</h2>

      <div className="filters">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Filter by Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="UNDER_REVIEW">Under Review</option>
        </select>

        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">Filter by Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="request-list">
        {filteredRequests.length === 0 ? (
          <p className="no-data">No matching requests.</p>
        ) : (
          filteredRequests.map(req => {
            const effectiveStatus = req.status || 'PENDING';

            return (
              <div className="request-card" key={req.id}>
                <h3>ASSET REQUEST</h3>
                <p><strong>{req.employeeName}</strong></p>
                <p><strong>Requested:</strong> {req.requestDate}</p>
                <p><strong>Asset:</strong> {req.assetName}</p>

                <div
                  className="status-tag"
                  style={{ backgroundColor: statusColors[effectiveStatus] }}
                >
                  {effectiveStatus}
                </div>

                <p><strong>DESCRIPTION:</strong> {req.description}</p>

                <div className="actions">
                  {['PENDING', 'UNDER_REVIEW'].includes(effectiveStatus) ? (
                    <>
                      <button onClick={() => handleStatusChange(req.id, 'APPROVED', req.assetId)}>APPROVE</button>
                      <button onClick={() => handleStatusChange(req.id, 'REJECTED', req.assetId)}>REJECT</button>
                      <button onClick={() => handleStatusChange(req.id, 'UNDER_REVIEW', req.assetId)}>UNDER REVIEW</button>
                    </>
                  ) : (
                    <div
                      className="status-lock"
                      style={{
                        backgroundColor: statusColors[effectiveStatus],
                        padding: '4px 12px',
                        color: '#fff',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        display: 'inline-block'
                      }}
                    >
                      {effectiveStatus}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminAssetRequests;



// import React, { useEffect, useState } from 'react';
// import '../../styles/AdminServiceRequests.css';
// import API from '../../services/api';

// const statusColors = {
//   PENDING: '#e6c200',
//   APPROVED: '#6DC36D',
//   REJECTED: '#E57373',
//   UNDER_REVIEW: '#9575CD',
// };

// const AdminAssetRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await API.get('/requests');
//       const onlyRequestType = res.data.filter(req => req.issueType === 'REQUEST');
//       setRequests(onlyRequestType);

//       const uniqueCategories = [
//         ...new Set(onlyRequestType.map(req => req.issueType).filter(Boolean))
//       ];
//       setCategories(uniqueCategories);
//     } catch (err) {
//       console.error('Failed to fetch service requests', err);
//     }
//   };

//   const updateAssetStatus = async (assetId, newAssetStatus, employeeId = null) => {
//     try {
//       const assetRes = await API.get(`/assets/${assetId}`);
//       const updatedAsset = {
//         ...assetRes.data,
//         status: newAssetStatus
//       };

//       if (newAssetStatus === 'ASSIGNED') {
//         const today = new Date().toISOString().split('T')[0];
//         updatedAsset.assignedToId = employeeId;
//         updatedAsset.purchasedDate = today;
//       }

//       await API.put(`/assets/${assetId}`, updatedAsset);
//     } catch (err) {
//       console.error('Failed to update asset status', err);
//     }
//   };

//   const handleStatusChange = async (id, newStatus, assetId) => {
//   const reqToUpdate = requests.find(r => r.id === id);
//   if (!reqToUpdate) return;

//   // ❗ Allow only from PENDING or UNDER_REVIEW
//   if (!['PENDING', 'UNDER_REVIEW'].includes(reqToUpdate.status)) {
//     alert("You can't change status after it's been approved or rejected.");
//     return;
//   }

//   const confirmed = window.confirm(
//     "⚠️ You can change your decision only if it's in PENDING or UNDER_REVIEW state.\nOnce you confirm APPROVED or REJECTED, it will be locked permanently.\n\nDo you want to proceed?"
//   );
//   if (!confirmed) return;

//   try {
//     const updatedReq = {
//       id: reqToUpdate.id,
//       status: newStatus.toUpperCase(),
//       description: reqToUpdate.description || '',
//     };

//     await API.put(`/requests/${id}`, updatedReq);

//     if (newStatus === 'APPROVED') {
//       await updateAssetStatus(assetId, 'ASSIGNED', reqToUpdate.employeeId);
//     } else if (newStatus === 'REJECTED') {
//       await updateAssetStatus(assetId, 'AVAILABLE');
//     } else if (newStatus === 'UNDER_REVIEW') {
//       await updateAssetStatus(assetId, 'REQUESTED');
//     }

//     fetchRequests(); // Refresh UI
//   } catch (err) {
//     console.error('Failed to update request/asset status', err);
//   }
// };


//   const filteredRequests = requests.filter(req => {
//     const effectiveStatus = req.status || 'PENDING';
//     return (
//       (statusFilter ? effectiveStatus === statusFilter : true) &&
//       (categoryFilter ? req.issueType === categoryFilter : true)
//     );
//   });

//   return (
//     <div className="admin-service-requests">
//       <h2>Asset Requests</h2>

//       <div className="filters">
//         <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
//           <option value="">Filter by Status</option>
//           <option value="PENDING">Pending</option>
//           <option value="APPROVED">Approved</option>
//           <option value="REJECTED">Rejected</option>
//           <option value="UNDER_REVIEW">Under Review</option>
//         </select>

//         <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
//           <option value="">Filter by Category</option>
//           {categories.map((cat, i) => (
//             <option key={i} value={cat}>
//               {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="request-list">
//         {filteredRequests.length === 0 ? (
//           <p className="no-data">No matching requests.</p>
//         ) : (
//           filteredRequests.map(req => {
//             const effectiveStatus = req.status || 'PENDING';
//             return (
//               <div className="request-card" key={req.id}>
//                 <h3>ASSET REQUEST</h3>
//                 <p><strong>{req.employeeName}</strong></p>
//                 <p><strong>Requested:</strong> {req.requestDate}</p>
//                 <p><strong>Asset:</strong> {req.assetName}</p>

//                 <div
//                   className="status-tag"
//                   style={{ backgroundColor: statusColors[effectiveStatus] }}
//                 >
//                   {effectiveStatus}
//                 </div>

//                 <p><strong>DESCRIPTION:</strong> {req.description}</p>

//                 <div className="actions">
//                   <button onClick={() => handleStatusChange(req.id, 'APPROVED', req.assetId)}>APPROVE</button>
//                   <button onClick={() => handleStatusChange(req.id, 'REJECTED', req.assetId)}>REJECT</button>
//                   <button onClick={() => handleStatusChange(req.id, 'UNDER_REVIEW', req.assetId)}>UNDER REVIEW</button>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminAssetRequests;



// import React, { useEffect, useState } from 'react';
// import '../../styles/AdminServiceRequests.css';
// import API from '../../services/api'; // axios instance with token

// const statusColors = {
//   PENDING: '#e6c200',
//   APPROVED: '#6DC36D',
//   REJECTED: '#E57373',
//   UNDER_REVIEW: '#9575CD',
// };

// const AdminAssetRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await API.get('/requests');
//       const onlyRequestType = res.data.filter(req => req.issueType === 'REQUEST');
//       setRequests(onlyRequestType);

//       const uniqueCategories = [
//         ...new Set(onlyRequestType.map(req => req.issueType).filter(Boolean))
//       ];
//       setCategories(uniqueCategories);
//     } catch (err) {
//       console.error('Failed to fetch service requests', err);
//     }
//   };

// const updateAssetStatus = async (assetId, newAssetStatus) => {
//   try {
//     const assetRes = await API.get(`/assets/${assetId}`);
//     const updatedAsset = {
//       ...assetRes.data,
//       status: newAssetStatus,
//     };
//     console.log("🧩 Updating asset:", updatedAsset);
//     await API.put(`/assets/${assetId}`, updatedAsset);
//   } catch (err) {
//     console.error('⚠️ Failed to update asset status', err);
//   }
// };


//  const handleStatusChange = async (id, newStatus, assetId) => {
//   const confirmed = window.confirm(`Are you sure you want to mark this request as '${newStatus}'?`);
//   if (!confirmed) return;

//   try {
//     const reqToUpdate = requests.find(r => r.id === id);
//     if (!reqToUpdate) return;

//     const updatedReq = {
//       id: reqToUpdate.id,
//       status: newStatus.toUpperCase(),
//       description: reqToUpdate.description || '', // optional but safe
//     };

//     console.log("🚀 Sending request update:", updatedReq);

//     await API.put(`/requests/${id}`, updatedReq);

//     // update asset status based on request status
//     if (newStatus === 'APPROVED') {
//       await updateAssetStatus(assetId, 'ASSIGNED');
//     } else if (newStatus === 'REJECTED') {
//       await updateAssetStatus(assetId, 'AVAILABLE');
//     } else if (newStatus === 'UNDER_REVIEW') {
//       await updateAssetStatus(assetId, 'REQUESTED');
//     }

//     fetchRequests();
//   } catch (err) {
//     console.error('❌ Failed to update request/asset status', err);
//   }
// };


//   const filteredRequests = requests.filter(req => {
//     const effectiveStatus = req.status || 'PENDING';
//     return (
//       (statusFilter ? effectiveStatus === statusFilter : true) &&
//       (categoryFilter ? req.issueType === categoryFilter : true)
//     );
//   });

//   return (
//     <div className="admin-service-requests">
//       <h2>Asset Requests</h2>

//       <div className="filters">
//         <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
//           <option value="">Filter by Status</option>
//           <option value="PENDING">Pending</option>
//           <option value="APPROVED">Approved</option>
//           <option value="REJECTED">Rejected</option>
//           <option value="UNDER_REVIEW">Under Review</option>
//         </select>

//         <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
//           <option value="">Filter by Category</option>
//           {categories.map((cat, i) => (
//             <option key={i} value={cat}>
//               {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="request-list">
//         {filteredRequests.length === 0 ? (
//           <p className="no-data">No matching requests.</p>
//         ) : (
//           filteredRequests.map(req => {
//             const effectiveStatus = req.status || 'PENDING';
//             return (
//               <div className="request-card" key={req.id}>
//                 <h3>ASSET REQUEST</h3>
//                 <p><strong>{req.employeeName}</strong></p>
//                 <p><strong>Requested:</strong> {req.requestDate}</p>
//                 <p><strong>Asset:</strong> {req.assetName}</p>

//                 <div
//                   className="status-tag"
//                   style={{ backgroundColor: statusColors[effectiveStatus] }}
//                 >
//                   {effectiveStatus}
//                 </div>

//                 <p><strong>DESCRIPTION:</strong> {req.description}</p>

//                 <div className="actions">
//                   <button onClick={() => handleStatusChange(req.id, 'APPROVED', req.assetId)}>APPROVE</button>
//                   <button onClick={() => handleStatusChange(req.id, 'REJECTED', req.assetId)}>REJECT</button>
//                   <button onClick={() => handleStatusChange(req.id, 'UNDER_REVIEW', req.assetId)}>UNDER REVIEW</button>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminAssetRequests;




// import React, { useEffect, useState } from 'react';
// import '../../styles/AdminServiceRequests.css';
// import API from '../../services/api'; // axios instance with token

// const statusColors = {
//   PENDING: '#e6c200',
//   APPROVED: '#6DC36D',
//   REJECTED: '#E57373',
//   UNDER_REVIEW: '#9575CD',
// };

// const AdminAssetRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await API.get('/requests');

//       // ✅ Filter only REQUEST type
//       const onlyRequestType = res.data.filter(req => req.issueType === 'REQUEST');
//       setRequests(onlyRequestType);

//       // ✅ Get unique categories from the filtered data
//       const uniqueCategories = [
//         ...new Set(onlyRequestType.map(req => req.issueType).filter(Boolean))
//       ];
//       setCategories(uniqueCategories);
//     } catch (err) {
//       console.error('Failed to fetch service requests', err);
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const reqToUpdate = requests.find(r => r.id === id);
//       if (!reqToUpdate) return;

//       const updatedReq = { ...reqToUpdate, status: newStatus };
//       await API.put(`/requests/${id}`, updatedReq);
//       fetchRequests(); // re-fetch updated list
//     } catch (err) {
//       console.error('Failed to update request status', err);
//     }
//   };

//   const filteredRequests = requests.filter(req => {
//     const effectiveStatus = req.status || 'PENDING';
//     return (
//       (statusFilter ? effectiveStatus === statusFilter : true) &&
//       (categoryFilter ? req.issueType === categoryFilter : true)
//     );
//   });

//   return (
//     <div className="admin-service-requests">
//       <h2>Asset Requests</h2>

//       {/* 🔍 Filters */}
//       <div className="filters">
//         <select
//           value={statusFilter}
//           onChange={e => setStatusFilter(e.target.value)}
//         >
//           <option value="">Filter by Status</option>
//           <option value="PENDING">Pending</option>
//           <option value="APPROVED">Approved</option>
//           <option value="REJECTED">Rejected</option>
//           <option value="UNDER_REVIEW">Under Review</option>
//         </select>

//         <select
//           value={categoryFilter}
//           onChange={e => setCategoryFilter(e.target.value)}
//         >
//           <option value="">Filter by Category</option>
//           {categories.map((cat, i) => (
//             <option key={i} value={cat}>
//               {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* 📋 Requests List */}
//       <div className="request-list">
//         {filteredRequests.length === 0 ? (
//           <p className="no-data">No matching requests.</p>
//         ) : (
//           filteredRequests.map(req => {
//             const effectiveStatus = req.status || 'PENDING';
//             return (
//               <div className="request-card" key={req.id}>
//                 <h3>ASSET REQUEST</h3>
//                 <p><strong>{req.employeeName}</strong></p>
//                 <p><strong>Requested:</strong> {req.requestDate}</p>
//                 <p><strong>Asset:</strong> {req.assetName}</p>

//                 <div
//                   className="status-tag"
//                   style={{ backgroundColor: statusColors[effectiveStatus] }}
//                 >
//                   {effectiveStatus}
//                 </div>

//                 <p><strong>DESCRIPTION:</strong> {req.description}</p>

//                 <div className="actions">
//                   <button onClick={() => handleStatusChange(req.id, 'APPROVED')}>APPROVE</button>
//                   <button onClick={() => handleStatusChange(req.id, 'REJECTED')}>REJECT</button>
//                   <button onClick={() => handleStatusChange(req.id, 'UNDER_REVIEW')}>UNDER REVIEW</button>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminAssetRequests;



// import React, { useState } from 'react';
// import '../../styles/AdminServiceRequests.css';

// const DUMMY_REQUESTS = [
//   {
//     id: 1,
//     employeeName: 'John Doe',
//     requestDate: '2025-06-09',
//     assetName: 'Laptop',
//     description: 'Need a new laptop for development',
//     status: '', // Initially no status, will be treated as "PENDING"
//     category: 'Hardware',
//   },
//   {
//     id: 2,
//     employeeName: 'Jane Smith',
//     requestDate: '2025-06-10',
//     assetName: 'Office Chair',
//     description: 'Requesting ergonomic chair',
//     status: 'APPROVED',
//     category: 'Furniture',
//   },
//   {
//     id: 3,
//     employeeName: 'Michael',
//     requestDate: '2025-06-08',
//     assetName: 'Tablet',
//     description: 'Tablet required for client demos',
//     status: 'REJECTED',
//     category: 'Hardware',
//   },
// ];

// const statusColors = {
//   PENDING: '#e6c200',
//   APPROVED: '#6DC36D',
//   REJECTED: '#E57373',
//   UNDER_REVIEW: '#9575CD',
// };

// const AdminAssetRequests = () => {
//   const [requests, setRequests] = useState(DUMMY_REQUESTS);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');

//   const handleStatusChange = (id, newStatus) => {
//     const updated = requests.map(req =>
//       req.id === id ? { ...req, status: newStatus } : req
//     );
//     setRequests(updated);
//   };

//   const filteredRequests = requests.filter(req => {
//     const effectiveStatus = req.status || 'PENDING';
//     return (
//       (statusFilter ? effectiveStatus === statusFilter : true) &&
//       (categoryFilter ? req.category === categoryFilter : true)
//     );
//   });

//   return (
//     <div className="admin-service-requests">
//       <h2>Asset Requests</h2>

//       <div className="filters">
//         <select
//           value={statusFilter}
//           onChange={e => setStatusFilter(e.target.value)}
//         >
//           <option value="">Filter by Status</option>
//           <option value="PENDING">Pending</option>
//           <option value="APPROVED">Approved</option>
//           <option value="REJECTED">Rejected</option>
//           <option value="UNDER_REVIEW">Under Review</option>
//         </select>

//         <select
//           value={categoryFilter}
//           onChange={e => setCategoryFilter(e.target.value)}
//         >
//           <option value="">Filter by Category</option>
//           <option value="Hardware">Hardware</option>
//           <option value="Software">Software</option>
//           <option value="Furniture">Furniture</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       <div className="request-list">
//         {filteredRequests.length === 0 ? (
//           <p className="no-data">No matching requests.</p>
//         ) : (
//           filteredRequests.map(req => {
//             const effectiveStatus = req.status || 'PENDING';
//             return (
//               <div className="request-card" key={req.id}>
//                 <h3>ASSET REQUEST</h3>
//                 <p><strong>{req.employeeName}</strong></p>
//                 <p><strong>Requested:</strong> {req.requestDate}</p>
//                 <p><strong>Asset:</strong> {req.assetName}</p>

//                 <div
//                   className="status-tag"
//                   style={{ backgroundColor: statusColors[effectiveStatus] }}
//                 >
//                   {effectiveStatus}
//                 </div>

//                 <p><strong>DESCRIPTION:</strong> {req.description}</p>

//                 <div className="actions">
//                   <button onClick={() => handleStatusChange(req.id, 'APPROVED')}>APPROVE</button>
//                   <button onClick={() => handleStatusChange(req.id, 'REJECTED')}>REJECT</button>
//                   <button onClick={() => handleStatusChange(req.id, 'UNDER_REVIEW')}>UNDER REVIEW</button>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminAssetRequests;
