// Info from https://medium.com/better-programming/basic-interview-data-structures-in-javascript-graphs-3f9118aeb078
/*
  A collection of nodes and edges. There is no clear hierarchy of information.
  Graphs can be directed (i.e. one node leads to another, but the second does not lead back to the first)
  or undirected (an edge connects two nodes in both directions).
  Graph databases can also be useful because you can see all the data together without hierarchy, rather than
  worrying about separate tables
*/

/*
  Here is a directed graph:

  1  -> 2
  |   / |
  V |/_ V
  3  <- 4

  1 points at 2 and 3, 2 points at 3 and 4, 4 points at 3, 3 points at nothing
*/

/*
  One way to store them is using an adjacency matrix (a table, or array of arrays). For the graph above, it would be:
  [
    [false, true, true, false],
    [false, false, true, true],
    [false, false, false, false],
    [false, false, true, false],
   ]
   However this is slower to store and traverse than the adjacency list below.
*/

/*
   You can use an adjacency list, i.e. a list of which neighbours each node points to (for a directed graph).
   Use a hash map of hash sets to represent this (JS Map is a hash map and JS set is a hash set)
*/
const adjacencyList = new Map();
adjacencyList.set(1, new Set([2, 3]));
adjacencyList.set(2, new Set([3, 4]));
adjacencyList.set(3, new Set());
adjacencyList.set(4, new Set([3]));

/*
   For searching graphs, you can either use breadth-first search (BFS) or depth-first search (DFS). Basically BFS
   will search each immediate neighbour of a node first before going on to a neighbour's neighbour, while DFS does
   the opposite, searching a neighbour's neighbours first before going onto the next neighbour.
   Example from Medium article of a Mars rover on a grid map:
   Say you have only limited fuel, using BFS to explore the map would be great if you want to know more about your
   closer surroundings. Using DFS would be more useful to explore further in one specific direction.

   There are multiple ways to do either but recursion is easier and faster
*/

const visitedNodes = new Set();
const visit = (node) => console.log("Visited", node);
// DFS implementation
const dfs = (node) => {
  visit(node);
  visitedNodes.add(node);
  for (const neighbour of adjacencyList.get(node)) {
    if (!visitedNodes.has(neighbour)) {
      dfs(neighbour);
    }
  }
};

// BFS implementation
visitedNodes.clear(); // empty the visitedNodes set following DFS

const bfs = (startNode) => {
  const queue = [];
  queue.push(startNode);
  visitedNodes.add(startNode); // get the queue going by adding an entry

  while (queue.length > 0) {
    // iterate through the queue
    const currentNode = queue.shift();
    visit(currentNode);

    for (let neighbour of adjacencyList.get(currentNode)) {
      if (!visitedNodes.has(neighbour)) {
        queue.push(neighbour); // push the neighbour to the queue - not until neighbour is processed will its neighbours be added
        visitedNodes.add(neighbour); // visited has to be updated along with queue, or things could be added to queue twice within the same while loop
      }
    }
  }
};

/*
  The above all assumes that all nodes have at least one edge and there are no isolated nodes, or perhaps discrete groups of nodes that don't
  touch each other - this would make it a 'disconnected' graph.
  We can deal with the possibility of a disconnected graph by running our search function and then a for loop of the graph's nodes, in case
  any have not been touched because they are not neighbours of any node already visited. Example below is DFS but could be BFS
*/

visitedNodes.clear();
const dfsDisconnected = (startNode) => {
  dfs(startNode);

  for (let node of adjacencyList.keys()) {
    if (!visitedNodes.has(node)) {
      dfs(node);
    }
  }
};
