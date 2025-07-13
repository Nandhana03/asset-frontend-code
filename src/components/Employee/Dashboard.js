import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import DateBanner from './DateBanner';
import WelcomeBanner from './WelcomeBanner';
import SummaryCard from './SummaryCard';
import AssignedAssetsTable from './AssignedAssetsTable';

const Dashboard = () => {
  const employee = JSON.parse(localStorage.getItem('loggedInUser')) || {
    name: 'Employee',
    email: 'employee@example.com',
    id: 0,
  };

  const [stats, setStats] = useState({
    myAssets: 0,
    pendingRequests: 0,
    totalRequests: 0,
  });

  const [assets, setAssets] = useState([]);

  useEffect(() => {
    if (!employee.id) return;

    // Fetch dashboard stats
    API.get(`/dashboard/stats/${employee.id}`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error('Stats error:', err));

    // Fetch assigned assets
    API.get(`/assets/assigned/${employee.id}`)
      .then((res) => setAssets(res.data))
      .catch((err) => console.error('Asset error:', err));
  }, [employee.id]);

  return (
    <>
      <DateBanner />
      <WelcomeBanner name={employee.name} />

      <div className="summary-cards">
        <SummaryCard title="My Assets" count={stats.myAssets} />
        <SummaryCard title="Pending Requests" count={stats.pendingRequests} />
        <SummaryCard title="Total Requests" count={stats.totalRequests} />
      </div>

      <AssignedAssetsTable assets={assets} />
    </>
  );
};

export default Dashboard;



// // src/pages/Dashboard.js
// import React from 'react';
// import DateBanner from './DateBanner';
// import WelcomeBanner from './WelcomeBanner';
// import SummaryCard from './SummaryCard';
// import AssignedAssetsTable from './AssignedAssetsTable';

// const Dashboard = () => {
//   const employee = JSON.parse(localStorage.getItem('loggedInUser')) || {
//     name: 'Employee',
//     email: 'employee@example.com',
//   };

//   return (
//     <>
//       <DateBanner />
//       <WelcomeBanner name={employee.name} />
//       <div className="summary-cards">
//         <SummaryCard title="My Assets" count={4} />
//         <SummaryCard title="Pending Requests" count={2} />
//         <SummaryCard title="Total Requests" count={10} />
//       </div>

//       <AssignedAssetsTable
//         assets={[
//           {
//             id: 1,
//             name: 'MacBook Pro',
//             assetNumber: 'MBP001',
//             status: 'Active',
//             assetCondition: 'Good',
//             categoryName: 'Laptop',
//             purchasedDate: '2024-03-15',
//           },
//           {
//             id: 2,
//             name: 'HP Printer',
//             assetNumber: 'HPP002',
//             status: 'In Repair',
//             assetCondition: 'Fair',
//             categoryName: 'Peripheral',
//             purchasedDate: '2023-08-01',
//           },
//         ]}
//       />
//     </>
//   );
// };

// export default Dashboard;
