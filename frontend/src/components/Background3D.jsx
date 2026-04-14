import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';

const CartoonObject = ({ position, symbol, speed, scale, rotationSpeed = 1 }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rocking animation for the cartoons
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed) * 0.2 * rotationSpeed;
    }
  });

  return (
    <Float floatIntensity={3} speed={speed * 2} rotationIntensity={1}>
      <group position={position} scale={scale} ref={groupRef}>
        <Html center transform sprite>
          <div style={{ 
            fontSize: '120px', 
            userSelect: 'none', 
            pointerEvents: 'none',
            filter: 'drop-shadow(0 10px 15px rgba(255, 133, 162, 0.4))' 
          }}>
            {symbol}
          </div>
        </Html>
      </group>
    </Float>
  );
};

export default function Background3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1.2} />
        
        {/* Floating Aesthetic Emojis */}
        <CartoonObject position={[-10, 6, -10]} symbol="✨" speed={0.4} scale={1.5} />
        <CartoonObject position={[12, -5, -12]} symbol="☕" speed={0.3} scale={1.2} />
        <CartoonObject position={[0, 7, -15]} symbol="☁️" speed={0.2} scale={2} rotationSpeed={0.5} />
        <CartoonObject position={[10, 6, -14]} symbol="🌙" speed={0.4} scale={1.4} rotationSpeed={1.5} />
        <CartoonObject position={[-12, -6, -8]} symbol="🌷" speed={0.2} scale={1.8} />
        <CartoonObject position={[9, 0, -12]} symbol="🪴" speed={0.5} scale={1.1} />
        <CartoonObject position={[-9, -1, -12]} symbol="🧸" speed={0.3} scale={1.3} />
        <CartoonObject position={[-2, -7, -10]} symbol="🪐" speed={0.35} scale={1.6} />

      </Canvas>
    </div>
  );
}
