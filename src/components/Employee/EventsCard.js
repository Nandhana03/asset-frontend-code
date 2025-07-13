import React from 'react';
import '../../styles/EventCard.css';
import EventIcon from '@mui/icons-material/Event';

const EventCard = ({ title, description, date }) => {
  return (
    <div className="event-card">
      <div className="event-icon">
        <EventIcon style={{ fontSize: 28 }} />
      </div>
      <div className="event-info">
        <h4 className="event-title">{title}</h4>
        <p className="event-description">{description}</p>
        <p className="event-date">{date}</p>
      </div>
    </div>
  );
};

export default EventCard;
