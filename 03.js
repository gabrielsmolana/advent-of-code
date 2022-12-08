const fs = require("fs");

const file = fs.readFile("./03.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  const splittedData = data.split("\n");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  let sumOfPrioritiesPartOne = 0;
  let sumOfPrioritiesPartTwo = 0;

  // Part One

  for (const rucksack of splittedData) {
    let compartmentOne = rucksack.slice(0, rucksack.length / 2),
      compartmentTwo = rucksack.slice(rucksack.length / 2, rucksack.length),
      commonItem;

    for (const item of compartmentOne) {
      if (compartmentTwo.includes(item)) {
        commonItem = item;
        break;
      }
    }

    sumOfPrioritiesPartOne +=
      commonItem == commonItem.toUpperCase()
        ? 27 + alphabet.indexOf(commonItem.toLowerCase())
        : alphabet.indexOf(commonItem) + 1;
  }

  // Part Two

  for (let i = 0; i < splittedData.length; i += 3) {
    let commonItem;

    for (const item of splittedData[i]) {
      if (
        splittedData[i + 1].includes(item) &&
        splittedData[i + 2].includes(item)
      ) {
        commonItem = item;
        break;
      }
    }

    sumOfPrioritiesPartTwo +=
      commonItem == commonItem.toUpperCase()
        ? 27 + alphabet.indexOf(commonItem.toLowerCase())
        : alphabet.indexOf(commonItem) + 1;
  }

  console.log(sumOfPrioritiesPartOne);
  console.log(sumOfPrioritiesPartTwo);
});
