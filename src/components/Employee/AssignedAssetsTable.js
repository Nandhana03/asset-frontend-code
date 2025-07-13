import React from 'react';
import '../../styles/AssignedAssetsTable.css';

const AssignedAssetsTable = ({ assets }) => {
  return (
    <div className="assigned-assets-container">
      <h3 className="table-heading">Assigned Assets</h3>
      {assets.length === 0 ? (
        <p className="no-assets-msg">No assets assigned.</p>
      ) : (
        <div className="table-wrapper">
          <table className="assets-table">
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Asset Number</th>
                <th>Status</th>
                <th>Condition</th>
                <th>Category</th>
                <th>Purchased Date</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.name}</td>
                  <td>{asset.assetNumber}</td>
                  <td>{asset.status}</td>
                  <td>{asset.assetCondition}</td>
                  <td>{asset.categoryName}</td>
                  <td>{asset.purchasedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedAssetsTable;
