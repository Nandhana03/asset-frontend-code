import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import NotFound from './pages/NotFound';

// Layouts
import EmployeeDashboardLayout from './pages/EmployeeDashboard';
import AdminDashboardLayout from './pages/AdminDashboard';

// Employee Components
import Dashboard from './components/Employee/Dashboard';
import MyAssets from './components/Employee/MyAssets';
import RaiseRequest from './components/Employee/RaiseRequest';
import ServiceRequest from './components/Employee/RaiseServiceRequest';
import RequestStatus from './components/Employee/RequestStatus';
import EmployeeAuditPage from './components/Employee/EmployeeAuditPage';

// Admin Components
import AdminDashboard from './components/Admin/Dashboard';
import AssignedAssets from './components/Admin/AssignedAssets';
import ManageCategories from './components/Admin/ManageCategories';
import ManageAssets from './components/Admin/ManageAssets';
import AdminServiceRequests from './components/Admin/ServiceRequests';
import AdminAssetRequests from './components/Admin/AssetRequests';
import AdminAuditPage from './components/Admin/AdminAuditPage';

// Protected Route
import ProtectedRoute from './ProtectedRoute';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="assigned-assets" element={<AssignedAssets />} />
        <Route path="raised-asset-request" element={<AdminAssetRequests />} />
        <Route path="raised-service-request" element={<AdminServiceRequests />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="assets" element={<ManageAssets />} />
        <Route path="audit" element={<AdminAuditPage />} />
      </Route>

      {/* Protected Employee Routes */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={['EMPLOYEE']}>
            <EmployeeDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-assets" element={<MyAssets />} />
        <Route path="raise-request" element={<RaiseRequest />} />
        <Route path="service-request" element={<ServiceRequest />} />
        <Route path="request-status" element={<RequestStatus />} />
        <Route path="audits" element={<EmployeeAuditPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
