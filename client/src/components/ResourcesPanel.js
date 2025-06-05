import React from 'react';
import './ResourcesPanel.css';

const ResourcesPanel = ({ isOpen, onClose }) => {
  const resources = {
    emergencyNumbers: {
      india: {
        national: '1800-599-0019',
        emergency: '112',
        police: '100',
        ambulance: '102'
      }
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
      }
    ]
  };

  return (
    <div className={`resources-panel ${isOpen ? 'open' : ''}`}>
      <div className="resources-content glass">
        <button className="close-button" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" 
              fill="currentColor"/>
          </svg>
        </button>

        <h2 className="text-gradient">Crisis Resources</h2>
        
        <section className="resources-section">
          <h3>Emergency Numbers</h3>
          <div className="emergency-numbers">
            {Object.entries(resources.emergencyNumbers.india).map(([key, number]) => (
              <a 
                key={key}
                href={`tel:${number}`}
                className="emergency-number glass"
              >
                <span className="number-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span className="number-value">{number}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="resources-section">
          <h3>Support Organizations</h3>
          <div className="resource-cards">
            {resources.websites.map((resource, index) => (
              <a 
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card glass"
              >
                <h4>{resource.name}</h4>
                <p>{resource.description}</p>
                <span className="visit-link">Visit Website →</span>
              </a>
            ))}
          </div>
        </section>

        <div className="disclaimer">
          These resources are for informational purposes only. In case of emergency, please contact emergency services immediately.
        </div>
      </div>
    </div>
  );
};

export default ResourcesPanel;
