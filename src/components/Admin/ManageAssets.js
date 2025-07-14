import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import '../../styles/ManageAssets.css';
import API from '../../services/api'; // axios instance

const ManageAssets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [assets, setAssets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [current, setCurrent] = useState({
    id: null, name: '', assetNumber: '', categoryName: '', status: 'AVAILABLE',
    assetCondition: 'GOOD', purchasedDate: '', assignedToName: '', assignedToId: 0
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await API.get('/assets');
      setAssets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const categories = ['All Categories', ...new Set(assets.map(a => a.categoryName))];
  const statusOptions = ['All Status', 'AVAILABLE', 'ASSIGNED', 'RETIRED', 'UNDER_REPAIR'];

  const filtered = assets.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.assetNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || a.categoryName === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All Status' || a.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const resetForm = () => {
    setCurrent({
      id: null, name: '', assetNumber: '', categoryName: '', status: 'AVAILABLE',
      assetCondition: 'GOOD', purchasedDate: '', assignedToName: '', assignedToId: 0
    });
    setIsEdit(false);
  };

  const openAdd = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEdit = (a) => {
    setCurrent({ ...a });
    setIsEdit(true);
    setModalOpen(true);
  };

  const deleteAsset = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this asset?");
    if (!confirmDelete) return;
    try {
      await API.delete(`/assets/${id}`);
      setAssets(prev => prev.filter(a => a.id !== id));
      setAlert({ type: 'success', message: 'Asset deleted successfully.' });
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Failed to delete asset.' });
    }
  };

  const handleSave = async () => {
    if (!current.name || !current.assetNumber || !current.categoryName || !current.purchasedDate) {
      setAlert({ type: 'error', message: 'Name, number, category & purchase date are required.' });
      return;
    }

    try {
      if (isEdit) {
        await API.put(`/assets/${current.id}`, current);
        setAlert({ type: 'success', message: 'Asset updated!' });
      } else {
        const res = await API.post('/assets', current);
        setAssets(prev => [...prev, res.data]);
        setAlert({ type: 'success', message: 'Asset added!' });
      }
      setModalOpen(false);
      fetchAssets();
      resetForm();
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Error saving asset.' });
    }
  };

  return (
    <div className="manage-assets">
      {alert.message && (
        <div className={`alert-box ${alert.type}`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert({ type: '', message: '' })}><FiX /></button>
        </div>
      )}

      <div className="header-row">
        <h2>Manage <span>Assets</span></h2>
        <button className="add-btn" onClick={openAdd}><FiPlus /> Add Asset</button>
      </div>

      <div className="filters">
        <input
          className="search-bar"
          type="text"
          placeholder="Search by name, number, category..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select
          className="dropdown"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
        </select>

        <select
          className="dropdown"
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
        >
          {statusOptions.map((status, idx) => <option key={idx} value={status}>{status}</option>)}
        </select>
      </div>

      <table className="asset-table">
        <thead>
          <tr>
            <th>Asset No</th><th>Name</th><th>Category</th>
            <th>Status</th><th>Condition</th><th>Purchased</th>
            <th>Assigned To</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(a => (
            <tr key={a.id}>
              <td>{a.assetNumber}</td>
              <td>{a.name}</td>
              <td>{a.categoryName}</td>
              <td>{a.status}</td>
              <td>{a.assetCondition}</td>
              <td>{a.purchasedDate}</td>
              <td>{a.assignedToName ? `${a.assignedToName} (${a.assignedToId})` : '-'}</td>
              <td>
                <button onClick={() => openEdit(a)}><FiEdit2 /></button>
                <button onClick={() => deleteAsset(a.id)}><FiTrash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>{isEdit ? 'Edit Asset' : 'Add Asset'}</h3>
              <button onClick={() => { setModalOpen(false); resetForm(); }}><FiX /></button>
            </div>
            <input placeholder="Name" value={current.name} onChange={e => setCurrent({ ...current, name: e.target.value })} />
            <input placeholder="Asset Number" value={current.assetNumber} onChange={e => setCurrent({ ...current, assetNumber: e.target.value })} />
            <input placeholder="Category" value={current.categoryName} onChange={e => setCurrent({ ...current, categoryName: e.target.value })} />
            <select value={current.status} onChange={e => setCurrent({ ...current, status: e.target.value })}>
              <option>AVAILABLE</option><option>ASSIGNED</option><option>RETIRED</option><option>UNDER_REPAIR</option>
            </select>
            <select value={current.assetCondition} onChange={e => setCurrent({ ...current, assetCondition: e.target.value })}>
              <option>GOOD</option><option>DAMAGED</option><option>REPAIR</option>
            </select>
            <input type="date" value={current.purchasedDate} onChange={e => setCurrent({ ...current, purchasedDate: e.target.value })} />
            <input placeholder="Assigned To Name" value={current.assignedToName} onChange={e => setCurrent({ ...current, assignedToName: e.target.value })} />
            <input type="number" placeholder="Assigned To ID" value={current.assignedToId} onChange={e => setCurrent({ ...current, assignedToId: +e.target.value })} />
            <div className="modal-actions">
              <button className="submit" onClick={handleSave}>{isEdit ? 'Update' : 'Submit'}</button>
              <button className="cancel" onClick={() => { setModalOpen(false); resetForm(); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAssets;




// import React, { useState } from 'react';
// import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
// import '../../styles/ManageAssets.css';

// const ManageAssets = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedStatus, setSelectedStatus] = useState('All');

//   const [assets, setAssets] = useState([
//     { id: 1, name: 'Dell Latitude 7420', assetNumber: 'DL-7420', category: 'GADGETS', status: 'ASSIGNED', condition: 'GOOD', purchasedDate: '2022-01-15', assignedToName: 'Alice', assignedToId: 12 },
//     { id: 2, name: 'HP EliteBook 850', assetNumber: 'HP-850', category: 'GADGETS', status: 'AVAILABLE', condition: 'GOOD', purchasedDate: '2023-03-08', assignedToName: null, assignedToId: 0 },
//     { id: 3, name: 'AC Monitor 27"', assetNumber: 'AC-001', category: 'MONITOR', status: 'RETIRED', condition: 'DAMAGED', purchasedDate: '2021-11-03', assignedToName: 'John', assignedToId: 15 },
//   ]);

//   const categories = ['All Categories', ...new Set(assets.map(a => a.category))];
//   const statusOptions = ['All Status', 'AVAILABLE', 'ASSIGNED', 'UNDER_REPAIR'];

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [current, setCurrent] = useState({
//     id: null, name: '', assetNumber: '', category: '', status: 'AVAILABLE',
//     condition: 'GOOD', purchasedDate: '', assignedToName: '', assignedToId: 0
//   });
//   const [alert, setAlert] = useState({ type: '', message: '' });

//   const filtered = assets.filter(a => {
//     const matchesSearch =
//       a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       a.assetNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       a.category.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       selectedCategory === 'All' || a.category === selectedCategory;

//     const matchesStatus =
//       selectedStatus === 'All' || a.status === selectedStatus;

//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   const resetForm = () => {
//     setCurrent({
//       id: null, name: '', assetNumber: '', category: '', status: 'AVAILABLE',
//       condition: 'GOOD', purchasedDate: '', assignedToName: '', assignedToId: 0
//     });
//     setIsEdit(false);
//   };

//   const openAdd = () => {
//     resetForm();
//     setModalOpen(true);
//   };

//   const openEdit = (a) => {
//     setCurrent({ ...a });
//     setIsEdit(true);
//     setModalOpen(true);
//   };

//   const deleteAsset = (id) => {
//     setAssets(prev => prev.filter(a => a.id !== id));
//     setAlert({ type: 'success', message: 'Asset deleted successfully.' });
//   };

//   const handleSave = () => {
//     if (!current.name || !current.assetNumber || !current.category || !current.purchasedDate) {
//       setAlert({ type: 'error', message: 'Name, number, category & purchase date are required.' });
//       return;
//     }
//     if (isEdit) {
//       setAssets(prev => prev.map(a => (a.id === current.id ? current : a)));
//       setAlert({ type: 'success', message: 'Asset updated!' });
//     } else {
//       setAssets(prev => [...prev, { ...current, id: Date.now() }]);
//       setAlert({ type: 'success', message: 'Asset added!' });
//     }
//     setModalOpen(false);
//     resetForm();
//   };

//   return (
//     <div className="manage-assets">
//       {alert.message && (
//         <div className={`alert-box ${alert.type}`}>
//           <span>{alert.message}</span>
//           <button onClick={() => setAlert({ type: '', message: '' })}><FiX /></button>
//         </div>
//       )}

//       <div className="header-row">
//         <h2>Manage <span>Assets</span></h2>
//         <button className="add-btn" onClick={openAdd}><FiPlus /> Add Asset</button>
//       </div>

//       <div className="filters">
//         <input
//           className="search-bar"
//           type="text"
//           placeholder="Search by name, number, category..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//         />

//         <select
//           className="dropdown"
//           value={selectedCategory}
//           onChange={e => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
//         </select>

//         <select
//           className="dropdown"
//           value={selectedStatus}
//           onChange={e => setSelectedStatus(e.target.value)}
//         >
//           {statusOptions.map((status, idx) => <option key={idx} value={status}>{status}</option>)}
//         </select>
//       </div>

//       <table className="asset-table">
//         <thead>
//           <tr>
//             <th>Asset No</th><th>Name</th><th>Category</th>
//             <th>Status</th><th>Condition</th><th>Purchased</th>
//             <th>Assigned To</th><th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map(a => (
//             <tr key={a.id}>
//               <td>{a.assetNumber}</td>
//               <td>{a.name}</td>
//               <td>{a.category}</td>
//               <td>{a.status}</td>
//               <td>{a.condition}</td>
//               <td>{a.purchasedDate}</td>
//               <td>{a.assignedToName ? `${a.assignedToName} (${a.assignedToId})` : '-'}</td>
//               <td>
//                 <button onClick={() => openEdit(a)}><FiEdit2 /></button>
//                 <button onClick={() => deleteAsset(a.id)}><FiTrash2 /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {modalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <div className="modal-header">
//               <h3>{isEdit ? 'Edit Asset' : 'Add Asset'}</h3>
//               <button onClick={() => { setModalOpen(false); resetForm(); }}><FiX /></button>
//             </div>
//             <input placeholder="Name" value={current.name} onChange={e => setCurrent({...current,name:e.target.value})}/>
//             <input placeholder="Asset Number" value={current.assetNumber} onChange={e => setCurrent({...current,assetNumber:e.target.value})}/>
//             <input placeholder="Category" value={current.category} onChange={e => setCurrent({...current,category:e.target.value})}/>
//             <select value={current.status} onChange={e => setCurrent({...current,status:e.target.value})}>
//               <option>AVAILABLE</option><option>ASSIGNED</option><option>RETIRED</option>
//             </select>
//             <select value={current.condition} onChange={e => setCurrent({...current,condition:e.target.value})}>
//               <option>GOOD</option><option>DAMAGED</option><option>REPAIR</option>
//             </select>
//             <input type="date" value={current.purchasedDate} onChange={e => setCurrent({...current,purchasedDate:e.target.value})}/>
//             <input placeholder="Assigned To Name" value={current.assignedToName} onChange={e => setCurrent({...current,assignedToName:e.target.value})}/>
//             <input type="number" placeholder="Assigned To ID" value={current.assignedToId} onChange={e => setCurrent({...current,assignedToId:+e.target.value})}/>
//             <div className="modal-actions">
//               <button className="submit" onClick={handleSave}>{isEdit ? 'Update' : 'Submit'}</button>
//               <button className="cancel" onClick={() => { setModalOpen(false); resetForm(); }}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageAssets;













































































































































































































































































































































































































// import React, { useState } from 'react';
// import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
// import '../../styles/ManageAssets.css';

// const ManageAssets = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [assets, setAssets] = useState([
//     { id: 1, name: 'Dell Latitude 7420', assetNumber: 'DL-7420', category: 'GADGETS', status: 'ASSIGNED', condition: 'GOOD', purchasedDate: '2022-01-15', assignedToName: 'Alice Smith', assignedToId: 12 },
//     { id: 2, name: 'HP EliteBook 850', assetNumber: 'HP-850', category: 'GADGETS', status: 'AVAILABLE', condition: 'GOOD', purchasedDate: '2023-03-08', assignedToName: null, assignedToId: 0 },
//     // add more demo assets here...
//   ]);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [current, setCurrent] = useState({
//     id: null, name: '', assetNumber: '', category: '', status: 'AVAILABLE',
//     condition: 'GOOD', purchasedDate: '', assignedToName: '', assignedToId: 0
//   });
//   const [alert, setAlert] = useState({ type: '', message: '' });

//   const filtered = assets.filter(a =>
//     a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     a.assetNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     a.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const resetForm = () => {
//     setCurrent({
//       id: null, name: '', assetNumber: '', category: '', status: 'AVAILABLE',
//       condition: 'GOOD', purchasedDate: '', assignedToName: '', assignedToId: 0
//     });
//     setIsEdit(false);
//   };

//   const openAdd = () => {
//     resetForm();
//     setModalOpen(true);
//   };

//   const openEdit = (a) => {
//     setCurrent({ ...a });
//     setIsEdit(true);
//     setModalOpen(true);
//   };

//   const deleteAsset = (id) => {
//     setAssets(prev => prev.filter(a => a.id !== id));
//     setAlert({ type: 'success', message: 'Asset deleted successfully.' });
//   };

//   const handleSave = () => {
//     if (!current.name || !current.assetNumber || !current.category || !current.purchasedDate) {
//       setAlert({ type: 'error', message: 'Name, number, category & purchase date are required.' });
//       return;
//     }
//     if (isEdit) {
//       setAssets(prev => prev.map(a => (a.id === current.id ? current : a)));
//       setAlert({ type: 'success', message: 'Asset updated!' });
//     } else {
//       setAssets(prev => [...prev, { ...current, id: Date.now() }]);
//       setAlert({ type: 'success', message: 'Asset added!' });
//     }
//     setModalOpen(false);
//     resetForm();
//   };

//   return (
//     <div className="manage-assets">
//       {alert.message && (
//         <div className={`alert-box ${alert.type}`}>
//           <span>{alert.message}</span>
//           <button onClick={() => setAlert({ type: '', message: '' })}><FiX /></button>
//         </div>
//       )}

//       <div className="header-row">
//         <h2>Manage <span>Assets</span></h2>
//         <button className="add-btn" onClick={openAdd}><FiPlus /> Add Asset</button>
//       </div>

//       <input
//         className="search-bar"
//         type="text"
//         placeholder="Search by name, number, category..."
//         value={searchTerm}
//         onChange={e => setSearchTerm(e.target.value)}
//       />

//       <table className="asset-table">
//         <thead>
//           <tr>
//             <th>Asset No</th><th>Name</th><th>Category</th>
//             <th>Status</th><th>Condition</th><th>Purchased</th>
//             <th>Assigned To</th><th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map(a => (
//             <tr key={a.id}>
//               <td>{a.assetNumber}</td>
//               <td>{a.name}</td>
//               <td>{a.category}</td>
//               <td>{a.status}</td>
//               <td>{a.condition}</td>
//               <td>{a.purchasedDate}</td>
//               <td>{a.assignedToName ? `${a.assignedToName} (${a.assignedToId})` : '-'}</td>
//               <td>
//                 <button onClick={() => openEdit(a)}><FiEdit2 /></button>
//                 <button onClick={() => deleteAsset(a.id)}><FiTrash2 /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {modalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <div className="modal-header">
//               <h3>{isEdit ? 'Edit Asset' : 'Add Asset'}</h3>
//               <button onClick={() => { setModalOpen(false); resetForm(); }}><FiX /></button>
//             </div>
//             <input placeholder="Name" value={current.name} onChange={e => setCurrent({...current,name:e.target.value})}/>
//             <input placeholder="Asset Number" value={current.assetNumber} onChange={e => setCurrent({...current,assetNumber:e.target.value})}/>
//             <input placeholder="Category" value={current.category} onChange={e => setCurrent({...current,category:e.target.value})}/>
//             <select value={current.status} onChange={e => setCurrent({...current,status:e.target.value})}>
//               <option>AVAILABLE</option><option>ASSIGNED</option><option>RETIRED</option>
//             </select>
//             <select value={current.condition} onChange={e => setCurrent({...current,condition:e.target.value})}>
//               <option>GOOD</option><option>DAMAGED</option><option>REPAIR</option>
//             </select>
//             <input type="date" value={current.purchasedDate} onChange={e => setCurrent({...current,purchasedDate:e.target.value})}/>
//             <input placeholder="Assigned To Name" value={current.assignedToName} onChange={e => setCurrent({...current,assignedToName:e.target.value})}/>
//             <input type="number" placeholder="Assigned To ID" value={current.assignedToId} onChange={e => setCurrent({...current,assignedToId:+e.target.value})}/>
//             <div className="modal-actions">
//               <button className="submit" onClick={handleSave}>{isEdit ? 'Update' : 'Submit'}</button>
//               <button className="cancel" onClick={() => { setModalOpen(false); resetForm(); }}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageAssets;