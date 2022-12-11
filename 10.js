const fs = require("fs");

const file = fs.readFile("./10.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  const commands = data.split("\n");

  // Part One

  let x = 1;
  let sumOfSignalStrengths = 0;
  let cycleCounter = 0;
  let cycleBreakpoint = 20;

  commands.map((command) => {
    if (command == "noop") {
      cycleCounter++;
      if (cycleCounter == cycleBreakpoint) {
        sumOfSignalStrengths += cycleCounter * x;
        cycleBreakpoint += 40;
      }
    } else {
      const [comm, value] = command.split(" ");
      for (let i = 0; i < 2; i++) {
        cycleCounter++;
        if (cycleCounter == cycleBreakpoint) {
          sumOfSignalStrengths += cycleCounter * x;
          cycleBreakpoint += 40;
        }
      }
      x += parseInt(value);
      if (cycleCounter == cycleBreakpoint) {
        sumOfSignalStrengths += cycleCounter * x;
        cycleBreakpoint += 40;
      }
    }
  });

  // Part Two

  let x_p2 = 1;
  let spritePosition = 1;
  let cycleCounter_p2 = 0;
  let cycleBreakpoint_p2 = 39;
  let currentRow = 0;

  let screen = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  };

  const drawToScreen = () => {
    if (
      [spritePosition - 1, spritePosition, spritePosition + 1].includes(
        cycleCounter_p2 - currentRow * 40
      )
    ) {
      screen[currentRow] += "#";
    } else {
      screen[currentRow] += ".";
    }
  };

  const executeSingleCycle = () => {
    drawToScreen();

    if (cycleBreakpoint_p2 == cycleCounter_p2) {
      cycleBreakpoint_p2 += 40;
      currentRow++;
    }

    cycleCounter_p2++;
  };

  const executeTwoCycles = (value) => {
    for (let i = 0; i < 2; i++) {
      drawToScreen();

      if (cycleBreakpoint_p2 == cycleCounter_p2) {
        cycleBreakpoint_p2 += 40;
        currentRow++;
      }

      cycleCounter_p2++;
    }

    x_p2 += parseInt(value);
    spritePosition = x_p2;
  };

  commands.map((command) => {
    if (command == "noop") {
      executeSingleCycle();
    } else {
      const [_, value] = command.split(" ");
      executeTwoCycles(value);
    }
  });

  console.log(sumOfSignalStrengths);
  console.log(screen);
});
