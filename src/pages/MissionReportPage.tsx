// src/pages/MissionReportPage.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as THREE from 'three';
import './MissionReportPage.css';

interface DesignData {
  habitatShape: string;
  dimensions: { alto: number; ancho: number };
  missionDestination: string;
  crew: string;
  duration: number;
  crewSize: number;
  areas: Array<{
    id: string;
    name: string;
    size: { width: number; height: number; depth: number };
    areaPerPerson: number;
    status: string;
  }>;
}

const MissionReportPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const designData = location.state?.designData as DesignData;

  const [successPercentage, setSuccessPercentage] = useState(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!designData) {
      console.log('❌ No hay designData, redirigiendo...');
      navigate('/');
      return;
    }

    console.log('✅ designData cargado:', designData);
    calculateSuccess();
  }, [designData, navigate]);

  useEffect(() => {
    if (!showPreview || !previewContainerRef.current || !designData) return;

    const container = previewContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    
    const backgrounds: { [key: string]: number } = {
      'Órbita Terrestre': 0x001133,
      'Luna': 0x1a1a1a,
      'Marte': 0x8B4513
    };
    scene.background = new THREE.Color(backgrounds[designData.missionDestination] || 0x000000);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Crear hábitat principal
    let geometry: THREE.BufferGeometry;
    const height_ship = designData.dimensions.alto || 10;
    const width_ship = designData.dimensions.ancho || 5;

    switch (designData.habitatShape) {
      case 'cilindro':
        geometry = new THREE.CylinderGeometry(width_ship / 2, width_ship / 2, height_ship, 32);
        break;
      case 'esfera':
        geometry = new THREE.SphereGeometry(width_ship / 2, 32, 32);
        break;
      case 'toroide':
        geometry = new THREE.TorusGeometry(width_ship / 2, width_ship / 4, 16, 100);
        break;
      case 'cubo':
        geometry = new THREE.BoxGeometry(width_ship, height_ship, width_ship);
        break;
      default:
        geometry = new THREE.CylinderGeometry(width_ship / 2, width_ship / 2, height_ship, 32);
    }

    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: 0.3 // Más transparente para ver las áreas internas
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    mesh.add(wireframe);

    // ✅ AGREGAR ÁREAS FUNCIONALES COMO CUBOS
    if (designData.areas && designData.areas.length > 0) {
      console.log('🏠 Renderizando áreas:', designData.areas);
      
      // Colores para cada tipo de área
      const areaColors: { [key: string]: number } = {
        'descanso': 0x10b981,    // verde
        'gimnasio': 0xf59e0b,    // amarillo
        'higiene': 0x3b82f6,     // azul
        'cocina': 0xef4444,      // rojo
        'control': 0x8b5cf6,     // púrpura
        'enfermeria': 0xec4899,  // rosa
        'habitacion': 0x10b981,
        'laboratorio': 0xf59e0b,
        'comedor': 0xef4444
      };

      designData.areas.forEach((area, index) => {
        const areaGeometry = new THREE.BoxGeometry(
          area.size.width,
          area.size.height,
          area.size.depth
        );

        const areaColor = areaColors[area.id.toLowerCase()] || 0x6366f1;

        const areaMaterial = new THREE.MeshStandardMaterial({
          color: areaColor,
          metalness: 0.3,
          roughness: 0.7,
          transparent: true,
          opacity: 0.8
        });

        const areaMesh = new THREE.Mesh(areaGeometry, areaMaterial);

        // Posicionar las áreas en una distribución circular o vertical
        const angle = (index / designData.areas.length) * Math.PI * 2;
        const radius = width_ship / 3;
        
        areaMesh.position.x = Math.cos(angle) * radius;
        areaMesh.position.y = (index - designData.areas.length / 2) * (area.size.height + 0.5);
        areaMesh.position.z = Math.sin(angle) * radius;

        // Wireframe para las áreas
        const areaEdges = new THREE.EdgesGeometry(areaGeometry);
        const areaWireframe = new THREE.LineSegments(
          areaEdges,
          new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
        );
        areaMesh.add(areaWireframe);

        scene.add(areaMesh);
      });
    }

    // Agregar planeta/luna según destino
    if (designData.missionDestination === 'Órbita Terrestre') {
      const earthGeometry = new THREE.SphereGeometry(8, 32, 32);
      const earthMaterial = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        emissive: 0x1e40af,
        emissiveIntensity: 0.3,
        metalness: 0.4,
        roughness: 0.6
      });
      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      earth.position.set(-15, -5, -20);
      scene.add(earth);
    } else if (designData.missionDestination === 'Luna') {
      const moonGeometry = new THREE.SphereGeometry(6, 32, 32);
      const moonMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        emissive: 0x404040,
        emissiveIntensity: 0.2,
        metalness: 0.2,
        roughness: 0.8
      });
      const moon = new THREE.Mesh(moonGeometry, moonMaterial);
      moon.position.set(12, -3, -15);
      scene.add(moon);
    } else if (designData.missionDestination === 'Marte') {
      const marsGeometry = new THREE.SphereGeometry(7, 32, 32);
      const marsMaterial = new THREE.MeshStandardMaterial({
        color: 0xcd5c5c,
        emissive: 0x8B4513,
        emissiveIntensity: 0.3,
        metalness: 0.3,
        roughness: 0.7
      });
      const mars = new THREE.Mesh(marsGeometry, marsMaterial);
      mars.position.set(-12, -4, -18);
      scene.add(mars);
    }

    // Estrellas
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Animación
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      mesh.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [showPreview, designData]);

  const calculateSuccess = () => {
    if (!designData?.areas) {
      console.log('⚠️ No hay áreas para calcular');
      return;
    }

    let score = 100;
    const issues: string[] = [];
    const suggests: string[] = [];

    designData.areas.forEach(area => {
      if (area.status === 'small') {
        score -= 15;
        issues.push(`El módulo de ${area.name.toLowerCase()} es ${area.areaPerPerson.toFixed(1)} m² por tripulante, por debajo de lo recomendado por la NASA para el bienestar.`);
      } else if (area.status === 'recommended') {
        score -= 5;
        suggests.push(`El área de ${area.name.toLowerCase()} está en el límite. Considera aumentar el espacio para mayor comodidad.`);
      }
    });

    if (designData.habitatShape === 'cubo') {
      score -= 10;
      issues.push('El diseño de hábitat cúbico no es óptimo para misiones espaciales. Se recomienda forma cilíndrica o esférica.');
    }

    const spacePerCrew = (designData.dimensions.alto * designData.dimensions.ancho) / designData.crewSize;
    if (spacePerCrew < 5 && designData.duration > 30) {
      score -= 10;
      issues.push('El espacio por tripulante es insuficiente para misiones largas, lo que podría generar problemas de convivencia.');
    }

    score = Math.max(0, Math.min(100, score));

    setSuccessPercentage(score);
    setRecommendations(issues);
    setImprovements(suggests);
  };

  const getSuccessMessage = () => {
    if (successPercentage >= 85) return '¡Diseño Excelente!';
    if (successPercentage >= 70) return 'Diseño Aceptable';
    if (successPercentage >= 50) return 'Diseño Necesita Mejoras';
    return 'Diseño Crítico';
  };

  const getSuccessColor = () => {
    if (successPercentage >= 85) return '#4ade80';
    if (successPercentage >= 70) return '#fbbf24';
    return '#ef4444';
  };

  if (!designData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mission-report-page">
      <div className="report-background">
        <header className="report-header">
          <div className="logo-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="logo-icon">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#3b82f6"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3b82f6" strokeWidth="2"/>
            </svg>
            <span className="logo-text-main">SpaceHub</span>
            <span className="logo-text-sub">Designer</span>
          </div>
          <div className="header-buttons">
            <button className="header-btn" onClick={() => navigate('/profile')}>Mi Cuenta</button>
            <button className="header-btn" onClick={() => navigate('/mission-location')}>Crear Diseño</button>
          </div>
        </header>

        <main className="report-main">
          <div className="report-container">
            <h1 className="report-title">Informe de Éxito de la Misión</h1>

            <div className="success-circle-container">
              <svg className="success-circle" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#1e3a5f"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={getSuccessColor()}
                  strokeWidth="20"
                  strokeDasharray={`${(successPercentage / 100) * 502.65} 502.65`}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  className="success-progress"
                />
                <text
                  x="100"
                  y="110"
                  textAnchor="middle"
                  fontSize="48"
                  fontWeight="bold"
                  fill="white"
                >
                  {successPercentage}%
                </text>
              </svg>
              <p className="success-message">{getSuccessMessage()}</p>
            </div>

            {recommendations.length > 0 && (
              <div className="recommendations-section">
                <h2>Cuestiones por Mejorar:</h2>
                <ul className="recommendations-list">
                  {recommendations.map((rec, index) => (
                    <li key={index}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 22h20L12 2z" fill="#ef4444"/>
                        <text x="12" y="16" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">!</text>
                      </svg>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {improvements.length > 0 && (
              <div className="improvements-section">
                <h2>Sugerencias de Mejora:</h2>
                <ul className="improvements-list">
                  {improvements.map((imp, index) => (
                    <li key={index}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#fbbf24"/>
                        <text x="12" y="16" fontSize="12" fill="black" textAnchor="middle" fontWeight="bold">i</text>
                      </svg>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="action-buttons">
              <button className="action-btn primary" onClick={() => navigate('/community')}>
                Compartir en la Galería
              </button>
              <button className="action-btn secondary" onClick={() => navigate('/dashboard')}>
                Guardar Diseño
              </button>
              <button className="action-btn preview" onClick={() => setShowPreview(true)}>
                Vista Previa 3D
              </button>
            </div>
          </div>
        </main>

        {showPreview && (
          <div className="preview-modal" onClick={() => setShowPreview(false)}>
            <div className="preview-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-preview" onClick={() => setShowPreview(false)}>×</button>
              <h2>Vista Previa 3D - {designData.missionDestination}</h2>
              <div className="preview-viewer" ref={previewContainerRef}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionReportPage;