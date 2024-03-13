// Navbar.jsx

import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';

function Navbar({ algorithms, selectedAlgorithm, onSelectAlgorithm, onVisualizeClick, onClearBoardClick }) {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <h1>PathFinderVisualizer</h1>
                </div>
                <div className="navbar-menu">
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-algorithms">
                            Algorithms
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {algorithms.map((algorithm, index) => (
                                <Dropdown.Item key={index} onClick={() => onSelectAlgorithm(algorithm)}>
                                    {algorithm}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="success" onClick={onVisualizeClick}>Visualize</Button>
                    <Button variant="danger" onClick={onClearBoardClick}>Clear Board</Button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
