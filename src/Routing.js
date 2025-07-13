// src/Routing.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import NotFound from './pages/NotFound';

// NEW
import EmployeeDashboardLayout from './pages/EmployeeDashboard';
import Dashboard from './components/Employee/Dashboard';
import MyAssets from './components/Employee/MyAssets';
import RaiseRequest from './components/Employee/RaiseRequest';
import ServiceRequest from './components/Employee/RaiseServiceRequest';
import RequestStatus from './components/Employee/RequestStatus';
import AdminDashboardLayout from './pages/AdminDashboard';
import AdminDashboard from './components/Admin/Dashboard.js'
import AssignedAssets from './components/Admin/AssignedAssets.js';
import ManageCategories from './components/Admin/ManageCategories.js';
import ManageAssets from './components/Admin/ManageAssets.js';
import AdminServiceRequests from './components/Admin/ServiceRequests.js';
import AdminAssetRequests from './components/Admin/AssetRequests.js';
import AdminAuditPage from './components/Admin/AdminAuditPage.js'
import EmployeeAuditPage from './components/Employee/EmployeeAuditPage.js';
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Nested Routes for Employee Section */}
      <Route path="/employee" element={<EmployeeDashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-assets" element={<MyAssets />} />
        <Route path="raise-request" element={<RaiseRequest />} />
        <Route path="service-request" element={<ServiceRequest />} />
        <Route path="request-status" element={<RequestStatus />} />
        <Route path="audits" element={<EmployeeAuditPage />} />
      </Route>

      <Route path="/admin" element={<AdminDashboardLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="assigned-assets" element={<AssignedAssets />} />
        <Route path="raised-asset-request" element={<AdminAssetRequests />} />
        <Route path="raised-service-request" element={<AdminServiceRequests />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="assets" element={<ManageAssets />} />
        <Route path="audit" element={<AdminAuditPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
