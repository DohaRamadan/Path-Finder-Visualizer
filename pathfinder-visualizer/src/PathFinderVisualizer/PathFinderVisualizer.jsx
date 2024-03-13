import React from "react";
import "./PathFinderVisualizer.css"
import Node from "./Node/Node.jsx"
import { dijkstra } from "../algorithms/Dijkstra's.js";
import { getNodesInShortestPathOrder } from "../algorithms/Dijkstra's.js";
import { dfs } from "../algorithms/DFS.js";
import { bfs } from "../algorithms/BFS.js";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const intializeGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        let currRow = [];
        for (let col = 0; col < 50; col++) {
            const currNode = {
                col,
                row,
                isStart: row === START_NODE_ROW && col === START_NODE_COL,
                isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                distance: Infinity,
                isVisited: false,
                isWall: false,
                previous: null,
            };
            currRow.push(currNode);
        }
        grid.push(currRow);
    }
    return grid;
}



class PathFinderVisualizer extends React.Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = intializeGrid();
        this.setState({ grid });
    }

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateVisistedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeDFS(){
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateVisistedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeBFS(){
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = bfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateVisistedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    animateVisistedNodes(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }
    clearBoard() {
        const { grid } = this.state;
        const newGrid = grid.map(row =>
            row.map(node => ({
                ...node,
                isVisited: false,
                isWall: false,
                distance: Infinity,
                previous: null
            }))
        );
        this.setState({ grid: newGrid }, () => {
            this.clearBoardVisuals();
        });
    }
    
    clearBoardVisuals() {
        const allNodes = document.querySelectorAll('.node');
        allNodes.forEach(node => {
            node.classList.remove('node-visited');
            node.classList.remove('node-wall');
            node.classList.remove('node-shortest-path');
        });
        
    }
    
    

    render() {
        const { grid } = this.state;
        return (
            <>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            row={row}></Node>
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <button onClick={() => this.visualizeDFS()}>
                    Visualize DFS
                </button>
                <button onClick={() => this.visualizeBFS()}>
                    Visualize BFS
                </button>
                <button onClick={() => this.clearBoard()}>
                    Clear Board
                </button>
            </>
        );
    }
}

export default PathFinderVisualizer;