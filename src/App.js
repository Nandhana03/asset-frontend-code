// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing';

const App = () => {
  return (
    <Router>
      <Routing />
    </Router>
  );
};

export default App;
