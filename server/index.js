var WebSocket = require("ws");
var nextMove = require("./nextMove");

// const url = "ws://35.183.103.104:8080/connect";
// const socket = new WebSocket(url);
const ourID = "7";
var currentDirection = "l";

socket.onopen = () => {
  var registrationJSON = {
    type: "REGISTRATION",
    message: "",
    authenticationKey: "49fb9b3506d444870338cdb84307b7f7d58acfdc",
    team_id: ourID
  };

  socket.send(JSON.stringify(registrationJSON));
};

socket.onerror = error => {
  console.log(`WebSocket error: ${error}`);
};

socket.onmessage = e => {
  if (
    e.data.includes("Valid") ||
    e.data.includes("Invalid") ||
    e.data.includes("Echo")
  ) {
  } else {
    var parsed = JSON.parse(e.data);
    // console.log(parsed);
    var grid = [];
    for (var i = 0; i < 17; i++) {
      var row = [];
      for (var j = 0; j < 17; j++) {
        row.push(".");
      }
      grid.push(row);
    }

    Object.keys(parsed[0]).forEach(function(key) {
      let coords = key.split(",");
      var val = parsed[0][coords];
      if (val.length == 0) val = ".";
      if (val == "wall") val = "w";
      if (val == "trail") val = "t";
      // console.log("Coords: " + coords[0] + " " + coords[1]);
      // console.log("Val: " + val);
      grid[coords[0]][coords[1]] = val;
    });

    let myPos = [-1, -1];
    let enemyPos = [-1, -1];

    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid.length; j++) {
        let c = grid[i][j];

        if (c === ourID) {
          myPos[0] = i;
          myPos[1] = j;
        } else if (c != "." && c != "w" && c != "t") {
          enemyPos[0] = i;
          enemyPos[1] = j;
        }
      }
    }

    var next = nextMove(grid, myPos, enemyPos, currentDirection);

    if (currentDirection == "u") {
      if (next == "l") {
        currentDirection = "l";
      } else if (next == "r") {
        currentDirection = "r";
      }
    } else if (currentDirection == "d") {
      if (next == "l") {
        currentDirection = "r";
      } else if (next == "r") {
        currentDirection = "l";
      }
    } else if (currentDirection == "l") {
      if (next == "l") {
        currentDirection = "d";
      } else if (next == "r") {
        currentDirection = "u";
      }
    } else if (currentDirection == "r") {
      if (next == "l") {
        currentDirection = "u";
      } else if (next == "r") {
        currentDirection = "d";
      }
    }

    let moveJSON = {
      type: "MOVE",
      message: next,
      authenticationKey: "49fb9b3506d444870338cdb84307b7f7d58acfdc",
      team_id: ourID
    };

    socket.send(JSON.stringify(moveJSON));
  }
};
