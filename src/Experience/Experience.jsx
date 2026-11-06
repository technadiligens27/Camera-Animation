
import {
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import Model from "./Model/Model";
import "./Experience.css";

// =====================================
// EXPERIENCE
// =====================================

const Experience = () => {
  return (
    <div className="experience-container">
      <Canvas
        camera={{
          position: [5, 4, 7],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
      >
        {/* ENVIRONMENT LIGHTING */}
        <Environment
          preset="lobby"
          environmentIntensity={0.8}
        />

        {/* GENERAL LIGHTING */}
        <ambientLight intensity={1} />



        {/* MODEL */}
        <Model />

        {/* SOFT SHADOW */}
        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.4}
          scale={12}
          blur={3.5}
          far={10}
          resolution={100}
          color="#666666"
        />

        {/* CAMERA CONTROLS */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
};

export default Experience;
