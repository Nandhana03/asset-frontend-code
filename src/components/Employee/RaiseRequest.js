import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import '../../styles/BrowseAssets.css';

const RaiseRequest = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestedAssetIds, setRequestedAssetIds] = useState([]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
      console.log('Fetched categories:', res.data);
    } catch (err) {
      console.error('❌ Category fetch error:', err);
    }
  };

  // Fetch available assets
  const fetchAssets = async () => {
    try {
      setLoading(true);
      const res = await API.get('/assets/status/AVAILABLE');
      if (Array.isArray(res.data)) {
        setAssets(res.data);
      } else {
        console.error('⚠️ Assets response not an array:', res.data);
        setAssets([]);
      }
    } catch (err) {
      console.error('❌ Asset fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch requested asset IDs
  const fetchRequestedAssets = async () => {
    try {
      const res = await API.get('/requests');
      const ids = res.data
        .filter(r => r.status === 'PENDING' || r.status === 'APPROVED')
        .map(r => r.assetId);
      console.log("🛑 Requested asset IDs:", ids);
      setRequestedAssetIds(ids);
    } catch (err) {
      console.error("❌ Error fetching requests:", err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCategories();
    fetchAssets();
    fetchRequestedAssets();
  }, []);

  // Filter assets
  useEffect(() => {
    const filtered = Array.isArray(assets)
      ? assets.filter((asset) => {
          const matchesSearch =
            asset.name.toLowerCase().includes(search.toLowerCase()) ||
            asset.assetNumber.toLowerCase().includes(search.toLowerCase());

          const matchesCategory =
            category === '' || asset.categoryName === category;

          const isAvailable =
            asset.status === 'AVAILABLE' &&
            asset.assetCondition === 'GOOD' &&
            !asset.assignedToName &&
            !asset.purchasedDate;

          const isRequested = requestedAssetIds.includes(asset.id);

          return matchesSearch && matchesCategory && isAvailable && !isRequested;
        })
      : [];

    setFilteredAssets(filtered);
  }, [search, category, assets, requestedAssetIds]);

  // Handle asset request
  const handleRequest = async (asset) => {
    const confirm = window.confirm(`Request asset "${asset.name}"?`);
    if (!confirm) return;

    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user || !user.id || !user.name) {
      setMessage({ type: 'error', text: 'User info missing. Please login again.' });
      return;
    }

    const payload = {
      issueType: 'REQUEST',
      description: `Requesting asset ${asset.name}`,
      status: 'PENDING',
      requestDate: new Date().toISOString().split('T')[0],
      assetId: asset.id,
      assetName: asset.name,
      employeeId: user.id,
      employeeName: user.name
    };

    try {
      const res = await API.post('/requests', payload);
      if (res.status === 200 || res.status === 201) {
        setMessage({ type: 'success', text: `Request sent for ${asset.name}` });

        // Refresh data
        setTimeout(() => {
          fetchAssets();
          fetchRequestedAssets();
        }, 300);
      } else {
        setMessage({ type: 'error', text: 'Failed to send request. Try again.' });
      }
    } catch (err) {
      console.error('❌ Request error:', err);
      setMessage({ type: 'error', text: 'Something went wrong. Try again later.' });
    }
  };

  return (
    <div className="browse-assets">
      <h2>📝 Raise New Request</h2>
      <p>Discover and request available assets.</p>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by name or number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Message Box */}
      {message && (
        <div className={`message-box ${message.type}`}>
          {message.text}
          <button className="close-btn" onClick={() => setMessage(null)}>❌</button>
        </div>
      )}

      {/* Loading */}
      {loading && <p>Loading assets...</p>}

      {/* Asset Cards */}
      <div className="asset-list">
        {!loading && filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <div className="asset-card" key={asset.id}>
              <img src='/assets.png' alt={asset.name} className="asset-image" />
              <div className="asset-info">
                <p><strong>Asset No:</strong> {asset.assetNumber}</p>
                <p><strong>Name:</strong> {asset.name}</p>
                <p><strong>Category:</strong> {asset.categoryName}</p>
              </div>
              <button className="request-btn" onClick={() => handleRequest(asset)}>
                REQUEST THIS
              </button>
            </div>
          ))
        ) : (
          !loading && <p>No available assets found </p>
        )}
      </div>
    </div>
  );
};

