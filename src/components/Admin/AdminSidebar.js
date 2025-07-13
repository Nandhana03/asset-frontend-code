import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';

// Icons
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import CategoryIcon from '@mui/icons-material/Category';
import DevicesIcon from '@mui/icons-material/Devices';
import RuleIcon from '@mui/icons-material/Rule';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {
    name: 'Admin',
    role: 'Admin',
  };

  const menuItems = [
    { text: 'Dashboard', path: '/admin/dashboard', icon: <SpaceDashboardIcon /> },
    { text: 'Assigned Assets', path: '/admin/assigned-assets', icon: <Inventory2OutlinedIcon /> },
    { text: 'View Asset Requests', path: '/admin/raised-asset-request', icon: <AssignmentTurnedInIcon /> },
    { text: 'View Service Requests', path: '/admin/raised-service-request', icon: <MiscellaneousServicesIcon /> },
    { text: 'Manage Categories', path: '/admin/categories', icon: <CategoryIcon /> },
    { text: 'Manage Assets', path: '/admin/assets', icon: <DevicesIcon /> },
    { text: 'Manage Audits', path: '/admin/audit', icon: <RuleIcon /> },
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
          <p className="profile-role">{loggedInUser.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
