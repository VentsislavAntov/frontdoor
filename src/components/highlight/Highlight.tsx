import React, { useState } from 'react';
import Tooltip from '../tooltip/Tooltip';
import './Highlight.css';

interface HighlightProps {
  originalText: string;
  summary: string;
  date: string;
  tags: string[];
}

function Highlight({ originalText, summary, date, tags }: HighlightProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({ top: top - 10, left: left + e.currentTarget.offsetWidth / 2 });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleTooltipMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleTooltipMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="Highlight" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="HighlightContent">
        <div className="OriginalText">{originalText}...</div>
        <div className="Date">({date})</div>
      </div>
      <div className="FlexContainer">
        <div className="Summary">
          Summary
        </div>
        <div className="Tags">
          {tags.map((tag, index) => (
            <div key={index} className="Tag">
              {tag}
            </div>
          ))}
        </div>
      </div>
      {showTooltip && <Tooltip text={summary} position={tooltipPosition} onMouseEnter={handleTooltipMouseEnter} onMouseLeave={handleTooltipMouseLeave} />}
    </div>
  );
}

export default Highlight;
