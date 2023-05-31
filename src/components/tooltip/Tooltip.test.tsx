import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Tooltip from './Tooltip';
import '@testing-library/jest-dom';

describe('Tooltip', () => {
  test('renders tooltip with correct text', () => {
    const text = 'Sample tooltip text';
    const position = { top: 10, left: 20 };
    render(
      <Tooltip text={text} position={position} onMouseEnter={jest.fn()} onMouseLeave={jest.fn()} />
    );
    const tooltipElement = screen.getByText(text);
    expect(tooltipElement).toBeInTheDocument();
  });

  test('calls onMouseEnter and onMouseLeave callbacks', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    render(
      <Tooltip text="Sample tooltip text" position={{ top: 10, left: 20 }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
    );
    const tooltipElement = screen.getByText('Sample tooltip text');
    fireEvent.mouseEnter(tooltipElement);
    fireEvent.mouseLeave(tooltipElement);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
