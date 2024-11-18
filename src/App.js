import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SecondPage from './SecondPage';
import HomePage from './HomePage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;