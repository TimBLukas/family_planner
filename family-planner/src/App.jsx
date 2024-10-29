import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './navigation_components/Login';
import Dashboard from './navigation_components/Dashboard';
import FoodPlanner from './navigation_components/FoodPlanner';
import ChatRoom from './navigation_components/ChatRoom';
import Calendar from './navigation_components/Calendar';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/foodPlanner" element={<FoodPlanner />} />
        <Route path="/dashboard/chatRoom" element={<ChatRoom />} />
        <Route path="/dashboard/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App
