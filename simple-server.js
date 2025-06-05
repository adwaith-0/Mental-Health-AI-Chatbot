const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simple responses for the mental health chatbot
const responses = [
  "I understand that must be difficult. How long have you been feeling this way?",
  "It sounds like you're going through a challenging time. What helps you feel better when you're struggling?",
  "Thank you for sharing that with me. Have you talked to anyone else about these feelings?",
  "That's a common experience. Many people feel the same way. What specific aspects are most troubling for you?",
  "I'm here to listen. Would you like to tell me more about what's been happening?",
  "It takes courage to talk about these things. Have you considered any coping strategies?",
  "Your feelings are valid. What kind of support do you think would be most helpful right now?",
  "I'm sorry you're experiencing this. Are there any particular triggers you've noticed?",
  "Taking care of your mental health is important. What self-care activities do you enjoy?",
  "Sometimes talking to a professional can really help. Have you considered reaching out to a therapist or counselor?"
];

// Mental health chatbot endpoint
app.post('/api/chat', (req, res) => {
  try {
    const { message } = req.body;
    
    // Simple response selection - in a real app, this would use AI
    const randomIndex = Math.floor(Math.random() * responses.length);
    const botResponse = responses[randomIndex];
    
    // Send response back to client
    res.json({ 
      response: botResponse,
      success: true
    });
    
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process your request. Please try again.' 
    });
  }
});

// Crisis resources endpoint
app.get('/api/crisis-resources', (req, res) => {
  const resources = {
    emergencyNumbers: {
      global: '911 or local emergency number',
      us: '988 Suicide & Crisis Lifeline',
      international: 'https://findahelpline.com/i/iasp'
    },
    textLines: {
      us: 'Text HOME to 741741 to reach Crisis Text Line',
    },
    websites: [
      { name: 'National Alliance on Mental Illness', url: 'https://www.nami.org' },
      { name: 'Mental Health America', url: 'https://www.mhanational.org' },
      { name: '7 Cups - Online Therapy & Free Counseling', url: 'https://www.7cups.com' }
    ]
  };
  
  res.json(resources);
});

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'premium.html'));
});

app.get('/original', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Mental Health Chatbot server running on port ${PORT}`);
});
