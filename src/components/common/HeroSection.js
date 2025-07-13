import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const HeroSection = () => {
  return (
    <Box sx={{ backgroundColor: '#f9fafb', paddingY: 8, paddingX: 4 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Text Column */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ color: '#2563eb', fontWeight: 600, mb: 2 }}>
            Welcome to ASSET SPHERE
          </Typography>

          <Typography variant="h3" sx={{ fontWeight: 700, color: '#0f172a', mb: 3 }}>
            Organize, Track And Empower..!
          </Typography>

          <Typography sx={{ fontSize: '1.25rem', color: '#475569', mb: 3 }}>
            Asset Management Reimagined For Your Workforce.
            <br />
            <span style={{ color: '#2563eb', fontWeight: 600 }}>With Asset Sphere.</span>
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" size="large" sx={{ textTransform: 'none' }}>
              Know More
            </Button>
            <Button variant="outlined" size="large" sx={{ textTransform: 'none' }} startIcon={<PlayCircleOutlineIcon />}>
              View Demo
            </Button>
          </Box>
        </Grid>

        {/* Right Image Column */}
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <Box component="img"
               src="/home.svg"
               alt="hero-img"
               sx={{
                 width: '100%',
                 maxWidth: 300,
                 height: 'auto',
               }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
