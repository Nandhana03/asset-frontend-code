import React from "react";
import { Container, Typography, Box } from "@mui/material";
import '../../styles/IoTSection.css';

const IoTSection = () => {
  return (
    <Box className="iot-section">
      <Container maxWidth="lg">
        <Box className="iot-wrapper">
          {/* Left - Image */}
          <Box className="iot-left">
            <img src="/iot.png" alt="IoT Meter Reading" className="iot-img" />
          </Box>

          {/* Right - Text */}
          <Box className="iot-right">
            <Typography variant="h5" className="iot-title">
              IoT Meter Reading
            </Typography>
            <Typography className="iot-text">
              In traditional asset management, manual readings and routine inspections were
              common, leading to reactive practices and missed intervention opportunities.
              <br /><br />
              IoT Meter Reading changes this by continuously monitoring an asset’s critical
              parameters in real-time — such as temperature, torque, and rotor speed — through
              intelligent sensors. These readings allow the system to detect anomalies and trigger
              intelligent work orders proactively.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IoTSection;
