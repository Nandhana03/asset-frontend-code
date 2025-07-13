import React from 'react';
import '../../styles/WelcomeBanner.css';
// import bannerImage from '/hello.svg'; // make sure to place this image

const WelcomeBanner = ({ name = "Admin" }) => {
  return (
    <div className="welcome-banner">
      <div className="banner-left">
        <img src="/hello.svg" alt="Welcome" className="banner-img" />
      </div>

      <div className="banner-center">
        <p className="dashboard-label">Admin Dashboard</p>
        <h2>Hi, {name}</h2>
        <p className="welcome-msg">
          Welcome to <strong>Asset Sphere</strong> 👋<br />
          Your activity will be updated here. Use this system to get and manage the assets at your convenience.
        </p>
      </div>

      <div className="banner-right">
        <div className="event-box">
          <p className="event-title">Events</p>
          <div className="event-card">
            <p className="event-name">📞 Vani Call</p>
            <p className="event-time">2:30 PM, Today</p>
          </div>
          <a href="/" className="view-all-link">View All</a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
