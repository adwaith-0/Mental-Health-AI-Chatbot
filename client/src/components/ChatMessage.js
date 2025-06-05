import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`chat-message ${isUser ? 'user' : 'support'} animate-fade-in`}>
      <div className="message-avatar">
        {isUser ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
              fill="currentColor"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="12" rx="10" ry="8" fill="#FFD700"/>
            <ellipse cx="12" cy="12" rx="8" ry="6" fill="#18181b"/>
            <ellipse cx="12" cy="12" rx="6" ry="4" fill="#FFD700" fillOpacity="0.15"/>
            <circle cx="12" cy="12" r="2" fill="#FFD700"/>
          </svg>
        )}
      </div>
      <div className="message-content glass">
        <div className="message-text">{message}</div>
        <div className="message-time">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
