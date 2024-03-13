import React, { useState } from 'react';
import Navbar from './Navbar/Navbar.jsx';
import PathFinderVisualizer from './PathFinderVisualizer/PathFinderVisualizer.jsx';

const algorithms = ['Dijkstra', 'A*', 'BFS', 'DFS'];

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleVisualizeClick = () => {
    // Implement visualization logic
  };

  const handleClearBoardClick = () => {
    // Implement clear board logic
  };

  return (
    <div className="App">
      <Navbar
        algorithms={algorithms}
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={handleAlgorithmSelect}
        onVisualizeClick={handleVisualizeClick}
        onClearBoardClick={handleClearBoardClick}
      />
      <PathFinderVisualizer />
    </div>
  );
}

export default App;
