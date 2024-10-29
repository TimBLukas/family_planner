import React from 'react';
import './Dashboard.css';
import { Calendar, Utensils, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();

  function changeToFoodPlanner() {
    navigate("/dashboard/foodPlanner");
  }

  function changeToMessageRoom() {
    navigate("/dashboard/chatRoom");
  }

  function changeToFoodCalendar() {
    navigate("/dashboard/calendar");
  }
  
  return (
    <div className="main-container">
      <div className="header-section">
        <h1>Dashboard</h1>
        <span>Welcome to the Family Planner Dashboard!</span>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-menucard" onClick={changeToFoodCalendar}>
          <Calendar width={60} height={60} />
          <h2 className="dashboard-menucard-title">Kalender</h2>
        </div>

        <div className="dashboard-menucard" onClick={changeToFoodPlanner}>
          <Utensils width={60} height={60} />
          <h2 className="dashboard-menucard-title">Essenplaner</h2>
        </div>

        <div className="dashboard-menucard" onClick={changeToMessageRoom}>
          <MessageCircle width={60} height={60} />
          <h2 className="dashboard-menucard-title">Chatroom</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;