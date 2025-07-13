import React from 'react';
import '../../styles/SummaryCard.css';

const SummaryCard = ({ title, count }) => {
  return (
    <div className="summary-card">
      <div className="summary-title">{title}</div>
      <div className="summary-count">{count!=0?count: 0}</div>
    </div>
  );
};

export default SummaryCard;
