import React, { useState } from 'react';
import './Tooltip.css';

interface TooltipProps {
  text: string;
  position: { top: number; left: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function Tooltip({ text, position, onMouseEnter, onMouseLeave }: TooltipProps) {

  //These are needed to prevent flickering behaviour
  const handleMouseEnter = () => {
    onMouseEnter();
  };

  const handleMouseLeave = () => {
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
