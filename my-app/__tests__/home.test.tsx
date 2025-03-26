import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/home'; // Adjust path as needed

describe('Home Component', () => {
  test('renders without crashing', () => {
    try {
      render(<Home />);
      const featuresElement = screen.getByText(/Our Features/i);
      expect(featuresElement).toBeInTheDocument();
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });

  test('component renders correctly', () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });
});