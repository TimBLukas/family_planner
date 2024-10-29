import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, User } from 'lucide-react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const familyMembers = [
    { id: 1, name: "Mama", color: "#6366f1" },
    { id: 2, name: "Papa", color: "#22c55e" },
    { id: 3, name: "Tim", color: "#ef4444" },
    { id: 4, name: "Julia", color: "#f59e0b" },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const days = new Date(year, month + 1, 0).getDate();
    const offsetDays = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    return Array.from({ length: days + offsetDays }, (_, i) => {
      if (i < offsetDays) return null;
      return new Date(year, month, i - offsetDays + 1);
    });
  };

  const addEvent = (day) => {
    const newEvent = {
      id: Date.now(),
      title: "",
      date: day,
      participants: [],
      description: ""
    };
    setSelectedEvent(newEvent);
    setShowModal(true);
  };

  const saveEvent = (event) => {
    if (events.find(e => e.id === event.id)) {
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      setEvents([...events, event]);
    }
    setShowModal(false);
    setSelectedEvent(null);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowModal(false);
    setSelectedEvent(null);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('de-DE', { 
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const EventModal = () => {
    const [editedEvent, setEditedEvent] = useState(selectedEvent);

    if (!showModal) return null;

    return (
      <>
        <div className="modal-overlay" onClick={() => setShowModal(false)} />
        <div className="event-modal">
          <div className="modal-header">
            <h3 className="modal-title">
              {editedEvent.id ? 'Termin bearbeiten' : 'Neuer Termin'}
            </h3>
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Titel des Termins"
              value={editedEvent.title}
              onChange={e => setEditedEvent({...editedEvent, title: e.target.value})}
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-input"
              placeholder="Beschreibung"
              value={editedEvent.description}
              onChange={e => setEditedEvent({...editedEvent, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Teilnehmer</label>
            <div className="participant-selector">
              {familyMembers.map(member => (
                <button
                  key={member.id}
                  className={`participant-button ${
                    editedEvent.participants.find(p => p.id === member.id) ? 'selected' : ''
                  }`}
                  onClick={() => {
                    const newParticipants = editedEvent.participants.find(p => p.id === member.id)
                      ? editedEvent.participants.filter(p => p.id !== member.id)
                      : [...editedEvent.participants, member];
                    setEditedEvent({...editedEvent, participants: newParticipants});
                  }}
                >
                  <User style={{ color: member.color }} />
                  <span>{member.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            {editedEvent.id && (
              <button 
                className="button button-danger"
                onClick={() => deleteEvent(editedEvent.id)}
              >
                Löschen
              </button>
            )}
            <div>
              <button 
                className="button button-primary"
                onClick={() => saveEvent(editedEvent)}
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-card">
        <div className="calendar-header">
          <h2 className="calendar-title">Familienkalender</h2>
          <div className="calendar-navigation">
            <button
              className="nav-button"
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            >
              <ChevronLeft />
            </button>
            <span className="current-date">{formatDate(currentDate)}</span>
            <button
              className="nav-button"
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="calendar-grid">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
            <div key={day} className="weekday-header">
              {day}
            </div>
          ))}
          
          {getDaysInMonth(currentDate).map((day, index) => (
            <div
              key={index}
              className="calendar-day"
              style={{ visibility: day ? 'visible' : 'hidden' }}
            >
              {day && (
                <>
                  <div className="day-header">
                    <span className="day-number">{day.getDate()}</span>
                    <button
                      className="add-event-button"
                      onClick={() => addEvent(day)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="event-list">
                    {events
                      .filter(event => event.date.toDateString() === day.toDateString())
                      .map(event => (
                        <div
                          key={event.id}
                          className="event-item"
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowModal(true);
                          }}
                        >
                          <div className="event-header">
                            <span>{event.title || 'Neuer Termin'}</span>
                            <div className="participant-list">
                              {event.participants.map(participant => (
                                <div
                                  key={participant.id}
                                  className="participant-dot"
                                  style={{ backgroundColor: participant.color }}
                                  title={participant.name}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <EventModal />
    </div>
  );
};

export default Calendar;