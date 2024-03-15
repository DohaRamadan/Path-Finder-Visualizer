import React from "react";
import "./PathFinderVisualizer.css";
import Node from "./Node/Node.jsx";
import { dijkstra } from "../algorithms/Dijkstra's.js";
import { getNodesInShortestPathOrder } from "../algorithms/Dijkstra's.js";
import { dfs } from "../algorithms/DFS.js";
import { bfs } from "../algorithms/BFS.js";

const intializeGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    let currRow = [];
    for (let col = 0; col < 50; col++) {
      const currNode = {
        col,
        row,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previous: null
      };
      currRow.push(currNode);
    }
    grid.push(currRow);
  }
  return grid;
};

class PathFinderVisualizer extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startNode: {},
      endNode: {},
      isSettingStartNode: false,
      isSettingEndNode: false,
      isAddingWall: false,
      boardNotEmpty: false
    };
  }

  componentDidMount() {
    const grid = intializeGrid();
    this.setState({ grid });
  }

  handleSetStartNode() {
    if(this.state.boardNotEmpty){
      alert("Please clear the board first");
      return;
    }
    this.setState({ isSettingStartNode: true });
  }

  handleSetEndNode() {
    if(this.state.boardNotEmpty){
      alert("Please clear the board first");
      return;
    }
    this.setState({ isSettingEndNode: true });
  }

  handleAddWall() {
    if(this.state.boardNotEmpty){
      alert("Please clear the board first");
      return;
    }
    this.setState({ isAddingWall: true });
  }

  handleNodeClick(row, col) {
    const { isSettingStartNode, isSettingEndNode, isAddingWall, grid } =
      this.state;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    console.log("node clicked on" + row + " " + col);
    console.log(isSettingStartNode);
    console.log(isSettingEndNode);

    if (isSettingStartNode) {
      for (let i = 0; i < newGrid.length; i++) {
        for (let j = 0; j < newGrid[i].length; j++) {
          if (newGrid[i][j].isStart) {
            newGrid[i][j].isStart = false;
            document.getElementById(`node-${i}-${j}`).className = "node";
            break;
          }
        }
      }

      node.isStart = true;
      this.setState({ startNode: node, isSettingStartNode: false });
      document.getElementById(`node-${row}-${col}`).className =
        "node node-start";
    } else if (isSettingEndNode) {
      for (let i = 0; i < newGrid.length; i++) {
        for (let j = 0; j < newGrid[i].length; j++) {
          if (newGrid[i][j].isFinish) {
            newGrid[i][j].isFinish = false;
            document.getElementById(`node-${i}-${j}`).className = "node";
            break;
          }
        }
      }

      node.isFinish = true;
      this.setState({ endNode: node, isSettingEndNode: false });
      document.getElementById(`node-${row}-${col}`).className =
        "node node-finish";
    } else if (isAddingWall) {
      node.isWall = !node.isWall;
      document.getElementById(`node-${node.row}-${node.col}`).className =
        node.isWall ? "node node-wall" : "node";
    }

    this.setState({ grid: newGrid });
  }

  visualizeDijkstra() {
    if(this.state.boardNotEmpty){
      alert("Please clear the board first");
      return;
    }
    const { grid, startNode, endNode } = this.state;
    if (!startNode.isStart || !endNode.isFinish) {
      alert("Please set the start and end node");
      return;
    }
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    this.animateVisistedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setState({ startNode: {}, endNode: {} , boardNotEmpty: true});
  }

  visualizeDFS() {
    if(this.state.boardNotEmpty){
      alert("Please clear the board first");
      return;
    }
    const { grid, startNode, endNode } = this.state;
    if (!startNode.isStart || !endNode.isFinish) {
      alert("Please set the start and end node");
      return;
    }
    const visitedNodesInOrder = dfs(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    this.animateVisistedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setState({ startNode: {}, endNode: {} , boardNotEmpty: true});
  }

  visualizeBFS() {
    if(this.state.boardNotEmpty){
      alert("Please clear the board first");
      return;
    }
    const { grid, startNode, endNode } = this.state;
    if (!startNode.isStart || !endNode.isFinish) {
      alert("Please set the start and end node");
      return;
    }
    const visitedNodesInOrder = bfs(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    this.animateVisistedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setState({ startNode: {}, endNode: {} , boardNotEmpty: true});
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
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  clearBoard() {
    const { grid } = this.state;
    const newGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        isVisited: false,
        distance: Infinity,
        previous: null,
        isWall: false,
        isStart: false,
        isFinish: false,
      }))
    );
    this.setState({ startNode: {}, endNode: {} , boardNotEmpty: false});
    this.setState({ grid: newGrid }, () => {
      this.clearBoardVisuals();
    });
  }

  clearBoardVisuals() {
    const allNodes = document.querySelectorAll(".node");
    allNodes.forEach((node) => {
      if (
        !node.classList.contains("node-start") &&
        !node.classList.contains("node-finish")
      ) {
        node.classList.remove("node-visited");
        node.classList.remove("node-wall");
        node.classList.remove("node-shortest-path");
      }
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
                      row={row}
                      onClick={(row, col) => this.handleNodeClick(row, col)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="controls">
          <button onClick={() => this.handleSetStartNode()}>
            Set Start Node
          </button>
          <button onClick={() => this.handleSetEndNode()}>Set End Node</button>
          <button onClick={() => this.handleAddWall()}>Add Wall</button>
          <button onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
          </button>
          <button onClick={() => this.visualizeDFS()}>Visualize DFS</button>
          <button onClick={() => this.visualizeBFS()}>Visualize BFS</button>
          <button onClick={() => this.clearBoard()}>Clear Board</button>
        </div>
      </>
    );
  }
}

export default PathFinderVisualizer;
