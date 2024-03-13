export function dfs(grid, startNode, endNode) {
  const stack = [];
  const visitedNodesInOrder = [];
  stack.push(startNode);

  while (stack.length) {
    const currNode = stack.pop();

    if (currNode.isVisited || currNode.isWall) continue;

    currNode.isVisited = true;

    if (currNode === endNode) return visitedNodesInOrder;
    visitedNodesInOrder.push(currNode);

    const neighbors = getNeighbors(currNode, grid);
    for (const neighbor of neighbors) {
      stack.push(neighbor);
      neighbor.previous = currNode;
    }
  }

  return visitedNodesInOrder;
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
