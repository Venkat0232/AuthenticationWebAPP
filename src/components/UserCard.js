// src/components/UserCard.js
import React from 'react';
import './UserCard.css'; // Import your CSS file for styling

const UserCard = ({ user }) => {
    console.log('user',user);
  return (
    <div className="user-card">
      <h2>{user.user_data[0].user_firstname} {user.user_data[0].user_lastname}</h2>
      <p><strong>Email:</strong> {user.user_data[0].user_email}</p>
      <p><strong>Phone:</strong> {user.user_data[0].user_phone}</p>
      <p><strong>City:</strong> {user.user_data[0].user_city}</p>
      <p><strong>Zipcode:</strong> {user.user_data[0].user_zipcode}</p>
    </div>
  );
};

export default UserCard;
