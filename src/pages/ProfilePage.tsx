// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPassword('••••');
      setAboutMe(user.aboutMe || '');
      setProfilePhoto(user.profilePhoto || '');
    }
  }, [user]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoData = reader.result as string;
        setProfilePhoto(photoData);
        // Guardar automáticamente
        updateProfile({ profilePhoto: photoData });
        showSavedMessage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile({
      username,
      aboutMe
    });
    showSavedMessage();
  };

  const showSavedMessage = () => {
    setSavedMessage('✓ Cambios guardados exitosamente');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-page">
      <div className="profile-background">
        <header className="profile-header">
          <button className="back-button" onClick={handleBack}>
            ← Volver
          </button>
          <h1 className="page-title">Mi perfil</h1>
          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </header>

        <main className="profile-main">
          <div className="profile-container">
            {/* Sección izquierda - Información personal */}
            <div className="profile-left">
              <div className="profile-photo-section">
                <div className="photo-circle">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Perfil" className="profile-image" />
                  ) : (
                    <div className="default-avatar">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="20" r="12" fill="white" opacity="0.5"/>
                        <path d="M10 50 C10 35, 50 35, 50 50" fill="white" opacity="0.5"/>
                      </svg>
                    </div>
                  )}
                </div>
                <label htmlFor="photo-upload" className="upload-button">
                  Subir foto
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <h2 className="section-title">Información personal</h2>

              {savedMessage && (
                <div className="saved-message">{savedMessage}</div>
              )}

              <div className="form-group">
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="input-field disabled"
                />
              </div>

              <div className="form-group">
                <label>Contraseña (****)</label>
                <input
                  type="password"
                  value={password}
                  disabled
                  className="input-field disabled"
                />
              </div>

              <div className="form-group">
                <label>Acerca de mí</label>
                <textarea
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  className="textarea-field"
                  placeholder="Apasionado por el diseño de hábitats espaciales y la exploración del cosmos"
                  rows={4}
                />
              </div>

              <button className="save-button" onClick={handleSave}>
                Guardar cambios
              </button>
            </div>

            {/* Sección derecha - Mis diseños */}
            <div className="profile-right">
              <h2 className="section-title">Mis diseños</h2>
              
              <div className="designs-grid">
                <div className="design-card">
                  <div className="design-placeholder">+</div>
                  <div className="design-info">
                    <h3>Estación Alfa</h3>
                    <p className="design-type">Estación Orbital</p>
                    <p className="design-status">Estado: Completado</p>
                    <div className="design-rating">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>

                <div className="design-card">
                  <div className="design-placeholder">+</div>
                  <div className="design-info">
                    <h3>Estación04</h3>
                    <p className="design-type">Estación Orbital</p>
                    <p className="design-status">Estado: En Progreso</p>
                    <div className="design-rating">⭐⭐⭐⭐</div>
                  </div>
                </div>

                <div className="design-card">
                  <div className="design-placeholder">+</div>
                  <div className="design-info">
                    <h3>Colonia Kepler</h3>
                    <p className="design-type">Colonia Planetaria</p>
                    <p className="design-status">Estado: Completado</p>
                    <div className="design-rating">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>

                <div className="design-card">
                  <div className="design-placeholder">+</div>
                  <div className="design-info">
                    <h3>Mansión</h3>
                    <p className="design-type">Hábitat Marciano</p>
                    <p className="design-status">Estado: En Progreso</p>
                    <div className="design-rating">⭐⭐⭐</div>
                  </div>
                </div>

                <div className="design-card">
                  <div className="design-placeholder">+</div>
                  <div className="design-info">
                    <h3>Colonia Kepler</h3>
                    <p className="design-type">Colonia Planetaria</p>
                    <p className="design-status">Estado: Completado</p>
                    <div className="design-rating">⭐⭐⭐⭐</div>
                  </div>
                </div>

                <div className="design-card">
                  <div className="design-placeholder">+</div>
                  <div className="design-info">
                    <h3>Colonia Kepler</h3>
                    <p className="design-type">Colonia Planetaria</p>
                    <p className="design-status">Estado: Completado</p>
                    <div className="design-rating">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;