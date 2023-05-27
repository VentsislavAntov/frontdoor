import React from 'react';

interface TooltipProps {
  text: string;
}

function Tooltip({ text }: TooltipProps) {
  return <div className="Tooltip">{text}</div>;
}

export default Tooltip;
