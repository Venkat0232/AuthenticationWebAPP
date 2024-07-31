// src/components/Dashboard.js
import React from 'react';
import UserCard from './UserCard'; // Import the UserCard component
import './Dashboard.css'; // Import your CSS file for the dashboard

const Dashboard = () => {
  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <div className="dashboard-container">No user data available. Please log in.</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      <UserCard user={user} />
    </div>
  );
};

export default Dashboard;
