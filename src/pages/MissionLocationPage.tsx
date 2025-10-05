// src/pages/MissionLocationPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationCard from '../components/LocationCard/LocationCard';
import './MissionLocationPage.css';

interface Location {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  icon?: string;
}

const MissionLocationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations: Location[] = [
    {
      id: 'mars',
      name: 'PLANETA',
      subtitle: 'MARTE',
      image: '/images/marte.jpg'
    },
    {
      id: 'moon',
      name: 'SATÉLITE',
      subtitle: 'LUNA',
      image: '/images/luna.jpg'
    },
    {
      id: 'orbit',
      name: 'ÓRBITA',
      subtitle: 'TERRESTRE',
      image: '/images/orbita.jpg'
    }
  ];

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
  };

  const handleConfirm = () => {
  console.log('🔵 Botón clickeado');
  console.log('🔵 selectedLocation:', selectedLocation);
  
  if (selectedLocation) {
    const ruta = `/ship-designer/${selectedLocation}`;
    console.log('🔵 Navegando a:', ruta);
    navigate(ruta);
  } else {
    console.log('🔴 No hay ubicación seleccionada');
  }
};

  return (
    <div className="mission-location-page">
      <div className="location-background">
        <header className="location-header">
          <div className="logo-container">
            <span className="logo-spacehub">Centro espacial</span>
            <span className="logo-designer">Diseñador</span>
          </div>
          <button className="menu-button">
            <div className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </header>

        <main className="location-main">
          <h1 className="location-title">ELIGE EL LUGAR DE TU MISIÓN</h1>

          <div className="locations-grid">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                isSelected={selectedLocation === location.id}
                onSelect={handleLocationSelect}
              />
            ))}
          </div>

          {/* ✅ ELIMINADO: El placeholder de la nave */}
        </main>

        <div className="confirm-container">
          <button 
            className={`confirm-button ${selectedLocation ? 'active' : ''}`}
            onClick={handleConfirm}
            disabled={!selectedLocation}
          >
            CONFIRMAR Y CONTINUAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionLocationPage;