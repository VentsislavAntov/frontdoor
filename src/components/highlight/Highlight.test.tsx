import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Highlight from './Highlight';
import '@testing-library/jest-dom';

jest.mock('../tooltip/Tooltip', () => {
  return function MockTooltip({ text }: { text: string }) {
    return <div>{text}</div>;
  };
});

describe('Highlight', () => {
  test('renders the original text', () => {
    const originalText = 'Sample original text';
    const summary = 'Sample summary';
    const date = '2023-05-30';
    const tags = ['tag1', 'tag2'];

    render(
      <Highlight originalText={originalText} summary={summary} date={date} tags={tags} />
    );

    const originalTextElement = screen.getByText(originalText);
    expect(originalTextElement).toBeInTheDocument();
  });

  test('shows tooltip on mouse enter', () => {
    const originalText = 'Sample original text';
    const summary = 'Sample summary';
    const date = '2023-05-30';
    const tags = ['tag1', 'tag2'];

    render(
      <Highlight originalText={originalText} summary={summary} date={date} tags={tags} />
    );

    const highlightElement = screen.getByText(originalText);
    fireEvent.mouseEnter(highlightElement);

    const tooltipElement = screen.getByText(summary);
    expect(tooltipElement).toBeInTheDocument();
  });

  test('hides tooltip on mouse leave', () => {
    const originalText = 'Sample original text';
    const summary = 'Sample summary';
    const date = '2023-05-30';
    const tags = ['tag1', 'tag2'];

    render(
      <Highlight originalText={originalText} summary={summary} date={date} tags={tags} />
    );

    const highlightElement = screen.getByText(originalText);
    fireEvent.mouseEnter(highlightElement);
    fireEvent.mouseLeave(highlightElement);

    const tooltipElement = screen.queryByText(summary);
    expect(tooltipElement).not.toBeInTheDocument();
  });
});
