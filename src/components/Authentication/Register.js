import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import API from '../../services/api'; // 🔥 Axios instance
import '../../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    department: '',
    designation: '',
    joinDate: '',
    role: '',
  });

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setInvalidEmail(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      formData.role === 'admin' &&
      !formData.email.toLowerCase().includes('admin')
    ) {
      setInvalidEmail(true);
      return;
    }

    try {
      const payload = {
        ...formData,
        joinDate: formData.role === 'employee' ? formData.joinDate : null,
      };

      const response = await API.post('/auth/register', payload);
      setSuccess(response.data);

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-wrapper">
          <img
            src="/login.svg"
            alt="register"
            className="register-image"
          />

          <Box className="register-form">
            <Typography variant="h5" gutterBottom>
              Register
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
                error={invalidEmail}
                helperText={
                  invalidEmail ? 'Admin email must contain "admin"' : ''
                }
                margin="normal"
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                label="Contact Number"
                name="contactNumber"
                fullWidth
                required
                value={formData.contactNumber}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                label="Department"
                name="department"
                fullWidth
                required
                value={formData.department}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                select
                label="Role"
                name="role"
                fullWidth
                required
                value={formData.role}
                onChange={handleChange}
                margin="normal"
              >
                <MenuItem value="" disabled>
                  -- Select Role --
                </MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>

              {formData.role === 'employee' && (
                <>
                  <TextField
                    label="Designation"
                    name="designation"
                    fullWidth
                    required
                    value={formData.designation}
                    onChange={handleChange}
                    margin="normal"
                  />

                  <TextField
                    label="Join Date"
                    name="joinDate"
                    type="date"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    value={formData.joinDate}
                    onChange={handleChange}
                    margin="normal"
                  />
                </>
              )}

              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </form>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default Register;



// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   Alert,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../common/Navbar';
// import '../../styles/Register.css'; 

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     contactNumber: '',
//     department: '',
//     designation: '',
//     joinDate: '',
//     role: '',
//   });

//   const [invalidEmail, setInvalidEmail] = useState(false); // for admin side validation of email
//   const [error, setError] = useState(''); // duplicate email errors
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'email') setInvalidEmail(false);
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       formData.role === 'admin' &&
//       !formData.email.toLowerCase().includes('admin')
//     ) {
//       setInvalidEmail(true);
//       return;
//     }

//     const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

//     const isDuplicate = existingUsers.some(
//       (user) => user.email === formData.email
//     );

//     if (isDuplicate) {
//       setError('User with this email already exists');
//       return;
//     }

//     const updatedUsers = [...existingUsers, formData];
//     localStorage.setItem('users', JSON.stringify(updatedUsers));

//     alert('Registration successful!');
//     navigate('/login');
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="register-container">
//         <div className="register-wrapper">
//           <img
//             src="/login.svg"
//             alt="register"
//             className="register-image"
//           />

//           <Box className="register-form">
//             <Typography variant="h5" gutterBottom>
//               Register
//             </Typography>

//             <form onSubmit={handleSubmit}>
//               <TextField
//                 label="Name"
//                 name="name"
//                 fullWidth
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 margin="normal"
//               />

//               <TextField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 fullWidth
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={invalidEmail}
//                 helperText={
//                   invalidEmail ? 'Admin email must contain "admin"' : ''
//                 }
//                 margin="normal"
//               />

//               <TextField
//                 label="Password"
//                 name="password"
//                 type="password"
//                 fullWidth
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 margin="normal"
//               />

//               <TextField
//                 label="Contact Number"
//                 name="contactNumber"
//                 fullWidth
//                 required
//                 value={formData.contactNumber}
//                 onChange={handleChange}
//                 margin="normal"
//               />

//               <TextField
//                 label="Department"
//                 name="department"
//                 fullWidth
//                 required
//                 value={formData.department}
//                 onChange={handleChange}
//                 margin="normal"
//               />

//               <TextField
//                 select
//                 label="Role"
//                 name="role"
//                 fullWidth
//                 required
//                 value={formData.role}
//                 onChange={handleChange}
//                 margin="normal"
//               >
//                 <MenuItem value="" disabled>
//                   -- Select Role --
//                 </MenuItem>
//                 <MenuItem value="employee">Employee</MenuItem>
//                 <MenuItem value="admin">Admin</MenuItem>
//               </TextField>

//               {formData.role === 'employee' && (
//                 <>
//                   <TextField
//                     label="Designation"
//                     name="designation"
//                     fullWidth
//                     required
//                     value={formData.designation}
//                     onChange={handleChange}
//                     margin="normal"
//                   />

//                   <TextField
//                     label="Join Date"
//                     name="joinDate"
//                     type="date"
//                     fullWidth
//                     required
//                     InputLabelProps={{ shrink: true }}
//                     value={formData.joinDate}
//                     onChange={handleChange}
//                     margin="normal"
//                   />
//                 </>
//               )}

//               <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//                 Register
//               </Button>
//             </form>

//             {error && (
//               <Alert severity="error" sx={{ mt: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             {invalidEmail && (
//               <Alert severity="error" sx={{ mt: 2 }}>
//                 Admin email must contain the word "admin"
//               </Alert>
//             )}
//           </Box>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
