// src/components/ui/RegisterForm.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import './RegisterForm.css';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Register attempt:', formData);
      
      // Simular proceso de registro
      setTimeout(() => {
        setIsLoading(false);
        navigate('/', { replace: true });
      }, 2000);
      
    } catch (error) {
      setIsLoading(false);
      console.error('Register failed:', error);
    }
  };

  return (
    <div className="register-form-container">
      <div className={`register-form ${isLoading ? 'loading' : ''}`}>
        <h1 className="register-title">Crea tu cuenta</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              className="register-input"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="register-input"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="register-input"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="register-input"
              required
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>
        
        <p className="login-switch">
          ¿Ya tienes cuenta? <Link to="/login" className="login-link">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;