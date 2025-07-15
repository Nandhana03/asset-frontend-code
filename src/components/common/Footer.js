import React from 'react';
import '../../styles/Footer.css';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';

const Footer = () => {
  return (
    <Box className="footer-container">
      <Grid container spacing={4} justifyContent="space-between">
        {/* Left Columns Group */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={4}>
            {/* Product Section */}
            <Grid item xs={12} sm={6} md={4} className="footer-column">
              <Typography className="footer-heading" sx={{ color: '#C084FC' }}>Product</Typography>
              <Typography className="footer-link">Employee Assets</Typography>
              <Typography className="footer-link">Asset Tracking</Typography>
              <Typography className="footer-link">Asset Management</Typography>
              <Typography className="footer-link">Asset Service</Typography>
            </Grid>

            {/* Information Section */}
            <Grid item xs={12} sm={6} md={4} className="footer-column">
              <Typography className="footer-heading">Information</Typography>
              <Typography className="footer-link">FAQ</Typography>
              <Typography className="footer-link">Blog</Typography>
              <Typography className="footer-link">Support</Typography>
            </Grid>

            {/* Company Section */}
            <Grid item xs={12} sm={6} md={4} className="footer-column">
              <Typography className="footer-heading">Company</Typography>
              <Typography className="footer-link">About us</Typography>
              <Typography className="footer-link">Careers</Typography>
              <Typography className="footer-link">Contact us</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Contact Form */}
        <Grid
          item
          xs={12}
          md={3}
          className="footer-column"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            ml: { md: -1 }, // moved a bit more left
          }}
        >
          <Typography className="footer-heading">Contact Our Team</Typography>
          <Box className="footer-contact">
            <TextField
              placeholder="Email"
              size="small"
              variant="outlined"
              fullWidth
              InputProps={{
                sx: {
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  height: '36px',
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#C084FC',
                minWidth: '36px',
                padding: '0 10px',
                fontSize: '1.2rem',
                lineHeight: 1,
                '&:hover': {
                  backgroundColor: '#a75ef5',
                },
              }}
            >
              →
            </Button>
          </Box>
          <Typography className="footer-caption">
            Hello, we are Asset Sphere. Our goal is to translate the positive effects
            from revolutionizing how companies engage with their employees & assets.
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom Bar */}
      <Box className="footer-bottom">
        <Typography variant="body2">
          © {new Date().getFullYear()} Asset Sphere • Terms • Privacy • Cookies
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
