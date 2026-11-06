
import { useProgress } from "@react-three/drei";
import './Loading.css'

const Loading = () => {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <div className="loading">
      <div className="loading-content">
        <p>Loading 3D Experience...</p>

        <div className="loading-bar">
          <div
            className="loading-progress"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default Loading;
