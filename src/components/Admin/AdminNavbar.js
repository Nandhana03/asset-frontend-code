import React from 'react';
import '../../styles/EmployeeNavbar.css';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'; // ✅ correct default import
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const admin = JSON.parse(localStorage.getItem('loggedInUser')) || {
    name: 'Admin',
    email: 'admin@example.com',
  };
  
  const nav=useNavigate();

  let handleNavigate=()=>{
      nav("/");
  }
  return (
    <nav className="employee-navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <h2 className="logo" onClick={handleNavigate}>Asset Sphere</h2>
      </div>

      {/* Right: Notification + Avatar */}
      <div className="navbar-right">
        <NotificationsNoneIcon
          className="notification-icon"
          style={{ fontSize: 24, cursor: 'pointer', color: '#555' }}
        />

        <div className="avatar-container">
          <Avatar
            sx={{
              bgcolor: '#0ef',
              width: 36,
              height: 36,
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            {admin.name?.charAt(0)?.toUpperCase() || 'E'}
          </Avatar>
          <span className="employee-name">{admin.name}</span>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