export default RaiseRequest;






// import React, { useState, useEffect } from 'react';
// import API from '../../services/api';
// import '../../styles/BrowseAssets.css';

// const RaiseRequest = () => {
//   const [assets, setAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('');
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const res = await API.get('/categories');
//       setCategories(res.data);
//       console.log("Fetched categories:", res.data);
//     } catch (err) {
//       console.error('Category fetch error:', err);
//       setMessage({ type: 'error', text: 'Failed to load categories' });
//     }
//   };

//   // Fetch assets
//   const fetchAssets = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get('/assets/status/AVAILABLE');
//       setAssets(res.data);
//     } catch (err) {
//       console.error('Asset fetch error:', err);
//       setMessage({ type: 'error', text: 'Failed to load assets' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchAssets();
//   }, []);

//   // Filter assets based on criteria
//   useEffect(() => {
//     const filtered = assets.filter((asset) => {
//       const matchesSearch =
//         asset.name.toLowerCase().includes(search.toLowerCase()) ||
//         asset.assetNumber.toLowerCase().includes(search.toLowerCase());

//       const matchesCategory =
//         category === '' || asset.categoryName === category;

//       const isAvailable =
//         asset.status === 'AVAILABLE' &&
//         asset.assetCondition === 'GOOD' &&
//         !asset.assignedToName && !asset.purchasedDate;

//       return matchesSearch && matchesCategory && isAvailable;
//     });

//     setFilteredAssets(filtered);
//   }, [search, category, assets]);

//   // Handle asset request
//   const handleRequest = async (asset) => {
//     const confirm = window.confirm(`Request asset "${asset.name}"?`);
//     if (!confirm) return;

//     const user = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (!user || !user.id || !user.name) {
//       setMessage({ type: 'error', text: 'User info missing. Please login again.' });
//       return;
//     }

//     const payload = {
//       issueType: 'REQUEST',
//       description: `Requesting asset ${asset.name}`,
//       status: 'PENDING',
//       requestDate: new Date().toISOString().split('T')[0],
//       assetId: asset.id,
//       assetName: asset.name,
//       employeeId: user.id,
//       employeeName: user.name
//     };

//     try {
//       const res = await API.post('/requests', payload);
//       if (res.status === 201 || res.status === 200) {
//         setMessage({ type: 'success', text: `Request sent for ${asset.name}` });
//         fetchAssets(); // Refresh list
//       } else {
//         setMessage({ type: 'error', text: 'Failed to send request. Try again.' });
//       }
//     } catch (err) {
//       console.error('Request error:', err);
//       setMessage({ type: 'error', text: 'Something went wrong. Try again later.' });
//     }
//   };

//   return (
//     <div className="browse-assets">
//       <h2>📝 Raise New Request</h2>
//       <p>Discover and request available assets.</p>

//       {/* Filters */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="🔍 Search by name or number"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.name}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Message */}
//       {message && (
//         <div className={`message-box ${message.type}`}>
//           {message.text}
//           <button className="close-btn" onClick={() => setMessage(null)}>❌</button>
//         </div>
//       )}

//       {/* Loading */}
//       {loading && <p>Loading assets...</p>}

//       {/* Asset Cards */}
//       <div className="asset-list">
//         {!loading && filteredAssets.length > 0 ? (
//           filteredAssets.map((asset) => (
//             <div className="asset-card" key={asset.id}>
//               <img src={asset.imageUrl} alt={asset.name} className="asset-image" />
//               <div className="asset-info">
//                 <p><strong>Asset No:</strong> {asset.assetNumber}</p>
//                 <p><strong>Name:</strong> {asset.name}</p>
//                 <p><strong>Category:</strong> {asset.categoryName}</p>
//               </div>
//               <button className="request-btn" onClick={() => handleRequest(asset)}>
//                 REQUEST THIS
//               </button>
//             </div>
//           ))
//         ) : (
//           !loading && <p>No available assets found 😕</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RaiseRequest;




// import React, { useState, useEffect } from 'react';
// import '../../styles/BrowseAssets.css'; // Your shared CSS

