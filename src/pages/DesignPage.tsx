// src/pages/DesignPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DesignPanel from '../components/DesignPanel/DesignPanel';
import ThreeViewer from '../components/ThreeViewer/ThreeViewer';
import FunctionalViewer from '../components/FunctionalViewer/FunctionalViewer';
import './DesignPage.css';

const DesignPage: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'design' | 'functional'>('design');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [designData, setDesignData] = useState({
    habitatShape: 'cilindro',
    dimensions: { alto: 10, ancho: 5 },
    functionalAreas: [], // ← AGREGADO: Campo necesario para DesignPanel
    missionDestination: 'Órbita Terrestre',
    duration: 50,
    crewSize: 16
  });
  const [functionalAreas, setFunctionalAreas] = useState<any[]>([]);

  const handleDesignChange = (data: any) => {
    setDesignData(data);
  };

  const handleSaveDesign = () => {
    // Preparar datos para el reporte
    const reportData = {
      ...designData,
      areas: functionalAreas
    };

    // Navegar a la página de reporte
    navigate('/mission-report', { state: { designData: reportData } });
  };

  return (
    <div className="design-page">
      <div className="design-background">
        {/* Header */}
        <header className="design-header">
          <div className="logo-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="logo-icon">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#3b82f6"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3b82f6" strokeWidth="2"/>
            </svg>
            <span className="logo-text-main">SpaceHub</span>
            <span className="logo-text-sub">Designer</span>
          </div>

          {/* Botones de navegación entre vistas */}
          <div className="view-buttons">
            <button 
              className={`view-btn ${currentView === 'functional' ? 'active' : ''}`}
              onClick={currentView === 'functional' ? handleSaveDesign : () => setCurrentView('functional')}
            >
              {currentView === 'functional' ? 'Guardar Diseño' : 'Ver Áreas Funcionales'}
            </button>
            <button 
              className="view-btn secondary"
            >
              Catálogo de Objetos
            </button>
          </div>
        </header>

        {/* Main Content - Cambia según la vista */}
        <main className="design-main">
          {currentView === 'design' ? (
            <>
              <DesignPanel 
                location={location || 'unknown'}
                designData={designData}
                onDesignChange={handleDesignChange}
              />
              <ThreeViewer designData={designData} />
            </>
          ) : (
            <div className="functional-areas-view">
              {/* Panel de áreas funcionales */}
              <div className="functional-panel">
                <h2>ÁREAS FUNCIONALES</h2>
                <div className="areas-list">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={selectedAreas.includes('descanso')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAreas([...selectedAreas, 'descanso']);
                        } else {
                          setSelectedAreas(selectedAreas.filter(a => a !== 'descanso'));
                        }
                      }}
                    />
                    Descanso (Literas)
                  </label>
                  <label>
                    <input 
                      type="checkbox"
                      checked={selectedAreas.includes('gimnasio')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAreas([...selectedAreas, 'gimnasio']);
                        } else {
                          setSelectedAreas(selectedAreas.filter(a => a !== 'gimnasio'));
                        }
                      }}
                    />
                    Gimnasio
                  </label>
                  <label>
                    <input 
                      type="checkbox"
                      checked={selectedAreas.includes('higiene')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAreas([...selectedAreas, 'higiene']);
                        } else {
                          setSelectedAreas(selectedAreas.filter(a => a !== 'higiene'));
                        }
                      }}
                    />
                    Higiene
                  </label>
                  <label>
                    <input 
                      type="checkbox"
                      checked={selectedAreas.includes('cocina')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAreas([...selectedAreas, 'cocina']);
                        } else {
                          setSelectedAreas(selectedAreas.filter(a => a !== 'cocina'));
                        }
                      }}
                    />
                    Cocina/Alimentos
                  </label>
                  <label>
                    <input 
                      type="checkbox"
                      checked={selectedAreas.includes('control')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAreas([...selectedAreas, 'control']);
                        } else {
                          setSelectedAreas(selectedAreas.filter(a => a !== 'control'));
                        }
                      }}
                    />
                    Control Ambiental (ECLSS)
                  </label>
                  <label>
                    <input 
                      type="checkbox"
                      checked={selectedAreas.includes('enfermeria')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAreas([...selectedAreas, 'enfermeria']);
                        } else {
                          setSelectedAreas(selectedAreas.filter(a => a !== 'enfermeria'));
                        }
                      }}
                    />
                    Enfermería
                  </label>
                </div>
                <button className="show-zones-btn">Mostrar Zonas Recomendadas</button>
              </div>
              
              {/* Viewer 3D con cubos funcionales */}
              <FunctionalViewer 
                selectedAreas={selectedAreas}
                designData={designData}
                onAreasUpdate={setFunctionalAreas}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DesignPage;