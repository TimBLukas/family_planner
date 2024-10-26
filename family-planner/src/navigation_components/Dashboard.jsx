import React from 'react';
import './Dashboard.css';
import { Calendar, Utensils, MessageCircle } from 'lucide-react';

function Dashboard() {
  return (
    <div className="main-container">
      <div className="header-section">
        <h1>Dashboard</h1>
        <p>Welcome to the Family Planner Dashboard!</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-menucard">
          <Calendar width={60} height={60} />
          <h2 className="dashboard-menucard-title">Kalender</h2>
        </div>

        <div className="dashboard-menucard">
          <Utensils width={60} height={60} />
          <h2 className="dashboard-menucard-title">Essenplaner</h2>
        </div>

        <div className="dashboard-menucard">
          <MessageCircle width={60} height={60} />
          <h2 className="dashboard-menucard-title">Chatroom</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;