import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import '../../styles/DateBanner.css';

const DateBanner = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="date-banner">
      <CalendarMonthIcon className="date-icon" />
      <span className="date-text">{formattedDate}</span>
    </div>
  );
};

export default DateBanner;
