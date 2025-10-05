import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">SpaceHub Designer</h3>
            <p className="footer-description">
              Diseña el futuro de la habitabilidad espacial
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Producto</h4>
              <a href="#">Características</a>
              <a href="#">Precios</a>
              <a href="#">Documentación</a>
            </div>
            
            <div className="footer-column">
              <h4>Comunidad</h4>
              <a href="#">Discord</a>
              <a href="#">GitHub</a>
              <a href="#">Foro</a>
            </div>
            
            <div className="footer-column">
              <h4>Soporte</h4>
              <a href="#">Ayuda</a>
              <a href="#">Contacto</a>
              <a href="#">Estado</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 SpaceHub Designer. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;