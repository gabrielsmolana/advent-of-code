const fs = require("fs");

let maxValue = 0;
let currVal = 0;

let allValues = [];

const file = fs.readFile("./01.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  const splittedData = data.split("\n");

  for (const value of splittedData) {
    if (value != "") {
      currVal += parseInt(value);
    } else {
      allValues.push(currVal);
      if (currVal > maxValue) {
        maxValue = currVal;
      }
      currVal = 0;
    }
  }

  allValues.sort().reverse();

  console.log(maxValue);
  console.log(allValues[0] + allValues[1] + allValues[2]);
});
