import React, { useState } from 'react';
import { Send, Settings } from 'lucide-react';
import './ChatRoom.css';
import Message from '../simple_components/Message';

function ChatRoom() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Mama', content: 'Wie geht es euch', timestamp: '14:30' },
    { id: 2, sender: 'Julia', content: 'Supi', timestamp: '14:32' },
    { id: 3, sender: 'Papa', content: 'Toll', timestamp: '14:35' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('Mama');

  const familyMembers = ['Mama', 'Papa', 'Tim', 'Julia'];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: currentUser,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString().slice(0, 5)
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h1>Familie Chat</h1>
        <div className="header-controls">
          <select 
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
            className="user-select"
          >
            {familyMembers.map(member => (
              <option className="user-select-option" key={member} value={member}>{member}</option>
            ))}
          </select>
          <Settings className="settings-icon" />
        </div>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        {messages.map((message) => (
          <Message message={message} currentUser={currentUser} />
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="message-form">
        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nachricht schreiben..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            <Send className="send-icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;