import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroOrbCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 400;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 4.8;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Group holding the 3D elements
      const group = new THREE.Group();
      scene.add(group);

      // Outer Wireframe Icosahedron / Geodesic Sphere
      const geometryOuter = new THREE.IcosahedronGeometry(1.65, 2);
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6b35,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const wireframeMesh = new THREE.Mesh(geometryOuter, wireframeMaterial);
      group.add(wireframeMesh);

      // Inner subtle glow core
      const geometryInner = new THREE.IcosahedronGeometry(1.2, 1);
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0xc8102e,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const innerMesh = new THREE.Mesh(geometryInner, innerMaterial);
      group.add(innerMesh);

      // Floating ambient particles around the sphere
      const particleCount = 60;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 1.9 + Math.random() * 0.8;
        const sinPhi = Math.sin(phi);
        particlePositions[i] = r * sinPhi * Math.cos(theta);
        particlePositions[i + 1] = r * sinPhi * Math.sin(theta);
        particlePositions[i + 2] = r * Math.cos(phi);
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(particlePositions, 3)
      );
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xff8c42,
        size: 0.03,
        transparent: true,
        opacity: 0.35,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      group.add(particles);

      // Mouse tracking for subtle interactive parallax
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handlePointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };

      window.addEventListener('mousemove', handlePointerMove);

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      // Render loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // Smooth rotation
        wireframeMesh.rotation.y += 0.003;
        wireframeMesh.rotation.x += 0.0015;

        innerMesh.rotation.y -= 0.004;
        innerMesh.rotation.z += 0.002;

        particles.rotation.y += 0.001;

        // Subtle mouse tilt
        targetX += (mouseX * 0.35 - targetX) * 0.05;
        targetY += (mouseY * 0.35 - targetY) * 0.05;
        group.rotation.y = targetX;
        group.rotation.x = -targetY;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to ambient glow', e);
    }
  }, []);

  return (
    <div className="relative w-full h-full min-h-[360px] md:min-h-[480px] flex items-center justify-center pointer-events-none">
      {/* Three.js canvas container */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 flex items-center justify-center z-10" />

      {/* Ambient background soft glow behind geometry */}
      <div
        className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full blur-[90px] pointer-events-none -z-0 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,53,0.3) 0%, rgba(200,16,46,0.15) 50%, transparent 70%)',
        }}
      />
    </div>
  );
};
