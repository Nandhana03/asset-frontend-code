import React from 'react';
import '../../styles/Footer.css';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';

const Footer = () => {
  return (
    <Box className="footer-container">
      <Grid container spacing={4}>
        {/* Product Section */}
        <Grid item xs={12} sm={6} md={3} className="footer-column">
          <Typography className="footer-heading">Product</Typography>
          <Typography className="footer-link">Employee Assets</Typography>
          <Typography className="footer-link">Asset Tracking</Typography>
          <Typography className="footer-link">Asset Management</Typography>
          <Typography className="footer-link">Asset Service</Typography>
        </Grid>

        {/* Information Section */}
        <Grid item xs={12} sm={6} md={3} className="footer-column">
          <Typography className="footer-heading">Information</Typography>
          <Typography className="footer-link">FAQ</Typography>
          <Typography className="footer-link">Blog</Typography>
          <Typography className="footer-link">Support</Typography>
        </Grid>

        {/* Company Section */}
        <Grid item xs={12} sm={6} md={3} className="footer-column">
          <Typography className="footer-heading">Company</Typography>
          <Typography className="footer-link">About us</Typography>
          <Typography className="footer-link">Careers</Typography>
          <Typography className="footer-link">Contact us</Typography>
        </Grid>

        {/* Contact Form Section */}
        <Grid item xs={12} sm={6} md={3} className="footer-column">
          <Typography className="footer-heading">Contact Our Team</Typography>
          <Box className="footer-contact">
            <TextField
              placeholder="Email address"
              size="small"
              fullWidth
              variant="outlined"
            />
            <Button variant="contained">→</Button>
          </Box>
          <Typography variant="caption" color="textSecondary">
            Hello, we are Asset Sphere. Our goal is to translate the positive effects
            from revolutionizing how companies engage with their employees & assets.
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom bar */}
      <Box className="footer-bottom">
        <Typography variant="body2">
          © {new Date().getFullYear()} Asset Sphere • Terms • Privacy • Cookies
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
