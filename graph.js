class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (vertex.adjacent.size) {
      for (let adjNode of vertex.adjacent) {
        this.removeEdge(vertex, adjNode);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stack = [start];
    let arr = [];
    let seen = new Set(stack);
    while (stack.length) {
      let currNode = stack.pop();
      arr.push(currNode.value);
      for (let adjNode of currNode.adjacent) {
        if (!seen.has(adjNode)) {
          stack.push(adjNode);
          seen.add(adjNode);
        }
      }
    }
    return arr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let arr = [];
    let seen = new Set(queue);
    while (queue.length) {
      let currNode = queue.shift();
      arr.push(currNode.value);
      for (let adjNode of currNode.adjacent) {
        if (!seen.has(adjNode)) {
          queue.push(adjNode);
          seen.add(adjNode);
        }
      }
    }
    return arr;
  }

  //This function returns the shortest path of connections between two nodes
  shortestPath(source, target) {
    if (source.name === target.name) {
      return 0;
    }
    let level = [source];
    let queue = [level];
    let path = 1;
    let seen = new Set([source]);
    while (queue.length) {
      let currLevel = queue.shift();
      let newLevel = [];
      for (let node of currLevel) {
        for (let adjNode of node.adjacent) {
          if (adjNode.name == target.name) {
            return path;
          }
          if (!seen.has(adjNode)) {
            seen.add(adjNode);
            newLevel.push(adjNode);
          }
        }
      }
      queue.push(newLevel);
      path++;
    }
  }
}

module.exports = { Graph, Node };
