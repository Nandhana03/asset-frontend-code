import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import '../../styles/MyAssets.css';

const MyAssets = () => {
  const conditionDisplay = {
    GOOD: 'Working',
    MAINTENANCE: 'Under Service',
    DAMAGED: 'Damaged',
  };

  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');

  const employee = JSON.parse(localStorage.getItem('loggedInUser')) || {};

  useEffect(() => {
    if (!employee.id) return;

    API.get(`/assets/assigned/${employee.id}`)
      .then((res) => {
        const assignedAssets = res.data;
        setAssets(assignedAssets);

        const uniqueCats = [
          ...new Set(assignedAssets.map((a) => a.categoryName)),
        ];
        setCategories(uniqueCats);
      })
      .catch((err) => {
        console.error('Failed to fetch assets:', err);
        setAssets([]);
      });
  }, [employee.id]);

  const filteredAssets = assets.filter((asset) => {
    const searchMatch =
      asset.assetNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchText.toLowerCase());

    const categoryMatch =
      selectedCategory === '' || asset.categoryName === selectedCategory;

    const conditionMatch =
      selectedCondition === '' || asset.assetCondition === selectedCondition;

    return searchMatch && categoryMatch && conditionMatch;
  });

  return (
    <div className="my-assets">
      <h2>💼 My Assets</h2>
      <p>This is where you’ll see all the assets assigned to you.</p>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by name or asset no"
          className="search-bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="dropdown"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="dropdown"
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
        >
          <option value="">Condition</option>
          <option value="GOOD">Working</option>
          <option value="MAINTENANCE">Under Service</option>
          <option value="DAMAGED">Damaged</option>
        </select>
      </div>

      {/* Table */}
      <div className="asset-table">
        {filteredAssets.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Asset No</th>
                <th>Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Purchased Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, idx) => (
                <tr key={idx}>
                  <td>{asset.assetNumber}</td>
                  <td>{asset.name}</td>
                  <td style={{ fontSize: '1.5rem' }}>💻</td>
                  <td>{asset.categoryName}</td>
                  <td>{conditionDisplay[asset.assetCondition]}</td>
                  <td>{asset.purchasedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ padding: '1rem' }}>No matching assets found</p>
        )}
      </div>
    </div>
  );
};

export default MyAssets;





// import React, { useState } from 'react';
// import '../../styles/MyAssets.css'; 

// const MyAssets = () => {
//   // Mapping backend enum to user-friendly labels
//   const conditionDisplay = {
//     GOOD: 'Working',
//     MAINTENANCE: 'Under Service',
//     DAMAGED: 'Damaged',
//   };

//   const statusDisplay = {
//     AVAILABLE: 'Available',
//     ASSIGNED: 'Assigned',
//     UNDER_REPAIR: 'Under Repair',
//   };

//   // Dummy asset list structured like AssetDTO (plus image)
//   const originalAssets = [
//     {
//       assetNumber: '001',
//       name: 'Laptop',
//       image: '💻',
//       categoryName: 'Electronics',
//       status: 'ASSIGNED',
//       assetCondition: 'GOOD',
//       purchasedDate: '2024-12-31',
//       assignedToName: 'Nandhana Vivek',
//     },
//     {
//       assetNumber: '002',
//       name: 'Projector',
//       image: '📽️',
//       categoryName: 'Electronics',
//       status: 'ASSIGNED',
//       assetCondition: 'MAINTENANCE',
//       purchasedDate: '2023-06-15',
//       assignedToName: 'Nandhana Vivek',
//     },
//     {
//       assetNumber: '003',
//       name: 'Mobile Phone',
//       image: '📱',
//       categoryName: 'Electronics',
//       status: 'ASSIGNED',
//       assetCondition: 'GOOD',
//       purchasedDate: '2023-09-30',
//       assignedToName: 'Nandhana Vivek',
//     },
//     {
//       assetNumber: '004',
//       name: 'Monitor',
//       image: '🖥️',
//       categoryName: 'Electronics',
//       status: 'ASSIGNED',
//       assetCondition: 'DAMAGED',
//       purchasedDate: '2024-11-10',
//       assignedToName: 'Nandhana Vivek',
//     },
//   ];

//   const [searchText, setSearchText] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedCondition, setSelectedCondition] = useState('');

//   // Filter logic
//   const filteredAssets = originalAssets.filter((asset) => {
//     const searchMatch =
//       asset.assetNumber.toLowerCase().includes(searchText.toLowerCase()) ||
//       asset.name.toLowerCase().includes(searchText.toLowerCase());

//     const categoryMatch =
//       selectedCategory === '' || asset.categoryName === selectedCategory;

//     const conditionMatch =
//       selectedCondition === '' || asset.assetCondition === selectedCondition;

//     return searchMatch && categoryMatch && conditionMatch;
//   });

//   return (
//     <div className="my-assets">
//       <h2>💼 My Assets</h2>
//       <p>This is where you’ll see all the assets assigned to you.</p>

//       {/* Filters */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="🔍 Search by name or asset no"
//           className="search-bar"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />

//         <select
//           className="dropdown"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">Category</option>
//           <option value="Electronics">Electronics</option>
//           <option value="Furniture">Furniture</option>
//         </select>

//         <select
//           className="dropdown"
//           value={selectedCondition}
//           onChange={(e) => setSelectedCondition(e.target.value)}
//         >
//           <option value="">Condition</option>
//           <option value="GOOD">Working</option>
//           <option value="MAINTENANCE">Under Service</option>
//           <option value="DAMAGED">Damaged</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div className="asset-table">
//         {filteredAssets.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>Asset No</th>
//                 <th>Name</th>
//                 <th>Image</th>
//                 <th>Category</th>
//                 <th>Condition</th>
//                 <th>Purchased Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredAssets.map((asset, idx) => (
//                 <tr key={idx}>
//                   <td>{asset.assetNumber}</td>
//                   <td>{asset.name}</td>
//                   <td style={{ fontSize: '1.5rem' }}>{asset.image}</td>
//                   <td>{asset.categoryName}</td>
//                   <td>{conditionDisplay[asset.assetCondition]}</td>
//                   <td>{asset.purchasedDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p style={{ padding: '1rem' }}>No matching assets found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyAssets;
