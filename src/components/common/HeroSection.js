// import React from 'react';
// import { Grid, Typography, Button, Box } from '@mui/material';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// const HeroSection = () => {
//   return (
//     <Box sx={{ backgroundColor: '#f9fafb', paddingY: 8, paddingX: 4 }}>
//       <Grid container spacing={4} alignItems="center">
//         {/* Left Text Column */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="subtitle1" sx={{ color: '#5932EA', fontWeight: 600, mb: 2 }}>
//             Welcome to ASSET SPHERE
//           </Typography>

//           <Typography variant="h3" sx={{ fontWeight: 700, color: '#0f172a', mb: 3 }}>
//             Organize, Track And Empower..!
//           </Typography>

//           <Typography sx={{ fontSize: '1.25rem', color: '#475569', mb: 3 }}>
//             Asset Management Reimagined For Your Workforce.
//             <br />
//             <span style={{ color: '#5932EA', fontWeight: 600 }}>With Asset Sphere.</span>
//           </Typography>

//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Button variant="contained" size="large" sx={{ textTransform: 'none' }}>
//               Know More
//             </Button>
//             <Button variant="outlined" size="large" sx={{ textTransform: 'none' }} startIcon={<PlayCircleOutlineIcon />}>
//               View Demo
//             </Button>
//           </Box>
//         </Grid>

//         {/* Right Image Column */}
//         <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
//           <Box component="img"
//                src="/home.svg"
//                alt="hero-img"
//                sx={{
//                  width: '100%',
//                  maxWidth: 300,
//                  height: 'auto',
//                }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default HeroSection;

// import React from 'react';
// import { Grid, Typography, Button, Box } from '@mui/material';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// const HeroSection = () => {
//   return (
//     <Box sx={{ backgroundColor: '#f9f9ff', py: 8, px: 4 }}>
//       <Grid container spacing={4} alignItems="center">
//         {/* Left Text Column */}
//         <Grid item xs={12} md={6}>
//           <Typography
//             variant="subtitle1"
//             sx={{ color: '#5932EA', fontWeight: 600, mb: 2,fontSize: '1.25rem' }}
//           >
//             Welcome to ASSET SPHERE
//           </Typography>

//           <Typography
//             variant="h3"
//             sx={{ fontWeight: 700, color: '#1e1b2e', mb: 3 }}
//           >
//             Organize, Track And Empower..!
//           </Typography>

//           <Typography
//             sx={{ fontSize: '1.25rem', color: '#475569', mb: 3 }}
//           >
//             Asset Management Reimagined For Your Workforce.
//             <br />
//             <span style={{ color: '	#5932EA', fontWeight: 600 }}>
//               With Asset Sphere.
//             </span>
//           </Typography>

//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Button
//               variant="contained"
//               size="large"
//               sx={{
//                 textTransform: 'none',
//                 backgroundColor: '#5932EA',
//                 '&:hover': {
//                   backgroundColor: '#4a29c9',
//                 },
//               }}
//             >
//               Know More
//             </Button>

//             <Button
//               variant="outlined"
//               size="large"
//               startIcon={<PlayCircleOutlineIcon />}
//               sx={{
//                 textTransform: 'none',
//                 color: '#5932EA',
//                 borderColor: '#5932EA',
//                 '&:hover': {
//                   borderColor: '#4a29c9',
//                   backgroundColor: '#f1f0ff',
//                 },
//               }}
//             >
//               View Demo
//             </Button>
//           </Box>
//         </Grid>

//         {/* Right Image Column */}
//         <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
//           <Box
//             component="img"
//             src="/home.svg"
//             alt="hero-img"
//             sx={{
//               width: '100%',
//               maxWidth: 300,
//               height: 'auto',
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default HeroSection;

import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const HeroSection = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9ff', py: 8, px: 4 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="space-between">
        {/* Left Text Column */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{
              color: '#5932EA',
              fontWeight: 600,
              mb: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Welcome to ASSET SPHERE
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1e1b2e',
              mb: 2.5,
              fontSize: '2.2rem',
              lineHeight: 1.3,
            }}
          >
            Organize, Track And Empower..!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem',
              color: '#475569',
              mb: 3,
              lineHeight: 1.7,
            }}
          >
            Asset Management Reimagined For Your Workforce.
            <br />
            <span style={{ color: '#5932EA', fontWeight: 600 }}>
              With Asset Sphere.
            </span>
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                textTransform: 'none',
                backgroundColor: '#5932EA',
                fontSize: '0.95rem',
                px: 3,
                '&:hover': {
                  backgroundColor: '#4a29c9',
                },
              }}
            >
              Know More
            </Button>

            <Button
              variant="outlined"
              size="medium"
              startIcon={<PlayCircleOutlineIcon />}
              sx={{
                textTransform: 'none',
                fontSize: '0.95rem',
                color: '#5932EA',
                borderColor: '#5932EA',
                px: 3,
                '&:hover': {
                  borderColor: '#4a29c9',
                  backgroundColor: '#f1f0ff',
                },
              }}
            >
              View Demo
            </Button>
          </Box>
        </Grid>

        {/* Right Image Column */}
        <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
          <Box
            component="img"
            src="/home.svg"
            alt="hero-img"
            sx={{
              width: '100%',
              maxWidth: 360,
              height: 'auto',
              mr: { xs: 0, md: +27 }, // shift image a bit right on medium+ screens
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
