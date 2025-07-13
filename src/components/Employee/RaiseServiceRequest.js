import React, { useState, useEffect } from 'react';
import API from '../../services/api'; // <-- Axios wrapper
import '../../styles/ServiceRequest.css';

const RaiseServiceRequest = () => {
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    issueType: '',
    description: '',
    assetId: '',
    assetName: '',
    employeeId: '',
    employeeName: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Load employee + their assets
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setFormData(prev => ({
        ...prev,
        employeeId: user.id,
        employeeName: user.name,
      }));

      // 🟩 Fetch user's assigned assets
      API.get(`/assets/assigned/${user.id}`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setAssets(res.data);
          } else {
            console.warn('⚠️ Assigned assets response not array:', res.data);
            setAssets([]);
          }
        })
        .catch((err) => {
          console.error('❌ Error fetching assigned assets:', err);
          setMessage({ type: 'error', text: 'Failed to load assets' });
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'assetId' && {
        assetName: assets.find(a => a.id === parseInt(value))?.name || ''
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    const payload = {
      ...formData,
      status: 'PENDING',
      requestDate: today,
    };

    try {
      const res = await API.post('/requests', payload);
      if (res.status === 201 || res.status === 200) {
        setMessage({ type: 'success', text: 'Service request sent successfully ✅' });
        setFormData(prev => ({
          ...prev,
          issueType: '',
          description: '',
          assetId: '',
          assetName: '',
        }));
      } else {
        setMessage({ type: 'error', text: 'Failed to send request ❌' });
      }
    } catch (error) {
      console.error('❌ Request error:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Try again later.' });
    }
  };

  return (
    <div className="request-form-container">
      <h2>Raise Service Request</h2>

      {message.text && (
        <div className={`message-box ${message.type}`}>
          <span>{message.text}</span>
          <button className="close-btn" onClick={() => setMessage({ type: '', text: '' })}>×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="request-form">
        <label>Asset</label>
        <select name="assetId" value={formData.assetId} onChange={handleChange} required>
          <option value="">Select Asset</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.assetNumber} - {asset.name}
            </option>
          ))}
        </select>

        <label>Issue Type</label>
        <select name="issueType" value={formData.issueType} onChange={handleChange} required>
          <option value="">Select Issue</option>
          <option value="HARDWARE">Hardware</option>
          <option value="SOFTWARE">Software</option>
          <option value="OTHER">Other</option>
        </select>

        <label>Description</label>
        <textarea
          name="description"
          rows="4"
          placeholder="Enter issue details or reason..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RaiseServiceRequest;





// import React, { useState, useEffect } from 'react';
// import '../../styles/ServiceRequest.css'; // Ensure this file exists

// const RaiseServiceRequest = () => {
//   // Dummy asset list (replace with real asset API later)
//   const assets = [
//     { id: 1, name: 'HP Pavilion', assetNumber: 'AS001' },
//     { id: 2, name: 'Office Chair', assetNumber: 'AS002' },
//   ];

//   const [formData, setFormData] = useState({
//     issueType: '',
//     description: '',
//     assetId: '',
//     assetName: '',
//     employeeId: '',
//     employeeName: '',
//   });

//   const [message, setMessage] = useState({ type: '', text: '' });

//   //  Load employee details from localStorage
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         employeeId: user.id,
//         employeeName: user.name,
//       }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'assetId' && {
//         assetName: assets.find(a => a.id === parseInt(value))?.name || ''
//       }),  //condititonal obj spread
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd format

//     const fullData = {
//       ...formData,
//       status: 'PENDING',
//       requestDate: today,
//     };

//     try {
//       // This is where you'd send `fullData` to backend via axios/fetch
//       console.log('Sending service request:', fullData);

//       setMessage({
//         type: 'success',
//         text: 'Service request sent successfully ✅',
//       });

//       // Reset form inputs only
//       setFormData(prev => ({
//         ...prev,
//         issueType: '',
//         description: '',
//         assetId: '',
//         assetName: '',
//       }));
//     } catch (error) {
//       setMessage({
//         type: 'error',
//         text: 'Failed to send service request ❌',
//       });
//     }
//   };

//   const handleCloseMsg = () => setMessage({ type: '', text: '' });

//   return (
//     <div className="request-form-container">
//       <h2>Raise Service Request</h2>

//       {message.text && (
//         <div className={`message-box ${message.type}`}>
//           <span>{message.text}</span>
//           <button className="close-btn" onClick={handleCloseMsg}>×</button>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="request-form">
//         <label>Asset</label>
//         <select
//           name="assetId"
//           value={formData.assetId}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Asset</option>
//           {assets.map((asset) => (
//             <option key={asset.id} value={asset.id}>
//               {asset.assetNumber} - {asset.name}
//             </option>
//           ))}
//         </select>

//         <label>Issue Type</label>
//         <select
//           name="issueType"
//           value={formData.issueType}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Issue</option>
//           <option value="HARDWARE">Hardware</option>
//           <option value="SOFTWARE">Software</option>
//           <option value="OTHER">Other</option>
//           <option value="REQUEST">Request</option>
//         </select>

//         <label>Description / Note</label>
//         <textarea
//           name="description"
//           rows="4"
//           placeholder="Enter issue details or reason..."
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default RaiseServiceRequest;
