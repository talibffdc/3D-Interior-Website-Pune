import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      <group ref={groupRef}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[-2, 1, -2]} castShadow receiveShadow>
            <boxGeometry args={[1, 3, 1]} />
            <meshStandardMaterial color="#cda65a" roughness={0.2} metalness={0.8} />
          </mesh>
        </Float>

        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[2, -1, 1]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 0.5, 32]} />
            <meshStandardMaterial color="#2d2a26" roughness={0.7} metalness={0.2} />
          </mesh>
        </Float>
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
           <mesh position={[0, 2, -4]} castShadow receiveShadow>
             <torusGeometry args={[1.5, 0.2, 16, 100]} />
             <meshStandardMaterial color="#f0efe9" roughness={0.4} metalness={0.1} />
           </mesh>
        </Float>

        <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.4}>
          <mesh position={[-3, -2, -1]} castShadow receiveShadow>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#cda65a" roughness={0.1} metalness={0.9} wireframe />
          </mesh>
        </Float>
      </group>

      <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4} />
    </>
  );
}

export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  
  return supported;
}
