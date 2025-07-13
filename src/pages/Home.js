import React from 'react';
import Navbar from '../components/common/Navbar'
import HeroSection from '../components/common/HeroSection';
import ClientsSection from '../components/common/ClientsSection';
import Footer from '../components/common/Footer';
import {Box} from '@mui/material'
const Home = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ height: '8px' }} />
      <HeroSection />
      <ClientsSection />
      <Footer />
    </>
  );
};

export default Home;
