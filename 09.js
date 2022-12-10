const fs = require("fs");

const file = fs.readFile("./09.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  const arrOfMoves = data.split("\n");

  const directions = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, -1],
    D: [0, 1],
  };

  const initialPostition = { x: 0, y: 0 };

  // Part One

  let headPositionPartOne = { ...initialPostition };
  let tailPosition = { ...initialPostition };
  const positionsOfTailPartOne = new Set();

  const moveRope = (direction) => {
    headPositionPartOne["x"] += direction[0];
    headPositionPartOne["y"] += direction[1];

    const distanceFromTailToHead = Math.max(
      Math.abs(tailPosition["x"] - headPositionPartOne["x"]),
      Math.abs(tailPosition["y"] - headPositionPartOne["y"])
    );

    if (distanceFromTailToHead > 1) {
      const vectorX = headPositionPartOne["x"] - tailPosition["x"];
      const vectorY = headPositionPartOne["y"] - tailPosition["y"];
      tailPosition["x"] += Math.abs(vectorX) === 2 ? vectorX / 2 : vectorX;
      tailPosition["y"] += Math.abs(vectorY) === 2 ? vectorY / 2 : vectorY;
    }

    positionsOfTailPartOne.add(`X${tailPosition["x"]}Y${tailPosition["y"]}`);
  };

  arrOfMoves.map((move) => {
    const [direction, units] = move.split(" ");
    for (let i = 0; i < units; i++) {
      moveRope(directions[direction]);
    }
  });

  // Part Two

  let ropes = [
    { ...initialPostition },
    { ...initialPostition },
    { ...initialPostition },
    { ...initialPostition },
    { ...initialPostition },
    { ...initialPostition },
    { ...initialPostition },
    { ...initialPostition },
    { ...initialPostition },
    { ...initialPostition },
  ];

  const positionsOfTailPartTwo = new Set();

  const moveHead = (direction) => {
    ropes[0].x += direction[0];
    ropes[0].y += direction[1];
  };

  const followRope = (ropeId, ropeToFollowId) => {
    const distanceFromRopeToRope = Math.max(
      Math.abs(ropes[ropeId].x - ropes[ropeToFollowId].x),
      Math.abs(ropes[ropeId].y - ropes[ropeToFollowId].y)
    );

    if (distanceFromRopeToRope > 1) {
      const vectorX = ropes[ropeToFollowId].x - ropes[ropeId].x;
      const vectorY = ropes[ropeToFollowId].y - ropes[ropeId].y;
      ropes[ropeId].x += Math.abs(vectorX) === 2 ? vectorX / 2 : vectorX;
      ropes[ropeId].y += Math.abs(vectorY) === 2 ? vectorY / 2 : vectorY;
    }
  };

  arrOfMoves.map((move) => {
    const [direction, units] = move.split(" ");
    for (let i = 0; i < units; i++) {
      moveHead(directions[direction]);
      for (let ropeId = 1; ropeId < ropes.length; ropeId++) {
        followRope(ropeId, ropeId - 1);
      }
      positionsOfTailPartTwo.add(`X${ropes.at(-1).x}Y${ropes.at(-1).y}`);
    }
  });

  console.log(positionsOfTailPartOne.size);
  console.log(positionsOfTailPartTwo.size);
});
