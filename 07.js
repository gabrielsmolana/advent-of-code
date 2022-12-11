const fs = require("fs");

const file = fs.readFile("./07.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error("Couldn't find the file");
  }

  const lines = data.split("\n");

  let currentPath = [];
  let paths = [];
  let files = [];

  lines.map((line) => {
    const splittedLine = line.split(" ");

    if (splittedLine[0] == "$") {
      if (splittedLine[1] == "cd") {
        if (splittedLine[2] == "..") {
          currentPath.pop();
        } else {
          currentPath.push(splittedLine[2]);
          paths.push(`/${currentPath.slice(1, currentPath.length).join("/")}`);
        }
      }
    } else {
      if (splittedLine[0] != "dir") {
        if (
          !files.includes({
            path: `/${currentPath.slice(1, currentPath.length).join("/")}`,
            sizeOfFiles: parseInt(splittedLine[0]),
          })
        ) {
          files.push({
            path: `/${currentPath.slice(1, currentPath.length).join("/")}`,
            sizeOfFiles: parseInt(splittedLine[0]),
          });
        }
      }
    }
  });

  let size = 0;
  let sumOfSizes = 0;
  let sizeOfOuterDir = 0;

  for (const file of files) {
    sizeOfOuterDir += file["sizeOfFiles"];
  }

  const sizeToClean = 30000000 - (70000000 - sizeOfOuterDir);

  let sizeOfSmallestDirToRemove = sizeOfOuterDir;

  for (const path of paths) {
    size = 0;
    for (const file of files) {
      if (file.path.includes(path)) {
        size += file["sizeOfFiles"];
      }
    }

    if (size < 100000) {
      sumOfSizes += size;
    }

    if (size > sizeToClean && size < sizeOfSmallestDirToRemove) {
      sizeOfSmallestDirToRemove = size;
    }
  }

  console.log(sumOfSizes);
  console.log(sizeOfSmallestDirToRemove);
});
