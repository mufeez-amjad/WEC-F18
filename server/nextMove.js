var dfs_start = require("./dfs");

class Bike {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const closeFreespace = -48.00001234619047;
const closeWallDistance = 8.721250189643312;
const closeRelativeEnemyX = [
  14.941649787707956,
  11.906700554213444,
  13.789105610356927
];
const closeRelativeEnemyY = [
  12.914332929792215,
  12.58727992202378,
  11.564737193286046
];
const closeDFS = 113.97588631250586;
const farFreespace = 4.426282447527941;
const farWallDistance = -3.952189032020682;
const farRelativeEnemyX = [
  9.753082762319256,
  8.077706062579374,
  7.897324263678671
];
const farRelativeEnemyY = [
  14.875096702249964,
  15.61836206903625,
  14.196737372223138
];
const farDFS = 40.780645735370086;

const nextMove = (grid, myPosition, enemyPosition, currentDirection) => {
  let ratingS = 0;
  let ratingL = 0;
  let ratingR = 0;

  let isFar =
    Math.sqrt(
      Math.pow(relativeX(myPosition, enemyPosition), 2) +
        Math.pow(relativeY(myPosition, enemyPosition), 2)
    ) < 6;

  let moveL = "s";
  let moveR = "s";
  let bikeS = new Bike(0, 0);
  let bikeL = new Bike(0, 0);
  let bikeR = new Bike(0, 0);

  switch (currentDirection) {
    case "u":
      moveL = "l";
      moveR = "r";
      bikeS = new Bike(myPosition.row - 1, myPosition.col);
      bikeL = new Bike(myPosition.row, myPosition.col - 1);
      bikeR = new Bike(myPosition.row, myPosition.col + 1);
      break;
    case "d":
      moveL = "r";
      moveR = "l";
      bikeS = new Bike(myPosition.row + 1, myPosition.col);
      bikeL = new Bike(myPosition.row, myPosition.col + 1);
      bikeR = new Bike(myPosition.row, myPosition.col - 1);
      break;
    case "r":
      moveL = "u";
      moveR = "d";
      bikeS = new Bike(myPosition.row, myPosition.col + 1);
      bikeL = new Bike(myPosition.row - 1, myPosition.col);
      bikeR = new Bike(myPosition.row + 1, myPosition.col);
      break;
    case "l":
      moveL = "d";
      moveR = "u";
      bikeS = new Bike(myPosition.row, myPosition.col - 1);
      bikeL = new Bike(myPosition.row + 1, myPosition.col);
      bikeR = new Bike(myPosition.row - 1, myPosition.col);
      break;
  }

  if (isFar) {
    ratingS +=
      distanceToNearestObstacle(grid, myPosition, currentDirection) *
      farWallDistance;
    ratingL +=
      distanceToNearestObstacle(grid, myPosition, moveL) * farWallDistance;
    ratingR +=
      distanceToNearestObstacle(grid, myPosition, moveR) * farWallDistance;
    ratingS += freeSpacesAtIndex(grid, bikeS) * farFreespace;
    ratingL += freeSpacesAtIndex(grid, bikeL) * farFreespace;
    ratingR += freeSpacesAtIndex(grid, bikeR) * farFreespace;
    ratingS += relativeX(bikeS, enemyPosition) * farRelativeEnemyX[0];
    ratingL += relativeX(bikeL, enemyPosition) * farRelativeEnemyX[1];
    ratingR += relativeX(bikeR, enemyPosition) * farRelativeEnemyX[2];
    ratingS += relativeY(bikeS, enemyPosition) * farRelativeEnemyY[0];
    ratingL += relativeY(bikeL, enemyPosition) * farRelativeEnemyY[1];
    ratingR += relativeY(bikeR, enemyPosition) * farRelativeEnemyY[2];
    ratingS += dfs_start(grid, bikeS) * farDFS;
    ratingL += dfs_start(grid, bikeL) * farDFS;
    ratingR += dfs_start(grid, bikeR) * farDFS;
  } else {
    ratingS +=
      distanceToNearestObstacle(grid, myPosition, currentDirection) *
      closeWallDistance;
    ratingL +=
      distanceToNearestObstacle(grid, myPosition, moveL) * closeWallDistance;
    ratingR +=
      distanceToNearestObstacle(grid, myPosition, moveR) * closeWallDistance;
    ratingS += freeSpacesAtIndex(grid, bikeS) * closeFreespace;
    ratingL += freeSpacesAtIndex(grid, bikeL) * closeFreespace;
    ratingR += freeSpacesAtIndex(grid, bikeR) * closeFreespace;
    ratingS += relativeX(bikeS, enemyPosition) * closeRelativeEnemyX[0];
    ratingL += relativeX(bikeL, enemyPosition) * closeRelativeEnemyX[1];
    ratingR += relativeX(bikeR, enemyPosition) * closeRelativeEnemyX[2];
    ratingS += relativeY(bikeS, enemyPosition) * closeRelativeEnemyY[0];
    ratingL += relativeY(bikeL, enemyPosition) * closeRelativeEnemyY[1];
    ratingR += relativeY(bikeR, enemyPosition) * closeRelativeEnemyY[2];
    ratingS += dfs_start(grid, bikeS) * closeDFS;
    ratingL += dfs_start(grid, bikeL) * closeDFS;
    ratingR += dfs_start(grid, bikeR) * closeDFS;
  }

  if (!isValidMove(bikeS, grid)) ratingS -= 200;
  if (!isValidMove(bikeL, grid)) ratingL -= 200;
  if (!isValidMove(bikeR, grid)) ratingR -= 200;

  // return based on highest rating values
  if (ratingS >= ratingL && ratingS >= ratingR) {
    return "s";
  } else if (ratingL >= ratingS && ratingL >= ratingR) {
    return "l";
  } else {
    return "r";
  }
};

const isValidMove = (b, grid) => {
  let r = b.row;
  let c = b.col;

  if (!(r >= 1 && r <= 15 && c >= 1 && c <= 1)) return false;

  return grid[r][c] == ".";
};

const distanceToNearestObstacle = (state, curr, direction) => {
  switch (direction) {
    case "u":
      for (var i = curr.row - 1; i >= 0; i--) {
        if (state[i][curr.col] != ".") {
          return Math.abs(curr.row - i - 1);
        }
      }
    case "d":
      for (var i = curr.row + 1; i < state.length; i++) {
        if (state[i][curr.col] != ".") {
          return Math.abs(i - curr.row - 1);
        }
      }
    case "l":
      for (var i = curr.col - 1; i >= 0; i--) {
        if (state[curr.row][i] != ".") {
          return Math.abs(curr.col - i - 1);
        }
      }
    case "r":
      for (var i = curr.col + 1; i < state[0].length; i++) {
        if (state[curr.row][i] != ".") {
          return Math.abs(i - curr.col - 1);
        }
      }
    default:
      return -1;
  }
};

/*
 * Calculates the free spaces in a 5x5 square with the center as the Bike
 * passed.
 */
const freeSpacesAtIndex = (state, b) => {
  let x = b.row;
  let y = b.col;

  let res = 0;

  for (let r = x - 2; r < x + 3; r++) {
    for (let c = y - 2; c < y + 3; c++) {
      // validate bounds
      if (r < 0 || r >= state.length || c < 0 || c >= state.length) continue;

      if (state[r][c] == ".") res++;
    }
  }

  return res;
};

const relativeX = (b1, b2) => b2.col - b1.col;

const relativeY = (b1, b2) => b2.row - b1.row;

module.exports = nextMove;
