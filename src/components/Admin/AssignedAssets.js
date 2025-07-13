import React, { useState } from 'react';
import '../../styles/AssignedAssets.css';
import { FaUserFriends, FaLaptop, FaCheckCircle } from 'react-icons/fa';

const AssignedAssets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('name');

  const [employees, setEmployees] = useState([
    {
      name: 'Santhosh S',
      department: 'HR',
      phone: '9988773322',
      email: 'santhosh@example.com',
      assets: ['HP A15 Laptop'],
      status: true,
    },
    {
      name: 'Rohit Sharma',
      department: 'Software Development',
      phone: '9987773322',
      email: 'rohit@example.com',
      assets: ['HP Laptop', 'iPhone 13'],
      status: false,
    },
    {
      name: 'Dhoni Mahender',
      department: 'Quality Assurance',
      phone: '9955773322',
      email: 'dhoni@example.com',
      assets: ['Mac Book air M2'],
      status: false,
    },
    {
      name: 'Surya Kumar',
      department: 'Software Development',
      phone: '9438773322',
      email: 'surya@example.com',
      assets: ['Lenovo Monitor'],
      status: true,
    },
    {
      name: 'Kiran Kumar',
      department: 'HR',
      phone: '9621773322',
      email: 'kiran@example.com',
      assets: ['iPhone 15 Pro'],
      status: true,
    },
    {
      name: 'Ajay Venkat',
      department: 'Quality Assurance',
      phone: '9985433322',
      email: 'ajay@example.com',
      assets: ['Dell D1717 Laptop'],
      status: true,
    },
    {
      name: 'Sandeep Raj',
      department: 'IT Support',
      phone: '9789773322',
      email: 'sandeep@example.com',
      assets: ['iPhone 13 Pro'],
      status: true,
    },
    {
      name: 'Sowmiya R',
      department: 'HR',
      phone: '9988903322',
      email: 'sowmiya@example.com',
      assets: ['Mac Book air M1'],
      status: false,
    },
  ]);

  const totalEmployees = employees.length;
  const assetsAllocated = employees.filter(e => e.assets.length > 0).length;
  const activeNow = employees.filter(e => e.status).length;

  const filteredEmployees = employees
    .filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortType === 'name') return a.name.localeCompare(b.name);
      if (sortType === 'status') return b.status - a.status;
      return 0;
    });

  return (
    <div className="assigned-assets">
      <h2>Assigned Assets</h2>

      {/* Top Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon-wrap"><FaUserFriends className="icon" /></div>
          <div>
            <h3>{totalEmployees.toLocaleString()}</h3>
            <p>Total Employees</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-wrap"><FaLaptop className="icon" /></div>
          <div>
            <h3>{assetsAllocated.toLocaleString()}</h3>
            <p>Assets Allocated</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-wrap"><FaCheckCircle className="icon" /></div>
          <div>
            <h3>{activeNow}</h3>
            <p>Active Now</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="employee-table">
        <div className="table-controls">
          <input
            type="text"
            placeholder="Search by name, dept or phone"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="sort-dropdown"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="name">Sort by: Name (A-Z)</option>
            <option value="status">Sort by: Status (Active First)</option>
          </select>
        </div>

        <table className="emp-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Phone Number</th>
              <th>Asset Allocated</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, i) => (
              <tr key={i}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.phone}</td>
                <td>{emp.assets.join(' and ')}</td>
                <td>{emp.email}</td>
                <td>
                  <span className={`status ${emp.status ? 'active' : 'inactive'}`}>
                    {emp.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedAssets;
