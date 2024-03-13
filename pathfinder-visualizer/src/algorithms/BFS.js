export function bfs(grid, startNode, endNode) {
  const queue = [];
  const visitedNodesInOrder = [];

  queue.push(startNode);
  while (queue.length) {
    const currNode = queue.shift();
    if (currNode === endNode) return visitedNodesInOrder;
    if (currNode.isVisited || currNode.isWall) continue;
    visitedNodesInOrder.push(currNode);
    currNode.isVisited = true;
    const neighbors = getNeighbors(currNode, grid);
    for (const neighbor of neighbors) {
      queue.push(neighbor);
      neighbor.previous = currNode;
    }
  }
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  const numRows = grid.length;
  const numCols = grid[0].length;

  if (row > 0) neighbors.push(grid[row - 1][col]); // Up
  if (row < numRows - 1) neighbors.push(grid[row + 1][col]); // Down
  if (col > 0) neighbors.push(grid[row][col - 1]); // Left
  if (col < numCols - 1) neighbors.push(grid[row][col + 1]); // Right

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
