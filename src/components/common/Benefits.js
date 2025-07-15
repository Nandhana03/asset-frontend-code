import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Collapse,
  Box,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import '../../styles/Benefits.css';

const benefitData = [
  {
    title: "Improves Asset Life Cycle",
    description:
      "Track every stage of the asset journey—from procurement to retirement. Gain full control over asset performance.",
  },
  {
    title: "Maximize Asset Lifetime",
    description:
      "Perform preventive maintenance to extend equipment life and reduce capital replacement costs.",
  },
  {
    title: "Minimize Downtime and MTTR",
    description:
      "Detect issues early and fix them faster using real-time analytics and automation workflows.",
  },
  {
    title: "Increased Productivity",
    description:
      "Empower your team with a centralized platform, reducing time spent searching for asset details or paperwork.",
  },
  {
    title: "Eliminate Paperwork",
    description:
      "Digitize work orders, maintenance logs, and asset records to reduce manual errors and clutter.",
  },
  {
    title: "Reduces Maintenance Expenses",
    description:
      "Lower costs by minimizing emergency repairs, enabling predictive maintenance, and automating alerts.",
  },
];

const Benefits = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Box sx={{ backgroundColor: "#fff", py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 2, color: "#5932EA", fontWeight: 600 }}
        >
          What are the Benefits of Asset Hub Management Software
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{
            mb: 5,
            color: "#555",
            maxWidth: "700px",
            mx: "auto",
            fontSize: "1rem",
            lineHeight: 1.7,
          }}
        >
          Asset Hub Software is designed to transform how you manage your valuable
          assets. Optimize your entire asset life cycle and track maintenance proactively.
        </Typography>

        <Box className="benefits-wrapper">
          {benefitData.map((benefit, index) => (
            <Box className="benefit-box" key={index} onClick={() => handleToggle(index)}>
              <Paper elevation={0} className="benefit-card">
                <Box className="card-title">
                  {activeIndex === index ? (
                    <Remove className="card-icon" />
                  ) : (
                    <Add className="card-icon" />
                  )}
                  <Typography className="card-heading">
                    {benefit.title}
                  </Typography>
                </Box>
                <Collapse in={activeIndex === index}>
                  <Typography className="card-description">
                    {benefit.description}
                  </Typography>
                </Collapse>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Benefits;
