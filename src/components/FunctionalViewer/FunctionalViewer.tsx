// src/components/FunctionalViewer/FunctionalViewer.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './FunctionalViewer.css';

interface FunctionalArea {
  id: string;
  name: string;
  color: number;
  size: { width: number; height: number; depth: number };
  position: { x: number; y: number; z: number };
  minRecommended: number;
  recommended: number;
}

interface FunctionalViewerProps {
  selectedAreas: string[];
  designData: any;
  onAreasUpdate?: (areas: any[]) => void;
}

const FunctionalViewer: React.FC<FunctionalViewerProps> = ({ selectedAreas, designData, onAreasUpdate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number | undefined>(undefined);
  const meshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const sphereRef = useRef<THREE.LineSegments | null>(null);
  const isDraggingRef = useRef(false);
  const selectedMeshRef = useRef<THREE.Mesh | null>(null);

  const [areas, setAreas] = useState<FunctionalArea[]>([
    {
      id: 'descanso',
      name: 'Descanso (Literas)',
      color: 0x4ade80,
      size: { width: 2, height: 2, depth: 2 },
      position: { x: -4, y: 3, z: 0 },
      minRecommended: 2.0,
      recommended: 3.0
    },
    {
      id: 'gimnasio',
      name: 'Gimnasio',
      color: 0xef4444,
      size: { width: 2, height: 2, depth: 2 },
      position: { x: 0, y: -3, z: 0 },
      minRecommended: 2.0,
      recommended: 3.0
    },
    {
      id: 'higiene',
      name: 'Higiene',
      color: 0x60a5fa,
      size: { width: 2, height: 2, depth: 2 },
      position: { x: 4, y: 3, z: 0 },
      minRecommended: 1.5,
      recommended: 2.5
    },
    {
      id: 'cocina',
      name: 'Cocina',
      color: 0xfbbf24,
      size: { width: 2, height: 2, depth: 2 },
      position: { x: -4, y: -3, z: 2 },
      minRecommended: 2.5,
      recommended: 3.5
    },
    {
      id: 'control',
      name: 'Control Ambiental (ECLSS)',
      color: 0xa78bfa,
      size: { width: 2, height: 2, depth: 2 },
      position: { x: 4, y: -3, z: 2 },
      minRecommended: 2.0,
      recommended: 3.0
    },
    {
      id: 'enfermeria',
      name: 'Enfermería',
      color: 0xf472b6,
      size: { width: 2, height: 2, depth: 2 },
      position: { x: 0, y: 3, z: -2 },
      minRecommended: 1.8,
      recommended: 2.8
    }
  ]);

  const [selectedAreaId, setSelectedAreaId] = useState<string | null>('gimnasio');
  const crewSize = designData.crewSize || 16;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(30, 30, 0x00ffff, 0x004466);
    scene.add(gridHelper);

    // Crear el hábitat principal según el diseño (reemplaza la esfera)
    createMainHabitat(scene);

    createFunctionalAreas(scene);

    // Mouse controls for dragging
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const onMouseDown = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshArray = Array.from(meshesRef.current.values());
      const intersects = raycaster.intersectObjects(meshArray);

      if (intersects.length > 0) {
        selectedMeshRef.current = intersects[0].object as THREE.Mesh;
        isDraggingRef.current = true;
        container.style.cursor = 'grabbing';
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !selectedMeshRef.current) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectPoint);

      if (intersectPoint) {
        const distance = intersectPoint.length();
        if (distance < 11) {
          selectedMeshRef.current.position.x = intersectPoint.x;
          selectedMeshRef.current.position.z = intersectPoint.z;

          // Update area position in state
          const areaId = Array.from(meshesRef.current.entries()).find(
            ([_, mesh]) => mesh === selectedMeshRef.current
          )?.[0];

          if (areaId) {
            setAreas(prev => prev.map(area => 
              area.id === areaId 
                ? { ...area, position: { ...area.position, x: intersectPoint.x, z: intersectPoint.z } }
                : area
            ));
          }
        }
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      selectedMeshRef.current = null;
      container.style.cursor = 'default';
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Rotar la escena completa suavemente
      const time = Date.now() * 0.0001;
      camera.position.x = Math.cos(time) * 20;
      camera.position.z = Math.sin(time) * 20;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      createMainHabitat(sceneRef.current);
      createFunctionalAreas(sceneRef.current);
    }

    // Enviar datos actualizados al padre
    if (onAreasUpdate) {
      const areasData = areas.map(area => ({
        id: area.id,
        name: area.name,
        size: area.size,
        areaPerPerson: calculateAreaPerPerson(area),
        status: getAreaStatus(area)
      }));
      onAreasUpdate(areasData);
    }
  }, [areas, designData]);

  const createMainHabitat = (scene: THREE.Scene) => {
    // Remover hábitat anterior si existe
    const oldHabitat = scene.getObjectByName('mainHabitat');
    if (oldHabitat) scene.remove(oldHabitat);

    let geometry: THREE.BufferGeometry;
    // Multiplicar dimensiones por un factor para hacerlo más grande
    const scaleFactor = 2.5;
    const height = (designData.dimensions.alto || 10) * scaleFactor;
    const width = (designData.dimensions.ancho || 5) * scaleFactor;

    switch (designData.habitatShape) {
      case 'cilindro':
        geometry = new THREE.CylinderGeometry(width / 2, width / 2, height, 32);
        break;
      case 'esfera':
        geometry = new THREE.SphereGeometry(Math.max(width, height) / 2, 32, 32);
        break;
      case 'toroide':
        geometry = new THREE.TorusGeometry(width / 2, width / 4, 16, 100);
        break;
      case 'cubo':
        geometry = new THREE.BoxGeometry(width, height, width);
        break;
      case 'rueda':
        // Crear estación espacial tipo rueda con módulos conectados
        const group = new THREE.Group();
        const numModules = 16; // Más módulos para cerrar el círculo
        const wheelRadius = width * 2;
        
        // Calcular el tamaño de cada módulo para que encajen perfectamente
        const circumference = 2 * Math.PI * wheelRadius;
        const moduleArcLength = circumference / numModules;
        const moduleWidth = moduleArcLength * 0.95; // Pequeño gap entre módulos
        const moduleHeight = height / 2;
        const moduleDepth = 3;
        
        for (let i = 0; i < numModules; i++) {
          const angle = (i / numModules) * Math.PI * 2;
          
          // Crear módulo rectangular
          const moduleGeometry = new THREE.BoxGeometry(moduleWidth, moduleHeight, moduleDepth);
          const moduleMaterial = new THREE.MeshPhongMaterial({
            color: 0x2563eb,
            transparent: false,
            metalness: 0.6,
            roughness: 0.4
          });
          
          const module = new THREE.Mesh(moduleGeometry, moduleMaterial);
          
          // Posicionar en el círculo
          const x = Math.cos(angle) * wheelRadius;
          const z = Math.sin(angle) * wheelRadius;
          module.position.set(x, 0, z);
          
          // Rotar tangencialmente al círculo
          module.rotation.y = angle + Math.PI / 2;
          
          // Wireframe
          const edges = new THREE.EdgesGeometry(moduleGeometry);
          const wireframe = new THREE.LineSegments(
            edges, 
            new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
          );
          module.add(wireframe);
          
          group.add(module);
        }
        
        // Anillos de soporte (conectores visuales)
        const ringGeometry = new THREE.TorusGeometry(wheelRadius, 0.15, 8, 64);
        const ringMaterial = new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          metalness: 0.8,
          roughness: 0.2
        });
        
        // Anillo superior
        const topRing = new THREE.Mesh(ringGeometry, ringMaterial);
        topRing.position.y = moduleHeight / 2;
        group.add(topRing);
        
        // Anillo inferior
        const bottomRing = new THREE.Mesh(ringGeometry, ringMaterial);
        bottomRing.position.y = -moduleHeight / 2;
        group.add(bottomRing);
        
        scene.add(group);
        group.name = 'mainHabitat';
        return;
      default:
        geometry = new THREE.CylinderGeometry(width / 2, width / 2, height, 32);
    }

    const material = new THREE.MeshPhongMaterial({
      color: 0x1e40af,
      transparent: true,
      opacity: 0.08,
      metalness: 0.5,
      roughness: 0.5,
      side: THREE.DoubleSide
    });

    const habitat = new THREE.Mesh(geometry, material);
    habitat.name = 'mainHabitat';

    // Wireframe del hábitat más prominente
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffff, 
      linewidth: 2,
      transparent: true,
      opacity: 0.6
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    habitat.add(wireframe);

    scene.add(habitat);
  };

  const createFunctionalAreas = (scene: THREE.Scene) => {
    meshesRef.current.forEach(mesh => scene.remove(mesh));
    meshesRef.current.clear();

    areas.forEach(area => {
      const geometry = new THREE.BoxGeometry(area.size.width, area.size.height, area.size.depth);
      const material = new THREE.MeshStandardMaterial({
        color: area.color,
        transparent: true,
        opacity: 0.7,
        metalness: 0.3,
        roughness: 0.7
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(area.position.x, area.position.y, area.position.z);

      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
      const wireframe = new THREE.LineSegments(edges, lineMaterial);
      mesh.add(wireframe);

      scene.add(mesh);
      meshesRef.current.set(area.id, mesh);
    });
  };

  const updateAreaSize = (areaId: string, dimension: 'width' | 'height' | 'depth', delta: number) => {
    setAreas(prevAreas => 
      prevAreas.map(area => {
        if (area.id === areaId) {
          const newSize = { ...area.size };
          newSize[dimension] = Math.max(1, Math.min(10, newSize[dimension] + delta));
          return { ...area, size: newSize };
        }
        return area;
      })
    );
  };

  const calculateAreaPerPerson = (area: FunctionalArea): number => {
    const floorArea = area.size.width * area.size.depth;
    return floorArea / crewSize;
  };

  const getAreaStatus = (area: FunctionalArea): 'small' | 'recommended' | 'large' => {
    const areaPerPerson = calculateAreaPerPerson(area);
    if (areaPerPerson < area.minRecommended) return 'small';
    if (areaPerPerson < area.recommended) return 'recommended';
    return 'large';
  };

  const getWarnings = () => {
    return areas.map(area => ({
      area,
      status: getAreaStatus(area),
      areaPerPerson: calculateAreaPerPerson(area)
    }));
  };

  return (
    <div className="functional-viewer">
      <div className="viewer-3d" ref={containerRef} />
      
      <div className="warnings-overlay">
        {getWarnings().map(({ area, status, areaPerPerson }) => (
          <div key={area.id} className={`warning warning-${status}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 22h20L12 2z" fill={status === 'small' ? '#ef4444' : status === 'recommended' ? '#fbbf24' : '#4ade80'}/>
              <text x="12" y="16" fontSize="12" fill={status === 'large' ? 'black' : 'white'} textAnchor="middle" fontWeight="bold">
                {status === 'large' ? '✓' : '!'}
              </text>
            </svg>
            <span>
              {status === 'small' ? 'ÁREA DEMAZIAJO PEQUEÑA' : status === 'recommended' ? 'RECOMENDADO' : 'ÓPTIMO'} 
              {' '}({areaPerPerson.toFixed(1)} m²/pers)
            </span>
          </div>
        ))}
      </div>

      <div className="area-controls">
        <h3>CONTROLES DE ÁREA</h3>
        <div className="area-selector">
          {areas.map(area => (
            <button
              key={area.id}
              className={`area-select-btn ${selectedAreaId === area.id ? 'active' : ''}`}
              style={{ borderColor: `#${area.color.toString(16).padStart(6, '0')}` }}
              onClick={() => setSelectedAreaId(area.id)}
            >
              {area.name}
            </button>
          ))}
        </div>

        {selectedAreaId && (
          <div className="dimension-controls">
            {[
              { key: 'width', label: 'Ancho' },
              { key: 'height', label: 'Alto' },
              { key: 'depth', label: 'Profundidad' }
            ].map(({ key, label }) => {
              const area = areas.find(a => a.id === selectedAreaId);
              if (!area) return null;
              
              return (
                <div key={key} className="control-row">
                  <label>{label}:</label>
                  <div className="control-buttons">
                    <button onClick={() => updateAreaSize(selectedAreaId, key as any, -0.5)}>-</button>
                    <span>{area.size[key as keyof typeof area.size].toFixed(1)} metros</span>
                    <button onClick={() => updateAreaSize(selectedAreaId, key as any, 0.5)}>+</button>
                  </div>
                </div>
              );
            })}
            
            <div className="area-info">
              {(() => {
                const area = areas.find(a => a.id === selectedAreaId);
                if (!area) return null;
                const areaPerPerson = calculateAreaPerPerson(area);
                const status = getAreaStatus(area);
                return (
                  <div className={`status-badge status-${status}`}>
                    {areaPerPerson.toFixed(2)} m²/persona
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      <div className="earth-corner">
        <div className="earth-sphere"></div>
      </div>

      <div className="viewer-controls">
        <button className="control-btn" title="Centrar vista">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M1 12h6m6 0h6"/>
          </svg>
        </button>
        <button className="control-btn" title="Rotar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/>
            <path d="M12 3a9 9 0 0 1 0 18"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FunctionalViewer;