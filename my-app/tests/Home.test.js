import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../app/home'; // Adjust path as needed

describe('Home Component', () => {
  test('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/Our Features/i)).toBeInTheDocument();
  });
});