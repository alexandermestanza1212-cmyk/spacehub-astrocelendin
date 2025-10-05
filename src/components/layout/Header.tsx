// src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Diseñador de SpaceHub</Link>
        </div>
        
        <nav className="header-nav">
          <Link to="/login" className="nav-link">
            Iniciar sesión
          </Link>
          <Link to="/register" className="nav-button">
            Crear cuenta
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;