// src/pages/ShipDesignerPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ShipDesignerPage.css';

interface ShipModule {
  id: string;
  name: string;
  category: 'propulsion' | 'habitat' | 'energy' | 'storage';
  icon: string;
  description: string;
  stats: {
    power?: number;
    capacity?: number;
    weight?: number;
  };
}

const ShipDesignerPage: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  const navigate = useNavigate();
  
  const [shipName, setShipName] = useState('Mi Nave Espacial');
  const [selectedCategory, setSelectedCategory] = useState<string>('propulsion');
  const [selectedModules, setSelectedModules] = useState<ShipModule[]>([]);

  const modules: ShipModule[] = [
    {
      id: 'ion-engine',
      name: 'Motor de Iones',
      category: 'propulsion',
      icon: '🚀',
      description: 'Motor eficiente para viajes de larga distancia',
      stats: { power: 85, weight: 120 }
    },
    {
      id: 'nuclear-engine',
      name: 'Motor Nuclear',
      category: 'propulsion',
      icon: '⚛️',
      description: 'Alta potencia para aceleración rápida',
      stats: { power: 150, weight: 200 }
    },
    {
      id: 'habitat-basic',
      name: 'Hábitat Básico',
      category: 'habitat',
      icon: '🏠',
      description: 'Módulo habitable para 4 personas',
      stats: { capacity: 4, weight: 80 }
    },
    {
      id: 'habitat-advanced',
      name: 'Hábitat Avanzado',
      category: 'habitat',
      icon: '🏛️',
      description: 'Módulo habitable con mayor confort para 8 personas',
      stats: { capacity: 8, weight: 150 }
    },
    {
      id: 'solar-panels',
      name: 'Paneles Solares',
      category: 'energy',
      icon: '☀️',
      description: 'Generación de energía limpia',
      stats: { power: 100, weight: 50 }
    },
    {
      id: 'reactor',
      name: 'Reactor de Fusión',
      category: 'energy',
      icon: '⚡',
      description: 'Alta generación de energía',
      stats: { power: 300, weight: 180 }
    },
    {
      id: 'cargo-small',
      name: 'Bodega Pequeña',
      category: 'storage',
      icon: '📦',
      description: 'Almacenamiento básico de suministros',
      stats: { capacity: 100, weight: 40 }
    },
    {
      id: 'cargo-large',
      name: 'Bodega Grande',
      category: 'storage',
      icon: '🏭',
      description: 'Gran capacidad de almacenamiento',
      stats: { capacity: 500, weight: 120 }
    }
  ];

  const categories = [
    { id: 'propulsion', name: 'Propulsión', icon: '🚀' },
    { id: 'habitat', name: 'Hábitat', icon: '🏠' },
    { id: 'energy', name: 'Energía', icon: '⚡' },
    { id: 'storage', name: 'Almacenamiento', icon: '📦' }
  ];

  const filteredModules = modules.filter(m => m.category === selectedCategory);

  const handleAddModule = (module: ShipModule) => {
    setSelectedModules([...selectedModules, module]);
  };

  const handleRemoveModule = (index: number) => {
    setSelectedModules(selectedModules.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (selectedModules.length > 0) {
      navigate(`/habitat-designer/${location}`);
    }
  };

  const totalWeight = selectedModules.reduce((sum, m) => sum + (m.stats.weight || 0), 0);
  const totalPower = selectedModules.reduce((sum, m) => sum + (m.stats.power || 0), 0);

  return (
    <div className="ship-designer-page">
      <div className="ship-designer-background">
        {/* Header */}
        <header className="designer-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Volver
          </button>
          <div className="location-badge">
            Ubicación: {location?.toUpperCase()}
          </div>
        </header>

        {/* Main Content */}
        <div className="designer-container">
          {/* Left Panel - Module Selection */}
          <aside className="modules-panel">
            <div className="panel-header">
              <h2>Módulos Disponibles</h2>
            </div>

            {/* Categories */}
            <div className="categories-tabs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="tab-icon">{cat.icon}</span>
                  <span className="tab-name">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Modules List */}
            <div className="modules-list">
              {filteredModules.map(module => (
                <div key={module.id} className="module-card">
                  <div className="module-icon">{module.icon}</div>
                  <div className="module-info">
                    <h3>{module.name}</h3>
                    <p>{module.description}</p>
                    <div className="module-stats">
                      {module.stats.power && <span>⚡ {module.stats.power}</span>}
                      {module.stats.capacity && <span>👥 {module.stats.capacity}</span>}
                      {module.stats.weight && <span>⚖️ {module.stats.weight}t</span>}
                    </div>
                  </div>
                  <button 
                    className="add-module-btn"
                    onClick={() => handleAddModule(module)}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </aside>

          {/* Center - Ship Preview */}
          <main className="ship-preview">
            <div className="preview-header">
              <input
                type="text"
                className="ship-name-input"
                value={shipName}
                onChange={(e) => setShipName(e.target.value)}
                placeholder="Nombre de la nave"
              />
            </div>

            <div className="ship-canvas">
              <div className="ship-core">
                <div className="core-body">🛸</div>
                <div className="core-label">Núcleo Principal</div>
              </div>

              {selectedModules.map((module, index) => (
                <div 
                  key={`${module.id}-${index}`}
                  className={`attached-module module-${module.category}`}
                  style={{
                    transform: `rotate(${index * (360 / selectedModules.length)}deg) translateY(-120px)`
                  }}
                >
                  <div 
                    className="module-visual"
                    style={{
                      transform: `rotate(-${index * (360 / selectedModules.length)}deg)`
                    }}
                  >
                    <span className="module-visual-icon">{module.icon}</span>
                    <button 
                      className="remove-module-btn"
                      onClick={() => handleRemoveModule(index)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="ship-stats">
              <div className="stat-item">
                <span className="stat-label">Peso Total</span>
                <span className="stat-value">{totalWeight}t</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Energía</span>
                <span className="stat-value">{totalPower}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Módulos</span>
                <span className="stat-value">{selectedModules.length}</span>
              </div>
            </div>
          </main>

          {/* Right Panel - Selected Modules */}
          <aside className="selected-panel">
            <div className="panel-header">
              <h2>Módulos Seleccionados</h2>
              <span className="module-count">{selectedModules.length}</span>
            </div>

            <div className="selected-list">
              {selectedModules.length === 0 ? (
                <div className="empty-state">
                  <p>No hay módulos seleccionados</p>
                  <span>Agrega módulos desde el panel izquierdo</span>
                </div>
              ) : (
                selectedModules.map((module, index) => (
                  <div key={`selected-${index}`} className="selected-item">
                    <span className="selected-icon">{module.icon}</span>
                    <div className="selected-info">
                      <span className="selected-name">{module.name}</span>
                      <span className="selected-category">{module.category}</span>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveModule(index)}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>

        {/* Footer Actions */}
        <footer className="designer-footer">
          <button className="cancel-btn" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button 
            className={`continue-btn ${selectedModules.length > 0 ? 'active' : ''}`}
            onClick={handleContinue}
            disabled={selectedModules.length === 0}
          >
            Continuar al Diseño del Hábitat →
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ShipDesignerPage;