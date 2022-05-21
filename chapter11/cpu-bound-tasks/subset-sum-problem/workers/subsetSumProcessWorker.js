import { SubsetSum } from "../subsetSum.js";

process.on("message", (msg) => {
  const subsetSum = new SubsetSum(msg.sum, msg.set); // (1)
  subsetSum.on("match", (data) => {
    process.send({ event: "match", data: data });
  }); // (2)
  subsetSum.on("end", (data) => {
    process.send({ event: "end", data: data });
  });
  subsetSum.start();
});
process.send("ready");
