import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cone, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function CuteLamp3D({ isLightOn, toggleLight }) {
  const bulbRef = useRef();
  const pullRef = useRef();
  const [pulling, setPulling] = useState(false);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setPulling(true);
    toggleLight();
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setPulling(false);
  };

  useFrame((state, delta) => {
    if (pulling) {
      pullRef.current.position.y = THREE.MathUtils.lerp(pullRef.current.position.y, -3.2, 0.2);
    } else {
      pullRef.current.position.y = THREE.MathUtils.lerp(pullRef.current.position.y, -2.8, 0.1);
    }

    if (bulbRef.current) {
      const targetIntensity = isLightOn ? 8 : 0;
      bulbRef.current.intensity = THREE.MathUtils.lerp(bulbRef.current.intensity, targetIntensity, 0.1);
    }
  });

  useEffect(() => {
    document.body.style.cursor = pulling ? 'grabbing' : 'auto';
  }, [pulling]);

  return (
    <group position={[0, 4.5, 0]}>
      {/* Wire to ceiling */}
      <Cylinder position={[0, 2, 0]} args={[0.04, 0.04, 4]} material-color="#ffe4e1" />
      
      {/* Lamp Shade */}
      <Cone position={[0, 0, 0]} args={[1.5, 2, 32]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#ff85a2" side={THREE.DoubleSide} roughness={0.3} metalness={0.1} />
      </Cone>
      
      {/* Light Bulb */}
      <Sphere position={[0, -0.6, 0]} args={[0.4, 32, 32]}>
        <meshBasicMaterial color={isLightOn ? "#ffffff" : "#ffe4e1"} />
        <pointLight ref={bulbRef} color="#ffffff" distance={25} decay={2} />
      </Sphere>
      
      {/* Pull String & Handle (Interactive) */}
      <group 
        ref={pullRef} 
        position={[0, -2.8, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOutCapture={() => document.body.style.cursor = 'auto'}
      >
        <Cylinder position={[0, 1, 0]} args={[0.02, 0.02, 2]} material-color="#aaaaaa" />
        <Sphere position={[0, 0, 0]} args={[0.15, 16, 16]}>
          <meshStandardMaterial color="#b19cd9" />
        </Sphere>
      </group>
    </group>
  );
}
