import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';

// Material UI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import BuildIcon from '@mui/icons-material/Build';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {
    name: 'Employee',
    designation: 'Employee',
  };

  const menuItems = [
    { text: 'Dashboard', path: '/employee/dashboard', icon: <DashboardIcon /> },
    { text: 'My Assets', path: '/employee/my-assets', icon: <DevicesIcon /> },
    { text: 'Raise New Request', path: '/employee/raise-request', icon: <NoteAddIcon /> },
    { text: 'Raise Service Request', path: '/employee/service-request', icon: <BuildIcon /> },
    { text: 'View Request Status', path: '/employee/request-status', icon: <BarChartIcon /> },
    { text: 'View Audits', path: '/employee/audits', icon: <FactCheckIcon /> },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="sidebar">

      <ul className="sidebar-nav">
        {menuItems.map((item) => (
          <li
            key={item.text}
            onClick={() => navigate(item.path)}
            className={`sidebar-item ${location.pathname === item.path ? 'active-link' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.text}
          </li>
        ))}
      </ul>

      <button className="sidebar-logout" onClick={handleLogout}>
        <LogoutIcon style={{ marginRight: '8px' }} />
        Log Out
      </button>

      <div className="sidebar-footer">
        <AccountCircleIcon className="footer-avatar" />
        <div className="profile-info">
          <p className="profile-name">{loggedInUser.name}</p>
          <p className="profile-role">{loggedInUser.designation}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
