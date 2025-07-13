import React, { useState } from 'react';
import '../../styles/AdminServiceRequests.css';

const DUMMY_REQUESTS = [
  {
    id: 1,
    employeeName: 'John Doe',
    requestDate: '2025-06-09',
    assetName: 'Laptop',
    description: 'Need a new laptop for development',
    status: '', // Initially no status, will be treated as "PENDING"
    category: 'Hardware',
  },
  {
    id: 2,
    employeeName: 'Jane Smith',
    requestDate: '2025-06-10',
    assetName: 'Office Chair',
    description: 'Requesting ergonomic chair',
    status: 'APPROVED',
    category: 'Furniture',
  },
  {
    id: 3,
    employeeName: 'Michael',
    requestDate: '2025-06-08',
    assetName: 'Tablet',
    description: 'Tablet required for client demos',
    status: 'REJECTED',
    category: 'Hardware',
  },
];

const statusColors = {
  PENDING: '#e6c200',
  APPROVED: '#6DC36D',
  REJECTED: '#E57373',
  UNDER_REVIEW: '#9575CD',
};

const AdminAssetRequests = () => {
  const [requests, setRequests] = useState(DUMMY_REQUESTS);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleStatusChange = (id, newStatus) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
  };

  const filteredRequests = requests.filter(req => {
    const effectiveStatus = req.status || 'PENDING';
    return (
      (statusFilter ? effectiveStatus === statusFilter : true) &&
      (categoryFilter ? req.category === categoryFilter : true)
    );
  });

  return (
    <div className="admin-service-requests">
      <h2>Asset Requests</h2>

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
          <option value="Furniture">Furniture</option>
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
                  <button onClick={() => handleStatusChange(req.id, 'APPROVED')}>APPROVE</button>
                  <button onClick={() => handleStatusChange(req.id, 'REJECTED')}>REJECT</button>
                  <button onClick={() => handleStatusChange(req.id, 'UNDER_REVIEW')}>UNDER REVIEW</button>
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
