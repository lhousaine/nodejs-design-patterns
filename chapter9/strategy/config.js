import { promises as fs } from "fs";
import objectPath from "object-path";
export class Config {
  constructor(formatStrategy) {
    this.data = {};
    this.formatStrategy = formatStrategy;
  }
  // (1)
  get(configPath) {
    return objectPath.get(this.data, configPath);
  } // (2)
  set(configPath, value) {
    // (2)
    return objectPath.set(this.data, configPath, value);
  }
  async load(filePath) {
    console.log(`Deserializing from ${filePath}`);
    this.data = this.formatStrategy.deserialize(
      await fs.readFile(filePath, "utf-8")
    );
  }
  async save(filePath) {
    console.log(`Serializing to ${filePath}`);
    await fs.writeFile(filePath, this.formatStrategy.serialize(this.data));
  }
  // (3)
  // (3)
}
