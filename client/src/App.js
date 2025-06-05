import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Header from './components/Header';
import ResourcesPanel from './components/ResourcesPanel';

function App() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Welcome! How are you feeling today?", 
      sender: 'support' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message to chat
    const userMessage = { id: messages.length + 1, text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Get chat history for context (last 10 messages)
      const chatHistory = messages.slice(-10);
      
      // Send request to backend
      const response = await axios.post('/api/chat', {
        message: text,
        chatHistory
      });
      
      // Add bot response to chat
      const supportMessage = { 
        id: messages.length + 2, 
        text: response.data.response, 
        sender: 'support' 
      };
      
      setMessages(prev => [...prev, supportMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = { 
        id: messages.length + 2, 
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.", 
        sender: 'support',
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleResourcesPanel = () => {
    setShowResources(!showResources);
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="chat-container">
          <div className="messages-container">
            {messages.map(message => (
              <ChatMessage 
                key={message.id} 
                message={message.text} 
                isUser={message.sender === 'user'} 
              />
            ))}
            {isLoading && (
              <div className="typing-indicator glass">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="shimmer">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
        
        <ResourcesPanel isOpen={showResources} onClose={toggleResourcesPanel} />
      </main>
    </div>
  );
}

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  box-shadow: var(--box-shadow);
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => props.showResources ? '70%' : '100%'};
  height: 100%;
  transition: flex 0.3s ease;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  background-color: #f1f1f1;
  padding: 8px 16px;
  border-radius: 18px;
  margin-top: 5px;
  font-size: 14px;
  color: #555;
`;

export default App;
