import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SceneId } from '../types';

interface ThreeCanvasProps {
  currentScene: SceneId;
  scrollProgress: number; // 0 to 1 overall scroll progress
  mousePosition: { x: number; y: number };
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  currentScene,
  scrollProgress,
  mousePosition,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Object references
  const threadParticlesRef = useRef<THREE.Points | null>(null);
  const centralSculptureRef = useRef<THREE.Group | null>(null);
  const fragmentPlanesGroupRef = useRef<THREE.Group | null>(null);
  const constellationGroupRef = useRef<THREE.Group | null>(null);
  const architectureGroupRef = useRef<THREE.Group | null>(null);
  const lightOrbRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0e0d0c); // Dark Travertine & Smoked Obsidian
    scene.fog = new THREE.FogExp2(0x0e0d0c, 0.035);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lighting - Luxury Chiaroscuro
    const ambientLight = new THREE.AmbientLight(0x3a322b, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe2d2bd, 2.8); // Travertine warm light
    keyLight.position.set(8, 12, 10);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const sapphireRimLight = new THREE.DirectionalLight(0x2a52be, 2.0); // Lucent Cobalt Accent
    sapphireRimLight.position.set(-10, -5, -8);
    scene.add(sapphireRimLight);

    // Interactive Cursor Light Orb
    const lightOrb = new THREE.PointLight(0xf4e3be, 3.5, 25);
    lightOrb.position.set(0, 0, 5);
    scene.add(lightOrb);
    lightOrbRef.current = lightOrb;

    // 5. Build Scene Objects
    // --- Object A: Thread Particles (Gold & Cobalt Couture Weave) ---
    const particleCount = 4500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xd4af37);
    const cobaltColor = new THREE.Color(0x2a52be);
    const travertineColor = new THREE.Color(0xe2d2bd);

    for (let i = 0; i < particleCount; i++) {
      // Helix / Hourglass double-curved garment distribution
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * 8;
      const radius = 2.2 + Math.sin(v * 1.5) * 0.8 + (Math.random() - 0.5) * 0.4;

      positions[i * 3] = Math.cos(u) * radius;
      positions[i * 3 + 1] = v;
      positions[i * 3 + 2] = Math.sin(u) * radius;

      // Color blending
      const randVal = Math.random();
      const pColor = randVal > 0.7 ? cobaltColor : randVal > 0.3 ? goldColor : travertineColor;
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const threadParticles = new THREE.Points(geometry, particleMaterial);
    scene.add(threadParticles);
    threadParticlesRef.current = threadParticles;

    // --- Object B: Central Sculptural Garment Wireframe ---
    const centralGroup = new THREE.Group();
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.6, 0.45, 120, 16, 2, 3);
    const torusKnotMat = new THREE.MeshStandardMaterial({
      color: 0xe2d2bd,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const torusMesh = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    centralGroup.add(torusMesh);
    scene.add(centralGroup);
    centralSculptureRef.current = centralGroup;

    // --- Object C: Scene 2 Orbiting Fragment Planes ---
    const fragmentGroup = new THREE.Group();
    const planeGeo = new THREE.PlaneGeometry(1.8, 2.4);
    const planeMat = new THREE.MeshPhysicalMaterial({
      color: 0x1c1c1e,
      transmission: 0.85,
      opacity: 0.7,
      transparent: true,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < 6; i++) {
      const plane = new THREE.Mesh(planeGeo, planeMat);
      const angle = (i / 6) * Math.PI * 2;
      plane.position.set(Math.cos(angle) * 4.5, Math.sin(i) * 1.2, Math.sin(angle) * 4.5);
      plane.rotation.y = -angle + Math.PI / 2;
      fragmentGroup.add(plane);
    }
    fragmentGroup.position.y = -15; // initially below view
    scene.add(fragmentGroup);
    fragmentPlanesGroupRef.current = fragmentGroup;

    // --- Object D: Scene 3 Constellation Floor ---
    const constellationGroup = new THREE.Group();
    const gridHelper = new THREE.GridHelper(20, 20, 0x8c6a45, 0x2c2925);
    gridHelper.position.y = -3;
    constellationGroup.add(gridHelper);

    // Nodes & Laser beam connecting Person A and Person B
    const nodeAGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const nodeAMat = new THREE.MeshBasicMaterial({ color: 0xd4af37 });
    const nodeA = new THREE.Mesh(nodeAGeo, nodeAMat);
    nodeA.position.set(-3, -2.8, 0);

    const nodeB = new THREE.Mesh(nodeAGeo, new THREE.MeshBasicMaterial({ color: 0x2a52be }));
    nodeB.position.set(3, -2.8, 0);

    const linePoints = [new THREE.Vector3(-3, -2.8, 0), new THREE.Vector3(3, -2.8, 0)];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xe2d2bd, linewidth: 2 });
    const connectionLine = new THREE.Line(lineGeo, lineMat);

    constellationGroup.add(nodeA, nodeB, connectionLine);
    constellationGroup.position.y = -30; // hidden until needed
    scene.add(constellationGroup);
    constellationGroupRef.current = constellationGroup;

    // --- Object E: Scene 4 Folding Architecture (Florentine Arches) ---
    const archGroup = new THREE.Group();
    const archMat = new THREE.MeshStandardMaterial({
      color: 0x2a2825,
      roughness: 0.4,
      metalness: 0.5,
    });

    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue;
      const boxGeo = new THREE.BoxGeometry(0.8, 6, 0.8);
      const pillar = new THREE.Mesh(boxGeo, archMat);
      pillar.position.set(i * 3.2, 0, -i * 2);
      archGroup.add(pillar);
    }
    archGroup.position.y = -45;
    scene.add(archGroup);
    architectureGroupRef.current = archGroup;

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const elapsedTime = clock.getElapsedTime();

      // Smoothly update light orb based on mouse
      if (lightOrbRef.current) {
        lightOrbRef.current.position.x += (mousePosition.x * 8 - lightOrbRef.current.position.x) * 0.05;
        lightOrbRef.current.position.y += (mousePosition.y * 6 - lightOrbRef.current.position.y) * 0.05;
      }

      // Rotate thread particles gently
      if (threadParticlesRef.current) {
        threadParticlesRef.current.rotation.y = elapsedTime * 0.12;
        threadParticlesRef.current.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15;
      }

      // Rotate central torus sculpture
      if (centralSculptureRef.current) {
        centralSculptureRef.current.rotation.y = -elapsedTime * 0.15;
        centralSculptureRef.current.rotation.z = Math.cos(elapsedTime * 0.1) * 0.2;
      }

      // Animate Fragment planes rotation
      if (fragmentPlanesGroupRef.current) {
        fragmentPlanesGroupRef.current.rotation.y = elapsedTime * 0.08;
      }

      // Smooth Camera Transitions according to active scene
      if (cameraRef.current) {
        let targetY = 0;
        let targetZ = 15;
        let targetRotX = 0;

        switch (currentScene) {
          case 1:
            targetY = 0;
            targetZ = 12;
            break;
          case 2:
            targetY = 0;
            targetZ = 14;
            if (fragmentPlanesGroupRef.current) fragmentPlanesGroupRef.current.position.y = 0;
            break;
          case 3:
            targetY = 3;
            targetZ = 16;
            targetRotX = -0.3;
            if (constellationGroupRef.current) constellationGroupRef.current.position.y = 0;
            break;
          case 4:
            targetY = 0;
            targetZ = 18;
            if (architectureGroupRef.current) architectureGroupRef.current.position.y = 0;
            break;
          case 5:
            targetY = 1;
            targetZ = 10;
            break;
          case 6:
            targetY = -1;
            targetZ = 13;
            break;
          case 7:
            targetY = 0;
            targetZ = 9;
            break;
          default:
            targetZ = 12;
        }

        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.04;
        cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.04;
        cameraRef.current.rotation.x += (targetRotX - cameraRef.current.rotation.x) * 0.04;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    render();

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      cameraRef.current.aspect = container.clientWidth / container.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Update object visibilities smoothly based on currentScene
  useEffect(() => {
    if (fragmentPlanesGroupRef.current) {
      fragmentPlanesGroupRef.current.visible = currentScene === 2 || currentScene === 1;
    }
    if (constellationGroupRef.current) {
      constellationGroupRef.current.visible = currentScene === 3 || currentScene === 4;
    }
    if (architectureGroupRef.current) {
      architectureGroupRef.current.visible = currentScene === 4;
    }
  }, [currentScene]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 40%, rgba(28, 26, 24, 0.4) 0%, rgba(14, 13, 12, 0.95) 100%)',
      }}
    />
  );
};
