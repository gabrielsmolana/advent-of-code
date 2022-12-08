const fs = require("fs");

const file = fs.readFile("./08.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  const map = data.split("\n");
  const mapHeight = map.length;
  const mapWidth = map[0].length;

  let visibleTreesCounter = 0;
  let highestScenicScore = 0;

  const isVisibleFromLeft = (currentRow, currentCol) => {
    let isVisible = true;
    let tiles = 0;

    for (let col = currentCol - 1; col >= 0; col--) {
      if (
        parseInt(map[currentRow][currentCol]) <= parseInt(map[currentRow][col])
      ) {
        isVisible = false;
        tiles++;
        break;
      }
      tiles++;
    }

    return [isVisible, tiles];
  };

  const isVisibleFromRight = (currentRow, currentCol) => {
    let isVisible = true;
    let tiles = 0;

    for (let col = currentCol + 1; col < mapWidth; col++) {
      if (
        parseInt(map[currentRow][currentCol]) <= parseInt(map[currentRow][col])
      ) {
        isVisible = false;
        tiles++;
        break;
      }
      tiles++;
    }

    return [isVisible, tiles];
  };

  const isVisibleFromDown = (currentRow, currentCol) => {
    let isVisible = true;
    let tiles = 0;

    for (let row = currentRow + 1; row < mapHeight; row++) {
      if (
        parseInt(map[currentRow][currentCol]) <= parseInt(map[row][currentCol])
      ) {
        isVisible = false;
        tiles++;
        break;
      }
      tiles++;
    }

    return [isVisible, tiles];
  };

  const isVisibleFromTop = (currentRow, currentCol) => {
    let isVisible = true;
    let tiles = 0;

    for (let row = currentRow - 1; row >= 0; row--) {
      if (
        parseInt(map[currentRow][currentCol]) <= parseInt(map[row][currentCol])
      ) {
        isVisible = false;
        tiles++;
        break;
      }
      tiles++;
    }

    return [isVisible, tiles];
  };

  const isVisibleFromAnyDirection = (row, col) => {
    const tilesSum =
      isVisibleFromLeft(row, col)[1] *
      isVisibleFromRight(row, col)[1] *
      isVisibleFromDown(row, col)[1] *
      isVisibleFromTop(row, col)[1];
    if (
      isVisibleFromLeft(row, col)[0] ||
      isVisibleFromRight(row, col)[0] ||
      isVisibleFromTop(row, col)[0] ||
      isVisibleFromDown(row, col)[0]
    ) {
      return [true, tilesSum];
    }

    return [false, tilesSum];
  };

  for (let row = 0; row < mapHeight; row++) {
    for (let col = 0; col < mapWidth; col++) {
      if (
        row === 0 ||
        col === 0 ||
        row === mapHeight - 1 ||
        col === mapWidth - 1 ||
        isVisibleFromAnyDirection(row, col)[0]
      ) {
        visibleTreesCounter++;
      }

      const scenicScore = isVisibleFromAnyDirection(col, row)[1];
      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
      }
    }
  }

  console.log(visibleTreesCounter);
  console.log(highestScenicScore);
});
