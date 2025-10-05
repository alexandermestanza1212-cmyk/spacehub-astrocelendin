// src/components/LocationCard/LocationCard.tsx
import React from 'react';
import './LocationCard.css';

interface Location {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  icon?: string;
}

interface LocationCardProps {
  location: Location;
  isSelected: boolean;
  onSelect: (locationId: string) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, isSelected, onSelect }) => {
  return (
    <div 
      className={`location-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(location.id)}
    >
      <div className="card-image-container">
        <img 
          src={location.image} 
          alt={`${location.name} ${location.subtitle}`}
          className="card-image"
          onError={(e) => {
            // Fallback con gradiente si la imagen no carga
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="card-gradient"></div>
        
        {location.icon && (
          <div className="card-icon">
            {location.icon}
          </div>
        )}
      </div>
      
      <div className="card-content">
        <div className="card-name">{location.name}</div>
        <div className="card-subtitle">{location.subtitle}</div>
      </div>
      
      {isSelected && (
        <div className="selected-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="white" />
            <path 
              d="M8 12l3 3 5-5" 
              stroke="#3b82f6" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default LocationCard;