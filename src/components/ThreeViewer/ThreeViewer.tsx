// src/components/ThreeViewer/ThreeViewer.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeViewer.css';

interface ThreeViewerProps {
  designData: any;
}

const ThreeViewer: React.FC<ThreeViewerProps> = ({ designData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1628);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 15;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x3b82f6, 0x1e3a5f);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // Initial Mesh
    createMesh(scene, designData);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / width) * 2 - 1;
      mouseY = -(event.clientY / height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.005;
        
        // Smooth camera movement based on mouse
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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

  // Update mesh when design changes
  useEffect(() => {
    if (sceneRef.current && meshRef.current) {
      sceneRef.current.remove(meshRef.current);
      createMesh(sceneRef.current, designData);
    }
  }, [designData]);

  const createMesh = (scene: THREE.Scene, data: any) => {
    let geometry: THREE.BufferGeometry;

    const height = data.dimensions.alto || 10;
    const width = data.dimensions.ancho || 5;

    switch (data.habitatShape) {
      case 'cilindro':
        geometry = new THREE.CylinderGeometry(width / 2, width / 2, height, 32);
        break;
      case 'esfera':
        geometry = new THREE.SphereGeometry(width / 2, 32, 32);
        break;
      case 'toroide':
        geometry = new THREE.TorusGeometry(width / 2, width / 4, 16, 100);
        break;
      case 'cubo':
        geometry = new THREE.BoxGeometry(width, height, width);
        break;
      default:
        geometry = new THREE.CylinderGeometry(width / 2, width / 2, height, 32);
    }

    const material = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);
  };

  return (
    <div className="three-viewer">
      <div className="viewer-container" ref={containerRef} />
      <div className="viewer-info">
        <div className="info-item">
          <span className="info-label">Forma:</span>
          <span className="info-value">{designData.habitatShape}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Dimensiones:</span>
          <span className="info-value">
            {designData.dimensions.alto}m × {designData.dimensions.ancho}m
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThreeViewer;