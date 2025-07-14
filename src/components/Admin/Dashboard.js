import React, { useEffect, useState } from "react";
import DateBanner from "../Employee/DateBanner";
import WelcomeBanner from "./WelcomeBanner";
import SummaryCard from "./SummaryCard";
import API from "../../services/api"; // axios instance with token

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAssets: 0,
    totalEmployees: 0,
    serviceRequests: 0,
    pendingRequests: 0,
  });

  const admin = JSON.parse(localStorage.getItem("loggedInUser")) || {
    name: "Admin",
    email: "admin@example.com",
  };

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <>
      <DateBanner />
      <WelcomeBanner name={admin.name} />

      <div className="summary-cards">
        <SummaryCard title="Total Assets" count={stats.totalAssets} />
        <SummaryCard title="Total Employees" count={stats.totalEmployees} />
        <SummaryCard title="Service Requests" count={stats.totalServiceRequests} />
        <SummaryCard title="Pending Requests" count={stats.pendingServiceRequests} />
      </div>
    </>
  );
};

export default Dashboard;





// // src/pages/Dashboard.js
// import React from 'react';
// import DateBanner from '../Employee/DateBanner';
// import WelcomeBanner from './WelcomeBanner';
// import SummaryCard from './SummaryCard';
// // import AssignedAssetsTable from './AssignedAssetsTable';

// const Dashboard = () => {
//   const admin = JSON.parse(localStorage.getItem('loggedInUser')) || {
//     name: 'Admin',
//     email: 'admin@example.com',
//   };

//   return (
//     <>
//       <DateBanner />
//       <WelcomeBanner name={admin.name} />
//       <div className="summary-cards">
//         <SummaryCard title="Total Assets" count={51} />
//         <SummaryCard title="Total Employees" count={46} />
//         <SummaryCard title="Service Requests" count={20} />
//         <SummaryCard title="Pending Requests" count={10} />
//         {/* <SummaryCard title="Total Requests" count={10} /> */}
//       </div>

      
//     </>
//   );
// };

// export default Dashboard;
