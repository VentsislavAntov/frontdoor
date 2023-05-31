import React, { useEffect, useState } from 'react';
import './Popup.css';
import Highlight from '../highlight/Highlight';
import { gql, useQuery } from '@apollo/client';

interface HighlightData {
  id: number;
  originalText: string;
  summary: string;
  date: string;
  tags: string[];
}

export const GET_SUMMARIES = gql`
  {
    summaries {
      id
      date
      summary
      originalText
      tags
    }
  }`;

const Popup = () => {
  const [highlights, setHighlights] = useState<HighlightData[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc'>('asc');

  const { loading, error, data } = useQuery(GET_SUMMARIES);

  useEffect(() => {
    // Load on new data and if it loads correctly
    if (!loading && data) {
      setHighlights(data.summaries);
    }
  }, [loading, data]);

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
    const dateA = a.date;
    const dateB = b.date;
    return sortByDate === 'asc' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
  });

  const handleExportCSV = () => {
    // Convert sortedHighlights to CSV format and initiate download
    const csvData = convertToCSV(sortedHighlights);
    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = csvURL;
    downloadLink.download = 'highlights.csv';
    downloadLink.click();
  };

  const convertToCSV = (data: HighlightData[]) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      // @ts-ignore
      const values = headers.map((header) => row[header]);
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  return (
    <div className="Popup">
      <header className="App-header">
        <h1 className='Title'>My Highlights</h1>
        <div className="FilterContainer">
          <div>
            <select data-testid="tag-select" value={selectedTag} onChange={handleTagChange}>
              <option value="">All Tags</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select data-testid="sort-select" value={sortByDate} onChange={handleSortByDate}>
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
              originalText={highlight.originalText.length > 50 ? `${highlight.originalText.slice(0, 50)}...` : highlight.originalText}
              summary={highlight.summary}
              date={highlight.date}
              tags={highlight.tags}
            />
          ))}
          <button onClick={handleExportCSV}>Export as CSV</button>
        </div>
      ) : (
        <div className="NoHighlights" data-testid="no-highlights">No highlights available</div>
      )}
    </div>
  );
}

export default Popup;
