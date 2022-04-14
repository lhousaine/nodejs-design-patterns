import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Level } from "level";
import { createFSAdapter } from "./fs-adapter.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new Level(join(__dirname, "db"), {
  valueEncoding: "binary",
});

const fs = createFSAdapter(db);

fs.writeFile("file.txt", "Hello!", () => {
    fs.readFile("file.txt", { encoding: "utf8" }, (err, res) => {
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
});

// try to read a missing file
fs.readFile("file.txt", { encoding: "utf8" }, (err, res) => {
  if (err) {
    return console.error(err);
  }
  console.log(res);
});
// wild: level-js: is an adapter package that enables to run levelUP in the browser.
// level-filesystem: is the proper implementation of the fs API on top of LevelUP