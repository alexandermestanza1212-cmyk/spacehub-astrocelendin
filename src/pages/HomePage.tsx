// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartDesigning = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="homepage">
      {/* Estrellas de fondo */}
      <div className="stars"></div>

      {/* Header */}
      <header className="header">
        <div className="logo">Diseñador de SpaceHub</div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={handleLoginClick}>
            Iniciar sesión
          </button>
          <button className="register-btn" onClick={handleRegisterClick}>
            Crear cuenta
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <h1 className="hero-title">
          <span className="title-part1">Diseñador de</span>
          <span className="title-part2">SpaceHub</span>
        </h1>
        <p className="hero-subtitle">
          Crea tu hogar en el cosmos y explora la habitabilidad espacial.
        </p>
        <button className="cta-button" onClick={handleStartDesigning}>
          COMENZAR A DISEÑAR
        </button>
      </main>
    </div>
  );
};

export default HomePage;