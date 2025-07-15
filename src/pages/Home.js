import React from 'react';
import Navbar from '../components/common/Navbar'
import HeroSection from '../components/common/HeroSection';
import ClientsSection from '../components/common/ClientsSection';
import Footer from '../components/common/Footer';
import {Box} from '@mui/material'
import Benefits from '../components/common/Benefits';
import Features from '../components/common/Features';
import IoTSection from '../components/common/IoTSection';
const Home = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ height: '8px' }} />
      <HeroSection />
      <Benefits/>
      <Features/>
      <IoTSection/>
      <ClientsSection />
      <Footer />
    </>
  );
};

export default Home;
