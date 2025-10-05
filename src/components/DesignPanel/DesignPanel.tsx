// src/components/DesignPanel/DesignPanel.tsx
import React, { useState } from 'react';
import './DesignPanel.css';

interface DesignPanelProps {
  location: string;
  designData: any;
  onDesignChange: (data: any) => void;
}

const DesignPanel: React.FC<DesignPanelProps> = ({ location, designData, onDesignChange }) => {
  const [localData, setLocalData] = useState(designData);

  const handleChange = (field: string, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onDesignChange(updated);
  };

  const handleDimensionChange = (dim: string, value: number) => {
    const updated = {
      ...localData,
      dimensions: { ...localData.dimensions, [dim]: value }
    };
    setLocalData(updated);
    onDesignChange(updated);
  };

  const handleFunctionalAreaToggle = (area: string) => {
    const currentAreas = localData.functionalAreas || [];
    const updated = {
      ...localData,
      functionalAreas: currentAreas.includes(area)
        ? currentAreas.filter((a: string) => a !== area)
        : [...currentAreas, area]
    };
    setLocalData(updated);
    onDesignChange(updated);
  };

  const functionalAreas = [
    { id: 'cubos', label: 'Cubos' },
    { id: 'gestionResiduos', label: 'Gestión de Residuos' },
    { id: 'controlTermico', label: 'Control Térmico' },
    { id: 'soporteVital', label: 'Soporte Vital' },
    { id: 'comunicaciones', label: 'Comunicaciones' },
    { id: 'energia', label: 'Energía' },
    { id: 'almacenamiento', label: 'Almacenamiento' },
    { id: 'preparacionAlimentos', label: 'Preparación de Alimentos' },
    { id: 'atencionMedica', label: 'Atención Médica' },
    { id: 'descanso', label: 'Descanso' },
    { id: 'ejercicio', label: 'Ejercicio' }
  ];

  return (
    <div className="design-panel">
      <div className="panel-header">
        <h2 className="panel-title">CREAR NUEVO DISEÑO</h2>
      </div>

      <div className="panel-content">
        {/* Forma del Hábitat */}
        <div className="form-section">
          <label className="form-label">FORMA DEL HÁBITAT</label>
          <div className="shape-buttons">
            <button 
              className={`shape-btn ${localData.habitatShape === 'cilindro' ? 'active' : ''}`}
              onClick={() => handleChange('habitatShape', 'cilindro')}
              title="Cilindro"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <button 
              className={`shape-btn ${localData.habitatShape === 'esfera' ? 'active' : ''}`}
              onClick={() => handleChange('habitatShape', 'esfera')}
              title="Esfera"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <button 
              className={`shape-btn ${localData.habitatShape === 'toroide' ? 'active' : ''}`}
              onClick={() => handleChange('habitatShape', 'toroide')}
              title="Toroide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
              </svg>
            </button>
            <button 
              className={`shape-btn ${localData.habitatShape === 'cubo' ? 'active' : ''}`}
              onClick={() => handleChange('habitatShape', 'cubo')}
              title="Cubo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="5" width="14" height="14" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Dimensiones */}
        <div className="form-section">
          <label className="form-label">DIMENSIONES</label>
          <div className="dimension-inputs">
            <div className="input-group">
              <label className="input-label">Alto (m)</label>
              <input
                type="number"
                className="dimension-input"
                value={localData.dimensions.alto}
                onChange={(e) => handleDimensionChange('alto', Number(e.target.value))}
                min="1"
                max="100"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Ancho (m)</label>
              <input
                type="number"
                className="dimension-input"
                value={localData.dimensions.ancho}
                onChange={(e) => handleDimensionChange('ancho', Number(e.target.value))}
                min="1"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Áreas Funcionales */}
        <div className="form-section">
          <label className="form-label">ÁREAS FUNCIONALES</label>
          <div className="functional-areas-grid">
            {functionalAreas.map(area => (
              <label key={area.id} className="functional-area-item">
                <input
                  type="checkbox"
                  checked={(localData.functionalAreas || []).includes(area.id)}
                  onChange={() => handleFunctionalAreaToggle(area.id)}
                />
                <span>{area.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Destino de la Misión */}
        <div className="form-section">
          <label className="form-label">DESTINO DE LA MISIÓN</label>
          <select
            className="form-select"
            value={localData.missionDestination}
            onChange={(e) => handleChange('missionDestination', e.target.value)}
          >
            <option value="Órbita Terrestre">Órbita Terrestre</option>
            <option value="Luna">Luna</option>
            <option value="Marte">Marte</option>
          </select>
        </div>

        {/* Duración de la Misión */}
        <div className="form-section">
          <label className="form-label">DURACIÓN DE LA MISIÓN</label>
          <div className="slider-container">
            <input
              type="range"
              className="form-slider"
              min="1"
              max="100"
              value={localData.duration}
              onChange={(e) => handleChange('duration', Number(e.target.value))}
            />
            <span className="slider-value">{localData.duration} días</span>
          </div>
        </div>

        {/* Número de Tripulantes */}
        <div className="form-section">
          <label className="form-label">NÚMERO DE TRIPULANTES</label>
          <input
            type="number"
            className="form-input"
            value={localData.crewSize}
            onChange={(e) => handleChange('crewSize', Number(e.target.value))}
            min="1"
            max="20"
          />
        </div>

        {/* Botón Cargar Diseño */}
        <button className="load-design-btn">
          CARGAR DISEÑO EXISTENTE
        </button>
      </div>
    </div>
  );
};

export default DesignPanel;