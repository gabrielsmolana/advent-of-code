const fs = require("fs");

const file = fs.readFile("./11.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  const splittedData = data.split("\n");
  const monkeys = {};
  const monkeys_p2 = {};
  let monkeyCounter = 0;

  let indexOfLastEmptyRow = 1;

  let modulo = 1;

  for (let i = 0; i < splittedData.length; i++) {
    if (splittedData[i] == "") {
      const [startingItems, operation, test, ifTrue, ifFalse] =
        splittedData.slice(indexOfLastEmptyRow, i);

      monkeys[monkeyCounter] = {
        startingItems: startingItems.trim().split(":")[1].trim().split(", "),
        operation: operation.split("=")[1].trim(),
        test: test.split(":")[1].trim().split(" ")[2],
        ifTrue: ifTrue.split(":")[1].trim().split(" ")[3],
        ifFalse: ifFalse.split(":")[1].trim().split(" ")[3],
        itemsInspected: 0,
      };

      modulo *= parseInt(monkeys[monkeyCounter].test);

      monkeyCounter++;
      indexOfLastEmptyRow = i + 2;
    }
  }

  const amountOfMonkeys = monkeyCounter;
  monkeyCounter = 0;

  for (let round = 0; round < 10000; round++) {
    monkeyCounter = 0;
    for (let i = 0; i < amountOfMonkeys; i++) {
      for (const item of monkeys[monkeyCounter].startingItems) {
        monkeys[monkeyCounter].itemsInspected++;

        if (monkeys[monkeyCounter].startingItems.length == 0) {
          break;
        }

        const old = parseInt(item);
        const operation = monkeys[monkeyCounter].operation;
        const test = parseInt(monkeys[monkeyCounter].test);
        let newWorryLevel = parseInt(eval(operation));
        // newWorryLevel = Math.floor(newWorryLevel / 3);
        newWorryLevel = newWorryLevel % modulo;

        if (newWorryLevel % test == 0) {
          monkeys[monkeys[monkeyCounter].ifTrue].startingItems.push(
            newWorryLevel
          );
        } else {
          monkeys[monkeys[monkeyCounter].ifFalse].startingItems.push(
            newWorryLevel
          );
        }
      }

      monkeys[monkeyCounter].startingItems.splice(
        0,
        monkeys[monkeyCounter].startingItems.length
      );

      monkeyCounter++;
    }
  }

  let largestA = 0,
    largestB = 0;

  for (let i = 0; i < monkeyCounter; i++) {
    if (monkeys[i].itemsInspected > largestA) {
      largestB = largestA;
      largestA = monkeys[i].itemsInspected;
    } else if (monkeys[i].itemsInspected > largestB) {
      largestB = monkeys[i].itemsInspected;
    }
  }

  const monkeyBussinessLevel = largestA * largestB;

  console.log(monkeyBussinessLevel);
});
