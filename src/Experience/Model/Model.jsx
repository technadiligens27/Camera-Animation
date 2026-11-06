
import { useEffect, useRef, useState } from "react";

import {
  useGLTF,
  useAnimations,
  Float,
} from "@react-three/drei";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

const Model = ({
  // Floating controls
  floatSpeed = 7,
  floatIntensity = 1,
  rotationIntensity = 0.1,
  floatingRange = [-0.1, 0.1],

  // Animation controls
  animationSpeed = 1,
}) => {
  const isHovered = useRef(false);

  // Target animation progress
  const targetProgress = useRef(0);

  // Current animation time
  const animationTime = useRef(0);

  // ==========================================
  // MOBILE DETECTION
  // ==========================================

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 768px)"
    );

    const handleChange = (e) => {
      setIsMobile(e.matches);

      isHovered.current = false;
      targetProgress.current = 0;

      document.body.style.cursor = "auto";
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );

      document.body.style.cursor = "auto";
    };
  }, []);

  // ==========================================
  // LOAD MODEL
  // ==========================================

  const modelPath =
    `${import.meta.env.BASE_URL}Camera.glb`;

  const { scene, animations } = useGLTF(modelPath);

  // ==========================================
  // MODEL TRANSFORMS
  // ==========================================

  const modelPosition = [-0.5, 0, -2.0];

  const modelRotation = [-0.10, -0.20, -0.02];

  const modelScale = 0.7;

  // ==========================================
  // RESPONSIVE SCALE
  // ==========================================

  const responsiveScale = isMobile
    ? modelScale * (0.8 / 1.07)
    : modelScale;

  // ==========================================
  // ANIMATION SETUP
  // ==========================================

  const { actions, names, mixer } = useAnimations(
    animations,
    scene
  );

  const action = names.length
    ? actions[names[0]]
    : null;

  const duration = action
    ? action.getClip().duration
    : 0;

  useEffect(() => {
    if (!action) return;

    action.reset();

    // Keep animation available for manual control
    action.enabled = true;
    action.clampWhenFinished = true;

    // Pause automatic playback
    action.play();
    action.paused = true;

    // Start at frame zero
    animationTime.current = 0;
    targetProgress.current = 0;

    mixer.setTime(0);

    return () => {
      action.stop();
    };
  }, [action, mixer]);

  // ==========================================
  // MANUAL ANIMATION CONTROL
  // ==========================================

  useFrame((state, delta) => {
    if (!action || duration <= 0) return;

    // Target time based on hover state
    const targetTime =
      targetProgress.current * duration;

    // Move towards target at constant speed
    const step =
      Math.max(0, animationSpeed) * delta;

    const currentTime = animationTime.current;

    let nextTime;

    if (currentTime < targetTime) {
      nextTime = Math.min(
        currentTime + step,
        targetTime
      );
    } else if (currentTime > targetTime) {
      nextTime = Math.max(
        currentTime - step,
        targetTime
      );
    } else {
      nextTime = currentTime;
    }

    animationTime.current = nextTime;

    // Scrub animation without normal playback
    action.time = nextTime;
    mixer.update(0);
  });

  // ==========================================
  // DESKTOP HOVER
  // ==========================================

  const handlePointerOver = (e) => {
    e.stopPropagation();

    if (isMobile || isHovered.current) return;

    isHovered.current = true;

    document.body.style.cursor = "pointer";

    // Animate forward
    targetProgress.current = 1;
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();

    if (isMobile || !isHovered.current) return;

    isHovered.current = false;

    document.body.style.cursor = "auto";

    // Smoothly reverse from current time
    targetProgress.current = 0;
  };

  // ==========================================
  // MOBILE CLICK / TAP
  // ==========================================

  const handleClick = (e) => {
    e.stopPropagation();

    if (!isMobile) return;

    isHovered.current =
      !isHovered.current;

    targetProgress.current =
      isHovered.current ? 1 : 0;
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <Float
      speed={floatSpeed}
      floatIntensity={floatIntensity}
      rotationIntensity={rotationIntensity}
      floatingRange={floatingRange}
    >
      <group
        position={modelPosition}
        rotation={modelRotation}
        scale={responsiveScale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
};

// ==========================================
// PRELOAD MODEL
// ==========================================

useGLTF.preload(
  `${import.meta.env.BASE_URL}Camera.glb`
);

export default Model;
