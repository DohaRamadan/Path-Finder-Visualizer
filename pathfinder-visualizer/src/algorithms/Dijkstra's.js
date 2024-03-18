export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unVisitedNodes = getAllNodes(grid);
  while (unVisitedNodes.length) {
    sortNodesByDistance(unVisitedNodes);
    const closestNode = unVisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    if (closestNode === finishNode) return visitedNodesInOrder;
    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;
    updateNeighbors(closestNode, grid);
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(grid) {
  grid.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(node, grid) {
  const neighbors = getNeighbors(node, grid);
  for (const neighborNode of neighbors) {
    if (node.distance + 1 < neighborNode.distance) {
      neighborNode.distance = node.distance + 1;
      neighborNode.previous = node;
    }
  }
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previous;
  }
  if (nodesInShortestPathOrder.length === 1) {
    return null;
  }
  return nodesInShortestPathOrder;
}
