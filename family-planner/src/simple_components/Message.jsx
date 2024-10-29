import React from 'react';
import { User } from 'lucide-react';
import './Message.css';

const Message = ({ message, currentUser }) => {

  return(
    <div
      key={message.id}
      className={`message-wrapper ${message.sender === currentUser ? 'own-message' : ''}`}
    >
      <div className="message">
        <div className="message-header">
          <User className="user-icon" />
          <span className="sender-name">{message.sender}</span>
          <span className="timestamp">{message.timestamp}</span>
        </div>
        <p className="message-content">{message.content}</p>
      </div>
    </div>
  );
}


export default Message;