import React, { useEffect, useState } from 'react';
import './Popup.css';
import Highlight from '../highlight/Highlight';

interface HighlightData {
  id: number;
  originalText: string;
  summary: string;
  date: string;
  tags: string[];
}

function Popup() {
  const [highlights, setHighlights] = useState<HighlightData[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch('http://localhost:3000/sample');
        const data = await response.json();
        setHighlights(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHighlights();
  }, []);

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value);
  };

  const handleSortByDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortByDate(e.target.value as 'asc' | 'desc');
  };

  const availableTags: string[] = [];
  highlights.forEach((highlight) => {
    highlight.tags.forEach((tag) => {
      if (!availableTags.includes(tag)) {
        availableTags.push(tag);
      }
    });
  });

  const filteredHighlights = selectedTag
    ? highlights.filter((highlight) => highlight.tags.includes(selectedTag))
    : highlights;

  const sortedHighlights = [...filteredHighlights].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortByDate === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="Popup">
      <header className="App-header">
        <h1 className='Title'>My Highlights</h1>
        <div className="FilterContainer">
          <div>
            <select value={selectedTag} onChange={handleTagChange}>
              <option value="">All Tags</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select value={sortByDate} onChange={handleSortByDate}>
              <option value="asc">Date Ascending</option>
              <option value="desc">Date Descending</option>
            </select>
          </div>
        </div>
      </header>
      {sortedHighlights.length > 0 ? (
        <div className="HighlightsList">
          {sortedHighlights.map((highlight) => (
            <Highlight
              key={highlight.id}
              originalText={highlight.originalText.slice(0, 16)}
              summary={highlight.summary}
              date={highlight.date}
              tags={highlight.tags}
            />
          ))}
        </div>
      ) : (
        <div className="NoHighlights">No highlights available</div>
      )}
    </div>
  );
}

export default Popup;
