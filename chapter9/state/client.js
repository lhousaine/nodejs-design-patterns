import { FailsafeSocket } from "./failSafeSocket.js";
const failsafeSocket = new FailsafeSocket({ port: 5000 });
setInterval(() => {
  // send current memory usage
  failsafeSocket.send(process.memoryUsage());
}, 1000);
// the client send measurement of thier memory utilization every second
