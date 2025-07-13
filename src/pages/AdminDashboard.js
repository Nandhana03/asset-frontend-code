// // import React from 'react';
// // import EmployeeNavbar from '../components/Employee/EmployeeNavbar';
// // import Sidebar from '../components/Employee/Sidebar';
// // import WelcomeBanner from '../components/Employee/WelcomeBanner';
// // import DateBanner from '../components/Employee/DateBanner';
// // import SummaryCard from '../components/Employee/SummaryCard';
// // import AssignedAssetsTable from '../components/Employee/AssignedAssetsTable';
// // import '../styles/EmployeeDashboard.css';
// // import EventCard from '../components/Employee/EventsCard';

// // const EmployeeDashboard = () => {
// //   const employee = JSON.parse(localStorage.getItem('loggedInUser')) || {
// //     name: 'Employee',
// //     email: 'employee@example.com',
// //   };

// //   return (
// //     <div className="employee-dashboard">
// //       {/* Top Navbar */}
// //       <EmployeeNavbar />

// //       {/* Main Layout */}
// //       <div className="dashboard-body">
// //         <Sidebar />

// //         <div className="dashboard-main">
// //           {/* Date & Welcome Banner */}
// //           <DateBanner />
// //           <WelcomeBanner name={employee.name} />

// //           {/* Summary Cards */}
          
// //           <div className="summary-cards">
// //             <SummaryCard title="My Assets" count={4} />
// //             <SummaryCard title="Pending Requests" count={2} />
// //             <SummaryCard title="Total Requests" count={10} />
// //           </div>
         
// //           {/* Event Section
// // <div className="event-section">
// //   <h3 style={{ marginBottom: '12px' }}>🗓️ Upcoming Events</h3>
// //   <EventCard
// //     title="Laptop Maintenance"
// //     description="Quarterly checkup scheduled for your MacBook Pro."
// //     date="08 July 2025"
// //   />
// //   <EventCard
// //     title="License Renewal"
// //     description="Adobe License needs renewal before 15 July."
// //     date="12 July 2025"
// //   />
// // </div> */}

// //           {/* Assigned Assets Table */}
// //           <AssignedAssetsTable
// //             assets={[
// //               {
// //                 id: 1,
// //                 name: 'MacBook Pro',
// //                 assetNumber: 'MBP001',
// //                 status: 'Active',
// //                 assetCondition: 'Good',
// //                 categoryName: 'Laptop',
// //                 purchasedDate: '2024-03-15',
// //               },
// //               {
// //                 id: 2,
// //                 name: 'HP Printer',
// //                 assetNumber: 'HPP002',
// //                 status: 'In Repair',
// //                 assetCondition: 'Fair',
// //                 categoryName: 'Peripheral',
// //                 purchasedDate: '2023-08-01',
// //               },
// //             ]}
// //           />
          
// //         </div>
// //       </div>
// //     // </div>
// //   );
// // };

// // export default EmployeeDashboard;


// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import EmployeeNavbar from '../components/Employee/EmployeeNavbar';
// import Sidebar from '../components/Employee/Sidebar';
// import WelcomeBanner from '../components/Employee/WelcomeBanner';
// import DateBanner from '../components/Employee/DateBanner';
// import SummaryCard from '../components/Employee/SummaryCard';
// import AssignedAssetsTable from '../components/Employee/AssignedAssetsTable';
// import EventCard from '../components/Employee/EventsCard';
// import MyAssets from '../components/Employee/MyAssets';
// import RaiseRequest from '../components/Employee/RaiseRequest';
// import ServiceRequest from '../components/Employee/ServiceRequest';
// import RequestStatus from '../components/Employee/RequestStatus';
// import '../styles/EmployeeDashboard.css';

// const EmployeeDashboard = () => {
//   const location = useLocation();

//   const employee = JSON.parse(localStorage.getItem('loggedInUser')) || {
//     name: 'Employee',
//     email: 'employee@example.com',
//   };

//   const renderContent = () => {
//     switch (location.pathname) {
//       case '/employee/dashboard':
//         return (
//           <>
//             <DateBanner />
//             <WelcomeBanner name={employee.name} />

//             <div className="summary-cards">
//               <SummaryCard title="My Assets" count={4} />
//               <SummaryCard title="Pending Requests" count={2} />
//               <SummaryCard title="Total Requests" count={10} />
//             </div>

//             {/* Optional: Event Section */}
//             {/* <EventCard title="Laptop Maintenance" description="Quarterly checkup..." date="08 July 2025" /> */}

//             <AssignedAssetsTable
//               assets={[
//                 {
//                   id: 1,
//                   name: 'MacBook Pro',
//                   assetNumber: 'MBP001',
//                   status: 'Active',
//                   assetCondition: 'Good',
//                   categoryName: 'Laptop',
//                   purchasedDate: '2024-03-15',
//                 },
//                 {
//                   id: 2,
//                   name: 'HP Printer',
//                   assetNumber: 'HPP002',
//                   status: 'In Repair',
//                   assetCondition: 'Fair',
//                   categoryName: 'Peripheral',
//                   purchasedDate: '2023-08-01',
//                 },
//               ]}
//             />
//           </>
//         );

//       case '/employee/my-assets':
//         return <MyAssets />;

//       case '/employee/raise-request':
//         return <RaiseRequest />;

//       case '/employee/service-request':
//         return <ServiceRequest />;

//       case '/employee/request-status':
//         return <RequestStatus />;

//       default:
//         return <p>🔍 Page not found.</p>;
//     }
//   };

//   return (
//     <div className="employee-dashboard">
//       <EmployeeNavbar />
//       <div className="dashboard-body">
//         <Sidebar />
//         <div className="dashboard-main">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;


// 3--------------------------------------------

// src/pages/EmployeeDashboard.js (aka Layout)
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/Admin/AdminNavbar';
import Sidebar from '../components/Admin/AdminSidebar';
import '../styles/EmployeeDashboard.css';

const AdminDashboardLayout = () => {
  return (
    <div className="employee-dashboard">
      <AdminNavbar />

      <div className="dashboard-body">
        <Sidebar />

        {/* Content will load here */}
        <div className="dashboard-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
