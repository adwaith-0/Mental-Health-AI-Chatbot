process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const OpenAI = require('openai');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI configuration
// Note: You'll need to create a .env file with your OPENAI_API_KEY and/or GROQ_API_KEY
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const useGroq = !!process.env.GROQ_API_KEY;
const groqApiKey = process.env.GROQ_API_KEY;
const groqModel = 'llama3-70b-8192'; // You can change this to another Groq-supported model if desired
const groqUrl = 'https://api.groq.com/openai/v1/chat/completions';

// Mental health chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    
    // Format the chat history for the OpenAI API
    const formattedHistory = chatHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'support',
      content: msg.text
    }));
    
    // Add system message with mental health support instructions
    const systemMessage = {
      role: 'system',
      content: `You are a compassionate digital support service for users in India. Your purpose is to provide emotional support, resources, and coping strategies while being culturally sensitive to the Indian context.
      
      Key guidelines:
      - Be empathetic, non-judgmental, and supportive
      - Never claim to be a licensed therapist or medical professional
      - Always encourage seeking professional help for serious concerns
      - If someone expresses thoughts of self-harm or suicide, immediately provide Indian crisis resources:
        * Vandrevala Foundation Helpline: 1800-599-0019
        * National Emergency Number: 112
        * Crisis Text Line India: Text "HELLO" to 741741
      
      Cultural considerations:
      - Be aware of Indian cultural context, family dynamics, and social pressures
      - Understand common mental health challenges in Indian society
      - Be sensitive to language preferences (Hindi/English)
      - Consider accessibility of mental health resources in different parts of India
      
      Focus on:
      - Active listening and validation
      - Providing evidence-based coping strategies
      - Recommending appropriate Indian mental health resources
      - Understanding and addressing stigma around mental health in Indian context`
    };
    
    let responseText = '';
    if (useGroq && groqApiKey) {
      // Use Groq API
      try {
        const groqRes = await axios.post(
          groqUrl,
          {
            model: groqModel,
            messages: [systemMessage, ...formattedHistory, { role: 'user', content: message }],
            max_tokens: 500,
            temperature: 0.7
          },
          {
            headers: {
              'Authorization': `Bearer ${groqApiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );
        responseText = groqRes.data.choices[0].message.content;
      } catch (groqError) {
        console.error('Groq API error:', groqError?.response?.data || groqError.message);
        return res.status(500).json({ success: false, error: 'Error from support service.' });
      }
    } else {
      // Use OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, ...formattedHistory, { role: 'user', content: message }],
        max_tokens: 500,
        temperature: 0.7,
      });
      responseText = completion.choices[0].message.content;
    }

    // Send response back to client
    res.json({ 
      response: responseText,
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
      india: {
        national: '1800-599-0019', // Vandrevala Foundation Helpline
        emergency: '112', // National Emergency Number
        police: '100',
        ambulance: '102'
      },
      global: '911 or local emergency number'
    },
    textLines: {
      india: 'Text "HELLO" to 741741 to reach Crisis Text Line India',
    },
    websites: [
      { 
        name: 'The Live Love Laugh Foundation', 
        url: 'https://www.thelivelovelaughfoundation.org',
        description: 'Founded by Deepika Padukone, provides mental health resources and support'
      },
      { 
        name: 'Vandrevala Foundation', 
        url: 'https://www.vandrevalafoundation.com',
        description: '24/7 mental health helpline and counseling services'
      },
      { 
        name: 'Manas Foundation', 
        url: 'https://manas.org.in',
        description: 'Mental health awareness and support services'
      },
      { 
        name: 'The MINDS Foundation', 
        url: 'https://www.mindsfoundation.org',
        description: 'Mental health services in rural India'
      },
      { 
        name: 'iCall', 
        url: 'https://icallhelpline.org',
        description: 'Telephone and email-based counseling service'
      }
    ],
    additionalResources: {
      government: {
        name: 'National Mental Health Program (NMHP)',
        url: 'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1043&lid=359',
        description: 'Government initiative for mental health services'
      },
      apps: [
        {
          name: 'Wysa',
          description: 'Mental health support app with Indian context',
          url: 'https://www.wysa.io'
        },
        {
          name: 'YourDost',
          description: 'Online counseling and emotional support platform',
          url: 'https://yourdost.com'
        }
      ]
    }
  };
  
  res.json(resources);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
