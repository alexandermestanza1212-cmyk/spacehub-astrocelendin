// src/pages/DashboardPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-background">
        {/* Header con botón volver */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <Link to="/" className="back-button">
                ← Volver
              </Link>
            </div>
            <div className="header-right">
              <Link to="/profile" className="profile-link">
                Perfil
              </Link>
            </div>
          </div>
        </header>

        {/* Contenido principal centrado */}
        <main className="dashboard-main">
          <div className="hero-content">
            <h1 className="main-title">Diseñador de SpaceHub</h1>
            <p className="main-subtitle">
              Crea, evalúa y comparte tus diseños de hábitats espaciales.
            </p>
            
            <div className="button-stack">
              <Link to="/mission-location" className="primary-btn">
                Comenzar a Diseñar
              </Link>
              <button className="secondary-btn">
                Ver Proyectos Anteriores
              </button>
            </div>
          </div>
        </main>

        {/* Características en la parte inferior */}
        <section className="features-bottom">
          <div className="features-row">
            <div className="feature-item">
              <div className="feature-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m15 9-6 6"/>
                  <path d="m9 9 6 6"/>
                </svg>
              </div>
              <span className="feature-label">Diseño 3D Interactivo</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                </svg>
              </div>
              <span className="feature-label">Evaluación Inteligente</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <span className="feature-label">Comunidad y Colaboración</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;