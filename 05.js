const fs = require("fs");

const file = fs.readFile("./05.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  const splittedData = data.split("\n");
  const indexOfSeparator = splittedData.indexOf("");

  let stacks = {};
  let stacksP2 = {};
  let resultOfPartOne = "";
  let resultOfPartTwo = "";

  const initialStacks = splittedData.slice(0, indexOfSeparator - 1);
  const moves = splittedData.slice(indexOfSeparator + 1);

  let stackIndex = 0;
  for (const stack of initialStacks) {
    stackIndex = 1;
    for (let i = 1; i < stack.length; i += 4) {
      if (stacks[stackIndex] == null) {
        stacks[stackIndex] = [];
        stacksP2[stackIndex] = [];
      }

      if (stack[i] !== " ") {
        stacks[stackIndex].unshift(stack[i]);
        stacksP2[stackIndex].unshift(stack[i]);
      }
      stackIndex++;
    }
  }

  for (const move of moves) {
    const [_, nodesToMove, __, startingStack, ___, endingStack] =
      move.split(" ");

    let arrOfDeletedItems = [];
    for (let i = 0; i < nodesToMove; i++) {
      const deletedEl = stacks[startingStack].pop();
      stacks[endingStack].push(deletedEl);

      const deletedElP2 = stacksP2[startingStack].pop();
      arrOfDeletedItems.unshift(deletedElP2);
    }

    for (const item of arrOfDeletedItems) {
      stacksP2[endingStack].push(item);
    }
  }

  for (let i = 1; i < stackIndex; i++) {
    const deletedEl = stacks[i].pop();
    resultOfPartOne += deletedEl;
  }

  for (let i = 1; i < stackIndex; i++) {
    const deletedEl = stacksP2[i].pop();
    resultOfPartTwo += deletedEl;
  }

  console.log(resultOfPartOne);
  console.log(resultOfPartTwo);
});
