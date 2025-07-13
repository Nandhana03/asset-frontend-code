import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Alert,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import API from '../../services/api';
import '../../styles/Login.css';

const Login = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setEmailError(false);

    if (role === 'ADMIN' && !username.toLowerCase().includes('admin')) {
      setEmailError(true);
      return;
    }

    try {
      // Step 1: Login
      const res = await API.post('/auth/login', {
        username,
        password,
      });

      const { token, role: userRole } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      // Step 2: Fetch user details
      const userRes = await API.get('/auth/me');
      localStorage.setItem('loggedInUser', JSON.stringify(userRes.data));

      // Step 3: Navigate to respective dashboard
      navigate(
        userRole.toLowerCase() === 'admin'
          ? '/admin/dashboard'
          : '/employee/dashboard'
      );
    } catch (err) {
      setErrorMsg(err.response?.data || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <Grid container className="login-container">
        {/* Left Side: Form */}
        <Grid item xs={12} md={6} className="login-form-section">
          <Box className="login-form-box">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Login Page
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Please login to continue to your account.
            </Typography>

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            {emailError && (
              <Alert severity="error">Admin email must contain "admin"</Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                error={emailError}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                select
                fullWidth
                label="Select Role"
                margin="normal"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setEmailError(false);
                }}
                required
              >
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="EMPLOYEE">Employee</MenuItem>
              </TextField>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                }
                label="Keep me logged in"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="login-btn"
                disabled={!username || !password || !role}
              >
                Sign in
              </Button>

              <Box className="or-divider">or</Box>

              <Button
                variant="outlined"
                fullWidth
                startIcon={
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                    alt="google"
                    width={18}
                  />
                }
              >
                Sign in with Google
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Need an account?{' '}
                <span
                  style={{ color: '#2563eb', cursor: 'pointer' }}
                  onClick={() => navigate('/register')}
                >
                  Create one
                </span>
              </Typography>
            </form>
          </Box>
        </Grid>

        {/* Right Side: Illustration */}
        <Grid item xs={12} md={6} className="login-image-section">
          <Box className="image-box">
            <img
              src="/login.svg"
              alt="login-illustration"
              className="login-image"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;


// import React, { useState } from 'react';
// import {
//   Typography,
//   TextField,
//   Button,
//   Box,
//   MenuItem,
//   Alert,
//   Grid,
//   Checkbox,
//   FormControlLabel,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../common/Navbar';
// import API from '../../services/api';
// import '../../styles/Login.css';

// const Login = () => {
//   const [role, setRole] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [remember, setRemember] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');
//     setEmailError(false);

//     if (role === 'ADMIN' && !username.toLowerCase().includes('admin')) {
//       setEmailError(true);
//       return;
//     }

//     try {
//       const res = await API.post('/auth/login', {
//         username,
//         password,
//       });

//       const { token, role: userRole } = res.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', userRole);

//       navigate(
//         userRole.toLowerCase() === 'admin'
//           ? '/admin/dashboard'
//           : '/employee/dashboard'
//       );
//     } catch (err) {
//       setErrorMsg(err.response?.data || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Grid container className="login-container">
//         {/* Left Side: Form */}
//         <Grid item xs={12} md={6} className="login-form-section">
//           <Box className="login-form-box">
//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//               Login Page
//             </Typography>
//             <Typography variant="body2" color="textSecondary" gutterBottom>
//               Please login to continue to your account.
//             </Typography>

//             {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
//             {emailError && (
//               <Alert severity="error">Admin email must contain "admin"</Alert>
//             )}

//             <form onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 margin="normal"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 error={emailError}
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 type="password"
//                 margin="normal"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <TextField
//                 select
//                 fullWidth
//                 label="Select Role"
//                 margin="normal"
//                 value={role}
//                 onChange={(e) => {
//                   setRole(e.target.value);
//                   setEmailError(false);
//                 }}
//                 required
//               >
//                 <MenuItem value="ADMIN">Admin</MenuItem>
//                 <MenuItem value="EMPLOYEE">Employee</MenuItem>
//               </TextField>

//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={remember}
//                     onChange={() => setRemember(!remember)}
//                   />
//                 }
//                 label="Keep me logged in"
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 className="login-btn"
//                 disabled={!username || !password || !role}
//               >
//                 Sign in
//               </Button>

//               <Box className="or-divider">or</Box>

//               <Button
//                 variant="outlined"
//                 fullWidth
//                 startIcon={
//                   <img
//                     src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
//                     alt="google"
//                     width={18}
//                   />
//                 }
//               >
//                 Sign in with Google
//               </Button>

//               <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//                 Need an account?{' '}
//                 <span
//                   style={{ color: '#2563eb', cursor: 'pointer' }}
//                   onClick={() => navigate('/register')}
//                 >
//                   Create one
//                 </span>
//               </Typography>
//             </form>
//           </Box>
//         </Grid>

//         {/* Right Side: Illustration */}
//         <Grid item xs={12} md={6} className="login-image-section">
//           <Box className="image-box">
//             <img
//               src="/login.svg"
//               alt="login-illustration"
//               className="login-image"
//             />
//           </Box>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default Login;



// ui ------------------------------------
// import React, { useState } from 'react';
// import {
//   Typography,
//   TextField,
//   Button,
//   Box,
//   MenuItem,
//   Alert,
//   Grid,
//   Checkbox,
//   FormControlLabel,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../common/Navbar';
// import '../../styles/Login.css';

// const Login = () => {
//   const [role, setRole] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [remember, setRemember] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrorMsg('');
//     setEmailError(false);

//     if (role === 'ADMIN' && !username.toLowerCase().includes('admin')) {
//       setEmailError(true);
//       return;
//     }

//     const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

//    const matchedUser = registeredUsers.find(
//   (user) =>
//     user.email === username &&
//     user.password === password &&
//     user.role.toUpperCase() === role.toUpperCase()
// );


//     if (matchedUser) {
//       localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
//       navigate(
//         matchedUser.role === 'admin' //ADMIN
//           ? '/admin/dashboard'
//           : '/employee/dashboard'
//       );
//     } else {
//       setErrorMsg('Invalid credentials or role.');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Grid container className="login-container">
//         {/* Left Side: Form */}
//         <Grid item xs={12} md={6} className="login-form-section">
//           <Box className="login-form-box">
//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//               Login Page
//             </Typography>
//             <Typography variant="body2" color="textSecondary" gutterBottom>
//               Please login to continue to your account.
//             </Typography>

//             {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
//             {emailError && (
//               <Alert severity="error">Admin email must contain "admin"</Alert>
//             )}

//             <form onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 margin="normal"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 error={emailError}
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 type="password"
//                 margin="normal"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <TextField
//                 select
//                 fullWidth
//                 label="Select Role"
//                 margin="normal"
//                 value={role}
//                 onChange={(e) => {
//                   setRole(e.target.value);
//                   setEmailError(false);
//                 }}
//                 required
//               >
//                 <MenuItem value="ADMIN">Admin</MenuItem>
//                 <MenuItem value="EMPLOYEE">Employee</MenuItem>
//               </TextField>

//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={remember}
//                     onChange={() => setRemember(!remember)}
//                   />
//                 }
//                 label="Keep me logged in"
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 className="login-btn"
//                 disabled={!username || !password || !role}
//               >
//                 Sign in
//               </Button>

//               <Box className="or-divider">or</Box>

//               <Button
//                 variant="outlined"
//                 fullWidth
//                 startIcon={
//                   <img
//                     src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
//                     alt="google"
//                     width={18}
//                   />
//                 }
//               >
//                 Sign in with Google
//               </Button>

//               <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//                 Need an account?{' '}
//                 <span
//                   style={{ color: '#2563eb', cursor: 'pointer' }}
//                   onClick={() => navigate('/register')}
//                 >
//                   Create one
//                 </span>
//               </Typography>
//             </form>
//           </Box>
//         </Grid>

//         {/* Right Side: Illustration */}
//         <Grid item xs={12} md={6} className="login-image-section">
//           <Box className="image-box">
//             <img
//               src="/login.svg"
//               alt="login-illustration"
//               className="login-image"
//             />
//           </Box>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default Login;
