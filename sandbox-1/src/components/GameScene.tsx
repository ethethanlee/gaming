// src/components/GameScene.tsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Player = () => {
  const playerRef = useRef<THREE.Mesh>(null!);
  const speed = 0.1;
  const direction = useRef({ x: 0, y: 0 });

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
          direction.current.y = -1;
          break;
        case 's':
          direction.current.y = 1;
          break;
        case 'a':
          direction.current.x = -1;
          break;
        case 'd':
          direction.current.x = 1;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
        case 's':
          direction.current.y = 0;
          break;
        case 'a':
        case 'd':
          direction.current.x = 0;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Update position based on direction
  useFrame(() => {
    if (playerRef.current) {
      playerRef.current.position.x += direction.current.x * speed;
      playerRef.current.position.y += direction.current.y * speed;
    }
  });

  return (
    <mesh ref={playerRef} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const GameScene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Player />
    </Canvas>
  );
};

export default GameScene;
