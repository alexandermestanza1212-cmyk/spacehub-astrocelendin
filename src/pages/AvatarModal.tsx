// src/components/ui/AvatarModal.tsx
import React, { useState } from 'react';
import './AvatarModal.css';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAvatar: (avatar: string) => void;
  currentAvatar: string;
}

const AvatarModal: React.FC<AvatarModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectAvatar, 
  currentAvatar 
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  const avatarOptions = [
    { id: 'astro', name: 'Astro', icon: '👨‍🚀' },
    { id: 'mars', name: 'Marte', icon: '🔴' },
    { id: 'comet', name: 'Cometa', icon: '☄️' },
    { id: 'stardust', name: 'Stardust', icon: '✨' },
    { id: 'meteor', name: 'Meteoro', icon: '⭐' },
    { id: 'new-york', name: 'New York', icon: '💫' },
    { id: 'albatros', name: 'Albatros', icon: '🛰️' },
    { id: 'human-robot', name: 'Humano-Robot', icon: '🌍' },
    { id: 'sculpture', name: 'Escultura', icon: '👽' },
    { id: 'pre-beta', name: 'Pre Beta', icon: '🔧' },
    { id: 'saturn', name: 'Saturno', icon: '🪐' },
    { id: 'gamepad', name: 'Gamepad', icon: '🎮' },
    { id: 'android', name: 'Android', icon: '🤖' },
    { id: 'titan', name: 'Titán', icon: '🚀' },
    { id: 'magneto', name: 'Magneto', icon: '⚡' },
    { id: 'space', name: 'Space', icon: '🛸' },
    { id: 'orbitron', name: 'Orbitron', icon: '💡' },
    { id: 'systems', name: 'Systems', icon: '❄️' },
    { id: 'felix', name: 'Felix', icon: '✖️' },
    { id: 'nano', name: 'Nano', icon: '⭐' }
  ];

  const handleSaveAvatar = () => {
    onSelectAvatar(selectedAvatar);
    onClose();
  };

  const handleCancel = () => {
    setSelectedAvatar(currentAvatar);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="avatar-modal-overlay" onClick={handleCancel}>
      <div className="avatar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {/* Avatar Preview */}
          <div className="avatar-preview-section">
            <div className="current-avatar-preview">
              <div className="avatar-preview-circle">
                <span className="avatar-emoji">
                  {avatarOptions.find(a => a.id === selectedAvatar)?.icon || '👤'}
                </span>
              </div>
              <button className="upload-photo-btn">
                📷 Subir Foto
              </button>
            </div>
          </div>

          {/* Avatar Selection */}
          <div className="avatar-selection-section">
            <h2 className="modal-title">Elige tu Avatar</h2>
            
            <div className="avatars-grid">
              {avatarOptions.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`avatar-option ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(avatar.id)}
                >
                  <div className="avatar-icon">
                    <span>{avatar.icon}</span>
                  </div>
                  <span className="avatar-name">{avatar.name}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button className="save-avatar-btn" onClick={handleSaveAvatar}>
                Guardar Avatar
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarModal;