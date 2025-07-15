import React from 'react';
import '../../styles/ClientSection.css';
import { Box, Grid, Typography } from '@mui/material';

const clientLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg'
];

const ClientsSection = () => {
  return (
    <Box className="clients-container" sx={{backgroundColor:'#f9f9ff'}}>
      <Typography className="clients-heading">
        Trusted by Industry Leaders
      </Typography>
     
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {clientLogos.map((logo, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box className="client-logo-box">
              <img src={logo} alt={`client-logo-${index}`} className="client-logo" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClientsSection;
