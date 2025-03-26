import React from 'react';

interface HomeProps {
  // Add any props if needed
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <h1>Our Features</h1>
      <div data-testid="feature-section">
        <p>Discover our amazing features!</p>
      </div>
    </div>
  );
};

export default Home;