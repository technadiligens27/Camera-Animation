
import {
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

import Model from "./Model/Model";
import "./Experience.css";

// =====================================
// EXPERIENCE
// =====================================

const Experience = () => {
  const hdriPath =
    `${import.meta.env.BASE_URL}st_fagans_interior_512.hdr`;

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
        <Suspense fallback={null}>

          {/* LOCAL HDRI */}
          <Environment
            files={hdriPath}
            environmentIntensity={0.8}
            background={false}
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

        </Suspense>

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
