
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import "./Loading.css";

const Loading = () => {
  const { active, progress, total } = useProgress();

  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (active || total > 0) {
      setHasStarted(true);
    }
  }, [active, total]);

  if (hasStarted && !active) {
    return null;
  }

  return (
    <div className="loading">
      <div className="loading-content">
        <p>Loading 3D Experience...</p>

        <div className="loading-bar">
          <div
            className="loading-progress"
            style={{
              width: `${Math.min(progress, 100)}%`,
            }}
          />
        </div>

        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default Loading;
