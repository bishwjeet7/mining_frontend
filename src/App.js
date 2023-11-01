// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import GraphShow from './components/GraphShow';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graph" element={<GraphShow />} />
      </Routes>
    </Router>
  );
}

export default App;
