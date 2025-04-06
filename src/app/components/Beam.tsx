import React from "react";
import "./Beam.css";

interface SynthwaveBeamProps {
  width?: string;
  className?: string;
}

const Beam: React.FC<SynthwaveBeamProps> = ({
  width = "100%",
  className = "",
}) => {
  return (
    <div className={`synthwave-beam-container ${className}`} style={{ width }}>
      <div className="synthwave-beam-line">
        <div className="beam-glow inner-glow-1" />
        <div className="beam-glow inner-glow-2" />

        <div className="beam-glow outer-glow-1" />
        <div className="beam-glow outer-glow-2" />

        <div className="beam-glow pulsing-glow" />
      </div>

      <div className="beam-flare flare-1" />
      <div className="beam-flare flare-2" />
      <div className="beam-flare flare-3" />
      <div className="beam-flare flare-4" />
    </div>
  );
};

export default Beam;
