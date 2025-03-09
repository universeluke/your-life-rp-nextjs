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
      {/* Main narrow beam */}
      <div className="synthwave-beam-line">
        {/* Inner glow effect */}
        <div className="beam-glow inner-glow-1" />
        <div className="beam-glow inner-glow-2" />

        {/* Outer glow effect */}
        <div className="beam-glow outer-glow-1" />
        <div className="beam-glow outer-glow-2" />

        {/* Pulsing animation effect */}
        <div className="beam-glow pulsing-glow" />
      </div>

      {/* Small vertical flares at different positions */}
      <div className="beam-flare flare-1" />
      <div className="beam-flare flare-2" />
      <div className="beam-flare flare-3" />
      <div className="beam-flare flare-4" />
    </div>
  );
};

export default Beam;
