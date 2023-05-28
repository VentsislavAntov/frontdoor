import React, { useState } from 'react';
import './Tooltip.css';

interface TooltipProps {
  text: string;
  position: { top: number; left: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function Tooltip({ text, position, onMouseEnter, onMouseLeave }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    onMouseLeave();
  };

  return (
    <div className="Tooltip" style={position} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="TooltipArrow"></div>
      {text}
    </div>
  );
}

export default Tooltip;
