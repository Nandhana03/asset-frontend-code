// src/pages/Dashboard.js
import React from 'react';
import DateBanner from '../Employee/DateBanner';
import WelcomeBanner from './WelcomeBanner';
import SummaryCard from './SummaryCard';
// import AssignedAssetsTable from './AssignedAssetsTable';

const Dashboard = () => {
  const admin = JSON.parse(localStorage.getItem('loggedInUser')) || {
    name: 'Admin',
    email: 'admin@example.com',
  };

  return (
    <>
      <DateBanner />
      <WelcomeBanner name={admin.name} />
      <div className="summary-cards">
        <SummaryCard title="Total Assets" count={51} />
        <SummaryCard title="Total Employees" count={46} />
        <SummaryCard title="Service Requests" count={20} />
        <SummaryCard title="Pending Requests" count={10} />
        {/* <SummaryCard title="Total Requests" count={10} /> */}
      </div>

      
    </>
  );
};

export default Dashboard;
