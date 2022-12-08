const fs = require("fs");

const file = fs.readFile("./02.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  const splittedData = data.split("\n");
  let numberOfPointsPartOne = 0;
  let numberOfPointsPartTwo = 0;

  // rock - 1 pt
  // paper - 2 pt
  // scissors - 3 pt

  // lose - 0 pt
  // draw - 3 pt
  // win - 6 pt

  // Part One

  // A, X - rock
  // B, Y - paper
  // C, Z - scissors

  const pointsForShape = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  const pointsForResult = {
    lose: 0,
    draw: 3,
    win: 6,
  };

  const partOnePatterns = {
    "A X": pointsForShape["rock"] + pointsForResult["draw"],
    "B X": pointsForShape["rock"] + pointsForResult["lose"],
    "C X": pointsForShape["rock"] + pointsForResult["win"],
    "A Y": pointsForShape["paper"] + pointsForResult["win"],
    "B Y": pointsForShape["paper"] + pointsForResult["draw"],
    "C Y": pointsForShape["paper"] + pointsForResult["lose"],
    "A Z": pointsForShape["scissors"] + pointsForResult["lose"],
    "B Z": pointsForShape["scissors"] + pointsForResult["win"],
    "C Z": pointsForShape["scissors"] + pointsForResult["draw"],
  };

  // Part two

  // X - lose
  // Y - draw
  // Z - win

  const partTwoPatterns = {
    "A X": pointsForShape["scissors"] + pointsForResult["lose"],
    "B X": pointsForShape["rock"] + pointsForResult["lose"],
    "C X": pointsForShape["paper"] + pointsForResult["lose"],
    "A Y": pointsForShape["rock"] + pointsForResult["draw"],
    "B Y": pointsForShape["paper"] + pointsForResult["draw"],
    "C Y": pointsForShape["scissors"] + pointsForResult["draw"],
    "A Z": pointsForShape["paper"] + pointsForResult["win"],
    "B Z": pointsForShape["scissors"] + pointsForResult["win"],
    "C Z": pointsForShape["rock"] + pointsForResult["win"],
  };

  for (const pattern of splittedData) {
    numberOfPointsPartOne += partOnePatterns[pattern];
    numberOfPointsPartTwo += partTwoPatterns[pattern];
  }

  console.log(numberOfPointsPartOne);
  console.log(numberOfPointsPartTwo);
});
