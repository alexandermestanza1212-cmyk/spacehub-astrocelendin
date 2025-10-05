// src/pages/DesignPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DesignPanel from '../components/DesignPanel/DesignPanel';
import ThreeViewer from '../components/ThreeViewer/ThreeViewer';
import FunctionalViewer from '../components/FunctionalViewer/FunctionalViewer';
import './DesignPage.css';

const DesignPage: React.FC = () => {
  const { location: locationParam } = useParams<{ location: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState<'design' | 'functional'>('design');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  
  // Mapeo de IDs a nombres completos para el destino
  const destinationMap: { [key: string]: string } = {
    'mars': 'Marte',
    'moon': 'Luna',
    'orbit': 'Órbita Terrestre'
  };

  // Obtener el destino del state o del parámetro
  const missionDestination = location.state?.destination || 
                             destinationMap[locationParam || 'orbit'] ||
                             'Órbita Terrestre';

  const [designData, setDesignData] = useState({
    habitatShape: 'cilindro',
    dimensions: { alto: 10, ancho: 5 },
    functionalAreas: [],
    missionDestination: missionDestination,
    crew: 'Científicos',
    duration: 50,
    crewSize: 16
  });

  const [functionalAreas, setFunctionalAreas] = useState<any[]>([]);

  // Actualizar missionDestination cuando cambie
  useEffect(() => {
    setDesignData(prev => ({
      ...prev,
      missionDestination: missionDestination
    }));
  }, [missionDestination]);

  const handleDesignChange = (data: any) => {
    setDesignData(prev => ({
      ...prev,
      ...data,
      missionDestination: missionDestination // Mantener el destino
    }));
  };

  const handleAreasUpdate = (areas: any[]) => {
    setFunctionalAreas(areas);
  };

  const handleSaveDesign = () => {
    // Preparar datos completos para el reporte
    const reportData = {
      habitatShape: designData.habitatShape,
      dimensions: designData.dimensions,
      missionDestination: missionDestination,
      crew: designData.crew,
      duration: designData.duration,
      crewSize: designData.crewSize,
      areas: functionalAreas.length > 0 ? functionalAreas : [
        // Áreas por defecto si no hay ninguna configurada
        {
          id: 'habitacion',
          name: 'Habitación',
          size: { width: 3, height: 2.5, depth: 2 },
          areaPerPerson: 6,
          status: 'optimal'
        },
        {
          id: 'laboratorio',
          name: 'Laboratorio',
          size: { width: 5, height: 3, depth: 4 },
          areaPerPerson: 8,
          status: 'optimal'
        }
      ]
    };

    console.log('📊 Enviando al reporte:', reportData);
    console.log('🌍 Destino:', reportData.missionDestination);

    // Navegar al reporte con los datos
    navigate('/mission-report', { 
      state: { designData: reportData } 
    });
  };

  const toggleArea = (areaId: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(a => a !== areaId)
        : [...prev, areaId]
    );
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

          {/* Mostrar destino actual */}
          <div className="mission-info">
            <span className="mission-destination">📍 Destino: {missionDestination}</span>
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
                location={locationParam || 'unknown'}
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
                      onChange={() => toggleArea('descanso')}
                    />
                    Descanso (Literas)
                  </label>
                  <label>
                    <input 
                      type="checkbox"
                      checked={selectedAreas.includes('gimnasio')}
                      onChange={() => toggleArea('gimnasio')}
                    />
                    Gimnasio
                  </label>
                  <label>
                    <input 
                      type="checkbox"
                      checked={selectedAreas.includes('higiene')}
                      onChange={() => toggleArea('higiene')}
                    />
                    Higiene
                  </label>
                  <label>
                    <input 
                      type="checkbox"
                      checked={selectedAreas.includes('cocina')}
                      onChange={() => toggleArea('cocina')}
                    />
                    Cocina/Alimentos
                  </label>
                  <label>
                    <input 
                      type="checkbox"
                      checked={selectedAreas.includes('control')}
                      onChange={() => toggleArea('control')}
                    />
                    Control Ambiental (ECLSS)
                  </label>
                  <label>
                    <input 
                      type="checkbox"
                      checked={selectedAreas.includes('enfermeria')}
                      onChange={() => toggleArea('enfermeria')}
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
                onAreasUpdate={handleAreasUpdate}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DesignPage;