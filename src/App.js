// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/signup"/>} />

        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
