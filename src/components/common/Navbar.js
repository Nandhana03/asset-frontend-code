import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/NavbarUpdates.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <AppBar
        position="static"
        elevation={0}
        className="navbar-container"
        sx={{ backgroundColor: '#ffffff' }}
      >
        <Toolbar style={{ justifyContent: 'space-between' }}>
          {/* Brand Title */}
          <Typography
            variant="h6"
            className="navbar-title"
            onClick={() => navigate('/')}
          >
            Asset Sphere
          </Typography>

          {/* Navigation Links */}
          <Box className="navbar-links">
            <Button>Products</Button>
            <Button>Solutions</Button>
            <Button>Resources</Button>
            <Button>Pricing</Button>
          </Box>

          {/* Auth Buttons */}
          <Box className="navbar-buttons">
            <Button variant="outlined" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="contained" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
