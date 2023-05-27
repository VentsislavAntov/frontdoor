import React from 'react';
import Tooltip from '../tooltip/Tooltip';
import './Highlight.css';

interface HighlightProps {
  originalText: string;
  summary: string;
  date: string;
  tags: string[];
}

function Highlight({ originalText, summary, date, tags }: HighlightProps) {
  return (
    <div className="Highlight">
      <div className="HighlightContent">
        <div className="OriginalText">{originalText}...</div>
        <div className="Date">({date})</div>
      </div>
      <div className="Tags">
        {tags.map((tag, index) => (
          <div key={index} className="Tag">
            {tag}
          </div>
        ))}
      </div>
      {/* <Tooltip text={summary} /> */}
    </div>
  );
}

export default Highlight;
