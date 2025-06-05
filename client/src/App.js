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
    <AppContainer>
      <Header />
      
      <MainContent>
        <ChatContainer showResources={showResources}>
          <MessagesContainer>
            {messages.map(message => (
              <ChatMessage 
                key={message.id} 
                message={message.text} 
                isUser={message.sender === 'user'} 
              />
            ))}
            {isLoading && (
              <TypingIndicator className="glass">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="shimmer">Thinking...</span>
              </TypingIndicator>
            )}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </ChatContainer>
        
        <ResourcesPanel isOpen={showResources} onClose={toggleResourcesPanel} />
      </MainContent>
    </AppContainer>
  );
}

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  position: relative;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => props.showResources ? '0 0 70%' : '1'};
  height: calc(100vh - 60px); // Subtract header height
  transition: all 0.3s ease;
  background-color: white;
  position: relative;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f8f9fa;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  background-color: #f1f1f1;
  padding: 12px 20px;
  border-radius: 18px;
  margin: 8px 0;
  font-size: 14px;
  color: #555;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  
  .typing-dots {
    display: flex;
    gap: 4px;
    
    span {
      width: 6px;
      height: 6px;
      background-color: #888;
      border-radius: 50%;
      animation: typing 1s infinite ease-in-out;
      
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
  
  .shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @keyframes typing {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export default App;
