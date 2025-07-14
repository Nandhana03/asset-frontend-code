import React, { useEffect, useState } from 'react';
import '../../styles/AdminServiceRequests.css';
import API from '../../services/api';

const statusColors = {
  PENDING: '#e6c200',
  APPROVED: '#6DC36D',
  REJECTED: '#E57373',
  UNDER_REVIEW: '#9575CD',
};

const AdminServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get('/requests');
      const filtered = res.data.filter(req => req.issueType !== 'REQUEST');
      setRequests(filtered);
    } catch (err) {
      console.error('Failed to fetch service requests', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const reqToUpdate = requests.find(req => req.id === id);
    if (!reqToUpdate) return;

    // Only allow status update from PENDING or UNDER_REVIEW
    if (!['PENDING', 'UNDER_REVIEW'].includes(reqToUpdate.status || 'PENDING')) {
      alert("You can't change status after it's been approved or rejected.");
      return;
    }

    const confirmed = window.confirm(
      "⚠️ You can change your decision only if it's in PENDING or UNDER_REVIEW state.\nOnce you confirm APPROVED or REJECTED, it will be locked permanently.\n\nDo you want to proceed?"
    );
    if (!confirmed) return;

    try {
      const updatedReq = {
        ...reqToUpdate,
        status: newStatus
      };
      await API.put(`/requests/${id}`, updatedReq);
      fetchRequests();
    } catch (err) {
      console.error('Failed to update request', err);
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
      <h2>Service Requests</h2>

      <div className="filters">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="UNDER_REVIEW">Under Review</option>
        </select>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">Filter by Category</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Other">Other</option>
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
                <h3>SERVICE REQUEST</h3>
                <p><strong>{req.employeeName}</strong></p>
                <p><strong>Requested:</strong> {req.requestDate}</p>
                <p><strong>Asset:</strong> {req.assetName}</p>

                <div
                  className="status-tag"
                  style={{ backgroundColor: statusColors[effectiveStatus] }}
                >
                  {effectiveStatus}
                </div>

                <p><strong>ISSUE TYPE:</strong> <span className="pill">{req.issueType}</span></p>
                <p><strong>DESCRIPTION:</strong> {req.description}</p>

                <div className="actions">
                  {['PENDING', 'UNDER_REVIEW'].includes(effectiveStatus) ? (
                    <>
                      <button onClick={() => handleStatusChange(req.id, 'APPROVED')}>APPROVE</button>
                      <button onClick={() => handleStatusChange(req.id, 'REJECTED')}>REJECT</button>
                      <button onClick={() => handleStatusChange(req.id, 'UNDER_REVIEW')}>UNDER REVIEW</button>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminServiceRequests;



// import React, { useState } from 'react';
// import '../../styles/AdminServiceRequests.css';

// const DUMMY_SERVICE_REQUESTS = [
//   {
//     id: 1,
//     employeeName: 'Aarav Patel',
//     requestDate: '2025-07-01',
//     assetName: 'Monitor',
//     description: 'Monitor flickering issue',
//     issueType: 'Hardware',
//     status: '', // simulate untouched state
//     category: 'Hardware',
//   },
//   {
//     id: 2,
//     employeeName: 'Divya Reddy',
//     requestDate: '2025-07-02',
//     assetName: 'Keyboard',
//     description: 'Some keys not working',
//     issueType: 'Hardware',
//     status: 'APPROVED',
//     category: 'Hardware',
//   },
//   {
//     id: 3,
//     employeeName: 'Karan Mehta',
//     requestDate: '2025-07-03',
//     assetName: 'Projector',
//     description: 'Remote not responding',
//     issueType: 'Other',
//     status: 'REJECTED',
//     category: 'Other',
//   },
// ];

// const statusColors = {
//   PENDING: '#e6c200',
//   APPROVED: '#6DC36D',
//   REJECTED: '#E57373',
//   UNDER_REVIEW: '#9575CD',
// };

// const AdminServiceRequests = () => {
//   const [requests, setRequests] = useState(DUMMY_SERVICE_REQUESTS);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');

//   const handleStatusChange = (id, newStatus) => {
//     const updated = requests.map(req =>
//       req.id === id ? { ...req, status: newStatus } : req
//     );
//     setRequests(updated);
//     // axios.put(`/api/requests/${id}`, { ...req, status: newStatus });
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
//       <h2>Service Requests</h2>

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
//           <option value="Other">Other</option>
//           <option value="Request">Request</option>
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
//                 <h3>SERVICE REQUEST</h3>
//                 <p><strong>{req.employeeName}</strong></p>
//                 <p><strong>Requested:</strong> {req.requestDate}</p>
//                 <p><strong>Asset:</strong> {req.assetName}</p>

//                 <div
//                   className="status-tag"
//                   style={{ backgroundColor: statusColors[effectiveStatus] }}
//                 >
//                   {effectiveStatus}
//                 </div>

//                 <p><strong>ISSUE TYPE:</strong> <span className="pill">{req.issueType}</span></p>
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

// export default AdminServiceRequests;