// const RaiseRequest = () => {
//   const [assets, setAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('');
//   const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }

//   const dummyAssets = [
//     {
//       id: 1,
//       name: 'HP Pavilion',
//       assetNumber: 'A001',
//       categoryName: 'GADGETS',
//       status: 'AVAILABLE',
//       assetCondition: 'GOOD',
//       assignedToName: null,
//       imageUrl: 'https://cdn.pixabay.com/photo/2015/01/21/14/14/macbook-606763_1280.jpg'
//     },
//     {
//       id: 2,
//       name: 'Office Chair',
//       assetNumber: 'A002',
//       categoryName: 'Furnitures',
//       status: 'AVAILABLE',
//       assetCondition: 'GOOD',
//       assignedToName: null,
//       imageUrl: '/chair.jpeg'
//     },
//     {
//       id: 3,
//       name: 'Broken Laptop',
//       assetNumber: 'A003',
//       categoryName: 'GADGETS',
//       status: 'AVAILABLE',
//       assetCondition: 'DAMAGED',
//       assignedToName: null,
//       imageUrl: 'https://cdn.pixabay.com/photo/2014/05/02/21/50/home-office-336377_1280.jpg'
//     }
//   ];

//   useEffect(() => {
//     setAssets(dummyAssets);
//   }, []);

//   useEffect(() => {
//     const result = assets.filter((asset) => {
//       const matchesSearch =
//         asset.name.toLowerCase().includes(search.toLowerCase()) ||
//         asset.assetNumber.toLowerCase().includes(search.toLowerCase());

//       const matchesCategory = category === '' || asset.categoryName === category;

//       const isAvailable =
//         asset.status === 'AVAILABLE' &&
//         asset.assetCondition === 'GOOD' &&
//         !asset.assignedToName;

//       return matchesSearch && matchesCategory && isAvailable;
//     });

//     setFilteredAssets(result);
//   }, [search, category, assets]);
  
//   // When data changes over time (like fetching from backend), 
//   // you don’t want to re-run the filter logic on every render.

//   const handleRequest = (asset) => {
//     // Dummy response
//     setTimeout(() => {
//       const success = Math.random() > 0.3;
//       setMessage(
//         success
//           ? { type: 'success', text: `Request sent for ${asset.name}` }
//           : { type: 'error', text: 'Failed to send request. Try again.' }
//       );
//     }, 300);
//   };

//   return (
//     <div className="browse-assets">
//       <h2>📝 Raise New Request</h2>
//       <p>Discover and request available assets.</p>

//       {/*  Filters */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="🔍 Search by name or number"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="">Category</option>
//           <option value="GADGETS">GADGETS</option>
//           <option value="Furnitures">Furnitures</option>
//         </select>
//       </div>

//       {/* Message Box */}
//       {message && (
//         <div className={`message-box ${message.type}`}>
//           {message.text}
//           <button className="close-btn" onClick={() => setMessage(null)}>❌</button>
//         </div>
//       )}

//       {/* Asset Cards */}
//       <div className="asset-list">
//         {filteredAssets.length > 0 ? (
//           filteredAssets.map((asset) => (
//             <div className="asset-card" key={asset.id}>
//               <img src={asset.imageUrl} alt={asset.name} className="asset-image" />
//               <div className="asset-info">
//                 <p><strong>Asset No:</strong> {asset.assetNumber}</p>
//                 <p><strong>Name:</strong> {asset.name}</p>
//                 <p><strong>Category:</strong> {asset.categoryName}</p>
//               </div>
//               <button className="request-btn" onClick={() => handleRequest(asset)}>
//                 REQUEST THIS
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No available assets found </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RaiseRequest;















































































































































































































































































































































































// import React, { useState, useEffect } from 'react';
// import '../../styles/BrowseAssets.css'; // Your shared CSS

// const RaiseRequest = () => {
//   const [assets, setAssets] = useState([]);
//   const [filteredAssets, setFilteredAssets] = useState([]);
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('');
//   const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }

