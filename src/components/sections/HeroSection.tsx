// src/components/sections/HeroSection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCommunityClick = () => {
    console.log('Botón presionado - Navegando a /community');
    navigate('/community');
  };

  const handleDashboardClick = () => {
    console.log('Botón presionado - Navegando a /dashboard');
    navigate('/dashboard');
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Diseñador de SpaceHub</h1>
        <p className="hero-subtitle">
          Crea tu hogar en el cosmos y explora<br />
          explora la habitabilidad espacial.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button 
            onClick={handleDashboardClick}
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: 'white',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            COMENZAR A DISEÑAR
          </button>
          
          <button 
            onClick={handleCommunityClick}
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#60a5fa',
              background: 'transparent',
              border: '2px solid #3b82f6',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            VER PROYECTOS DE LA COMUNIDAD
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;