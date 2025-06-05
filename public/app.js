document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');
  const messagesContainer = document.getElementById('messages-container');
  const typingIndicator = document.getElementById('typing-indicator');
  const welcomeScreen = document.getElementById('welcome-screen');
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const mobileClose = document.getElementById('mobile-close');
  const resourcesBtn = document.getElementById('resources-btn');
  const resourcesPanel = document.getElementById('resources-panel');
  const closeResources = document.getElementById('close-resources');
  const themeToggle = document.getElementById('theme-toggle');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');
  const newChatBtn = document.getElementById('new-chat-btn');

  // State
  let messages = [];
  let isTyping = false;
  let darkMode = localStorage.getItem('darkMode') === 'true';

  // Apply saved theme
  if (darkMode) {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  // Supportive responses for the mental health chatbot
  const supportiveResponses = [
    "I understand that can be challenging. How long have you been feeling this way?",
    "Thank you for sharing that with me. Would you like to talk more about what's been going on?",
    "That sounds difficult. What has helped you cope with similar feelings in the past?",
    "I'm here to listen. Could you tell me more about what's been on your mind?",
    "It takes courage to share your feelings. Have you considered talking to a mental health professional about this?",
    "Your feelings are valid. What kind of support are you looking for right now?",
    "I'm sorry you're going through this. Would it help to explore some coping strategies together?",
    "That's a lot to handle. What would make you feel better supported right now?",
    "It's important to be gentle with yourself during difficult times. What's one small thing you could do for self-care today?",
    "I hear you. Sometimes just expressing your feelings can be a first step. What else might help you feel a bit better?",
    "You're not alone in feeling this way. Many people experience similar challenges. What specific aspects are most difficult for you?",
    "Thank you for trusting me with your thoughts. Would it be helpful to discuss some resources that might support you?",
    "That's a really insightful observation about yourself. How do you think this realization might help you move forward?",
    "It sounds like you're going through a lot right now. What's one small positive thing you've noticed recently, despite these challenges?",
    "I appreciate you sharing that with me. What do you think might be a good next step for you?"
  ];

  // Crisis resources
  const crisisResources = {
    emergencyNumbers: [
      { name: "Emergency Services", value: "911 (US) or local emergency number" },
      { name: "National Suicide Prevention Lifeline", value: "988 or 1-800-273-8255" },
      { name: "Crisis Text Line", value: "Text HOME to 741741" }
    ],
    textSupport: [
      { value: "Text HELLO to 741741 to reach Crisis Text Line" },
      { value: "Text START to 678678 for LGBTQ+ support (Trevor Project)" }
    ],
    websites: [
      { name: "National Alliance on Mental Illness", url: "https://www.nami.org" },
      { name: "Mental Health America", url: "https://www.mhanational.org" },
      { name: "7 Cups - Online Therapy & Free Counseling", url: "https://www.7cups.com" },
      { name: "Psychology Today - Find a Therapist", url: "https://www.psychologytoday.com/us/therapists" }
    ]
  };

  // Functions
  function toggleSidebar() {
    sidebar.classList.toggle('visible');
  }

  function toggleResourcesPanel() {
    resourcesPanel.classList.toggle('visible');
  }

  function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkMode', darkMode);
    themeToggle.innerHTML = darkMode ? 
      '<i class="fa-solid fa-sun"></i>' : 
      '<i class="fa-solid fa-moon"></i>';
  }

  function adjustTextareaHeight() {
    messageInput.style.height = 'auto';
    messageInput.style.height = (messageInput.scrollHeight) + 'px';
  }

  function formatTimestamp() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  function getRandomResponse() {
    return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
  }

  function showTypingIndicator() {
    isTyping = true;
    typingIndicator.classList.add('visible');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function hideTypingIndicator() {
    isTyping = false;
    typingIndicator.classList.remove('visible');
  }

  function addMessage(content, sender) {
    // Hide welcome screen if visible
    if (welcomeScreen.style.display !== 'none') {
      welcomeScreen.style.display = 'none';
    }

    const message = {
      content,
      sender,
      timestamp: formatTimestamp()
    };
    
    messages.push(message);
    renderMessage(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function renderMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', message.sender);
    
    const avatarIcon = message.sender === 'bot' ? 
      '<i class="fa-solid fa-brain"></i>' : 
      '<i class="fa-solid fa-user"></i>';
    
    messageElement.innerHTML = `
      <div class="message-avatar ${message.sender}-avatar">
        ${avatarIcon}
      </div>
      <div class="message-content">
        <p>${message.content}</p>
        <div class="message-time">${message.timestamp}</div>
      </div>
    `;
    
    messagesContainer.appendChild(messageElement);
  }

  async function sendMessage(content) {
    if (!content.trim()) return;
    
    // Add user message
    addMessage(content, 'user');
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    sendBtn.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
      // Simulate network request to backend
      // In a real app, you would use fetch() to call your API
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: content })
      // });
      // const data = await response.json();
      
      // Simulate API delay
      setTimeout(() => {
        // Hide typing indicator
        hideTypingIndicator();
        
        // Add bot response
        // In a real app, you would use data.response from your API
        const botResponse = getRandomResponse();
        addMessage(botResponse, 'bot');
      }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
      
    } catch (error) {
      console.error('Error sending message:', error);
      hideTypingIndicator();
      addMessage("I'm sorry, I'm having trouble connecting. Please try again later.", 'bot');
    }
  }

  function startNewChat() {
    // Clear messages
    messages = [];
    messagesContainer.innerHTML = '';
    
    // Show welcome screen
    welcomeScreen.style.display = 'flex';
    
    // Update active conversation
    document.querySelectorAll('.history-item').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector('.history-item').classList.add('active');
    
    // Close sidebar on mobile
    if (window.innerWidth < 992) {
      sidebar.classList.remove('visible');
    }
  }

  // Event Listeners
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(messageInput.value);
  });

  messageInput.addEventListener('input', () => {
    adjustTextareaHeight();
    sendBtn.disabled = !messageInput.value.trim();
  });

  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) {
        sendMessage(messageInput.value);
      }
    }
  });

  menuToggle.addEventListener('click', toggleSidebar);
  mobileClose.addEventListener('click', toggleSidebar);
  resourcesBtn.addEventListener('click', toggleResourcesPanel);
  closeResources.addEventListener('click', toggleResourcesPanel);
  themeToggle.addEventListener('click', toggleTheme);
  newChatBtn.addEventListener('click', startNewChat);

  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const message = chip.getAttribute('data-message');
      messageInput.value = message;
      adjustTextareaHeight();
      sendBtn.disabled = false;
    });
  });

  // Initialize
  sendBtn.disabled = true;
  
  // Add welcome message after a short delay
  setTimeout(() => {
    if (messages.length === 0) {
      addMessage("Hello! I'm MindfulAI, your mental health support companion. How are you feeling today?", 'bot');
    }
  }, 1000);

  // Connect to backend API for crisis resources
  // In a real app, you would fetch this from your backend
  // async function fetchCrisisResources() {
  //   try {
  //     const response = await fetch('/api/crisis-resources');
  //     const data = await response.json();
  //     // Update UI with resources
  //   } catch (error) {
  //     console.error('Error fetching resources:', error);
  //   }
  // }
  // fetchCrisisResources();

  // Animation for elements with class 'float'
  document.querySelectorAll('.float').forEach(element => {
    const randomDelay = Math.random() * 2;
    element.style.animationDelay = `${randomDelay}s`;
  });
});
