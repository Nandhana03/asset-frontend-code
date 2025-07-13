import React, { useEffect, useState } from 'react';
import '../../styles/RequestStatus.css'; //your external stylesheet

const RequestStatus = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      assetId: 'A10015',
      assetName: 'Keypad',
      issueType: 'HARDWARE',
      status: 'PENDING',
      requestDate: '08-05-2025',
    },
    {
      id: 2,
      assetId: 'A10007',
      assetName: 'Office Desk',
      issueType: 'OTHER',
      status: 'APPROVED',
      requestDate: '21-02-2025',
    },
  ]);

  const [filteredRequests, setFilteredRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [issueFilter, setIssueFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    let filtered = [...requests];

    if (search.trim()) {
      filtered = filtered.filter(
        (r) =>
          r.assetName.toLowerCase().includes(search.toLowerCase()) ||
          r.assetId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (issueFilter) {
      filtered = filtered.filter((r) => r.issueType === issueFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    setFilteredRequests(filtered);
  }, [search, issueFilter, statusFilter, requests]);

  return (
    <div className="request-status">
      <h2 className="title">📊 View Service Request</h2>
      <p className="subtitle">
        View all your Service Requests made so far
      </p>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by Asset Name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={issueFilter} onChange={(e) => setIssueFilter(e.target.value)}>
          <option value="">All Issues</option>
          <option value="HARDWARE">Hardware</option>
          <option value="SOFTWARE">Software</option>
          <option value="OTHER">Other</option>
          <option value="REQUEST">Request</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="RESOLVED">Resolved</option>
          <option value="REJECTED">Rejected</option>
          <option value="UNDER_REVIEW">Under Review</option>
        </select>
      </div>

      {/* Table */}
      <table className="service-table">
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Name</th>
            <th>Issue Type</th>
            <th>Status</th>
            <th>Req Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No service requests found.</td>
            </tr>
          ) : (
            filteredRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.assetId}</td>
                <td>{req.assetName}</td>
                <td>{req.issueType}</td>
                <td className="status-cell">{req.status}</td>
                <td>{req.requestDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestStatus;
