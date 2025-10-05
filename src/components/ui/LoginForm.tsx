// src/components/ui/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular proceso de login
    try {
      console.log('Login attempt:', { email, password });
      
      // Aquí irían las llamadas a tu API
      // await login(email, password);
      
      // Simular delay de API
      setTimeout(() => {
        setIsLoading(false);
        // Redirigir al home después del login exitoso
        navigate('/', { replace: true });
      }, 2000);
      
    } catch (error) {
      setIsLoading(false);
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-form-container">
      <div className={`login-form ${isLoading ? 'loading' : ''}`}>
        <h1 className="login-title">Inicia Sesión</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Entrar'}
          </Button>
        </form>
        
        <p className="forgot-password">¿Olvidaste tu contraseña?</p>
      </div>
    </div>
  );
};

export default LoginForm;