//   const dummyAssets = [
//     {
//       id: 1,
//       name: 'HP Pavilion',
//       assetNumber: 'A001',
//       categoryName: 'GADGETS',
//       status: 'AVAILABLE',
//       assetCondition: 'GOOD',
//       assignedToName: null,
//       imageUrl: 'https://cdn.pixabay.com/photo/2015/01/21/14/14/macbook-606763_1280.jpg'
//     },
//     {
//       id: 2,
//       name: 'Office Chair',
//       assetNumber: 'A002',
//       categoryName: 'Furnitures',
//       status: 'AVAILABLE',
//       assetCondition: 'GOOD',
//       assignedToName: null,
//       imageUrl: '/chair.jpeg'
//     },
//     {
//       id: 3,
//       name: 'Broken Laptop',
//       assetNumber: 'A003',
//       categoryName: 'GADGETS',
//       status: 'AVAILABLE',
//       assetCondition: 'DAMAGED',
//       assignedToName: null,
//       imageUrl: 'https://cdn.pixabay.com/photo/2014/05/02/21/50/home-office-336377_1280.jpg'
//     }
//   ];

//   useEffect(() => {
//     // 👉 Replace with real fetch later
//     // fetch("/api/assets/status/AVAILABLE")
//     //   .then(res => res.json())
//     //   .then(data => setAssets(data));
//     setAssets(dummyAssets);
//   }, []);

//   useEffect(() => {
//     const result = assets.filter((asset) => {
//       const matchesSearch =
//         asset.name.toLowerCase().includes(search.toLowerCase()) ||
//         asset.assetNumber.toLowerCase().includes(search.toLowerCase());

//       const matchesCategory = category === '' || asset.categoryName === category;

//       const isAvailable =
//         asset.status === 'AVAILABLE' &&
//         asset.assetCondition === 'GOOD' &&
//         !asset.assignedToName;

//       return matchesSearch && matchesCategory && isAvailable;
//     });

//     setFilteredAssets(result);
//   }, [search, category, assets]);
  
//   // When data changes over time (like fetching from backend), 
//   // you don’t want to re-run the filter logic on every render.

//   const handleRequest = (asset) => {
//     //  Replace with real POST logic to /api/requests
//     // fetch("/api/requests", {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify({
//     //     issueType: "REQUEST",
//     //     description: `Requesting asset ${asset.name}`,
//     //     assetId: asset.id,
//     //     assetName: asset.name,
//     //     employeeId: 101, // from local/session
//     //     employeeName: "Nandhana", // from local/session
//     //     status: "PENDING",
//     //     requestDate: new Date().toISOString().split("T")[0]
//     //   })
//     // }).then(...)

//     // ⏱ Dummy response
//     setTimeout(() => {
//       const success = Math.random() > 0.3;
//       setMessage(
//         success
//           ? { type: 'success', text: `Request sent for ${asset.name}` }
//           : { type: 'error', text: 'Failed to send request. Try again.' }
//       );
//     }, 300);
//   };

//   return (
//     <div className="browse-assets">
//       <h2>📝 Raise New Request</h2>
//       <p>Discover and request available assets.</p>

//       {/* 🔍 Filters */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="🔍 Search by name or number"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="">Category</option>
//           <option value="GADGETS">GADGETS</option>
//           <option value="Furnitures">Furnitures</option>
//         </select>
//       </div>

//       {/* 📨 Message Box */}
//       {message && (
//         <div className={`message-box ${message.type}`}>
//           {message.text}
//           <button className="close-btn" onClick={() => setMessage(null)}>❌</button>
//         </div>
//       )}

//       {/* 🖼️ Asset Cards */}
//       <div className="asset-list">
//         {filteredAssets.length > 0 ? (
//           filteredAssets.map((asset) => (
//             <div className="asset-card" key={asset.id}>
//               <img src={asset.imageUrl} alt={asset.name} className="asset-image" />
//               <div className="asset-info">
//                 <p><strong>Asset No:</strong> {asset.assetNumber}</p>
//                 <p><strong>Name:</strong> {asset.name}</p>
//                 <p><strong>Category:</strong> {asset.categoryName}</p>
//               </div>
//               <button className="request-btn" onClick={() => handleRequest(asset)}>
//                 REQUEST THIS
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No available assets found 😕</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RaiseRequest;
