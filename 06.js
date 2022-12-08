const fs = require("fs");

const file = fs.readFile("./06.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  let firstMarkerAt, firstMessageAt;

  for (let i = 0; i < data.length; i++) {
    const markerSubroutine = data.slice(i, i + 4);
    const messageSubroutine = data.slice(i, i + 14);

    const isMarkerValid = new Set(markerSubroutine).size === 4;
    const isMessageValid = new Set(messageSubroutine).size === 14;

    if (isMessageValid && !firstMessageAt) {
      firstMessageAt = i + 14;
    }

    if (isMarkerValid && !firstMarkerAt) {
      firstMarkerAt = i + 4;
    }
  }

  console.log(firstMarkerAt);
  console.log(firstMessageAt);
});
