// src/components/sections/FeaturesSection.tsx
import React from 'react';
import './FeaturesSection.css';

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <div className="stars-bg"></div>
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Características Principales</h2>
          <p className="features-subtitle">
            Descubre las herramientas avanzadas que hacen de SpaceHub Designer 
            la plataforma perfecta para tus proyectos espaciales
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">Diseño Intuitivo</h3>
            <p className="feature-description">
              Interfaz moderna y fácil de usar que te permite crear 
              diseños espaciales increíbles sin complicaciones.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌌</div>
            <h3 className="feature-title">Simulaciones Avanzadas</h3>
            <p className="feature-description">
              Herramientas de simulación en tiempo real para visualizar 
              tus proyectos espaciales antes de implementarlos.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3 className="feature-title">Colaboración</h3>
            <p className="feature-description">
              Trabaja en equipo con herramientas de colaboración en tiempo real
              y comparte tus proyectos fácilmente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;