const fs = require("fs");

const createArrayOfGivenRange = (range) => {
  let arr = [];

  const [start, end] = range.split("-");

  for (let i = parseInt(start); i <= end; i++) {
    arr.push(i);
  }

  return arr;
};

const getRangeLength = (range) => {
  const [start, end] = range.split("-");

  return parseInt(end) - parseInt(start);
};

const file = fs.readFile("./04.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  const splittedData = data.split("\n");
  let containCounter = 0;
  let overlapCounter = 0;

  for (const ranges of splittedData) {
    const [firstRange, secondRange] = ranges.split(",");

    let doesContain = true;
    let doesOverlap = false;

    const arrayFromFirstRange = createArrayOfGivenRange(firstRange);
    const arrayFromSecondRange = createArrayOfGivenRange(secondRange);
    const firstRangeLength = getRangeLength(firstRange);
    const secondRangeLength = getRangeLength(secondRange);

    if (firstRangeLength > secondRangeLength) {
      for (const number of arrayFromSecondRange) {
        if (!arrayFromFirstRange.includes(number)) {
          doesContain = false;
          break;
        }
      }
    } else if (secondRangeLength > firstRangeLength) {
      for (const number of arrayFromFirstRange) {
        if (!arrayFromSecondRange.includes(number)) {
          doesContain = false;
          break;
        }
      }
    } else {
      for (const number of arrayFromFirstRange) {
        if (!arrayFromSecondRange.includes(number)) {
          doesContain = false;
          break;
        }
      }
    }

    for (const number of arrayFromFirstRange) {
      if (arrayFromSecondRange.includes(number)) {
        doesOverlap = true;
        break;
      }
    }

    if (doesContain) {
      containCounter++;
    }

    if (doesOverlap) {
      overlapCounter++;
    }
  }

  console.log(containCounter);
  console.log(overlapCounter);
});
