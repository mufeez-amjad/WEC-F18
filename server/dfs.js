class Bike {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

let visited = [];
let counter = 0;

const start_dfs = (graph, start) => {
  // reset visited
  counter = 0;
  for (var i = 0; i < 17; i++) {
    let temp = [];
    for (var j = 0; j < 17; j++) {
      temp.push(false);
    }
    visited.push(temp);
  }

  dfs(graph, start);
  return counter;
};

const dfs = (graph, start) => {
  console.log(start);
  if (start.row < 1 || start.col < 1 || start.row >= 16 || start.col >= 17)
    return;
  if (visited[start.row][start.col]) return;
  let c = graph[start.row][start.col];

  if (c != ".") return;
  counter++;

  visited[start.row][start.col] = true;

  dfs(graph, new Bike(start.row - 1, start.col));
  dfs(graph, new Bike(start.row + 1, start.col));
  dfs(graph, new Bike(start.row, start.col - 1));
  dfs(graph, new Bike(start.row, start.col + 1));
};

module.exports = start_dfs;
